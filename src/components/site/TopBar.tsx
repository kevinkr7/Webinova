import { useEventConfig } from "@/context/EventConfigContext";
import { useScrollProgress } from "@/hooks/use-motion";

export function TopBar() {
  const eventConfig = useEventConfig();
  const progress = useScrollProgress();

  return (
    <header className="sticky top-0 z-50 border-b-4 border-ink bg-paper">
      <div className="grid grid-cols-2 divide-ink sm:grid-cols-3 sm:divide-x-4">
        <div className="label-mono col-span-2 border-b-4 border-ink px-3 py-2 sm:col-span-1 sm:border-b-0">
          {eventConfig.organization}
        </div>
        <div className="label-mono border-r-4 border-ink px-3 py-2 sm:border-r-0 sm:text-center">
          {eventConfig.seriesLabel}
        </div>
        <div className="label-mono bg-accent px-3 py-2 text-accent-foreground sm:text-right">
          {eventConfig.date}
        </div>
      </div>
      {/* scroll progress: hard bar, no easing */}
      <div
        aria-hidden
        className="h-1 origin-left bg-ink"
        style={{ transform: `scaleX(${progress})` }}
      />
    </header>
  );
}
