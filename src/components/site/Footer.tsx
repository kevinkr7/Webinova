import { useEventConfig } from "@/context/EventConfigContext";
import { Link } from "@tanstack/react-router";

export function Footer() {
  const eventConfig = useEventConfig();
  return (
    <footer className="bg-ink text-paper">
      <div className="display border-b-4 border-paper px-4 py-8 text-[13vw] leading-[0.85] sm:px-6">
        CODING
        <br />
        DEMYSTIFIED
      </div>

      <div className="grid border-b-4 border-paper sm:grid-cols-3">
        <div className="label-mono border-b-4 border-paper px-4 py-4 sm:border-b-0 sm:border-r-4 sm:px-6">
          {eventConfig.organization}
        </div>
        <a
          href={`mailto:${eventConfig.contact.email}`}
          className="label-mono border-b-4 border-paper px-4 py-4 hover:bg-accent hover:text-accent-foreground sm:border-b-0 sm:border-r-4 sm:px-6"
        >
          {eventConfig.contact.email}
        </a>
        <div className="flex flex-wrap">
          {eventConfig.contact.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="label-mono border-r-4 border-paper px-4 py-4 last:border-r-0 hover:bg-accent hover:text-accent-foreground"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="label-mono">{eventConfig.copyright}</div>
        <Link
          to="/admin"
          className="label-mono border-2 border-paper px-4 py-1 hover:bg-paper hover:text-ink transition-colors"
        >
          ADMIN
        </Link>
      </div>
    </footer>
  );
}
