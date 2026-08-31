import { useEventConfig } from "@/context/EventConfigContext";
import { SectionLabel } from "./primitives";
import { Reveal } from "./Reveal";
import { useParallax } from "@/hooks/use-motion";

export function Outcomes() {
  const eventConfig = useEventConfig();
  const headingRef = useParallax<HTMLHeadingElement>(-0.05);

  return (
    <section className="overflow-hidden border-b-4 border-ink">
      <SectionLabel>
        <span>04</span>
        <span>/</span>
        <span>YOU WILL LEAVE WITH</span>
      </SectionLabel>

      <div className="border-b-4 border-ink px-4 py-6 sm:px-6">
        <h2 ref={headingRef} className="display text-5xl sm:text-7xl lg:text-8xl">
          YOU WILL
          <br />
          LEAVE WITH
        </h2>
      </div>

      <div>
        {eventConfig.outcomes.map((o, i) => (
          <Reveal
            key={o.index}
            from={i % 2 === 0 ? "left" : "right"}
            className={[
              "group brut-cell grid grid-cols-[auto_1fr] items-center gap-4 px-4 py-8 hover:bg-ink hover:text-paper sm:gap-8 sm:px-6 sm:py-10",
              i < eventConfig.outcomes.length - 1 ? "border-b-4 border-ink" : "",
              i % 2 === 1 ? "bg-secondary" : "",
            ].join(" ")}
          >
            <span className="display text-6xl text-accent sm:text-8xl">{o.index}</span>
            <span className="display text-2xl transition-transform duration-100 group-hover:translate-x-2 sm:text-4xl lg:text-5xl">
              {o.text}
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
