import { useEventConfig } from "@/context/EventConfigContext";
import { RegisterButton } from "./primitives";
import { Reveal } from "./Reveal";
import { useParallax } from "@/hooks/use-motion";

export function Hero() {
  const eventConfig = useEventConfig();

  const facts = [
    { k: "DATE", v: eventConfig.date },
    { k: "TIME", v: eventConfig.time },
    { k: "MODE", v: eventConfig.mode },
    { k: "VENUE", v: eventConfig.venue },
  ];
  const lineOne = useParallax<HTMLSpanElement>(-0.06);
  const lineTwo = useParallax<HTMLSpanElement>(0.06);
  const factsRef = useParallax<HTMLDivElement>(-0.03);

  return (
    <section className="overflow-hidden border-b-4 border-ink">
      <div className="border-b-4 border-ink px-4 py-3 sm:px-6">
        <span className="label-mono inline-block border-4 border-ink bg-ink px-3 py-1 text-paper">
          {eventConfig.editionLabel}
        </span>
      </div>

      <div className="px-4 pb-4 pt-6 sm:px-6 sm:pt-10">
        <h1 className="display text-[19vw] leading-[0.82] sm:text-[16vw] lg:text-[13.5vw]">
          <span ref={lineOne} className="block will-change-transform">
            CODING
          </span>
          <span ref={lineTwo} className="-mt-[0.06em] block text-accent will-change-transform">
            DEMYSTIFIED
          </span>
        </h1>
      </div>

      <div className="border-y-4 border-ink bg-ink px-4 py-2 sm:px-6">
        <p className="label-mono text-paper">{eventConfig.audienceLine}</p>
      </div>

      <div ref={factsRef} className="grid grid-cols-2 border-b-4 border-ink lg:grid-cols-4">
        {facts.map((f, i) => (
          <Reveal
            key={f.k}
            delay={i * 70}
            className={[
              "group brut-cell border-ink px-4 py-6 hover:bg-ink hover:text-paper sm:px-6 sm:py-8",
              i % 2 === 0 ? "border-r-4" : "",
              i < 2 ? "border-b-4 lg:border-b-0" : "",
              i === 2 ? "lg:border-r-4" : "",
              i === 1 ? "lg:border-r-4" : "",
            ].join(" ")}
          >
            <div className="label-mono text-muted-foreground transition-colors duration-100 group-hover:text-accent">
              {f.k}
            </div>
            <div className="display mt-3 break-words text-xl sm:text-2xl lg:text-3xl">{f.v}</div>
          </Reveal>
        ))}
      </div>

      <div className="grid lg:grid-cols-[2fr_1fr]">
        <div className="border-ink p-4 sm:p-6 lg:border-r-4">
          <RegisterButton size="xl" />
        </div>
        <div className="label-mono flex items-end border-t-4 border-ink p-4 leading-relaxed sm:p-6 lg:border-t-0">
          NO FEE // LIMITED SEATS // ONLINE
        </div>
      </div>
    </section>
  );
}
