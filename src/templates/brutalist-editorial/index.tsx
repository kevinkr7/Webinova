import type { WebinovaTemplate } from "../registry";
import { useEventConfig } from "@/context/EventConfigContext";
import { RegistrationForm } from "@/components/site/RegistrationForm";
import { RegisterButton } from "@/components/site/primitives";

export const BrutalistEditorialTemplate: WebinovaTemplate = {
  id: "brutalist-editorial",
  name: "04 — Brutalist Editorial",
  version: "1.0.0",
  theme: "brutalist",
  supportedSections: ["hero", "why", "speaker", "registration"],
  render: (eventData) => {
    return <EditorialApp />;
  },
};

function EditorialApp() {
  const eventConfig = useEventConfig();
  return (
    <div className="min-h-screen bg-[#f4f4f0] text-[#222] font-serif border-x-8 border-[#222] max-w-7xl mx-auto">
      {/* Header */}
      <header className="border-b-8 border-[#222] p-8 text-center flex flex-col items-center">
        <h3 className="font-sans font-bold tracking-widest text-sm uppercase mb-4 border-b-2 border-[#222] pb-1 inline-block">
          {eventConfig.organization} PRESENTS
        </h3>
        <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-bold uppercase leading-none tracking-tighter my-6">
          {eventConfig.name}
        </h1>
        <div className="w-full border-t-4 border-b-4 border-[#222] py-2 mt-4 flex justify-between font-sans text-xs sm:text-sm font-bold uppercase">
          <span>{eventConfig.date}</span>
          <span>{eventConfig.editionLabel}</span>
          <span>{eventConfig.time}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Column - Article */}
        <article className="lg:col-span-8 border-r-0 lg:border-r-8 border-[#222] p-8 lg:p-12">
          <h2 className="text-4xl md:text-5xl font-bold uppercase mb-6 leading-tight">
            {eventConfig.why.heading}
          </h2>
          <p className="text-xl md:text-2xl leading-relaxed mb-10 first-letter:text-7xl first-letter:font-bold first-letter:mr-2 first-letter:float-left">
            {eventConfig.why.body}
          </p>

          <div className="border-t-4 border-[#222] pt-8 mt-12">
            <h3 className="font-sans font-bold text-2xl uppercase mb-6">Target Audience</h3>
            <div className="flex flex-wrap gap-4 font-sans font-bold text-sm uppercase">
              {eventConfig.audience?.blocks?.map((block: any, idx: number) => (
                <span key={idx} className="border-2 border-[#222] px-4 py-2 bg-black text-white">
                  {block.label}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t-4 border-[#222] pt-8 mt-12">
            <h3 className="font-sans font-bold text-2xl uppercase mb-6">Learning Outcomes</h3>
            <ul className="list-decimal pl-6 text-xl leading-relaxed space-y-4">
              {eventConfig.outcomes?.map((outcome: any, idx: number) => (
                <li key={idx} className="pl-4">
                  {outcome.text}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t-4 border-[#222] pt-8 mt-12">
            <h3 className="font-sans font-bold text-2xl uppercase mb-6">Speaker Profile</h3>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="w-full sm:w-1/3 aspect-[3/4] bg-[#222] border-4 border-[#222]">
                {/* Placeholder for Photo */}
              </div>
              <div className="flex-1">
                <h4 className="text-3xl font-bold uppercase">{eventConfig.speaker.name}</h4>
                <p className="font-sans font-bold uppercase text-sm mt-1 mb-4">
                  {eventConfig.speaker.role}
                </p>
                <p className="text-lg leading-relaxed">{eventConfig.speaker.bio}</p>
              </div>
            </div>
          </div>

          <div className="border-t-4 border-[#222] pt-8 mt-12">
            <h3 className="font-sans font-bold text-2xl uppercase mb-6">Timeline</h3>
            <div className="space-y-4">
              {eventConfig.timeline.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 border-b-2 border-gray-300 pb-4"
                >
                  <span className="font-sans font-bold text-xl uppercase whitespace-nowrap">
                    {item.time}
                  </span>
                  <span className="text-lg">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t-4 border-[#222] pt-8 mt-12">
            <h3 className="font-sans font-bold text-2xl uppercase mb-6">
              Frequently Asked Questions
            </h3>
            <div className="space-y-8">
              {eventConfig.faq.map((q, idx) => (
                <div key={idx}>
                  <p className="font-bold text-xl uppercase mb-2">Q. {q.question}</p>
                  <p className="text-lg text-gray-700">A. {q.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </article>

        {/* Right Column - Registration Sidebar */}
        <aside className="lg:col-span-4 p-8 border-t-8 lg:border-t-0 border-[#222] bg-white flex flex-col">
          <div className="mb-12 border-b-4 border-[#222] pb-8">
            <h3 className="font-sans font-bold text-lg uppercase mb-4">Event Organized By</h3>
            <h4 className="text-3xl font-bold uppercase">{eventConfig.organizer.name}</h4>
            <p className="font-sans font-bold uppercase text-sm mt-1">
              {eventConfig.organizer.role}
            </p>
          </div>

          <div className="sticky top-8">
            <h3 className="font-sans font-bold text-3xl uppercase mb-6 border-b-4 border-[#222] pb-2">
              Registration
            </h3>
            <p className="font-sans text-sm font-bold uppercase mb-8">
              {eventConfig.venue} // {eventConfig.mode}
            </p>
            <div className="font-sans">
              <RegistrationForm />
            </div>
          </div>
        </aside>
      </main>

      {/* Final CTA */}
      <section className="border-t-8 border-[#222] bg-[#222] text-white p-12 text-center">
        <h2 className="text-5xl md:text-7xl font-bold uppercase mb-6">
          {eventConfig.finalCta.heading}
        </h2>
        <p className="text-xl md:text-2xl font-sans mb-8 max-w-2xl mx-auto">
          {eventConfig.finalCta.message}
        </p>
        <div className="font-sans">
          <RegisterButton
            size="lg"
            className="bg-white text-black border-white hover:bg-black hover:text-white"
          />
        </div>
      </section>

      <footer className="p-6 text-center font-sans text-sm font-bold uppercase bg-black text-white border-t-2 border-white/20 flex flex-col sm:flex-row justify-between items-center px-12">
        <span>{eventConfig.contact.email}</span>
        <span>{eventConfig.copyright}</span>
      </footer>
    </div>
  );
}
