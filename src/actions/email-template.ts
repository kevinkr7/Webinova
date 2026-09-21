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

  const eventName = sanitize(eventConfig.name);

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Registration Confirmed - ${eventName}</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #e5e5e5; color: #111111; font-family: 'JetBrains Mono', 'Courier New', monospace; line-height: 1.6;">
      <div style="max-width: 800px; margin: 40px auto; background-color: #f4f4ef; padding: 0; border: 8px solid #111111; box-shadow: 12px 12px 0px #111111;">
        
        <!-- HEADER -->
        <div style="background-color: #111111; color: #f4f4ef; padding: 40px 30px; border-bottom: 8px solid #111111;">
          <p style="font-size: 16px; font-weight: bold; letter-spacing: 4px; text-transform: uppercase; margin: 0 0 10px 0; color: #e40011;">
            // TICKET SECURED
          </p>
          <h1 style="font-family: 'Archivo Black', 'Arial Black', sans-serif; font-size: 48px; font-weight: 900; text-transform: uppercase; margin: 0; line-height: 1.1; word-break: break-word;">
            ${eventName}
          </h1>
        </div>
        
        <div style="padding: 40px 30px;">
          <!-- MESSAGE -->
          <p style="font-size: 22px; margin-bottom: 30px; font-weight: bold; font-family: 'Archivo Black', 'Arial Black', sans-serif; text-transform: uppercase;">
            WELCOME ABOARD, <span style="background-color: #e40011; padding: 0 8px;">${fName}</span>
          </p>
          <p style="font-size: 18px; margin-bottom: 40px; border-left: 4px solid #111111; padding-left: 15px;">
            Your registration has been successfully verified and confirmed.
          </p>
          
          <!-- BRUTALIST INFO BLOCK -->
          <div style="border: 4px solid #111111; background-color: #ffffff; display: block;">
            <div style="border-bottom: 4px solid #111111; padding: 20px;">
              <div style="font-size: 12px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; color: #666666;">PARTICIPANT</div>
              <div style="font-size: 20px; font-weight: bold; font-family: 'Archivo Black', 'Arial Black', sans-serif; text-transform: uppercase;">${fullName}</div>
            </div>
            <div style="border-bottom: 4px solid #111111; padding: 20px; background-color: #111111; color: #f4f4ef;">
              <div style="font-size: 12px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; color: #aaaaaa;">PARTICIPANT ID</div>
              <div style="font-size: 20px; font-weight: bold; font-family: 'Archivo Black', 'Arial Black', sans-serif; text-transform: uppercase; color: #e40011;">${pId}</div>
            </div>
            <div style="border-bottom: 4px solid #111111; padding: 20px;">
              <div style="font-size: 12px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; color: #666666;">DEPARTMENT / YEAR</div>
              <div style="font-size: 18px; font-weight: bold; font-family: 'Archivo Black', 'Arial Black', sans-serif; text-transform: uppercase;">${dept} / ${year}</div>
            </div>
            <div style="border-bottom: 4px solid #111111; padding: 20px;">
              <div style="font-size: 12px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; color: #666666;">EVENT</div>
              <div style="font-size: 18px; font-weight: bold; font-family: 'Archivo Black', 'Arial Black', sans-serif; text-transform: uppercase;">${eventName}</div>
            </div>
            <div style="border-bottom: 4px solid #111111; padding: 20px; background-color: #e40011;">
              <div style="font-size: 12px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; color: #111111;">DATE</div>
              <div style="font-size: 24px; font-weight: bold; font-family: 'Archivo Black', 'Arial Black', sans-serif; text-transform: uppercase;">${date}</div>
            </div>
            <div style="padding: 20px; background-color: #e40011;">
              <div style="font-size: 12px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; color: #111111;">TIME</div>
              <div style="font-size: 24px; font-weight: bold; font-family: 'Archivo Black', 'Arial Black', sans-serif; text-transform: uppercase;">${time}</div>
            </div>
          </div>

          <div style="margin-top: 40px; padding: 20px; border: 4px dashed #111111; text-align: center;">
            <p style="font-weight: bold; font-size: 18px; margin: 0 0 10px 0; text-transform: uppercase;">Keep this email for your event details.</p>
            <p style="margin: 0; font-size: 14px;">Your Microsoft Teams joining link will be sent separately before the event.</p>
          </div>
          
          <!-- FOOTER -->
          <div style="margin-top: 40px; border-top: 8px solid #111111; padding-top: 20px;">
            <div style="font-family: 'Archivo Black', 'Arial Black', sans-serif; font-size: 24px; text-transform: uppercase; margin-bottom: 5px;">${eventName}</div>
            <div style="font-size: 14px; font-weight: bold; text-transform: uppercase; margin-bottom: 20px;">${org}</div>
            <div style="font-size: 14px; font-weight: bold; color: #666666;">
              organizer@kevinography.in
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function generateJoinLinkEmailTemplate(
  data: {
    fullName: string;
    joinLink: string;
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
  const org = sanitize(eventConfig.organization);
  const eventName = sanitize(eventConfig.name);
  // Do not sanitize joinLink as it needs to be a valid URL (though usually safe, we can leave it or URL encode). We'll assume it's safe.

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Join Link - ${eventName}</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #e5e5e5; color: #111111; font-family: 'JetBrains Mono', 'Courier New', monospace; line-height: 1.6;">
      <div style="max-width: 800px; margin: 40px auto; background-color: #f4f4ef; padding: 0; border: 8px solid #111111; box-shadow: 12px 12px 0px #111111;">
        
        <!-- HEADER -->
        <div style="background-color: #111111; color: #f4f4ef; padding: 40px 30px; border-bottom: 8px solid #111111;">
          <p style="font-size: 16px; font-weight: bold; letter-spacing: 4px; text-transform: uppercase; margin: 0 0 10px 0; color: #e40011;">
            // IT'S TIME
          </p>
          <h1 style="font-family: 'Archivo Black', 'Arial Black', sans-serif; font-size: 48px; font-weight: 900; text-transform: uppercase; margin: 0; line-height: 1.1; word-break: break-word;">
            ${eventName}
          </h1>
        </div>
        
        <div style="padding: 40px 30px;">
          <!-- MESSAGE -->
          <p style="font-size: 22px; margin-bottom: 30px; font-weight: bold; font-family: 'Archivo Black', 'Arial Black', sans-serif; text-transform: uppercase;">
            HELLO, <span style="background-color: #e40011; padding: 0 8px;">${fName}</span>
          </p>
          <p style="font-size: 18px; margin-bottom: 40px; border-left: 4px solid #111111; padding-left: 15px;">
            Your webinar is starting soon. Use the link below to join the Microsoft Teams session.
          </p>
          
          <!-- BRUTALIST BUTTON -->
          <div style="text-align: center; margin: 50px 0;">
            <a href="${data.joinLink}" style="display: inline-block; background-color: #e40011; color: #111111; font-family: 'Archivo Black', 'Arial Black', sans-serif; font-size: 24px; font-weight: 900; text-decoration: none; padding: 20px 40px; border: 4px solid #111111; text-transform: uppercase; box-shadow: 6px 6px 0px #111111; transition: all 0.2s ease;">
              JOIN WEBINAR NOW →
            </a>
          </div>

          <div style="margin-top: 40px; padding: 20px; border: 4px dashed #111111; text-align: center;">
            <p style="font-weight: bold; font-size: 18px; margin: 0 0 10px 0; text-transform: uppercase;">Trouble joining?</p>
            <p style="margin: 0; font-size: 14px;">Copy and paste this link into your browser:<br>
            <span style="background-color: #111111; color: #f4f4ef; padding: 5px; display: inline-block; margin-top: 10px; word-break: break-all;">${data.joinLink}</span></p>
          </div>
          
          <!-- FOOTER -->
          <div style="margin-top: 40px; border-top: 8px solid #111111; padding-top: 20px;">
            <div style="font-family: 'Archivo Black', 'Arial Black', sans-serif; font-size: 24px; text-transform: uppercase; margin-bottom: 5px;">${eventName}</div>
            <div style="font-size: 14px; font-weight: bold; text-transform: uppercase; margin-bottom: 20px;">${org}</div>
            <div style="font-size: 14px; font-weight: bold; color: #666666;">
              organizer@kevinography.in
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function generateCertificateEmailTemplate(
  data: {
    fullName: string;
    certificateUrl: string;
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
  const org = sanitize(eventConfig.organization);
  const eventName = sanitize(eventConfig.name);

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Certificate - ${eventName}</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #e5e5e5; color: #111111; font-family: 'JetBrains Mono', 'Courier New', monospace; line-height: 1.6;">
      <div style="max-width: 800px; margin: 40px auto; background-color: #f4f4ef; padding: 0; border: 8px solid #111111; box-shadow: 12px 12px 0px #111111;">
        
        <!-- HEADER -->
        <div style="background-color: #111111; color: #f4f4ef; padding: 40px 30px; border-bottom: 8px solid #111111;">
          <p style="font-size: 16px; font-weight: bold; letter-spacing: 4px; text-transform: uppercase; margin: 0 0 10px 0; color: #e40011;">
            // MISSION ACCOMPLISHED
          </p>
          <h1 style="font-family: 'Archivo Black', 'Arial Black', sans-serif; font-size: 48px; font-weight: 900; text-transform: uppercase; margin: 0; line-height: 1.1; word-break: break-word;">
            ${eventName}
          </h1>
        </div>
        
        <div style="padding: 40px 30px;">
          <!-- MESSAGE -->
          <p style="font-size: 22px; margin-bottom: 30px; font-weight: bold; font-family: 'Archivo Black', 'Arial Black', sans-serif; text-transform: uppercase;">
            CONGRATULATIONS, <span style="background-color: #e40011; padding: 0 8px;">${fName}</span>
          </p>
          <p style="font-size: 18px; margin-bottom: 40px; border-left: 4px solid #111111; padding-left: 15px;">
            Thank you for attending the event. Your participation certificate is officially ready.
          </p>
          
          <!-- BRUTALIST BUTTON -->
          <div style="text-align: center; margin: 50px 0;">
            <a href="${data.certificateUrl}" style="display: inline-block; background-color: #ffffff; color: #111111; font-family: 'Archivo Black', 'Arial Black', sans-serif; font-size: 20px; font-weight: 900; text-decoration: none; padding: 20px 40px; border: 4px solid #111111; text-transform: uppercase; box-shadow: 6px 6px 0px #111111; transition: all 0.2s ease;">
              DOWNLOAD CERTIFICATE ↓
            </a>
          </div>

          <div style="margin-top: 40px; padding: 20px; border: 4px dashed #111111; text-align: center;">
            <p style="font-weight: bold; font-size: 18px; margin: 0 0 10px 0; text-transform: uppercase;">Want to show it off?</p>
            <p style="margin: 0; font-size: 14px;">Feel free to share your certificate on LinkedIn and tag the organizers.</p>
          </div>
          
          <!-- FOOTER -->
          <div style="margin-top: 40px; border-top: 8px solid #111111; padding-top: 20px;">
            <div style="font-family: 'Archivo Black', 'Arial Black', sans-serif; font-size: 24px; text-transform: uppercase; margin-bottom: 5px;">${eventName}</div>
            <div style="font-size: 14px; font-weight: bold; text-transform: uppercase; margin-bottom: 20px;">${org}</div>
            <div style="font-size: 14px; font-weight: bold; color: #666666;">
              organizer@kevinography.in
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}
