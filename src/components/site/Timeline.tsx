import { useEventConfig } from "@/context/EventConfigContext";
import { SectionLabel } from "./primitives";
import { Reveal } from "./Reveal";

export function Timeline() {
  const eventConfig = useEventConfig();
  return (
    <section className="overflow-hidden border-b-4 border-ink">
      <SectionLabel>
        <span>07</span>
        <span>/</span>
        <span>EVENT TIMELINE</span>
      </SectionLabel>

      <h2 className="display border-b-4 border-ink px-4 py-6 text-5xl sm:px-6 sm:text-7xl">
        TIMELINE
      </h2>

      <ol>
        {eventConfig.timeline.map((t, i) => (
          <Reveal
            as="li"
            from="left"
            delay={i * 60}
            key={`${t.label}-${i}`}
            className="group grid grid-cols-[auto_1fr] items-center gap-4 border-b-4 border-ink px-4 py-5 transition-colors duration-75 last:border-b-0 hover:bg-accent hover:text-accent-foreground sm:grid-cols-[80px_220px_1fr] sm:gap-6 sm:px-6"
          >
            <span className="display text-2xl text-accent group-hover:text-accent-foreground sm:text-3xl">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="label-mono border-ink text-base sm:border-r-4 sm:pr-6">{t.time}</span>
            <span className="display col-span-2 text-2xl sm:col-span-1 sm:text-3xl">{t.label}</span>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
