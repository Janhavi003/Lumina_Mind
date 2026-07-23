import { createFileRoute, Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { ArrowRight, BookHeart, Flame, Heart, Sparkles } from "lucide-react";
import { useLumora } from "@/lib/lumora-context";
import { todayISO, computeStreak, isoDaysAgo } from "@/lib/dates";
import { MOOD_OPTIONS } from "@/lib/constants";
import { Disclaimer } from "@/components/shared/Disclaimer";

export const Route = createFileRoute("/app/dashboard")({
  component: Dashboard,
});

function Tile({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: string;
  hint?: string;
  tone: string;
}) {
  return (
    <div
      className="rounded-3xl border border-border/60 p-5"
      style={{
        background: `linear-gradient(160deg, color-mix(in oklab, var(--color-${tone}) 14%, var(--color-card)) 0%, var(--color-card) 100%)`,
      }}
    >
      <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      <div className="mt-2 font-display text-2xl font-semibold">{value}</div>
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
    </div>
  );
}

function Dashboard() {
  const { state } = useLumora();
  const today = todayISO();
  const streak = computeStreak(state.checkIns.map((c) => c.date));
  const todayCheckIn = state.checkIns.find((c) => c.date === today);
  const recentJournal = state.journal.slice(0, 3);

  const last7 = Array.from({ length: 7 }, (_, i) => isoDaysAgo(6 - i));
  const habitsToday = state.habits.slice(0, 5);
  const doneToday = state.habitLogs.filter((l) => l.date === today && l.completed);
  const wellbeing = todayCheckIn
    ? Math.round(
        ((todayCheckIn.mood * 2 +
          todayCheckIn.energy +
          (10 - todayCheckIn.stress) +
          todayCheckIn.sleepQuality +
          todayCheckIn.focus) /
          40) *
          100,
      )
    : null;

  const mood = todayCheckIn ? MOOD_OPTIONS.find((m) => m.level === todayCheckIn.mood) : null;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            {format(new Date(), "EEEE, d MMMM")}
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            {greeting()}, {state.profile.name || "friend"}.
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {todayCheckIn
              ? "Your check-in for today is saved. Nice."
              : "How are you arriving today? A two-minute check-in helps."}
          </p>
        </div>
        <Link
          to="/app/checkin"
          className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-transform"
        >
          <Heart className="h-4 w-4" />
          {todayCheckIn ? "Edit today's check-in" : "Start today's check-in"}
        </Link>
      </div>

      {/* Bento */}
      <div className="grid gap-4 md:grid-cols-6 md:auto-rows-[minmax(120px,auto)]">
        {/* Streak */}
        <div
          className="rounded-3xl p-6 text-primary-foreground md:col-span-2"
          style={{ background: "linear-gradient(140deg, var(--color-amber), var(--color-rose))" }}
        >
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest opacity-90">
            <Flame className="h-4 w-4" /> Streak
          </div>
          <div className="mt-3 font-display text-5xl font-semibold">{streak}</div>
          <div className="mt-1 text-xs opacity-90">days of showing up</div>
        </div>

        {/* Mood */}
        <Tile
          label="Mood"
          value={mood ? `${mood.emoji} ${mood.label}` : "-"}
          hint={todayCheckIn ? "Logged today" : "Not logged yet"}
          tone="teal"
        />
        <Tile
          label="Energy"
          value={todayCheckIn ? `${todayCheckIn.energy}/10` : "-"}
          tone="emerald"
        />
        <Tile label="Stress" value={todayCheckIn ? `${todayCheckIn.stress}/10` : "-"} tone="rose" />
        <Tile
          label="Sleep"
          value={todayCheckIn ? `${todayCheckIn.sleepHours}h` : "-"}
          tone="lavender"
        />

        {/* Wellbeing score */}
        <div className="glass rounded-3xl p-6 md:col-span-3">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Wellbeing snapshot
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display text-5xl font-semibold text-primary">
              {wellbeing ?? "-"}
            </span>
            <span className="text-sm text-muted-foreground">/100</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {wellbeing != null
              ? "A gentle composite of today's mood, energy, sleep and stress. Not a diagnosis."
              : "Check in to see your snapshot."}
          </p>
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-linear-to-r from-primary via-teal to-emerald"
              style={{ width: `${wellbeing ?? 0}%` }}
            />
          </div>
        </div>

        {/* Habits */}
        <div className="glass rounded-3xl p-6 md:col-span-3">
          <div className="flex items-center justify-between">
            <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Today's habits
            </div>
            <Link to="/app/habits" className="text-xs font-medium text-primary hover:underline">
              Manage
            </Link>
          </div>
          <ul className="mt-3 divide-y divide-border/60">
            {habitsToday.map((h) => {
              const done = state.habitLogs.some(
                (l) => l.habitId === h.id && l.date === today && l.completed,
              );
              return (
                <li key={h.id} className="flex items-center gap-3 py-2.5">
                  <div
                    className="grid h-9 w-9 place-items-center rounded-xl text-lg"
                    style={{
                      background: `color-mix(in oklab, var(--color-${h.color}) 18%, transparent)`,
                    }}
                  >
                    {h.icon}
                  </div>
                  <div className="min-w-0 flex-1 truncate text-sm font-medium">{h.name}</div>
                  <div
                    className={`grid h-6 w-6 place-items-center rounded-full ${
                      done ? "bg-emerald text-white" : "border border-border"
                    }`}
                  >
                    {done && <span className="text-[10px]">✓</span>}
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="mt-3 text-xs text-muted-foreground">
            {doneToday.length}/{habitsToday.length} done today
          </div>
        </div>

        {/* Insight */}
        <div
          className="rounded-3xl p-6 text-primary-foreground md:col-span-4"
          style={{
            background: "linear-gradient(140deg, var(--color-primary), var(--color-lavender))",
          }}
        >
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest opacity-90">
            <Sparkles className="h-4 w-4" /> Gentle insight
          </div>
          <p className="mt-3 text-lg leading-snug">{insight(state)}</p>
          <Link
            to="/app/insights"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium hover:bg-white/25"
          >
            See patterns <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Recent journal */}
        <div className="glass rounded-3xl p-6 md:col-span-2">
          <div className="flex items-center justify-between">
            <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Recent reflection
            </div>
            <Link to="/app/journal" className="text-xs font-medium text-primary hover:underline">
              Open journal
            </Link>
          </div>
          {recentJournal.length ? (
            <ul className="mt-3 space-y-3">
              {recentJournal.map((j) => (
                <li key={j.id} className="rounded-2xl border border-border/60 bg-background/60 p-3">
                  <div className="text-xs text-muted-foreground">
                    {format(new Date(j.createdAt), "d MMM")}
                  </div>
                  <div className="mt-1 line-clamp-2 text-sm">
                    {j.title || j.content.slice(0, 80)}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-4 rounded-2xl border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
              <BookHeart className="mx-auto mb-2 h-5 w-5 opacity-60" />
              No entries yet. Write your first tonight.
            </div>
          )}
        </div>

        {/* Mood mini strip */}
        <div className="glass rounded-3xl p-6 md:col-span-6">
          <div className="flex items-center justify-between">
            <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Last 7 days
            </div>
            <Link to="/app/insights" className="text-xs font-medium text-primary hover:underline">
              Full insights
            </Link>
          </div>
          <div className="mt-4 flex items-end justify-between gap-2">
            {last7.map((d) => {
              const c = state.checkIns.find((x) => x.date === d);
              const h = c ? (c.mood / 5) * 100 : 8;
              return (
                <div key={d} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex h-24 w-full items-end">
                    <div
                      className="w-full rounded-t-xl bg-linear-to-t from-primary/60 to-teal/60"
                      style={{ height: `${h}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground">
                    {format(new Date(d), "EEEEE")}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Disclaimer />
    </div>
  );
}

function greeting() {
  const h = new Date().getHours();
  if (h < 5) return "Rest well";
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

function insight(state: ReturnType<typeof useLumora>["state"]) {
  const ci = state.checkIns;
  if (ci.length < 3)
    return "Log a few days and Lumora will start noticing gentle patterns for you.";
  const sleepy = ci.filter((c) => c.sleepHours >= 7);
  if (sleepy.length >= 2) {
    const avg = sleepy.reduce((s, c) => s + c.stress, 0) / sleepy.length;
    if (avg < 5)
      return "When you sleep more than 7 hours, your reported stress tends to be lower. Worth protecting tonight.";
  }
  const journaledDays = new Set(state.journal.map((j) => new Date(j.createdAt).getDay()));
  if (journaledDays.size && [...journaledDays].every((d) => d >= 1 && d <= 5)) {
    return "You journal most consistently on weekdays. Weekends might benefit from a softer nudge.";
  }
  return "Small, consistent check-ins compound into real self-knowledge. Nice work.";
}
