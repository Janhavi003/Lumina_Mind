import { createFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useLumora } from "@/lib/lumora-context";
import { todayISO, isoDaysAgo } from "@/lib/dates";

export const Route = createFileRoute("/app/habits")({
  component: HabitsPage,
});

const COLOR_CHOICES = ["primary", "teal", "lavender", "amber", "rose", "emerald", "sky"];
const ICON_CHOICES = ["🌱", "💧", "🏃", "📖", "🧘", "🚶", "✍️", "🌿", "☀️", "🌙", "🥗", "💤"];

function HabitsPage() {
  const { state, addHabit, deleteHabit, toggleHabitLog } = useLumora();
  const today = todayISO();
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("🌱");
  const [color, setColor] = useState("primary");

  const last7 = Array.from({ length: 7 }, (_, i) => isoDaysAgo(6 - i));

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Habits</p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">
            Small, kind, daily.
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Streaks are optional. Consistency is a gift, not a debt.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setAdding(true)}
          className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-transform"
        >
          <Plus className="h-4 w-4" /> New habit
        </button>
      </div>

      {adding && (
        <div className="glass space-y-4 rounded-3xl p-6">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Habit name (e.g., 10-minute walk)"
            className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
          />
          <div>
            <div className="mb-2 text-xs text-muted-foreground">Icon</div>
            <div className="flex flex-wrap gap-2">
              {ICON_CHOICES.map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIcon(i)}
                  className={`grid h-10 w-10 place-items-center rounded-xl border text-lg ${
                    icon === i ? "border-primary bg-primary/10" : "border-border/60 hover:bg-muted"
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-2 text-xs text-muted-foreground">Color</div>
            <div className="flex flex-wrap gap-2">
              {COLOR_CHOICES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  aria-label={c}
                  className={`h-8 w-8 rounded-full border-2 ${color === c ? "border-foreground" : "border-transparent"}`}
                  style={{ background: `var(--color-${c})` }}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setAdding(false)}
              className="rounded-2xl border border-border px-4 py-2 text-sm hover:bg-muted"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!name.trim()}
              onClick={() => {
                addHabit({ name: name.trim(), icon, color });
                setName("");
                setAdding(false);
                toast.success("Habit added");
              }}
              className="rounded-2xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-40"
            >
              Add
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-3">
        {state.habits.map((h) => {
          const doneToday = state.habitLogs.some(
            (l) => l.habitId === h.id && l.date === today && l.completed,
          );
          const weekMap = new Map(
            state.habitLogs
              .filter((l) => l.habitId === h.id)
              .map((l) => [l.date, l.completed] as const),
          );
          const weekDone = last7.filter((d) => weekMap.get(d)).length;
          return (
            <div
              key={h.id}
              className="glass flex items-center gap-4 rounded-2xl p-4 transition-colors hover:bg-card"
            >
              <div
                className="grid h-12 w-12 place-items-center rounded-2xl text-2xl"
                style={{
                  background: `color-mix(in oklab, var(--color-${h.color}) 18%, transparent)`,
                }}
              >
                {h.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate font-medium">{h.name}</div>
                <div className="mt-1 flex items-center gap-1">
                  {last7.map((d) => (
                    <div
                      key={d}
                      title={format(new Date(d), "EEE")}
                      className="h-2 w-6 rounded-full"
                      style={{
                        background: weekMap.get(d)
                          ? `var(--color-${h.color})`
                          : "color-mix(in oklab, var(--color-muted-foreground) 20%, transparent)",
                      }}
                    />
                  ))}
                  <span className="ml-2 text-xs text-muted-foreground">{weekDone}/7 this week</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => toggleHabitLog(h.id, today)}
                aria-pressed={doneToday}
                className={`grid h-11 w-11 place-items-center rounded-2xl transition-transform hover:scale-105 ${
                  doneToday
                    ? "bg-emerald text-white"
                    : "border border-border/70 bg-card text-muted-foreground"
                }`}
              >
                {doneToday ? "✓" : "○"}
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteHabit(h.id);
                  toast("Habit removed");
                }}
                className="grid h-9 w-9 place-items-center rounded-xl text-muted-foreground hover:bg-muted hover:text-destructive"
                aria-label={`Delete ${h.name}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
