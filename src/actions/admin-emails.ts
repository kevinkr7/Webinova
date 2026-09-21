import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { generateJoinLinkEmailTemplate, generateCertificateEmailTemplate } from "./email-template";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { eventConfig } from "@/config/event";

const sendMassEmailSchema = z.object({
  type: z.enum(["join_link", "certificate"]),
  link: z.string().url().optional(), // For join link
  pdfBase64: z.string().optional(), // For certificate template
  bbox: z.object({ x: z.number(), y: z.number(), width: z.number(), height: z.number() }).optional(),
});

export const sendMassEmailsFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => sendMassEmailSchema.parse(data))
  .handler(async ({ data }) => {
    // 1. Setup Supabase Admin Client
    const rawSupabaseUrl = process.env['VITE_SUPABASE_URL'] || (import.meta as any).env.VITE_SUPABASE_URL || "";
    const supabaseUrl = rawSupabaseUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");
    const supabaseServiceKey = process.env['SUPABASE_SERVICE_ROLE_KEY'] || (import.meta as any).env.SUPABASE_SERVICE_ROLE_KEY || "";
    const senderApiKey = process.env['SENDER_API_KEY'] || (import.meta as any).env.SENDER_API_KEY || "";

    if (!supabaseUrl || !supabaseServiceKey || !senderApiKey) {
      throw new Error(`Server configuration missing. Missing Supabase keys or Sender API key.`);
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // 2. Fetch all participants who are successfully registered
    const { data: participants, error: fetchError } = await supabaseAdmin
      .from("registrations")
      .select("*")
      // .eq("emailStatus", "sent") // Maybe just send to all, or allow UI to filter
      .order("created_at", { ascending: true });

    if (fetchError || !participants) {
      throw new Error("Failed to fetch participants.");
    }

    // 3. Fetch Dynamic Event Config
    const { data: configData } = await supabaseAdmin
      .from("webinar_settings")
      .select("config")
      .limit(1)
      .maybeSingle();

    const dynamicConfig = configData?.config || eventConfig;

    const results = {
      total: participants.length,
      success: 0,
      failed: 0,
      errors: [] as string[],
    };

    // Helper to send email via Sender.net
    async function sendEmail(email: string, name: string, subject: string, htmlContent: string) {
      const response = await fetch("https://api.sender.net/v2/message/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${senderApiKey}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          to: { email, name },
          from: { email: "organizer@kevinography.in", name: "IDEAS UNLEASHED" },
          subject: subject,
          html: htmlContent,
        }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }
    }

    // 4. Process based on type
    if (data.type === "join_link") {
      if (!data.link) throw new Error("Join link is required.");
      
      for (const p of participants) {
        try {
          const html = generateJoinLinkEmailTemplate(
            { fullName: p.fullName, joinLink: data.link },
            dynamicConfig
          );
          await sendEmail(p.email, p.fullName, "Your Join Link - " + dynamicConfig.name, html);
          results.success++;
        } catch (e: any) {
          results.failed++;
          results.errors.push(`${p.email}: ${e.message}`);
        }
      }
    } else if (data.type === "certificate") {
      if (!data.pdfBase64 || !data.bbox) throw new Error("Certificate template and bounding box are required.");

      // Ensure certificates bucket exists or just use a fallback if it doesn't.
      
      for (const p of participants) {
        try {
          // Generate PDF
          const pdfDoc = await PDFDocument.load(data.pdfBase64);
          
          // Use standard font (Helvetica Bold)
          const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
          
          const pages = pdfDoc.getPages();
          const firstPage = pages[0];
          const { width: pageWidth, height: pageHeight } = firstPage.getSize();
          
          // data.bbox is in percentages (0 to 1) relative to page size
          const boxX = data.bbox.x * pageWidth;
          // PDF coordinate system originates at bottom-left, but usually bounding boxes are top-left
          // We convert top-left to bottom-left Y coordinate
          const boxY = pageHeight - (data.bbox.y * pageHeight) - (data.bbox.height * pageHeight);
          const boxW = data.bbox.width * pageWidth;
          const boxH = data.bbox.height * pageHeight;

          const text = p.fullName.toUpperCase();
          
          // Calculate font size to fit width and height
          // Start with a large font and scale down until it fits
          let fontSize = 100;
          let textWidth = font.widthOfTextAtSize(text, fontSize);
          let textHeight = font.heightAtSize(fontSize);
          
          while ((textWidth > boxW || textHeight > boxH) && fontSize > 10) {
            fontSize -= 2;
            textWidth = font.widthOfTextAtSize(text, fontSize);
            textHeight = font.heightAtSize(fontSize);
          }

          // Center the text in the bounding box
          const textX = boxX + (boxW - textWidth) / 2;
          const textY = boxY + (boxH - textHeight) / 2;

          firstPage.drawText(text, {
            x: textX,
            y: textY,
            size: fontSize,
            font: font,
            color: rgb(0, 0, 0),
          });

          const pdfBytes = await pdfDoc.save();
          
          // Upload to Supabase Storage
          const fileName = `${p.participantId}_${p.fullName.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`;
          
          const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
            .from("certificates")
            .upload(fileName, pdfBytes, {
              contentType: "application/pdf",
              upsert: true,
            });

          if (uploadError) throw new Error("Storage Error: " + uploadError.message);

          // Get Public URL
          const { data: publicUrlData } = supabaseAdmin.storage
            .from("certificates")
            .getPublicUrl(fileName);
            
          const certificateUrl = publicUrlData.publicUrl;

          // Send Email
          const html = generateCertificateEmailTemplate(
            { fullName: p.fullName, certificateUrl },
            dynamicConfig
          );
          
          await sendEmail(p.email, p.fullName, "Your Certificate - " + dynamicConfig.name, html);
          results.success++;
        } catch (e: any) {
          results.failed++;
          results.errors.push(`${p.email}: ${e.message}`);
        }
      }
    }

    return results;
  });

const previewCertificateSchema = z.object({
  pdfBase64: z.string(),
  bbox: z.object({ x: z.number(), y: z.number(), width: z.number(), height: z.number() }),
  sampleName: z.string().optional(),
});

export const previewCertificateFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => previewCertificateSchema.parse(data))
  .handler(async ({ data }) => {
    const pdfDoc = await PDFDocument.load(data.pdfBase64);
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width: pageWidth, height: pageHeight } = firstPage.getSize();
    
    const boxX = data.bbox.x * pageWidth;
    const boxY = pageHeight - (data.bbox.y * pageHeight) - (data.bbox.height * pageHeight);
    const boxW = data.bbox.width * pageWidth;
    const boxH = data.bbox.height * pageHeight;

    const text = (data.sampleName || "JOHN DOE").toUpperCase();
    let fontSize = 100;
    let textWidth = font.widthOfTextAtSize(text, fontSize);
    let textHeight = font.heightAtSize(fontSize);
    
    while ((textWidth > boxW || textHeight > boxH) && fontSize > 10) {
      fontSize -= 2;
      textWidth = font.widthOfTextAtSize(text, fontSize);
      textHeight = font.heightAtSize(fontSize);
    }

    const textX = boxX + (boxW - textWidth) / 2;
    const textY = boxY + (boxH - textHeight) / 2;

    firstPage.drawText(text, {
      x: textX,
      y: textY,
      size: fontSize,
      font: font,
      color: rgb(0, 0, 0),
    });

    // Return the generated PDF as a base64 string
    const pdfBase64 = await pdfDoc.saveAsBase64();
    return pdfBase64;
  });
