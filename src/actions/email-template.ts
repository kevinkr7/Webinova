import { type EventConfig } from "../config/event";

export function generateEmailTemplate(
  data: {
    fullName: string;
    participantId: string;
    year: string;
    department: string;
  },
  eventConfig: EventConfig,
) {
  const sanitize = (str: string) =>
    str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const fName = sanitize(data.fullName.split(" ")[0] || "");
  const fullName = sanitize(data.fullName);
  const pId = sanitize(data.participantId);
  const year = sanitize(data.year);
  const dept = sanitize(data.department);
  const org = sanitize(eventConfig.organization);
  const date = sanitize(eventConfig.date);
  const time = sanitize(eventConfig.time);

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Registration Confirmed</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f4ef; color: #222222; font-family: 'JetBrains Mono', 'Courier New', monospace; line-height: 1.6;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #f4f4ef; padding: 40px 20px;">
        
        <!-- HEADER -->
        <div style="border-bottom: 4px solid #222222; padding-bottom: 20px; margin-bottom: 40px;">
          <h1 style="font-family: 'Archivo Black', 'Arial Black', sans-serif; font-size: 32px; font-weight: 900; text-transform: uppercase; margin: 0 0 10px 0; line-height: 1; color: #222222;">
            CODING DEMYSTIFIED
          </h1>
          <p style="font-size: 14px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; margin: 0; color: #222222;">
            REGISTRATION CONFIRMED // 2026
          </p>
        </div>
        
        <!-- MESSAGE -->
        <p style="font-size: 18px; margin-bottom: 20px; font-weight: bold; color: #222222;">Hi ${fName},</p>
        <p style="color: #222222; font-size: 16px;">Your registration has been successfully confirmed.</p>
        
        <!-- BRUTALIST INFO BLOCK -->
        <div style="border: 4px solid #222222; margin: 30px 0;">
          <div style="border-bottom: 4px solid #222222; padding: 15px;">
            <div style="font-size: 12px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 5px; color: #222222;">PARTICIPANT</div>
            <div style="font-size: 16px; font-weight: bold; font-family: 'Archivo Black', 'Arial Black', sans-serif; text-transform: uppercase; color: #222222;">${fullName}</div>
          </div>
          <div style="border-bottom: 4px solid #222222; padding: 15px;">
            <div style="font-size: 12px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 5px; color: #222222;">PARTICIPANT ID</div>
            <div style="font-size: 16px; font-weight: bold; font-family: 'Archivo Black', 'Arial Black', sans-serif; text-transform: uppercase; color: #222222;">${pId}</div>
          </div>
          <div style="border-bottom: 4px solid #222222; padding: 15px;">
            <div style="font-size: 12px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 5px; color: #222222;">YEAR</div>
            <div style="font-size: 16px; font-weight: bold; font-family: 'Archivo Black', 'Arial Black', sans-serif; text-transform: uppercase; color: #222222;">${year}</div>
          </div>
          <div style="border-bottom: 4px solid #222222; padding: 15px;">
            <div style="font-size: 12px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 5px; color: #222222;">DEPARTMENT</div>
            <div style="font-size: 16px; font-weight: bold; font-family: 'Archivo Black', 'Arial Black', sans-serif; text-transform: uppercase; color: #222222;">${dept}</div>
          </div>
          <div style="border-bottom: 4px solid #222222; padding: 15px;">
            <div style="font-size: 12px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 5px; color: #222222;">EVENT</div>
            <div style="font-size: 16px; font-weight: bold; font-family: 'Archivo Black', 'Arial Black', sans-serif; text-transform: uppercase; color: #222222;">CODING DEMYSTIFIED</div>
          </div>
          <div style="border-bottom: 4px solid #222222; padding: 15px;">
            <div style="font-size: 12px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 5px; color: #222222;">DATE</div>
            <div style="font-size: 16px; font-weight: bold; font-family: 'Archivo Black', 'Arial Black', sans-serif; text-transform: uppercase; color: #222222;">${date}</div>
          </div>
          <div style="padding: 15px;">
            <div style="font-size: 12px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 5px; color: #222222;">TIME</div>
            <div style="font-size: 16px; font-weight: bold; font-family: 'Archivo Black', 'Arial Black', sans-serif; text-transform: uppercase; color: #222222;">${time}</div>
          </div>
        </div>

        <p style="font-weight: bold; color: #222222;">Keep this email for your event details.</p>
        <p style="color: #222222;">Your Microsoft Teams joining link will be sent separately before the event.</p>
        
        <!-- FOOTER -->
        <div style="margin-top: 40px; border-top: 4px solid #222222; padding-top: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase; color: #222222;">
          CODING DEMYSTIFIED<br>
          ${org}<br>
          organizer@kevinography.in
        </div>
      </div>
    </body>
    </html>
  `;
}
