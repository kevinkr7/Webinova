import { useState, useEffect, type FormEvent } from "react";
import { z } from "zod";
import { useEventConfig } from "@/context/EventConfigContext";
import { registerParticipantFn } from "@/actions/register";

const registrationSchema = z.object({
  fullName: z.string().trim().min(2, "ENTER YOUR FULL NAME").max(100, "TOO LONG (MAX 100)"),
  email: z.string().trim().email("ENTER A VALID EMAIL").max(255, "TOO LONG (MAX 255)"),
  registerNumber: z.string().trim().min(2, "ENTER YOUR REGISTER NUMBER").max(50, "TOO LONG"),
  year: z.string().trim().min(1, "SELECT YOUR YEAR"),
  department: z.string().trim().min(2, "ENTER YOUR DEPARTMENT").max(100, "TOO LONG"),
  college: z.string().trim().min(2, "ENTER YOUR COLLEGE").max(150, "TOO LONG"),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;

type Errors = Partial<Record<keyof RegistrationInput | "root", string>>;

async function submitRegistration(data: RegistrationInput): Promise<void> {
  await registerParticipantFn({ data });
}

const fields = [
  { name: "fullName", label: "FULL NAME", type: "text", autoComplete: "name" },
  { name: "email", label: "EMAIL", type: "email", autoComplete: "email" },
  { name: "registerNumber", label: "REGISTER NUMBER / STUDENT ID", type: "text" },
  { name: "department", label: "DEPARTMENT", type: "text" },
  { name: "college", label: "COLLEGE", type: "text" },
] as const;

export function RegistrationForm() {
  const eventConfig = useEventConfig();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "redundant">("idle");

  useEffect(() => {
    if (status === "done" || status === "redundant") {
      const timer = setTimeout(() => {
        setStatus("idle");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const raw = Object.fromEntries(fd.entries()) as Record<string, string>;
    const parsed = registrationSchema.safeParse(raw);

    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof RegistrationInput;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    setErrors({});
    setStatus("sending");
    try {
      await submitRegistration(parsed.data);
      setStatus("done");
      form.reset();
    } catch (err: any) {
      if (err?.code === "23505" || err?.message === "Duplicate email") {
        setStatus("redundant");
      } else {
        const message =
          err instanceof Error ? err.message : "Failed to register. Please try again.";
        setErrors({ root: message });
        setStatus("idle");
      }
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid md:grid-cols-2">
      {fields.map((f, i) => (
        <div
          key={f.name}
          className={["border-b-4 border-ink p-4 sm:p-6", i % 2 === 0 ? "md:border-r-4" : ""].join(
            " ",
          )}
        >
          <label htmlFor={f.name} className="label-mono block">
            {f.label}
          </label>
          <input
            id={f.name}
            name={f.name}
            type={f.type}
            autoComplete={"autoComplete" in f ? f.autoComplete : undefined}
            aria-invalid={Boolean(errors[f.name])}
            aria-describedby={errors[f.name] ? `${f.name}-error` : undefined}
            className="brut-input mt-3"
          />
          {errors[f.name] ? (
            <p id={`${f.name}-error`} className="label-mono mt-2 text-accent">
              ! {errors[f.name]}
            </p>
          ) : null}
        </div>
      ))}

      <div className="border-b-4 border-ink p-4 sm:p-6 md:border-r-4">
        <label htmlFor="year" className="label-mono block">
          YEAR
        </label>
        <select
          id="year"
          name="year"
          defaultValue=""
          aria-invalid={Boolean(errors.year)}
          aria-describedby={errors.year ? "year-error" : undefined}
          className="brut-input mt-3"
        >
          <option value="">— SELECT —</option>
          {eventConfig.registration.years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        {errors.year ? (
          <p id="year-error" className="label-mono mt-2 text-accent">
            ! {errors.year}
          </p>
        ) : null}
      </div>

      <div className="md:col-span-2">
        {errors.root ? (
          <p className="label-mono mb-4 text-center text-accent">! ERROR: {errors.root}</p>
        ) : null}
        <button
          type="submit"
          disabled={status === "sending"}
          className={[
            "display group flex w-full items-center justify-between gap-6 border-b-4 border-ink px-4 py-8 text-3xl transition-colors duration-500 disabled:opacity-70 sm:px-6 sm:text-5xl",
            status === "idle" || status === "sending"
              ? "bg-accent text-accent-foreground hover:bg-ink hover:text-paper"
              : "",
            status === "done" ? "bg-[#2ecc71] text-ink" : "",
            status === "redundant" ? "bg-[#f1c40f] text-ink" : "",
          ].join(" ")}
        >
          <span>
            {status === "sending"
              ? "SENDING…"
              : status === "done"
                ? "SUCCESS!"
                : status === "redundant"
                  ? "ALREADY REGISTERED!"
                  : "REGISTER"}
          </span>
          <span className="transition-transform duration-75 group-hover:translate-x-2">→</span>
        </button>
      </div>
    </form>
  );
}
