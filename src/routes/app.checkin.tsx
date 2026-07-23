import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { useLumora } from "@/lib/lumora-context";
import { todayISO } from "@/lib/dates";
import { EMOTION_WHEEL, MOOD_OPTIONS } from "@/lib/constants";
import type { MoodLevel } from "@/lib/types";

export const Route = createFileRoute("/app/checkin")({
  component: CheckInPage,
});

function Slider({
  label,
  value,
  onChange,
  min = 0,
  max = 10,
  tone = "primary",
  suffix,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  tone?: string;
  suffix?: string;
}) {
  return (
    <div className="glass rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">{label}</label>
        <span className="text-sm font-semibold" style={{ color: `var(--color-${tone})` }}>
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="mt-3 w-full accent-primary"
        style={{ accentColor: `var(--color-${tone})` }}
      />
    </div>
  );
}

function CheckInPage() {
  const { addCheckIn, state } = useLumora();
  const today = todayISO();
  const existing = state.checkIns.find((c) => c.date === today);
  const router = useRouter();

  const [mood, setMood] = useState<MoodLevel>(existing?.mood ?? 3);
  const [category, setCategory] = useState<string | undefined>(existing?.emotionCategory);
  const [emotion, setEmotion] = useState<string | undefined>(existing?.emotion);
  const [intensity, setIntensity] = useState(existing?.intensity ?? 5);
  const [energy, setEnergy] = useState(existing?.energy ?? 5);
  const [stress, setStress] = useState(existing?.stress ?? 5);
  const [anxiety, setAnxiety] = useState(existing?.anxiety ?? 4);
  const [focus, setFocus] = useState(existing?.focus ?? 5);
  const [sleepQuality, setSleepQuality] = useState(existing?.sleepQuality ?? 6);
  const [sleepHours, setSleepHours] = useState(existing?.sleepHours ?? 7);
  const [social, setSocial] = useState(existing?.social ?? 5);
  const [activity, setActivity] = useState(existing?.activity ?? 3);
  const [water, setWater] = useState(existing?.water ?? 4);
  const [screenTime, setScreenTime] = useState(existing?.screenTime ?? 4);
  const [note, setNote] = useState(existing?.note ?? "");

  const activeCategory = EMOTION_WHEEL.find((c) => c.category === category);

  function save() {
    addCheckIn({
      date: today,
      mood,
      emotion,
      emotionCategory: category,
      intensity,
      energy,
      stress,
      anxiety,
      focus,
      sleepQuality,
      sleepHours,
      social,
      activity,
      water,
      screenTime,
      note: note.trim() || undefined,
    });
    toast.success("Check-in saved. Kind of you to notice.");
    router.navigate({ to: "/app/dashboard" });
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          Daily check-in
        </p>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">
          How are you today?
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Two minutes. Nothing you write here is graded.
        </p>
      </div>

      {/* Mood */}
      <section className="glass rounded-3xl p-6">
        <h2 className="text-sm font-semibold">Overall mood</h2>
        <div className="mt-4 grid grid-cols-5 gap-2">
          {MOOD_OPTIONS.map((m) => (
            <button
              key={m.level}
              type="button"
              onClick={() => setMood(m.level)}
              className={`flex flex-col items-center gap-1 rounded-2xl border p-3 transition-all ${
                mood === m.level
                  ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
                  : "border-border/60 bg-card hover:-translate-y-0.5"
              }`}
              aria-pressed={mood === m.level}
            >
              <span className="text-2xl" aria-hidden>
                {m.emoji}
              </span>
              <span className="text-xs font-medium">{m.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Emotion wheel */}
      <section className="glass rounded-3xl p-6">
        <h2 className="text-sm font-semibold">Name the feeling</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {EMOTION_WHEEL.map((c) => (
            <button
              key={c.category}
              type="button"
              onClick={() => {
                setCategory(c.category);
                setEmotion(undefined);
              }}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-all ${
                category === c.category
                  ? "border-transparent text-primary-foreground"
                  : "border-border/60 bg-card hover:bg-muted"
              }`}
              style={
                category === c.category ? { background: `var(--color-${c.color})` } : undefined
              }
            >
              <span aria-hidden>{c.emoji}</span> {c.category}
            </button>
          ))}
        </div>
        {activeCategory && (
          <div className="mt-4 flex flex-wrap gap-2">
            {activeCategory.emotions.map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => setEmotion(e)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                  emotion === e
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/60 bg-card hover:bg-muted"
                }`}
              >
                {e}
              </button>
            ))}
          </div>
        )}
        {emotion && (
          <div className="mt-4">
            <Slider
              label={`Intensity: ${emotion}`}
              value={intensity}
              onChange={setIntensity}
              min={1}
              tone={activeCategory?.color || "primary"}
            />
          </div>
        )}
      </section>

      {/* Sliders grid */}
      <section className="grid gap-4 md:grid-cols-2">
        <Slider label="Energy" value={energy} onChange={setEnergy} tone="emerald" />
        <Slider label="Stress" value={stress} onChange={setStress} tone="rose" />
        <Slider label="Anxiety" value={anxiety} onChange={setAnxiety} tone="lavender" />
        <Slider label="Focus" value={focus} onChange={setFocus} tone="primary" />
        <Slider
          label="Sleep quality"
          value={sleepQuality}
          onChange={setSleepQuality}
          tone="lavender"
        />
        <Slider
          label="Sleep hours"
          value={sleepHours}
          onChange={setSleepHours}
          min={0}
          max={12}
          tone="lavender"
          suffix="h"
        />
        <Slider label="Social connection" value={social} onChange={setSocial} tone="amber" />
        <Slider label="Physical activity" value={activity} onChange={setActivity} tone="emerald" />
        <Slider
          label="Water intake"
          value={water}
          onChange={setWater}
          min={0}
          max={12}
          tone="sky"
          suffix=" cups"
        />
        <Slider
          label="Screen time"
          value={screenTime}
          onChange={setScreenTime}
          min={0}
          max={16}
          tone="rose"
          suffix="h"
        />
      </section>

      {/* Note */}
      <section className="glass rounded-3xl p-6">
        <label htmlFor="note" className="text-sm font-semibold">
          Anything else on your mind?
        </label>
        <textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          maxLength={500}
          placeholder="Optional. One sentence is plenty."
          className="mt-3 w-full resize-none rounded-2xl border border-input bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
        />
      </section>

      <div className="flex flex-wrap justify-end gap-3">
        <button
          type="button"
          onClick={() => router.navigate({ to: "/app/dashboard" })}
          className="rounded-2xl border border-border px-5 py-3 text-sm font-medium hover:bg-muted"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={save}
          className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-transform"
        >
          <Check className="h-4 w-4" /> Save check-in
        </button>
      </div>
    </div>
  );
}
