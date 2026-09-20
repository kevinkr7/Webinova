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

function PersonBlock({ person, isLast }: { person: Person; isLast?: boolean }) {
  const photoRef = useParallax<HTMLDivElement>(-0.04);

  return (
    <div className={`grid md:grid-cols-[minmax(0,200px)_1fr] xl:grid-cols-[minmax(0,240px)_1fr] ${!isLast ? 'border-b-4 lg:border-b-0 lg:border-r-4 border-ink' : ''}`}>
      <div className="border-ink md:border-r-4 border-b-4 md:border-b-0">
        <div ref={photoRef} className="will-change-transform h-full">
          {person.photoUrl ? (
            <img
              src={person.photoUrl}
              alt={`Photo of ${person.name}`}
              loading="lazy"
              className="aspect-square md:aspect-auto h-full w-full object-cover grayscale transition-[filter] duration-200 hover:grayscale-0"
            />
          ) : (
            <div className="label-mono flex aspect-square md:aspect-auto h-full w-full items-center justify-center bg-secondary text-center text-muted-foreground p-4">
              [{person.heading.replace("ED BY", "ER")} PHOTO]
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="label-mono border-b-4 border-ink bg-accent px-4 py-2 text-sm text-accent-foreground sm:px-6">
          {person.heading}
        </div>
        <Reveal from="right">
          <div className="display border-b-4 border-ink px-4 py-5 text-3xl sm:px-6 sm:text-4xl">
            {person.name}
          </div>
        </Reveal>
        <div className="label-mono border-b-4 border-ink px-4 py-4 sm:px-6 flex-1">
          {person.role}
        </div>
        <div className="flex flex-wrap">
          {person.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="label-mono border-r-4 border-ink px-4 py-3 transition-colors duration-75 hover:bg-ink hover:text-paper last:border-r-0"
            >
              {l.label} ↗
            </a>
          ))}
        </div>
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
        <PersonBlock person={organizer} isLast={!coOrganizer?.name || coOrganizer.name === "[CO-ORGANIZER NAME]"} />
        {coOrganizer?.name && coOrganizer.name !== "[CO-ORGANIZER NAME]" && (
          <PersonBlock person={coOrganizer} isLast={true} />
        )}
      </div>
    </section>
  );
}
