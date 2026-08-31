import { createFileRoute } from "@tanstack/react-router";
import { useEventConfig } from "@/context/EventConfigContext";
import { templateRegistry } from "@/templates/registry";
import { BrutalistPosterTemplate } from "@/templates/brutalist-poster";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const eventConfig = useEventConfig();
  const templateId = eventConfig.page?.templateId || BrutalistPosterTemplate.id;
  const template = templateRegistry[templateId] || BrutalistPosterTemplate;

  return template.render(eventConfig);
}
