"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { DEFAULT_HABITS } from "./constants";
import type {
  CheckIn,
  Habit,
  HabitLog,
  JournalEntry,
  LumoraState,
  Profile,
  Settings,
} from "./types";

const STORAGE_KEY = "lumora:v1";

const AVATAR_COLORS = ["primary", "teal", "lavender", "amber", "rose", "emerald", "sky"];

const defaultProfile: Profile = {
  name: "",
  email: "",
  avatarColor: "primary",
};

const defaultSettings: Settings = {
  theme: "system",
  notifications: {
    dailyCheckIn: true,
    habitReminder: true,
    weeklyReflection: true,
    monthlyReflection: true,
  },
};

const initialState: LumoraState = {
  user: null,
  profile: defaultProfile,
  checkIns: [],
  journal: [],
  habits: DEFAULT_HABITS,
  habitLogs: [],
  bookmarks: [],
  settings: defaultSettings,
};

function loadState(): LumoraState {
  if (typeof window === "undefined") return initialState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw) as Partial<LumoraState>;
    return {
      ...initialState,
      ...parsed,
      profile: { ...defaultProfile, ...(parsed.profile ?? {}) },
      settings: {
        ...defaultSettings,
        ...(parsed.settings ?? {}),
        notifications: {
          ...defaultSettings.notifications,
          ...(parsed.settings?.notifications ?? {}),
        },
      },
      habits: parsed.habits?.length ? parsed.habits : DEFAULT_HABITS,
    };
  } catch {
    return initialState;
  }
}

interface Ctx {
  state: LumoraState;
  ready: boolean;
  isAuthed: boolean;
  signIn: (email: string, name?: string) => void;
  signOut: () => void;
  updateProfile: (patch: Partial<Profile>) => void;
  updateSettings: (patch: Partial<Settings>) => void;
  addCheckIn: (entry: Omit<CheckIn, "id" | "createdAt">) => CheckIn;
  addJournal: (entry: Omit<JournalEntry, "id" | "createdAt" | "updatedAt">) => JournalEntry;
  updateJournal: (id: string, patch: Partial<JournalEntry>) => void;
  deleteJournal: (id: string) => void;
  addHabit: (habit: Omit<Habit, "id" | "createdAt">) => void;
  deleteHabit: (id: string) => void;
  toggleHabitLog: (habitId: string, date: string) => void;
  toggleBookmark: (articleId: string) => void;
  exportData: () => string;
  wipe: () => void;
}

const LumoraContext = createContext<Ctx | null>(null);

function makeId() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

export function LumoraProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LumoraState>(initialState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(loadState());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore quota
    }
  }, [state, ready]);

  // theme
  useEffect(() => {
    if (!ready) return;
    const theme = state.settings.theme;
    const root = document.documentElement;
    const apply = (dark: boolean) => root.classList.toggle("dark", dark);
    if (theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      apply(mq.matches);
      const listener = (e: MediaQueryListEvent) => apply(e.matches);
      mq.addEventListener("change", listener);
      return () => mq.removeEventListener("change", listener);
    }
    apply(theme === "dark");
  }, [state.settings.theme, ready]);

  const value = useMemo<Ctx>(() => {
    return {
      state,
      ready,
      isAuthed: !!state.user,
      signIn(email, name) {
        setState((s) => ({
          ...s,
          user: { id: makeId(), email },
          profile: {
            ...s.profile,
            email,
            name: name ?? s.profile.name ?? email.split("@")[0],
            avatarColor:
              s.profile.avatarColor ??
              AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)],
          },
        }));
      },
      signOut() {
        setState((s) => ({ ...s, user: null }));
      },
      updateProfile(patch) {
        setState((s) => ({ ...s, profile: { ...s.profile, ...patch } }));
      },
      updateSettings(patch) {
        setState((s) => ({
          ...s,
          settings: {
            ...s.settings,
            ...patch,
            notifications: { ...s.settings.notifications, ...(patch.notifications ?? {}) },
          },
        }));
      },
      addCheckIn(entry) {
        const ci: CheckIn = { ...entry, id: makeId(), createdAt: Date.now() };
        setState((s) => ({
          ...s,
          checkIns: [ci, ...s.checkIns.filter((c) => c.date !== ci.date)],
        }));
        return ci;
      },
      addJournal(entry) {
        const now = Date.now();
        const j: JournalEntry = { ...entry, id: makeId(), createdAt: now, updatedAt: now };
        setState((s) => ({ ...s, journal: [j, ...s.journal] }));
        return j;
      },
      updateJournal(id, patch) {
        setState((s) => ({
          ...s,
          journal: s.journal.map((j) =>
            j.id === id ? { ...j, ...patch, updatedAt: Date.now() } : j,
          ),
        }));
      },
      deleteJournal(id) {
        setState((s) => ({ ...s, journal: s.journal.filter((j) => j.id !== id) }));
      },
      addHabit(habit) {
        const h: Habit = { ...habit, id: makeId(), createdAt: Date.now() };
        setState((s) => ({ ...s, habits: [...s.habits, h] }));
      },
      deleteHabit(id) {
        setState((s) => ({
          ...s,
          habits: s.habits.filter((h) => h.id !== id),
          habitLogs: s.habitLogs.filter((l) => l.habitId !== id),
        }));
      },
      toggleHabitLog(habitId, date) {
        setState((s) => {
          const existing = s.habitLogs.find((l) => l.habitId === habitId && l.date === date);
          if (existing) {
            return {
              ...s,
              habitLogs: s.habitLogs.map((l) =>
                l === existing ? { ...l, completed: !l.completed } : l,
              ),
            };
          }
          return {
            ...s,
            habitLogs: [...s.habitLogs, { id: makeId(), habitId, date, completed: true }],
          };
        });
      },
      toggleBookmark(articleId) {
        setState((s) => ({
          ...s,
          bookmarks: s.bookmarks.includes(articleId)
            ? s.bookmarks.filter((id) => id !== articleId)
            : [...s.bookmarks, articleId],
        }));
      },
      exportData() {
        return JSON.stringify(state, null, 2);
      },
      wipe() {
        localStorage.removeItem(STORAGE_KEY);
        setState(initialState);
      },
    };
  }, [state, ready]);

  return <LumoraContext.Provider value={value}>{children}</LumoraContext.Provider>;
}
