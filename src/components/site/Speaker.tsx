import { useEventConfig } from "@/context/EventConfigContext";
import { SectionLabel } from "./primitives";
import { Reveal } from "./Reveal";
import { useParallax } from "@/hooks/use-motion";

export function Speaker() {
  const eventConfig = useEventConfig();
  const s = eventConfig.speaker;
  const photoRef = useParallax<HTMLDivElement>(-0.05);

  return (
    <section className="overflow-hidden border-b-4 border-ink">
      <SectionLabel>
        <span>05</span>
        <span>/</span>
        <span>SPEAKER</span>
      </SectionLabel>

      <h2 className="display border-b-4 border-ink px-4 py-6 text-4xl sm:px-6 sm:text-6xl lg:text-7xl">
        {s.heading}
      </h2>

      <div className="grid lg:grid-cols-[minmax(0,380px)_1fr]">
        <div className="border-ink lg:border-r-4">
          <div ref={photoRef} className="will-change-transform">
            {s.photoUrl ? (
              <img
                src={s.photoUrl}
                alt={`Photo of ${s.name}`}
                loading="lazy"
                className="aspect-square w-full object-cover grayscale transition-[filter] duration-200 hover:grayscale-0"
              />
            ) : (
              <div className="label-mono flex aspect-square w-full items-center justify-center bg-secondary text-center text-muted-foreground">
                [SPEAKER PHOTO]
              </div>
            )}
          </div>
        </div>

        <div className="border-t-4 border-ink lg:border-t-0 flex flex-col h-full">
          <Reveal from="right">
            <div className="display border-b-4 border-ink px-4 py-6 text-4xl sm:px-6 sm:text-6xl">
              {s.name}
            </div>
          </Reveal>
          <div className="label-mono border-b-4 border-ink bg-accent px-4 py-3 text-accent-foreground sm:px-6">
            {s.role}
          </div>
          <Reveal delay={80} className="flex-1 flex flex-col">
            <p className="border-b-4 border-ink px-4 py-6 leading-relaxed sm:px-6 sm:text-lg flex-1">
              {s.bio}
            </p>
          </Reveal>
          <div className="flex flex-wrap mt-auto">
            {s.links
              .filter((l) => l.label.toUpperCase() !== "WEBSITE")
              .map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="label-mono border-r-4 border-ink px-4 py-3 transition-colors duration-75 hover:bg-ink hover:text-paper sm:border-r-4"
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
