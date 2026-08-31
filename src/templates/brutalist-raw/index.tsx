import type { WebinovaTemplate } from "../registry";
import { useEventConfig } from "@/context/EventConfigContext";
import { RegistrationForm } from "@/components/site/RegistrationForm";

export const BrutalistRawTemplate: WebinovaTemplate = {
  id: "brutalist-raw",
  name: "05 — Brutalist Raw",
  version: "1.0.0",
  theme: "brutalist",
  supportedSections: ["hero", "registration"],
  render: (eventData) => {
    return <RawApp />;
  },
};

function RawApp() {
  const eventConfig = useEventConfig();
  return (
    <div className="min-h-screen bg-[#ff3333] text-black overflow-hidden relative selection:bg-black selection:text-[#ff3333]">
      {/* Absolute giant background text */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <h1 className="text-[30vw] font-black uppercase leading-[0.7] -rotate-6 scale-150 origin-center whitespace-nowrap">
          {eventConfig.name}
        </h1>
      </div>

      <div className="relative z-10 p-6 md:p-12 min-h-screen flex flex-col">
        <header className="flex justify-between items-start mb-20">
          <div className="border-4 border-black bg-white p-4 font-black uppercase text-2xl transform -rotate-2 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
            {eventConfig.organization}
          </div>
          <div className="border-4 border-black bg-[#ffff00] p-4 font-black uppercase text-xl transform rotate-3 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
            {eventConfig.date} <br /> {eventConfig.time}
          </div>
        </header>

        <main className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
          <div className="flex-1 max-w-2xl">
            <h2 className="text-6xl md:text-8xl font-black uppercase leading-[0.8] mb-8 bg-black text-white inline-block p-4 transform -rotate-1">
              {eventConfig.why.heading}
            </h2>
            <p className="text-2xl md:text-4xl font-bold bg-white border-4 border-black p-6 shadow-[12px_12px_0_0_rgba(0,0,0,1)]">
              {eventConfig.why.body}
            </p>
          </div>

          <div className="w-full max-w-md">
            <div className="border-8 border-black bg-[#ffff00] p-8 shadow-[16px_16px_0_0_rgba(0,0,0,1)] transform rotate-1">
              <h3 className="text-4xl font-black uppercase mb-6 border-b-4 border-black pb-2">
                JOIN NOW
              </h3>
              <RegistrationForm />
            </div>
          </div>
        </main>

        <section className="mt-32 max-w-5xl mx-auto flex flex-col gap-24">
          <div className="transform rotate-2 border-8 border-black bg-[#ff00ff] p-8 md:p-16 shadow-[20px_20px_0_0_rgba(0,0,0,1)]">
            <h3 className="text-5xl md:text-7xl font-black uppercase mb-8 border-b-8 border-black pb-4 text-white drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
              FOR WHO?
            </h3>
            <div className="flex flex-wrap gap-4">
              {eventConfig.audience?.blocks?.map((block: any, idx: number) => (
                <span
                  key={idx}
                  className="text-3xl md:text-5xl font-black uppercase bg-white text-black p-4 border-4 border-black transform -rotate-3"
                >
                  {block.label}
                </span>
              ))}
            </div>
          </div>

          <div className="transform -rotate-1 border-8 border-black bg-white p-8 md:p-16 shadow-[-20px_20px_0_0_rgba(0,0,0,1)] ml-auto w-full md:w-5/6">
            <h3 className="text-5xl md:text-7xl font-black uppercase mb-8 border-b-8 border-black pb-4 bg-[#ffff00] inline-block px-4">
              LEARN THIS
            </h3>
            <ul className="text-2xl md:text-4xl font-bold space-y-6">
              {eventConfig.outcomes?.map((outcome: any, idx: number) => (
                <li key={idx} className="flex gap-4 items-start">
                  <span className="text-[#ff3333] font-black">X</span>
                  <span>{outcome.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="transform rotate-3 border-8 border-black bg-black text-white p-8 md:p-16 shadow-[20px_-20px_0_0_rgba(255,255,0,1)] w-full md:w-5/6">
            <h3 className="text-5xl md:text-7xl font-black uppercase mb-4 text-[#00ff00]">
              {eventConfig.speaker.name}
            </h3>
            <p className="text-2xl font-black uppercase bg-[#ff00ff] text-black inline-block p-2 mb-8 transform -rotate-2">
              {eventConfig.speaker.role}
            </p>
            <p className="text-xl md:text-3xl font-bold leading-tight">{eventConfig.speaker.bio}</p>
          </div>

          <div className="transform -rotate-2 border-8 border-black bg-[#00ffff] p-8 md:p-16 shadow-[20px_20px_0_0_rgba(0,0,0,1)]">
            <h3 className="text-5xl md:text-7xl font-black uppercase mb-12 bg-black text-white inline-block p-4">
              SCHEDULE
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {eventConfig.timeline.map((item, idx) => (
                <div
                  key={idx}
                  className="border-4 border-black bg-white p-6 transform hover:rotate-3 transition-transform"
                >
                  <p className="text-4xl font-black mb-2 text-[#ff3333]">{item.time}</p>
                  <p className="text-2xl font-bold uppercase">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="transform rotate-1 border-8 border-black bg-white p-8 md:p-16 shadow-[-20px_-20px_0_0_rgba(0,0,0,1)]">
            <h3 className="text-5xl md:text-7xl font-black uppercase mb-12 border-b-8 border-black pb-4 text-[#ff3333]">
              QUESTIONS?
            </h3>
            <div className="space-y-12">
              {eventConfig.faq.map((q, idx) => (
                <div key={idx}>
                  <p className="text-3xl md:text-4xl font-black uppercase mb-4 bg-black text-white p-4 inline-block">
                    {q.question}
                  </p>
                  <p className="text-2xl font-bold border-l-8 border-[#ff3333] pl-6 py-2">
                    {q.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-32 text-center transform -rotate-1 mb-20">
          <h2 className="text-6xl md:text-[8rem] font-black uppercase leading-none mb-8 text-black drop-shadow-[8px_8px_0_rgba(255,255,255,1)]">
            {eventConfig.finalCta.heading}
          </h2>
          <p className="text-3xl md:text-5xl font-bold bg-black text-white inline-block p-6 border-8 border-white shadow-[12px_12px_0_0_rgba(0,0,0,1)]">
            {eventConfig.finalCta.message}
          </p>
        </section>

        <footer className="mt-20 border-t-8 border-black pt-6 font-black uppercase text-xl flex flex-col sm:flex-row justify-between bg-black text-white p-8 transform rotate-1">
          <span>{eventConfig.venue}</span>
          <span>{eventConfig.copyright}</span>
        </footer>
      </div>
    </div>
  );
}
