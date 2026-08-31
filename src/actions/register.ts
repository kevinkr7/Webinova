import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { generateEmailTemplate } from "./email-template";
import { eventConfig } from "@/config/event";

const registrationSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  registerNumber: z.string().trim().min(2).max(50),
  year: z.string().trim().min(1),
  department: z.string().trim().min(2).max(100),
  college: z.string().trim().min(2).max(150),
});

export const registerParticipantFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => registrationSchema.parse(data))
  .handler(async ({ data }) => {
    // 1. Setup Supabase Admin Client
    const rawSupabaseUrl = process.env.VITE_SUPABASE_URL || "";
    const supabaseUrl = rawSupabaseUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Server configuration missing");
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // 2. Check for duplicate email (since we have admin access, we can select)
    const { data: existingUser } = await supabaseAdmin
      .from("registrations")
      .select("email")
      .eq("email", data.email)
      .maybeSingle();

    if (existingUser) {
      // Mimic the error structure that the frontend expects for duplicate emails
      const err = new Error("Duplicate email") as any;
      err.code = "23505";
      throw err;
    }

    // 3. Generate Participant ID
    const shortId = Math.random().toString(36).substring(2, 6).toUpperCase();
    const participantId = `CD-2026-${shortId}`;

    // 4. Insert into database with status pending
    const { error: insertError } = await supabaseAdmin.from("registrations").insert([
      {
        ...data,
        participantId,
        emailStatus: "pending",
      },
    ]);

    if (insertError) {
      const err = new Error(insertError.message) as any;
      err.code = insertError.code;
      throw err;
    }

    // 5. Send Email via Sender.net API
    const senderApiKey = process.env.SENDER_API_KEY;
    if (!senderApiKey) {
      console.error("Missing SENDER_API_KEY");
      // Update DB to failed but don't fail registration
      await supabaseAdmin
        .from("registrations")
        .update({ emailStatus: "failed" })
        .eq("email", data.email);
      return { success: true, participantId, emailSent: false };
    }

    // 4.5 Fetch Dynamic Event Config
    const { data: configData } = await supabaseAdmin
      .from("webinar_settings")
      .select("config")
      .limit(1)
      .maybeSingle();

    // Fallback to static if not found
    const dynamicConfig = configData?.config || eventConfig;

    const htmlContent = generateEmailTemplate(
      {
        ...data,
        participantId,
      },
      dynamicConfig,
    );

    try {
      const response = await fetch("https://api.sender.net/v2/message/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${senderApiKey}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          to: { email: data.email, name: data.fullName },
          from: { email: "organizer@kevinography.in", name: "CODING DEMYSTIFIED" },
          subject: "You're registered for CODING DEMYSTIFIED.",
          html: htmlContent,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Sender.net API Error:", errorText);
        throw new Error("Failed to send email");
      }

      // Email sent successfully!
      await supabaseAdmin
        .from("registrations")
        .update({ emailStatus: "sent" })
        .eq("email", data.email);

      return { success: true, participantId, emailSent: true };
    } catch (e) {
      console.error("Email dispatch exception:", e);
      // Registration was successful, but email failed. Do not block registration!
      await supabaseAdmin
        .from("registrations")
        .update({ emailStatus: "failed" })
        .eq("email", data.email);

      return { success: true, participantId, emailSent: false };
    }
  });
