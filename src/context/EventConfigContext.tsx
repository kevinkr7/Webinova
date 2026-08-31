import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { eventConfig as fallbackConfig, type EventConfig } from "@/config/event";

const EventConfigContext = createContext<EventConfig>(fallbackConfig);

export function EventConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<EventConfig>(fallbackConfig);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchConfig() {
      try {
        const { data, error } = await supabase
          .from("webinar_settings")
          .select("config")
          .limit(1)
          .maybeSingle();

        if (data && data.config) {
          // Deep merge or spread? A simple spread covers top level,
          // but let's just use the fetched config, falling back to original for completely missing sections.
          setConfig(data.config as EventConfig);
        }
      } catch (e) {
        console.error("Failed to fetch event config", e);
      } finally {
        setLoading(false);
      }
    }
    fetchConfig();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-paper text-ink flex items-center justify-center font-mono">
        <p className="font-bold uppercase tracking-widest animate-pulse">INITIALIZING WEBINAR...</p>
      </div>
    );
  }

  return <EventConfigContext.Provider value={config}>{children}</EventConfigContext.Provider>;
}

export function useEventConfig() {
  return useContext(EventConfigContext);
}
