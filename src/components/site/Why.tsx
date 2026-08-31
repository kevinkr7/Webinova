import { useEventConfig } from "@/context/EventConfigContext";
import { SectionLabel } from "./primitives";
import { Reveal } from "./Reveal";

export function Why() {
  const eventConfig = useEventConfig();
  return (
    <section className="overflow-hidden border-b-4 border-ink">
      <SectionLabel>
        <span>02</span>
        <span>/</span>
        <span>WHAT IS THIS?</span>
      </SectionLabel>
      <div className="grid lg:grid-cols-[1fr_1.2fr]">
        <Reveal from="left" className="border-ink p-4 sm:p-6 lg:border-r-4">
          <h2 className="display text-5xl sm:text-6xl lg:text-7xl">{eventConfig.why.heading}</h2>
        </Reveal>
        <Reveal from="right" delay={90} className="border-t-4 border-ink p-4 sm:p-6 lg:border-t-0">
          <p className="text-lg leading-relaxed sm:text-xl lg:text-2xl">{eventConfig.why.body}</p>
        </Reveal>
      </div>
    </section>
  );
}
