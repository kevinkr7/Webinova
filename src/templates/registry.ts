import { type EventConfig } from "@/config/event";
import { type ReactNode } from "react";

export interface WebinovaTemplate {
  id: string;
  name: string;
  version: string;
  theme: "brutalist";
  supportedSections: string[];
  render: (eventData: EventConfig) => ReactNode;
}

// Stubs for the 5 templates
import { BrutalistPosterTemplate } from "./brutalist-poster";
import { BrutalistGridTemplate } from "./brutalist-grid";
import { BrutalistTerminalTemplate } from "./brutalist-terminal";
import { BrutalistEditorialTemplate } from "./brutalist-editorial";
import { BrutalistRawTemplate } from "./brutalist-raw";

export const templateRegistry: Record<string, WebinovaTemplate> = {
  [BrutalistPosterTemplate.id]: BrutalistPosterTemplate,
  [BrutalistGridTemplate.id]: BrutalistGridTemplate,
  [BrutalistTerminalTemplate.id]: BrutalistTerminalTemplate,
  [BrutalistEditorialTemplate.id]: BrutalistEditorialTemplate,
  [BrutalistRawTemplate.id]: BrutalistRawTemplate,
};
