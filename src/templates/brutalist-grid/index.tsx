import type { WebinovaTemplate } from "../registry";
import { useEventConfig } from "@/context/EventConfigContext";
import { RegisterButton } from "@/components/site/primitives";
import { RegistrationForm } from "@/components/site/RegistrationForm";

export const BrutalistGridTemplate: WebinovaTemplate = {
  id: "brutalist-grid",
  name: "02 — Brutalist Grid",
  version: "1.0.0",
  theme: "brutalist",
  supportedSections: ["hero", "speaker", "timeline", "registration"],
  render: (eventData) => {
    return <GridApp />;
  },
};

function GridApp() {
  const eventConfig = useEventConfig();
  return (
    <div className="min-h-screen bg-[#ececec] text-[#111] font-mono p-2 sm:p-4 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 max-w-7xl mx-auto">
        {/* Header Cell */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 border-4 border-[#111] bg-white p-6 sm:p-10 flex flex-col justify-end min-h-[300px]">
          <span className="bg-[#111] text-white px-2 py-1 self-start mb-6 text-sm font-bold uppercase">
            {eventConfig.editionLabel}
          </span>
          <h1 className="font-display text-5xl sm:text-7xl lg:text-9xl uppercase leading-[0.85] tracking-tighter">
            {eventConfig.name}
          </h1>
        </div>

        {/* Info Cell */}
        <div className="border-4 border-[#111] bg-[#111] text-white p-6 sm:p-10 flex flex-col justify-between">
          <h2 className="text-xl font-bold uppercase mb-4">Event Details</h2>
          <ul className="flex flex-col gap-4 text-sm sm:text-base">
            <li className="flex justify-between border-b-2 border-white/20 pb-2">
              <span>DATE</span> <span className="font-bold">{eventConfig.date}</span>
            </li>
            <li className="flex justify-between border-b-2 border-white/20 pb-2">
              <span>TIME</span> <span className="font-bold">{eventConfig.time}</span>
            </li>
            <li className="flex justify-between border-b-2 border-white/20 pb-2">
              <span>MODE</span> <span className="font-bold">{eventConfig.mode}</span>
            </li>
            <li className="flex justify-between">
              <span>VENUE</span> <span className="font-bold">{eventConfig.venue}</span>
            </li>
          </ul>
        </div>

        {/* Speaker Cell */}
        <div className="border-4 border-[#111] bg-white p-6 sm:p-10">
          <h2 className="text-xl font-bold uppercase mb-4 border-b-4 border-[#111] pb-2">
            Speaker
          </h2>
          <p className="font-display text-3xl sm:text-4xl mb-2">{eventConfig.speaker.name}</p>
          <p className="text-sm uppercase font-bold text-[#666] mb-4">{eventConfig.speaker.role}</p>
          <p className="text-sm leading-relaxed">{eventConfig.speaker.bio}</p>
        </div>

        {/* CTA Cell */}
        <div className="border-4 border-[#111] bg-[#dcf836] p-6 sm:p-10 flex flex-col justify-center items-center text-center">
          <h2 className="font-display text-3xl sm:text-5xl uppercase mb-6">
            {eventConfig.registration.heading}
          </h2>
          <RegisterButton
            size="lg"
            className="bg-[#111] text-white border-[#111] hover:bg-white hover:text-[#111]"
          />
        </div>

        {/* Schedule Cell */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 border-4 border-[#111] bg-white p-6 sm:p-10">
          <h2 className="text-2xl font-bold uppercase mb-6">Timeline</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {eventConfig.timeline.map((item, idx) => (
              <div key={idx} className="border-2 border-[#111] p-4 flex flex-col">
                <span className="font-bold text-xl mb-2">{item.time}</span>
                <span className="text-sm uppercase opacity-70">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Who Cell */}
        <div className="border-4 border-[#111] bg-white p-6 sm:p-10">
          <h2 className="text-xl font-bold uppercase mb-4 border-b-4 border-[#111] pb-2">
            Who is this for?
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {eventConfig.audience?.blocks?.map((block: any, idx: number) => (
              <div key={idx} className="bg-[#111] text-white p-2 text-center text-sm font-bold">
                {block.label}
              </div>
            ))}
          </div>
        </div>

        {/* Outcomes Cell */}
        <div className="col-span-1 md:col-span-2 border-4 border-[#111] bg-[#111] text-white p-6 sm:p-10">
          <h2 className="text-xl font-bold uppercase mb-6 border-b-4 border-white pb-2">
            What you will learn
          </h2>
          <ul className="list-disc pl-5 flex flex-col gap-2">
            {eventConfig.outcomes?.map((outcome: any, idx: number) => (
              <li key={idx} className="text-sm sm:text-base leading-relaxed">
                {outcome.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Organizers Cell */}
        <div className="col-span-1 md:col-span-3 border-4 border-[#111] bg-white p-6 sm:p-10">
          <h2 className="text-xl font-bold uppercase mb-4 border-b-4 border-[#111] pb-2">
            Organizer
          </h2>
          <p className="font-display text-3xl sm:text-4xl mb-2">{eventConfig.organizer.name}</p>
          <p className="text-sm uppercase font-bold text-[#666] mb-4">
            {eventConfig.organizer.role}
          </p>
        </div>

        {/* FAQ Cell */}
        <div className="col-span-1 md:col-span-3 border-4 border-[#111] bg-white p-6 sm:p-10">
          <h2 className="text-xl font-bold uppercase mb-6 border-b-4 border-[#111] pb-2">FAQ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {eventConfig.faq.map((q, idx) => (
              <div key={idx} className="border-l-4 border-[#111] pl-4">
                <p className="font-bold uppercase mb-2">{q.question}</p>
                <p className="text-sm opacity-80">{q.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Registration Form Cell */}
        <div
          id="register"
          className="col-span-1 md:col-span-2 lg:col-span-3 border-4 border-[#111] bg-white p-6 sm:p-10"
        >
          <div className="max-w-xl mx-auto">
            <RegistrationForm />
          </div>
        </div>

        {/* Footer Cell */}
        <div className="col-span-1 md:col-span-3 border-4 border-[#111] bg-[#111] text-white p-6 sm:p-10 text-center flex flex-col items-center gap-4">
          <h2 className="font-display text-4xl uppercase">{eventConfig.finalCta.heading}</h2>
          <p className="opacity-70 max-w-md mx-auto">{eventConfig.finalCta.message}</p>
          <div className="mt-8 pt-4 border-t-2 border-white/20 w-full text-xs font-bold uppercase flex justify-between">
            <span>{eventConfig.contact.email}</span>
            <span>{eventConfig.copyright}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
