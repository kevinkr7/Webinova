import { useEventConfig } from "@/context/EventConfigContext";
import { RegisterButton } from "./primitives";
import { Reveal } from "./Reveal";
import { useParallax } from "@/hooks/use-motion";

export function FinalCta() {
  const eventConfig = useEventConfig();
  const headingRef = useParallax<HTMLHeadingElement>(-0.09);

  return (
    <section className="overflow-hidden border-b-4 border-ink bg-accent text-accent-foreground">
      <div className="border-b-4 border-ink px-4 py-12 sm:px-6 sm:py-20">
        <h2 ref={headingRef} className="display text-[16vw] leading-[0.82] will-change-transform">
          {eventConfig.finalCta.heading.split(" ")[0] || "READY"}
          <br />
          {eventConfig.finalCta.heading.split(" ").slice(1).join(" ") || "TO CODE?"}
        </h2>
        <Reveal>
          <p className="label-mono mt-8 max-w-2xl">{eventConfig.finalCta.message}</p>
        </Reveal>
      </div>
      <div className="p-4 sm:p-6">
        <RegisterButton size="xl" className="bg-paper text-ink hover:bg-ink hover:text-paper" />
      </div>
    </section>
  );
}
