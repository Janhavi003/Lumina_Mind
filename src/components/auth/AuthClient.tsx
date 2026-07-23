"use client";

import { useState, useContext } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { Link, useRouter } from "@tanstack/react-router";
import { z } from "zod";
import { Logo } from "@/components/shared/Logo";
import { Disclaimer } from "@/components/shared/Disclaimer";
import { LumoraContext } from "@/lib/lumora-context";
import { toast } from "sonner";

const emailSchema = z.string().trim().email("Please enter a valid email").max(255);
const passSchema = z.string().min(6, "At least 6 characters").max(128);

export default function AuthClient({ initialMode }: { initialMode: "signin" | "signup" }) {
  const [tab, setTab] = useState<typeof initialMode>(initialMode);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; name?: string }>({});
  const ctx = useContext(LumoraContext);
  const router = useRouter();
  if (!ctx) return null;
  const { signIn } = ctx;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const ep = emailSchema.safeParse(email);
    const pp = passSchema.safeParse(password);
    const next: typeof errors = {};
    if (!ep.success) next.email = ep.error.issues[0].message;
    if (!pp.success) next.password = pp.error.issues[0].message;
    if (tab === "signup" && !name.trim()) next.name = "Please tell us your first name";
    setErrors(next);
    if (Object.keys(next).length) return;

    signIn(email, tab === "signup" ? name.trim() : undefined);
    toast.success(tab === "signup" ? "Welcome to Lumora ✨" : "Welcome back");
    router.navigate({ to: "/app/dashboard" });
  }

  return (
    <div className="min-h-dvh bg-background bg-aurora">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link to="/">
          <Logo />
        </Link>
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
          Back home
        </Link>
      </header>

      <main className="mx-auto flex max-w-md flex-col gap-6 px-6 py-12">
        <div className="text-center">
          <h1 className="font-display text-3xl font-semibold tracking-tight">
            {tab === "signup" ? "Create your Lumora" : "Welcome back"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {tab === "signup"
              ? "A quieter place to notice yourself."
              : "Pick up where you left off."}
          </p>
        </div>

        <div className="glass rounded-3xl p-2">
          <div className="grid grid-cols-2 gap-1 rounded-2xl bg-muted/50 p-1">
            {(["signin", "signup"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                  tab === t ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"
                }`}
              >
                {t === "signin" ? "Sign in" : "Create account"}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="space-y-4 p-4">
            {tab === "signup" && (
              <div>
                <label htmlFor="name" className="text-xs font-medium text-muted-foreground">
                  First name
                </label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                  placeholder="Maya"
                  autoComplete="given-name"
                />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
              </div>
            )}
            <div>
              <label htmlFor="email" className="text-xs font-medium text-muted-foreground">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="you@university.edu"
                autoComplete="email"
              />
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="password" className="text-xs font-medium text-muted-foreground">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="At least 6 characters"
                autoComplete={tab === "signup" ? "new-password" : "current-password"}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-destructive">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90"
            >
              <Mail className="h-4 w-4" />
              {tab === "signup" ? "Create account" : "Sign in"}
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="text-center text-xs text-muted-foreground">
              By continuing you agree to our Terms & Privacy Policy.
            </p>
          </form>
        </div>

        <Disclaimer />
      </main>
    </div>
  );
}
