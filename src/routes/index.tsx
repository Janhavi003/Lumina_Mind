import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookHeart,
  Compass,
  Heart,
  LineChart,
  Sparkles,
  BookOpen,
  ShieldCheck,
} from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { Disclaimer } from "@/components/shared/Disclaimer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ property: "og:title", content: "Lumora: Understand Yourself. Grow Every Day." }],
  }),
  component: Landing,
});

const FEATURES = [
  {
    icon: Heart,
    tone: "rose",
    title: "Daily check-ins",
    body: "A gentle two-minute ritual for mood, energy, sleep and stress.",
  },
  {
    icon: BookHeart,
    tone: "lavender",
    title: "Reflection journal",
    body: "Guided prompts and a distraction-free writing space.",
  },
  {
    icon: Sparkles,
    tone: "amber",
    title: "Habits that stick",
    body: "Small daily actions with soft streaks and no guilt.",
  },
  {
    icon: Compass,
    tone: "teal",
    title: "Emotion wheel",
    body: "Name what you feel with a beautiful, tactile chooser.",
  },
  {
    icon: LineChart,
    tone: "primary",
    title: "Gentle insights",
    body: "Non-medical patterns you can actually act on.",
  },
  {
    icon: BookOpen,
    tone: "emerald",
    title: "Wellness library",
    body: "Short, evidence-based reads for stress, sleep and study.",
  },
];

const TESTIMONIALS = [
  {
    name: "Maya",
    role: "3rd year Psych",
    quote: "It's the first app that doesn't try to fix me. I just check in, and that's enough.",
  },
  {
    name: "Ade",
    role: "MSc Data Science",
    quote: "The emotion wheel made me realise I was 'anxious', not 'lazy'. Big difference.",
  },
  {
    name: "Rin",
    role: "1st year Design",
    quote: "My streak is 47 days. It feels less like a chore and more like brushing teeth.",
  },
];

const FAQ = [
  {
    q: "Is Lumora a therapist or medical app?",
    a: "No. Lumora is a wellbeing companion for reflection and healthy habits. It doesn't diagnose or replace professional care.",
  },
  {
    q: "Is my data private?",
    a: "Your entries stay on your device by default. You can export or delete everything at any time from Settings.",
  },
  {
    q: "Does it work offline?",
    a: "Yes. Lumora is designed to feel calm and fast even without a connection.",
  },
  {
    q: "How long does a daily check-in take?",
    a: "About two minutes. It's designed to fit between lectures, not replace them.",
  },
];

function Landing() {
  return (
    <div className="min-h-dvh bg-background bg-aurora">
      {/* Nav */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          <a href="#features" className="hover:text-foreground">
            Features
          </a>
          <a href="#how" className="hover:text-foreground">
            How it works
          </a>
          <a href="#faq" className="hover:text-foreground">
            FAQ
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/auth"
            className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Sign in
          </Link>
          <Link
            to="/auth"
            search={{ mode: "signup" }}
            className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90"
          >
            Get started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-10 pb-24 text-center">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-teal" />
          Made for students. Not a therapist.
        </div>
        <h1 className="mx-auto max-w-3xl font-display text-5xl font-semibold tracking-tight text-balance md:text-7xl">
          Understand Yourself.{" "}
          <span className="bg-gradient-to-r from-primary via-lavender to-teal bg-clip-text text-transparent">
            Grow Every Day.
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-lg text-muted-foreground">
          A calming digital companion for university life. Track your mood, build healthy habits,
          and reflect through beautiful daily journaling in about two minutes a day.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/auth"
            search={{ mode: "signup" }}
            className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5"
          >
            Start free <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="#features"
            className="inline-flex items-center gap-2 rounded-2xl border border-border/60 bg-card/60 px-6 py-3 text-sm font-medium backdrop-blur hover:bg-card"
          >
            See how it works
          </a>
        </div>

        {/* Bento preview */}
        <div className="mx-auto mt-16 grid max-w-5xl gap-4 md:grid-cols-12 md:auto-rows-[minmax(140px,auto)]">
          <div className="glass rounded-[28px] p-6 text-left md:col-span-7 md:row-span-2">
            <div className="text-xs font-medium uppercase tracking-widest text-primary">Today</div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-4xl font-semibold">Good morning, Maya</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              You're on a 14-day streak. Take a breath. You've earned it.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { label: "Mood", value: "😊 Good", tone: "teal" },
                { label: "Sleep", value: "7.5h", tone: "lavender" },
                { label: "Stress", value: "Low", tone: "emerald" },
              ].map((t) => (
                <div key={t.label} className="rounded-2xl border border-border/60 bg-card/70 p-3">
                  <div className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                    {t.label}
                  </div>
                  <div className="mt-1 text-sm font-semibold">{t.value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="glass rounded-[28px] p-6 text-left md:col-span-5">
            <div className="text-xs font-medium uppercase tracking-widest text-teal">Check-in</div>
            <div className="mt-3 flex justify-between gap-2">
              {["😔", "😐", "🙂", "😊", "✨"].map((e, i) => (
                <div
                  key={e}
                  className={`grid h-11 w-11 place-items-center rounded-2xl border text-xl ${
                    i === 3 ? "border-primary bg-primary/10" : "border-border/60 bg-card"
                  }`}
                >
                  {e}
                </div>
              ))}
            </div>
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-primary to-teal" />
            </div>
          </div>
          <div
            className="rounded-[28px] p-6 text-left text-primary-foreground md:col-span-5"
            style={{
              background: "linear-gradient(135deg, var(--color-primary), var(--color-lavender))",
            }}
          >
            <div className="text-xs font-medium uppercase tracking-widest opacity-70">
              Gentle insight
            </div>
            <p className="mt-3 text-sm leading-relaxed">
              "When you sleep more than 7 hours, your reported stress tends to be lower. Worth
              protecting tonight."
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            What's inside
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Everything you need to notice yourself, nothing you don't.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {FEATURES.map(({ icon: Icon, tone, title, body }) => (
            <div
              key={title}
              className="glass rounded-3xl p-6 transition-transform hover:-translate-y-1"
            >
              <div
                className="grid h-11 w-11 place-items-center rounded-2xl"
                style={{
                  background: `color-mix(in oklab, var(--color-${tone}) 20%, transparent)`,
                  color: `var(--color-${tone})`,
                }}
              >
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal">How it works</p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Three small moments. One better week.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Check in",
              body: "Tap a mood, slide a few sliders, name the emotion. Two minutes.",
            },
            {
              step: "02",
              title: "Reflect",
              body: "Answer one gentle prompt, or write freely. Autosaved.",
            },
            {
              step: "03",
              title: "Notice patterns",
              body: "Weekly insights show what's helping and what to protect.",
            },
          ].map((s) => (
            <div key={s.step} className="glass rounded-3xl p-6">
              <div className="font-display text-4xl font-semibold text-primary/70">{s.step}</div>
              <h3 className="mt-3 font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="glass rounded-3xl p-6">
              <blockquote className="text-pretty text-sm leading-relaxed">"{t.quote}"</blockquote>
              <figcaption className="mt-4 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">{t.name}</span> · {t.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="glass grid gap-6 rounded-3xl p-8 md:grid-cols-2 md:p-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-lavender">
              About Lumora
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">
              Built for the student mind.
            </h2>
          </div>
          <p className="text-pretty text-muted-foreground">
            University asks a lot of you. Lumora is a soft, private place to notice how you're
            really doing: no toxic streaks, no dopamine tricks, no medical claims. Just clarity, one
            day at a time.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-6 pb-24">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">FAQ</p>
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Questions, gently answered.
        </h2>
        <div className="mt-8 space-y-3">
          {FAQ.map((f) => (
            <details key={f.q} className="group glass rounded-2xl p-5 open:shadow-sm">
              <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold">
                {f.q}
                <span className="text-primary transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div
          className="overflow-hidden rounded-3xl p-10 text-center text-primary-foreground md:p-16"
          style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-teal))" }}
        >
          <ShieldCheck className="mx-auto h-8 w-8 opacity-80" />
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Your calmer semester starts today.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm opacity-90">
            Free forever for the basics. No credit card. Your data stays yours.
          </p>
          <Link
            to="/auth"
            search={{ mode: "signup" }}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-background px-6 py-3 text-sm font-semibold text-foreground shadow-lg hover:-translate-y-0.5 transition-transform"
          >
            Create your account <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-6 pb-12">
        <Disclaimer className="mb-6" variant="soft" />
        <div className="flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <Logo />
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground">
              Terms
            </a>
            <a href="#" className="hover:text-foreground">
              Contact
            </a>
          </div>
          <div>© {new Date().getFullYear()} Lumora</div>
        </div>
      </footer>
    </div>
  );
}
