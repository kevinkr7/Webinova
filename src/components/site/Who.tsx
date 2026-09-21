import { useEventConfig } from "@/context/EventConfigContext";
import { SectionLabel } from "./primitives";
import { Reveal } from "./Reveal";

export function Who() {
  const eventConfig = useEventConfig();
  return (
    <section className="overflow-hidden border-b-4 border-ink">
      <SectionLabel>
        <span>03</span>
        <span>/</span>
        <span>{(eventConfig.audience as any)?.heading || "WHO IS THIS FOR?"}</span>
      </SectionLabel>

      <div className={`grid ${(eventConfig.audience.blocks.length as number) === 1 ? 'grid-cols-1' : 'md:grid-cols-2'}`}>
        {eventConfig.audience.blocks.map((b, i) => (
          <Reveal
            key={b.index}
            from={i % 2 === 0 ? "left" : "right"}
            delay={i * 100}
            className={[
              "group flex items-baseline gap-4 border-ink px-4 py-12 transition-colors duration-75 hover:bg-ink hover:text-paper sm:px-6 sm:py-20",
              eventConfig.audience.blocks.length > 1 && i === 0 ? "border-b-4 md:border-b-0 md:border-r-4" : "",
            ].join(" ")}
          >
            <span className="display text-4xl text-accent sm:text-5xl">{b.index}</span>
            <span className="display text-5xl transition-transform duration-100 group-hover:translate-x-1 sm:text-6xl lg:text-8xl">
              {b.label}
            </span>
          </Reveal>
        ))}
      </div>

      <div className="label-mono border-t-4 border-ink px-4 py-3 sm:px-6">
        {eventConfig.audience.note}
      </div>
    </section>
  );
}
