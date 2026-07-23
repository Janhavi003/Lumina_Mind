import { createFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";
import { useMemo } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useLumora } from "@/lib/lumora-context";
import { isoDaysAgo } from "@/lib/dates";
import { EMOTION_WHEEL } from "@/lib/constants";
import { Disclaimer } from "@/components/shared/Disclaimer";

export const Route = createFileRoute("/app/insights")({
  component: InsightsPage,
});

function InsightsPage() {
  const { state } = useLumora();

  const days = Array.from({ length: 14 }, (_, i) => isoDaysAgo(13 - i));
  const trendData = days.map((d) => {
    const c = state.checkIns.find((x) => x.date === d);
    return {
      date: format(new Date(d), "d MMM"),
      mood: c?.mood ?? null,
      stress: c?.stress ?? null,
      energy: c?.energy ?? null,
      focus: c?.focus ?? null,
      sleep: c?.sleepHours ?? null,
    };
  });

  const habitBar = useMemo(() => {
    return state.habits.slice(0, 8).map((h) => {
      const done = days.filter((d) =>
        state.habitLogs.some((l) => l.habitId === h.id && l.date === d && l.completed),
      ).length;
      return { name: h.name, done, color: `var(--color-${h.color})` };
    });
  }, [state.habits, state.habitLogs, days]);

  const emotionPie = useMemo(() => {
    const counts = new Map<string, number>();
    state.checkIns.forEach((c) => {
      if (c.emotionCategory)
        counts.set(c.emotionCategory, (counts.get(c.emotionCategory) ?? 0) + 1);
    });
    return EMOTION_WHEEL.filter((c) => counts.has(c.category)).map((c) => ({
      name: c.category,
      value: counts.get(c.category) ?? 0,
      color: `var(--color-${c.color})`,
    }));
  }, [state.checkIns]);

  const journalByWeekday = useMemo(() => {
    const days2 = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const arr = days2.map((d) => ({ day: d, count: 0 }));
    state.journal.forEach((j) => {
      const idx = (new Date(j.createdAt).getDay() + 6) % 7;
      arr[idx].count++;
    });
    return arr;
  }, [state.journal]);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">Insights</p>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">
          Gentle patterns.
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Observations only, never diagnoses. Notice, don't judge.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Mood, energy & focus (14 days)" tone="primary">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={trendData}>
              <XAxis
                dataKey="date"
                stroke="var(--color-muted-foreground)"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                domain={[0, 10]}
                stroke="var(--color-muted-foreground)"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip contentStyle={tooltipStyle} />
              <Line
                type="monotone"
                dataKey="mood"
                stroke="var(--color-primary)"
                strokeWidth={2}
                dot={false}
                connectNulls
              />
              <Line
                type="monotone"
                dataKey="energy"
                stroke="var(--color-emerald)"
                strokeWidth={2}
                dot={false}
                connectNulls
              />
              <Line
                type="monotone"
                dataKey="focus"
                stroke="var(--color-teal)"
                strokeWidth={2}
                dot={false}
                connectNulls
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Stress trend" tone="rose">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="stressG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-rose)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--color-rose)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                stroke="var(--color-muted-foreground)"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                domain={[0, 10]}
                stroke="var(--color-muted-foreground)"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip contentStyle={tooltipStyle} />
              <Area
                type="monotone"
                dataKey="stress"
                stroke="var(--color-rose)"
                strokeWidth={2}
                fill="url(#stressG)"
                connectNulls
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Sleep hours" tone="lavender">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="sleepG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-lavender)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--color-lavender)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                stroke="var(--color-muted-foreground)"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                domain={[0, 12]}
                stroke="var(--color-muted-foreground)"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip contentStyle={tooltipStyle} />
              <Area
                type="monotone"
                dataKey="sleep"
                stroke="var(--color-lavender)"
                strokeWidth={2}
                fill="url(#sleepG)"
                connectNulls
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Habit completion (14 days)" tone="teal">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={habitBar} layout="vertical" margin={{ left: 20 }}>
              <XAxis type="number" hide domain={[0, 14]} />
              <YAxis
                type="category"
                dataKey="name"
                stroke="var(--color-muted-foreground)"
                fontSize={10}
                width={110}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="done" radius={[6, 6, 6, 6]}>
                {habitBar.map((h, i) => (
                  <Cell key={i} fill={h.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Emotion distribution" tone="lavender">
          {emotionPie.length ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={emotionPie}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  innerRadius={40}
                  paddingAngle={3}
                >
                  {emotionPie.map((e, i) => (
                    <Cell key={i} fill={e.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <Empty>Log a few check-ins with emotions to see this.</Empty>
          )}
        </Card>

        <Card title="Journaling by weekday" tone="amber">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={journalByWeekday}>
              <XAxis
                dataKey="day"
                stroke="var(--color-muted-foreground)"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="var(--color-muted-foreground)"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="count" fill="var(--color-amber)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Disclaimer />
    </div>
  );
}

const tooltipStyle: React.CSSProperties = {
  background: "var(--color-card)",
  border: "1px solid var(--color-border)",
  borderRadius: 12,
  fontSize: 12,
};

function Card({
  title,
  tone,
  children,
}: {
  title: string;
  tone: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass rounded-3xl p-5">
      <div className="mb-2 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full" style={{ background: `var(--color-${tone})` }} />
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-55 place-items-center rounded-2xl border border-dashed border-border/60 text-sm text-muted-foreground">
      {children}
    </div>
  );
}
