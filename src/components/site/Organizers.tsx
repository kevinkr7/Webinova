import { useEventConfig } from "@/context/EventConfigContext";
import { SectionLabel } from "./primitives";
import { Reveal } from "./Reveal";
import { useParallax } from "@/hooks/use-motion";

type Person = {
  readonly heading: string;
  readonly photoUrl: string;
  readonly name: string;
  readonly role: string;
  readonly links: readonly { readonly label: string; readonly href: string }[];
};

function PersonBlock({ person }: { person: Person }) {
  const photoRef = useParallax<HTMLDivElement>(-0.04);

  return (
    <div className="border-ink lg:border-r-4 last:lg:border-r-0">
      <div className="border-b-4 border-ink">
        <div ref={photoRef} className="will-change-transform">
          {person.photoUrl ? (
            <img
              src={person.photoUrl}
              alt={`Photo of ${person.name}`}
              loading="lazy"
              className="aspect-square w-full object-cover grayscale transition-[filter] duration-200 hover:grayscale-0"
            />
          ) : (
            <div className="label-mono flex aspect-square w-full items-center justify-center bg-secondary text-center text-muted-foreground">
              [{person.heading.replace("ED BY", "ER")} PHOTO]
            </div>
          )}
        </div>
      </div>

      <Reveal from="up">
        <div className="display border-b-4 border-ink px-4 py-5 text-2xl sm:px-6 sm:text-3xl lg:text-4xl">
          {person.name}
        </div>
      </Reveal>

      <div className="label-mono border-b-4 border-ink bg-accent px-4 py-3 text-accent-foreground sm:px-6">
        {person.role}
      </div>

      <div className="flex flex-wrap">
        {person.links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="label-mono border-b-4 border-r-4 border-ink px-4 py-3 transition-colors duration-75 hover:bg-ink hover:text-paper sm:border-b-0"
          >
            {l.label} ↗
          </a>
        ))}
      </div>
    </div>
  );
}

export function Organizers() {
  const eventConfig = useEventConfig();
  const { organizer, coOrganizer } = eventConfig;

  return (
    <section className="overflow-hidden border-b-4 border-ink">
      <SectionLabel>
        <span>06</span>
        <span>/</span>
        <span>TEAM</span>
      </SectionLabel>

      <div className="grid lg:grid-cols-2">
        <PersonBlock person={organizer} />
        <PersonBlock person={coOrganizer} />
      </div>
    </section>
  );
}
