import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin")({
  component: AdminRoute,
});

function AdminRoute() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-paper text-ink flex items-center justify-center font-mono">
        <p className="font-bold uppercase tracking-widest animate-pulse">
          LOADING SECURE PORTAL...
        </p>
      </div>
    );
  }

  if (!session) {
    return <AdminLogin />;
  }

  return <AdminDashboard session={session} />;
}

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-paper text-ink flex items-center justify-center p-4 font-mono">
      <div className="border-4 border-ink p-8 w-full max-w-md bg-white shadow-[8px_8px_0_0_rgba(22,22,22,1)] relative">
        <Link to="/" className="absolute -top-12 left-0 font-bold uppercase text-sm hover:underline">
          &larr; Back to Website
        </Link>
        <h1 className="font-display text-4xl mb-6 uppercase tracking-tighter">Admin Portal</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="label-mono block mb-2">Email</label>
            <input
              type="email"
              className="brut-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="label-mono block mb-2">Password</label>
            <input
              type="password"
              className="brut-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <p className="text-accent font-mono text-sm font-bold bg-accent/10 p-2 border border-accent">
              {error}
            </p>
          )}
          <button type="submit" className="brut-btn mt-4 w-full justify-center" disabled={loading}>
            {loading ? "AUTHENTICATING..." : "LOGIN TO DASHBOARD"}
          </button>
        </form>
      </div>
    </div>
  );
}

function AdminDashboard({ session }: { session: any }) {
  const [activeTab, setActiveTab] = useState("registrations");

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  return (
    <div className="min-h-screen bg-paper text-ink font-mono flex flex-col md:flex-row">
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 border-b-4 md:border-b-0 md:border-r-4 border-ink p-6 flex flex-col gap-6 bg-white z-10">
        <div>
          <h2 className="font-display text-2xl uppercase">Demystified</h2>
          <p className="text-xs font-bold tracking-widest mt-1 opacity-70">ADMIN CONSOLE</p>
          <Link to="/" className="inline-block mt-4 text-sm font-bold uppercase border-b-2 border-ink hover:text-accent hover:border-accent transition-colors">
            &larr; Back to Website
          </Link>
        </div>
        <nav className="flex flex-col gap-2 flex-1 mt-8">
          <button
            onClick={() => setActiveTab("registrations")}
            className={`text-left px-4 py-3 border-2 border-transparent uppercase text-sm font-bold hover:border-ink transition-colors ${
              activeTab === "registrations" ? "bg-ink text-paper" : ""
            }`}
          >
            Registrations
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className={`text-left px-4 py-3 border-2 border-transparent uppercase text-sm font-bold hover:border-ink transition-colors ${
              activeTab === "notifications" ? "bg-ink text-paper" : ""
            }`}
          >
            Notifications
          </button>
          <button
            onClick={() => setActiveTab("certificates")}
            className={`text-left px-4 py-3 border-2 border-transparent uppercase text-sm font-bold hover:border-ink transition-colors ${
              activeTab === "certificates" ? "bg-ink text-paper" : ""
            }`}
          >
            Certificates
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`text-left px-4 py-3 border-2 border-transparent uppercase text-sm font-bold hover:border-ink transition-colors ${
              activeTab === "settings" ? "bg-ink text-paper" : ""
            }`}
          >
            Event Settings
          </button>
        </nav>
        <div className="mt-auto pt-8 border-t-4 border-ink">
          <p className="text-xs mb-4 opacity-70 truncate" title={session.user.email}>
            {session.user.email}
          </p>
          <button
            onClick={handleLogout}
            className="text-xs font-bold hover:text-accent uppercase transition-colors"
          >
            [ Log Out ]
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto relative">
        {activeTab === "registrations" && <RegistrationsTab />}
        {activeTab === "notifications" && <NotificationsTab />}
        {activeTab === "certificates" && <CertificatesTab />}
        {activeTab === "settings" && <ConfigurationTab />}
      </main>
    </div>
  );
}

function RegistrationsTab() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRegs() {
      // Fetch registrations. RLS policies must allow the admin user to read this table.
      const { data, error } = await supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) setRegistrations(data);
      if (error) console.error("Error fetching registrations:", error);

      setLoading(false);
    }
    fetchRegs();
  }, []);

  return (
    <div>
      <h1 className="font-display text-4xl uppercase mb-8">Registered Participants</h1>
      {loading ? (
        <p className="font-bold uppercase animate-pulse">LOADING DATABASE...</p>
      ) : (
        <div className="overflow-x-auto border-4 border-ink bg-white shadow-[8px_8px_0_0_rgba(22,22,22,1)]">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-ink text-paper uppercase text-xs tracking-wider">
                <th className="p-4 border-r border-paper/20">ID</th>
                <th className="p-4 border-r border-paper/20">Name</th>
                <th className="p-4 border-r border-paper/20">Email</th>
                <th className="p-4 border-r border-paper/20">Year / Dept</th>
                <th className="p-4">Email Status</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((r, i) => (
                <tr
                  key={r.id || i}
                  className="border-b-2 border-ink last:border-b-0 hover:bg-secondary transition-colors"
                >
                  <td className="p-4 border-r-2 border-ink text-xs font-bold">
                    {r.participantId || "N/A"}
                  </td>
                  <td className="p-4 border-r-2 border-ink font-bold uppercase">{r.fullName}</td>
                  <td className="p-4 border-r-2 border-ink text-sm">{r.email}</td>
                  <td className="p-4 border-r-2 border-ink text-sm uppercase">
                    {r.year} - {r.department}
                  </td>
                  <td className="p-4 text-sm">
                    <span
                      className={`px-3 py-1 uppercase text-[10px] font-bold border-2 ${
                        r.emailStatus === "sent"
                          ? "bg-[#d1fae5] border-[#065f46] text-[#065f46]"
                          : r.emailStatus === "failed"
                            ? "bg-[#fee2e2] border-[#991b1b] text-[#991b1b]"
                            : "bg-[#fef3c7] border-[#92400e] text-[#92400e]"
                      }`}
                    >
                      {r.emailStatus || "PENDING"}
                    </span>
                  </td>
                </tr>
              ))}
              {registrations.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center opacity-50 font-bold uppercase">
                    No registrations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function NotificationsTab() {
  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-4xl uppercase mb-8">Send Notification</h1>
      <div className="border-4 border-ink p-8 bg-white flex flex-col gap-6 shadow-[8px_8px_0_0_rgba(22,22,22,1)]">
        <p className="text-sm font-bold uppercase opacity-70 border-b-2 border-ink pb-4">
          Broadcast a mass email to all registered participants.
        </p>

        <div>
          <label className="label-mono block mb-2">Subject</label>
          <input
            type="text"
            className="brut-input"
            placeholder="e.g. Action Required: Microsoft Teams Link inside"
          />
        </div>

        <div>
          <label className="label-mono block mb-2">Message Body (HTML Supported)</label>
          <textarea
            className="brut-input min-h-[200px]"
            placeholder="Type your message here..."
          ></textarea>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4">
          <button
            className="brut-btn"
            onClick={() => alert("Backend integration required for mass sending.")}
          >
            BROADCAST NOW
          </button>
          <span className="text-xs font-bold uppercase opacity-50 max-w-[200px]">
            This action cannot be undone.
          </span>
        </div>
      </div>
    </div>
  );
}

function CertificatesTab() {
  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-4xl uppercase mb-8">Certificates</h1>
      <div className="border-4 border-ink p-8 bg-white flex flex-col gap-6 shadow-[8px_8px_0_0_rgba(22,22,22,1)]">
        <p className="text-sm font-bold uppercase opacity-70 border-b-2 border-ink pb-4">
          Generate and distribute certificates of participation.
        </p>

        <div className="bg-secondary border-2 border-ink p-4 mb-2">
          <p className="text-sm font-bold uppercase">Certificate Generation Engine</p>
          <p className="text-xs mt-2 opacity-80">
            This module will automatically merge Participant Names with your uploaded PDF template
            and dispatch them via email.
          </p>
        </div>

        <div>
          <label className="label-mono block mb-2">Upload Certificate Template (PDF)</label>
          <input
            type="file"
            className="brut-input bg-white cursor-pointer"
            accept="application/pdf"
          />
        </div>

        <div className="flex items-center gap-4 mt-4">
          <button
            className="brut-btn"
            onClick={() => alert("Backend integration required for certificate generation.")}
          >
            GENERATE & SEND ALL
          </button>
        </div>
      </div>
    </div>
  );
}

const Field = ({ label, value, onChange, isTextArea = false }: any) => (
  <div className="mb-4">
    <label className="label-mono block mb-1">{label}</label>
    {isTextArea ? (
      <textarea
        className="brut-input min-h-[100px]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    ) : (
      <input
        type="text"
        className="brut-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    )}
  </div>
);

function ConfigurationTab() {
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function fetchConfig() {
      const { data } = await supabase
        .from("webinar_settings")
        .select("config")
        .limit(1)
        .maybeSingle();
      if (data?.config) {
        setConfig(data.config);
      } else {
        import("@/config/event").then((mod) => {
          setConfig(mod.eventConfig);
        });
      }
      setLoading(false);
    }
    fetchConfig();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    try {
      const { error } = await supabase.from("webinar_settings").upsert({ id: 1, config });
      if (error) throw error;
      setMsg("Settings saved successfully! The live website has been updated.");
    } catch (err: any) {
      setMsg("Error: " + err.message);
    }
    setSaving(false);
  }

  if (loading) return <p className="font-bold uppercase animate-pulse">LOADING SETTINGS...</p>;
  if (!config) return <p>Failed to load settings.</p>;

  return (
    <div className="max-w-4xl pb-20">
      <h1 className="font-display text-4xl uppercase mb-8">Event Settings</h1>
      <form
        onSubmit={handleSave}
        className="border-4 border-ink p-8 bg-white flex flex-col gap-8 shadow-[8px_8px_0_0_rgba(22,22,22,1)]"
      >
        <section>
          <h2 className="text-xl font-bold uppercase border-b-4 border-ink pb-2 mb-4">
            Appearance
          </h2>
          <div className="mb-4">
            <label className="label-mono block mb-1">Landing Page Template</label>
            <select
              className="brut-input w-full bg-white"
              value={config.page?.templateId || "brutalist-poster"}
              onChange={(e) =>
                setConfig({ ...config, page: { ...config.page, templateId: e.target.value } })
              }
            >
              <option value="brutalist-poster">01 — Brutalist Poster (Current)</option>
              <option value="brutalist-grid">02 — Brutalist Grid</option>
              <option value="brutalist-terminal">03 — Brutalist Terminal</option>
              <option value="brutalist-editorial">04 — Brutalist Editorial</option>
              <option value="brutalist-raw">05 — Brutalist Raw</option>
            </select>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-bold uppercase border-b-4 border-ink pb-2 mb-4">
            Main Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field
              label="Event Name"
              value={config.name}
              onChange={(v: string) => setConfig({ ...config, name: v })}
            />
            <Field
              label="Organization"
              value={config.organization}
              onChange={(v: string) => setConfig({ ...config, organization: v })}
            />
            <Field
              label="Edition Label"
              value={config.editionLabel}
              onChange={(v: string) => setConfig({ ...config, editionLabel: v })}
            />
            <Field
              label="Series Label"
              value={config.seriesLabel}
              onChange={(v: string) => setConfig({ ...config, seriesLabel: v })}
            />
            <Field
              label="Date"
              value={config.date}
              onChange={(v: string) => setConfig({ ...config, date: v })}
            />
            <Field
              label="Time"
              value={config.time}
              onChange={(v: string) => setConfig({ ...config, time: v })}
            />
            <Field
              label="Mode"
              value={config.mode}
              onChange={(v: string) => setConfig({ ...config, mode: v })}
            />
            <Field
              label="Venue"
              value={config.venue}
              onChange={(v: string) => setConfig({ ...config, venue: v })}
            />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold uppercase border-b-4 border-ink pb-2 mb-4">
            Hero & Why Section
          </h2>
          <Field
            label="Audience Line"
            value={config.audienceLine}
            onChange={(v: string) => setConfig({ ...config, audienceLine: v })}
          />
          <Field
            label="Why Heading"
            value={config.why.heading}
            onChange={(v: string) => setConfig({ ...config, why: { ...config.why, heading: v } })}
          />
          <Field
            label="Why Body"
            isTextArea
            value={config.why.body}
            onChange={(v: string) => setConfig({ ...config, why: { ...config.why, body: v } })}
          />
        </section>

        <section>
          <h2 className="text-xl font-bold uppercase border-b-4 border-ink pb-2 mb-4">
            People (Speaker & Organizer)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field
              label="Speaker Name"
              value={config.speaker.name}
              onChange={(v: string) =>
                setConfig({ ...config, speaker: { ...config.speaker, name: v } })
              }
            />
            <Field
              label="Speaker Role"
              value={config.speaker.role}
              onChange={(v: string) =>
                setConfig({ ...config, speaker: { ...config.speaker, role: v } })
              }
            />
            <Field
              label="Organizer Name"
              value={config.organizer.name}
              onChange={(v: string) =>
                setConfig({ ...config, organizer: { ...config.organizer, name: v } })
              }
            />
            <Field
              label="Organizer Role"
              value={config.organizer.role}
              onChange={(v: string) =>
                setConfig({ ...config, organizer: { ...config.organizer, role: v } })
              }
            />
          </div>
          <Field
            label="Speaker Bio"
            isTextArea
            value={config.speaker.bio}
            onChange={(v: string) =>
              setConfig({ ...config, speaker: { ...config.speaker, bio: v } })
            }
          />
        </section>

        <section>
          <h2 className="text-xl font-bold uppercase border-b-4 border-ink pb-2 mb-4">
            Registration & Footer
          </h2>
          <Field
            label="Registration Heading"
            value={config.registration.heading}
            onChange={(v: string) =>
              setConfig({ ...config, registration: { ...config.registration, heading: v } })
            }
          />
          <Field
            label="Registration Message"
            isTextArea
            value={config.registration.message}
            onChange={(v: string) =>
              setConfig({ ...config, registration: { ...config.registration, message: v } })
            }
          />
          <Field
            label="Contact Email"
            value={config.contact.email}
            onChange={(v: string) =>
              setConfig({ ...config, contact: { ...config.contact, email: v } })
            }
          />
          <Field
            label="Copyright Text"
            value={config.copyright}
            onChange={(v: string) => setConfig({ ...config, copyright: v })}
          />
        </section>

        {msg && (
          <p
            className={`text-sm font-bold p-4 border-4 ${msg.startsWith("Error") ? "bg-red-100 text-red-800 border-red-800" : "bg-green-100 text-green-800 border-green-800"}`}
          >
            {msg}
          </p>
        )}

        <button type="submit" className="brut-btn" disabled={saving}>
          {saving ? "SAVING..." : "SAVE ALL SETTINGS"}
        </button>
      </form>
    </div>
  );
}
