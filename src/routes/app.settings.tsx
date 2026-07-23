import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Download, Moon, Sun, SunMoon, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useLumora } from "@/lib/lumora-context";

export const Route = createFileRoute("/app/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const { state, updateSettings, exportData, wipe, signOut } = useLumora();
  const router = useRouter();

  function download() {
    const blob = new Blob([exportData()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `lumora-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Your data was exported.");
  }

  function nuke() {
    if (!confirm("This will erase every entry, habit, and preference on this device. Continue?"))
      return;
    wipe();
    signOut();
    toast("Everything cleared. Take care.");
    router.navigate({ to: "/" });
  }

  const themes = [
    { id: "light" as const, icon: Sun, label: "Light" },
    { id: "dark" as const, icon: Moon, label: "Dark" },
    { id: "system" as const, icon: SunMoon, label: "System" },
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">Settings</p>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">Preferences.</h1>
      </div>

      <section className="glass rounded-3xl p-6">
        <h2 className="text-sm font-semibold">Appearance</h2>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {themes.map((t) => {
            const active = state.settings.theme === t.id;
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => updateSettings({ theme: t.id })}
                className={`flex items-center justify-center gap-2 rounded-2xl border py-3 text-sm font-medium transition-all ${
                  active
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/60 hover:bg-muted"
                }`}
              >
                <Icon className="h-4 w-4" /> {t.label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="glass rounded-3xl p-6">
        <h2 className="text-sm font-semibold">Notifications</h2>
        <div className="mt-3 divide-y divide-border/60">
          {(
            [
              ["dailyCheckIn", "Daily check-in reminder"],
              ["habitReminder", "Habit nudges"],
              ["weeklyReflection", "Weekly reflection"],
              ["monthlyReflection", "Monthly reflection"],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="flex items-center justify-between py-3 text-sm">
              <span>{label}</span>
              <input
                type="checkbox"
                checked={state.settings.notifications[key]}
                onChange={(e) =>
                  updateSettings({
                    notifications: {
                      ...state.settings.notifications,
                      [key]: e.target.checked,
                    },
                  })
                }
                className="h-5 w-5 accent-primary"
              />
            </label>
          ))}
        </div>
      </section>

      <section className="glass rounded-3xl p-6">
        <h2 className="text-sm font-semibold">Your data</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Lumora keeps your entries on this device. You can take them with you anytime.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={download}
            className="inline-flex items-center gap-2 rounded-2xl border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            <Download className="h-4 w-4" /> Export data (JSON)
          </button>
          <button
            type="button"
            onClick={nuke}
            className="inline-flex items-center gap-2 rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/20"
          >
            <Trash2 className="h-4 w-4" /> Delete all data
          </button>
        </div>
      </section>
    </div>
  );
}
