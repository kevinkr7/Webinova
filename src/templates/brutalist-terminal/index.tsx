import type { WebinovaTemplate } from "../registry";
import { useEventConfig } from "@/context/EventConfigContext";
import { RegistrationForm } from "@/components/site/RegistrationForm";

export const BrutalistTerminalTemplate: WebinovaTemplate = {
  id: "brutalist-terminal",
  name: "03 — Brutalist Terminal",
  version: "1.0.0",
  theme: "brutalist",
  supportedSections: ["hero", "speaker", "registration"],
  render: (eventData) => {
    return <TerminalApp />;
  },
};

function TerminalApp() {
  const eventConfig = useEventConfig();
  return (
    <div className="min-h-screen bg-[#000000] text-[#00ff00] font-mono p-4 sm:p-8">
      <div className="max-w-4xl mx-auto border-2 border-[#00ff00] p-4 sm:p-8 shadow-[0_0_20px_rgba(0,255,0,0.2)]">
        <header className="border-b-2 border-[#00ff00] pb-4 mb-8">
          <p className="text-xs sm:text-sm mb-2 opacity-70">root@webinova:~# ./init_event.sh</p>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-widest">
            {eventConfig.name}
          </h1>
          <p className="mt-2 text-sm">
            v.{eventConfig.editionLabel.replace(" ", "_").toLowerCase()}
          </p>
        </header>

        <section className="mb-12">
          <p className="text-sm mb-2 opacity-70">root@webinova:~# cat /details.txt</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border border-[#00ff00]/30 p-4">
            <div>
              <span className="font-bold opacity-70">DATE:</span> {eventConfig.date}
            </div>
            <div>
              <span className="font-bold opacity-70">TIME:</span> {eventConfig.time}
            </div>
            <div>
              <span className="font-bold opacity-70">MODE:</span> {eventConfig.mode}
            </div>
            <div>
              <span className="font-bold opacity-70">VENUE:</span> {eventConfig.venue}
            </div>
          </div>
        </section>

        <section className="mb-12">
          <p className="text-sm mb-2 opacity-70">root@webinova:~# whoami</p>
          <div className="border border-[#00ff00]/30 p-4">
            <h2 className="text-xl font-bold mb-2 uppercase">&gt; {eventConfig.speaker.name}</h2>
            <p className="text-sm opacity-70 mb-4">[{eventConfig.speaker.role}]</p>
            <p className="text-sm leading-relaxed">&gt; {eventConfig.speaker.bio}</p>
          </div>
        </section>

        <section className="mb-12">
          <p className="text-sm mb-2 opacity-70">root@webinova:~# ls -l /target_audience</p>
          <div className="border border-[#00ff00]/30 p-4 font-mono text-sm">
            {eventConfig.audience?.blocks?.map((block: any, idx: number) => (
              <div key={idx}>drwxr-xr-x 2 root root 4096 {block.label}</div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <p className="text-sm mb-2 opacity-70">root@webinova:~# cat /outcomes.md</p>
          <div className="border border-[#00ff00]/30 p-4">
            <ul className="list-none">
              {eventConfig.outcomes?.map((item: any, idx: number) => (
                <li
                  key={idx}
                  className="mb-2 before:content-['*'] before:mr-2 before:text-[#00ff00]"
                >
                  - {item.text}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <p className="text-sm mb-2 opacity-70">root@webinova:~# getent passwd | grep organizer</p>
          <div className="border border-[#00ff00]/30 p-4">
            <p className="text-sm mb-2">
              organizer:x:1001:1001:{eventConfig.organizer.name}, {eventConfig.organizer.role}
              :/home/organizer:/bin/bash
            </p>
          </div>
        </section>

        <section className="mb-12">
          <p className="text-sm mb-2 opacity-70">root@webinova:~# tail -f /var/log/timeline.log</p>
          <div className="border border-[#00ff00]/30 p-4 bg-[#001100]">
            {eventConfig.timeline.map((item, idx) => (
              <div key={idx} className="flex gap-4 mb-2">
                <span className="opacity-50">[{item.time}]</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <p className="text-sm mb-2 opacity-70">root@webinova:~# man faq</p>
          <div className="border border-[#00ff00]/30 p-4">
            {eventConfig.faq.map((q, idx) => (
              <div key={idx} className="mb-6">
                <p className="font-bold uppercase mb-1">Q: {q.question}</p>
                <p className="text-sm opacity-80">A: {q.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="register" className="mb-8">
          <p className="text-sm mb-2 opacity-70">root@webinova:~# execute register_user.bin</p>
          <div className="border-2 border-[#00ff00] p-4 sm:p-8 bg-[#001100]">
            <h2 className="text-2xl font-bold mb-6 uppercase blink_me">_REGISTER_NOW</h2>
            <RegistrationForm />
          </div>
        </section>

        <section className="mb-12 text-center">
          <p className="text-sm mb-2 opacity-70">root@webinova:~# echo $FINAL_MSG</p>
          <h2 className="text-2xl font-bold uppercase mb-2">&gt; {eventConfig.finalCta.heading}</h2>
          <p className="opacity-80">{eventConfig.finalCta.message}</p>
        </section>

        <footer className="mt-12 pt-4 border-t-2 border-[#00ff00]/30 text-center text-xs opacity-50 flex justify-between">
          <span>CONTACT: {eventConfig.contact.email}</span>
          <span>SYSTEM_HALTED // {eventConfig.copyright}</span>
        </footer>
      </div>
    </div>
  );
}
