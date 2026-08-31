import type { WebinovaTemplate } from "../registry";
import { TopBar } from "@/components/site/TopBar";
import { Hero } from "@/components/site/Hero";
import { Why } from "@/components/site/Why";
import { Who } from "@/components/site/Who";
import { Outcomes } from "@/components/site/Outcomes";
import { Speaker } from "@/components/site/Speaker";
import { Organizers } from "@/components/site/Organizers";
import { Timeline } from "@/components/site/Timeline";
import { Registration } from "@/components/site/Registration";
import { Faq } from "@/components/site/Faq";
import { FinalCta } from "@/components/site/FinalCta";
import { Footer } from "@/components/site/Footer";

export const BrutalistPosterTemplate: WebinovaTemplate = {
  id: "brutalist-poster",
  name: "01 — Brutalist Poster",
  version: "1.0.0",
  theme: "brutalist",
  supportedSections: [
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
  render: (eventData) => {
    // Note: eventData is provided via the EventConfigContext higher up the tree.
    // The legacy components rely on the hook, so we just render them here.
    return (
      <div className="min-h-screen bg-background text-foreground">
        <TopBar />
        <main>
          <Hero />
          <Why />
          <Who />
          <Outcomes />
          <Speaker />
          <Organizers />
          <Timeline />
          <Registration />
          <Faq />
          <FinalCta />
        </main>
        <Footer />
      </div>
    );
  },
};
