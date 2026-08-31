import { useEventConfig } from "@/context/EventConfigContext";
import { SectionLabel } from "./primitives";
import { RegistrationForm } from "./RegistrationForm";
import { Reveal } from "./Reveal";
import { useParallax } from "@/hooks/use-motion";

export function Registration() {
  const eventConfig = useEventConfig();
  const headingRef = useParallax<HTMLHeadingElement>(-0.07);

  return (
    <section id="register" className="scroll-mt-24 overflow-hidden border-b-4 border-ink">
      <SectionLabel>
        <span>08</span>
        <span>/</span>
        <span>REGISTER</span>
      </SectionLabel>

      <div className="grid border-b-4 border-ink lg:grid-cols-[1.2fr_1fr]">
        <div className="border-ink px-4 py-10 sm:px-6 lg:border-r-4">
          <h2
            ref={headingRef}
            className="display text-[22vw] leading-[0.8] will-change-transform lg:text-[12vw]"
          >
            {eventConfig.registration.heading}
          </h2>
        </div>
        <Reveal
          from="right"
          className="label-mono flex items-end border-t-4 border-ink px-4 py-6 leading-relaxed sm:px-6 lg:border-t-0"
        >
          {eventConfig.registration.message}
        </Reveal>
      </div>

      <RegistrationForm />
    </section>
  );
}
