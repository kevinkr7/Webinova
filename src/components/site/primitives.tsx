import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useEventConfig } from "@/context/EventConfigContext";

export function SectionLabel({ children }: { children: ReactNode }) {
  const eventConfig = useEventConfig();
  return (
    <div className="label-mono flex items-center gap-3 border-b-4 border-ink bg-ink px-4 py-2 text-paper">
      {children}
    </div>
  );
}

export function Rule({ className }: { className?: string }) {
  return <div className={cn("h-1 w-full bg-ink", className)} />;
}

/**
 * Primary call to action. Points at the on-page registration section until
 * `eventConfig.registrationUrl` is set, then links out automatically.
 */
export function RegisterButton({
  label = "REGISTER NOW",
  className,
  size = "lg",
}: {
  label?: string;
  className?: string;
  size?: "lg" | "xl";
}) {
  const eventConfig = useEventConfig();
  const href = eventConfig.registrationUrl || "#register";
  const external = Boolean(eventConfig.registrationUrl);

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={cn(
        "group inline-flex w-full items-center justify-between gap-6 border-4 border-ink bg-accent px-6 text-accent-foreground transition-[background-color,color,transform] duration-100",
        "hover:-translate-x-1 hover:-translate-y-1 hover:bg-ink hover:text-paper active:translate-x-[3px] active:translate-y-[3px]",
        size === "xl"
          ? "py-6 text-3xl sm:py-8 sm:text-5xl lg:text-6xl"
          : "py-4 text-xl sm:text-3xl",
        "display",
        className,
      )}
    >
      <span>{label}</span>
      <span className="transition-transform duration-75 group-hover:translate-x-2">→</span>
    </a>
  );
}
