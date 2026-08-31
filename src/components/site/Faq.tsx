import { useState } from "react";
import { useEventConfig } from "@/context/EventConfigContext";
import { SectionLabel } from "./primitives";

export function Faq() {
  const eventConfig = useEventConfig();
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className="border-b-4 border-ink">
      <SectionLabel>
        <span>09</span>
        <span>/</span>
        <span>FAQ</span>
      </SectionLabel>

      <h2 className="display border-b-4 border-ink px-4 py-6 text-5xl sm:px-6 sm:text-7xl">FAQ</h2>

      <div>
        {eventConfig.faq.map((item) => {
          const isOpen = open === item.index;
          return (
            <div key={item.index} className="border-b-4 border-ink last:border-b-0">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : item.index)}
                aria-expanded={isOpen}
                className={[
                  "group flex w-full cursor-pointer items-center gap-4 px-4 py-6 text-left transition-colors duration-100 sm:gap-8 sm:px-6",
                  isOpen ? "bg-ink text-paper" : "hover:bg-accent hover:text-accent-foreground",
                ].join(" ")}
              >
                <span className="display text-2xl text-accent transition-colors duration-100 group-hover:text-ink sm:text-4xl">
                  {item.index}
                </span>
                <span className="display flex-1 text-xl sm:text-3xl">{item.question}</span>
                <span className="display text-2xl sm:text-4xl">{isOpen ? "−" : "+"}</span>
              </button>
              <div
                className="grid transition-[grid-template-rows] duration-150 ease-linear"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="border-t-4 border-ink px-4 py-5 leading-relaxed sm:px-6">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
