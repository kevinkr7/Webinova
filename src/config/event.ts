// ---------------------------------------------------------------------------
// SINGLE SOURCE OF TRUTH FOR ALL EVENT CONTENT
// Replace the [PLACEHOLDER] values below. No UI component hardcodes content.
// ---------------------------------------------------------------------------

export const eventConfig = {
  name: "CODING DEMYSTIFIED",
  editionLabel: "WEBINAR 01",
  seriesLabel: "WEBINAR // 2026",
  audienceLine: "FOR 1ST & 2ND YEAR STUDENTS",

  organization: "[ORGANIZATION / CLUB NAME]",

  date: "[DATE]",
  time: "[TIME]",
  mode: "ONLINE",
  venue: "[ONLINE PLATFORM]",

  // Swap for the real registration URL later. When set, CTAs link out
  // instead of scrolling to the on-page form.
  registrationUrl: "" as string,
  // Where the form POSTs once a backend exists (server fn / API route).
  registrationEndpoint: "" as string,

  why: {
    heading: "WHY THIS WEBINAR?",
    body: "[SHORT DESCRIPTION OF THE WEBINAR — 2 TO 3 SENTENCES]",
  },

  audience: {
    blocks: [
      { index: "01", label: "1ST YEAR" },
      { index: "02", label: "2ND YEAR" },
    ],
    note: "[OPTIONAL ONE-LINE DESCRIPTION]",
  },

  outcomes: [
    { index: "01", text: "[LEARNING OUTCOME]" },
    { index: "02", text: "[LEARNING OUTCOME]" },
    { index: "03", text: "[LEARNING OUTCOME]" },
    { index: "04", text: "[LEARNING OUTCOME]" },
  ],

  speaker: {
    heading: "THE PERSON BEHIND THE SESSION",
    photoUrl: "" as string, // empty -> brutalist placeholder box
    name: "[SPEAKER NAME]",
    role: "[DESIGNATION / ROLE]",
    bio: "[SHORT BIO — 2 TO 3 LINES]",
    links: [
      { label: "LINKEDIN", href: "#" },
      { label: "WEBSITE", href: "#" },
    ],
  },

  organizer: {
    heading: "ORGANIZED BY",
    photoUrl: "" as string,
    name: "[ORGANIZER NAME]",
    role: "[ORGANIZER ROLE / CLUB POSITION]",
    links: [
      { label: "LINKEDIN", href: "#" },
      { label: "MAIN", href: "#" },
    ],
  },

  coOrganizer: {
    heading: "CO-ORGANIZED BY",
    photoUrl: "" as string,
    name: "[CO-ORGANIZER NAME]",
    role: "[CO-ORGANIZER ROLE / CLUB POSITION]",
    links: [
      { label: "LINKEDIN", href: "#" },
      { label: "MAIN", href: "#" },
    ],
  },

  timeline: [
    { time: "[TIME]", label: "REGISTRATION / JOIN" },
    { time: "[TIME]", label: "SESSION BEGINS" },
    { time: "[TIME]", label: "MAIN SESSION" },
    { time: "[TIME]", label: "Q&A" },
    { time: "[TIME]", label: "CLOSING" },
  ],

  registration: {
    heading: "GET IN.",
    message: "[SHORT REGISTRATION MESSAGE]",
    years: ["1ST YEAR", "2ND YEAR", "3RD YEAR", "4TH YEAR"],
  },

  faq: [
    { index: "01", question: "[QUESTION]", answer: "[ANSWER]" },
    { index: "02", question: "[QUESTION]", answer: "[ANSWER]" },
    { index: "03", question: "[QUESTION]", answer: "[ANSWER]" },
    { index: "04", question: "[QUESTION]", answer: "[ANSWER]" },
  ],

  finalCta: {
    heading: "READY TO CODE?",
    message: "[SHORT FINAL MESSAGE]",
  },

  contact: {
    email: "hello@codingdemystified.com",
    socials: [
      { label: "INSTAGRAM", href: "#" },
      { label: "LINKEDIN", href: "#" },
      { label: "WEBSITE", href: "#" },
    ],
  },

  copyright: "© 2024 Coding Demystified. All rights reserved.",
  page: {
    templateId: "brutalist-poster",
    enabledSections: [
      "hero",
      "why",
      "who",
      "outcomes",
      "speaker",
      "organizers",
      "timeline",
      "registration",
      "faq",
      "footer",
    ],
    sectionOrder: [
      "hero",
      "why",
      "who",
      "outcomes",
      "speaker",
      "organizers",
      "timeline",
      "registration",
      "faq",
      "footer",
    ],
  },
} as const;

export type EventConfig = typeof eventConfig;
