"use client";

import { createContext, useContext } from "react";

export type LumoraContextValue = {
  state: import("./types").LumoraState;
  ready: boolean;
  isAuthed: boolean;
  signIn: (email: string, name?: string) => void;
  signOut: () => void;
  updateProfile: (patch: Partial<import("./types").Profile>) => void;
  updateSettings: (patch: Partial<import("./types").Settings>) => void;
  addCheckIn: (
    entry: Omit<import("./types").CheckIn, "id" | "createdAt">,
  ) => import("./types").CheckIn;
  addJournal: (
    entry: Omit<import("./types").JournalEntry, "id" | "createdAt" | "updatedAt">,
  ) => import("./types").JournalEntry;
  updateJournal: (id: string, patch: Partial<import("./types").JournalEntry>) => void;
  deleteJournal: (id: string) => void;
  addHabit: (habit: Omit<import("./types").Habit, "id" | "createdAt">) => void;
  deleteHabit: (id: string) => void;
  toggleHabitLog: (habitId: string, date: string) => void;
  toggleBookmark: (articleId: string) => void;
  exportData: () => string;
  wipe: () => void;
};

export const LumoraContext = createContext<LumoraContextValue | null>(null);

export function useLumora() {
  const ctx = useContext(LumoraContext);
  if (!ctx) {
    const noop = () => {};
    return {
      state: {
        user: null,
        profile: { name: "", email: "", avatarColor: "primary" },
        checkIns: [],
        journal: [],
        habits: [],
        habitLogs: [],
        bookmarks: [],
        settings: { theme: "system", notifications: { dailyCheckIn: true, habitReminder: true, weeklyReflection: true, monthlyReflection: true } },
      } as any,
      ready: false,
      isAuthed: false,
      signIn: noop,
      signOut: noop,
      updateProfile: noop,
      updateSettings: noop,
      addCheckIn: (() => ({})) as any,
      addJournal: (() => ({})) as any,
      updateJournal: noop,
      deleteJournal: noop,
      addHabit: noop,
      deleteHabit: noop,
      toggleHabitLog: noop,
      toggleBookmark: noop,
      exportData: () => "{}",
      wipe: noop,
    } as any;
  }
  return ctx;
}
