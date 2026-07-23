import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { useLumora } from "@/lib/lumora-context";

export const Route = createFileRoute("/app/profile")({
  component: ProfilePage,
});

const AVATAR_COLORS = ["primary", "teal", "lavender", "amber", "rose", "emerald", "sky"];
const YEARS = ["1st year", "2nd year", "3rd year", "4th year", "Postgrad", "Other"];

function ProfilePage() {
  const { state, updateProfile } = useLumora();
  const [form, setForm] = useState(state.profile);

  function save() {
    updateProfile(form);
    toast.success("Profile updated");
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">Profile</p>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">This is you.</h1>
      </div>

      <section className="glass space-y-6 rounded-3xl p-6">
        <div className="flex items-center gap-4">
          <div
            className="grid h-16 w-16 place-items-center rounded-2xl text-lg font-semibold text-primary-foreground"
            style={{ background: `var(--color-${form.avatarColor || "primary"})` }}
          >
            {(form.name || form.email || "L").slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="text-sm font-semibold">{form.name || "Add your name"}</div>
            <div className="text-xs text-muted-foreground">{form.email}</div>
          </div>
        </div>

        <div>
          <div className="mb-2 text-xs text-muted-foreground">Avatar color</div>
          <div className="flex flex-wrap gap-2">
            {AVATAR_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setForm((f) => ({ ...f, avatarColor: c }))}
                aria-label={c}
                className={`h-9 w-9 rounded-full border-2 ${form.avatarColor === c ? "border-foreground" : "border-transparent"}`}
                style={{ background: `var(--color-${c})` }}
              />
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Name">
            <input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="input"
            />
          </Field>
          <Field label="University">
            <input
              value={form.university ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, university: e.target.value }))}
              className="input"
              placeholder="e.g. King's College London"
            />
          </Field>
          <Field label="Course">
            <input
              value={form.course ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, course: e.target.value }))}
              className="input"
              placeholder="e.g. Psychology"
            />
          </Field>
          <Field label="Year">
            <select
              value={form.year ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
              className="input"
            >
              <option value="">Select year</option>
              {YEARS.map((y) => (
                <option key={y}>{y}</option>
              ))}
            </select>
          </Field>
          <Field label="Timezone" full>
            <input
              value={form.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone}
              onChange={(e) => setForm((f) => ({ ...f, timezone: e.target.value }))}
              className="input"
            />
          </Field>
          <Field label="Bio" full>
            <textarea
              rows={3}
              value={form.bio ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
              className="input resize-none"
              placeholder="One line about you (optional)"
            />
          </Field>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={save}
            className="rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Save changes
          </button>
        </div>
      </section>

      <style>{`.input{height:2.75rem;width:100%;border-radius:0.75rem;border:1px solid var(--color-input);background:var(--color-background);padding:0 0.75rem;font-size:0.875rem;outline:none;}
      .input:focus{box-shadow:0 0 0 3px color-mix(in oklab, var(--color-primary) 30%, transparent);}
      textarea.input{padding:0.75rem;height:auto;}`}</style>
    </div>
  );
}

function Field({
  label,
  full,
  children,
}: {
  label: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${full ? "md:col-span-2" : ""}`}>
      <div className="mb-1 text-xs font-medium text-muted-foreground">{label}</div>
      {children}
    </label>
  );
}
