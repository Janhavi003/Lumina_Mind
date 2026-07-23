import { Link, Outlet, useRouter, useRouterState } from "@tanstack/react-router";
import {
  BookHeart,
  BookOpenText,
  Compass,
  Heart,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Menu,
  Moon,
  Settings,
  Sparkles,
  Sun,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/shared/Logo";
import { useLumora } from "@/lib/lumora-context";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/app/dashboard", label: "Today", icon: LayoutDashboard },
  { to: "/app/checkin", label: "Check-in", icon: Heart },
  { to: "/app/journal", label: "Journal", icon: BookHeart },
  { to: "/app/habits", label: "Habits", icon: Sparkles },
  { to: "/app/insights", label: "Insights", icon: Compass },
  { to: "/app/library", label: "Library", icon: BookOpenText },
  { to: "/app/resources", label: "Resources", icon: LifeBuoy },
] as const;

export function AppShell() {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { state, signOut, updateSettings } = useLumora();
  const router = useRouter();

  const theme = state.settings.theme;
  const cycleTheme = () => {
    const next = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
    updateSettings({ theme: next });
  };

  const initials = (state.profile.name || state.profile.email || "L")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-dvh bg-background bg-aurora">
      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border/60 bg-background/70 px-4 py-3 backdrop-blur-xl md:hidden">
        <Logo />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-xl border border-border/60 bg-card"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      <div className="mx-auto flex w-full max-w-350">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-30 flex w-72 flex-col gap-1 border-r border-border/60 bg-sidebar/80 px-4 py-6 backdrop-blur-xl transition-transform md:sticky md:top-0 md:h-dvh md:translate-x-0",
            open ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="mb-6 hidden px-2 md:block">
            <Link to="/">
              <Logo />
            </Link>
          </div>

          <nav className="flex flex-col gap-1">
            {NAV.map(({ to, label, icon: Icon }) => {
              const active = path.startsWith(to);
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all",
                    active
                      ? "bg-primary/10 text-primary shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--color-primary)_20%,transparent)]"
                      : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                  )}
                >
                  <Icon className={cn("h-4 w-4", active && "text-primary")} />
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto flex flex-col gap-1 pt-6">
            <Link
              to="/app/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted/70 hover:text-foreground"
            >
              <UserRound className="h-4 w-4" /> Profile
            </Link>
            <Link
              to="/app/settings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted/70 hover:text-foreground"
            >
              <Settings className="h-4 w-4" /> Settings
            </Link>

            <button
              type="button"
              onClick={cycleTheme}
              className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted/70 hover:text-foreground"
            >
              {theme === "dark" ? (
                <Moon className="h-4 w-4" />
              ) : theme === "light" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              Theme: <span className="capitalize">{theme}</span>
            </button>

            <div className="mt-3 flex items-center gap-3 rounded-2xl border border-border/60 bg-card/60 p-3">
              <div
                className="grid h-9 w-9 place-items-center rounded-xl text-sm font-semibold text-primary-foreground"
                style={{ background: `var(--color-${state.profile.avatarColor || "primary"})` }}
              >
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">{state.profile.name || "Friend"}</div>
                <div className="truncate text-xs text-muted-foreground">{state.profile.email}</div>
              </div>
              <button
                type="button"
                onClick={() => {
                  signOut();
                  router.navigate({ to: "/" });
                }}
                className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-muted"
                aria-label="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </aside>

        {open && (
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-20 bg-background/50 backdrop-blur-sm md:hidden"
          />
        )}

        <main className="flex-1 px-4 py-6 md:px-10 md:py-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
