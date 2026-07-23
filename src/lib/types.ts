export type MoodLevel = 1 | 2 | 3 | 4 | 5;

export interface CheckIn {
  id: string;
  date: string; // YYYY-MM-DD
  mood: MoodLevel;
  emotion?: string;
  emotionCategory?: string;
  intensity: number; // 1-10
  energy: number;
  stress: number;
  anxiety: number;
  focus: number;
  sleepQuality: number;
  sleepHours: number;
  social: number;
  activity: number;
  water: number;
  screenTime: number;
  note?: string;
  createdAt: number;
}

export interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  mood?: MoodLevel;
  tags: string[];
  createdAt: number;
  updatedAt: number;
}

export interface Habit {
  id: string;
  name: string;
  icon: string;
  color: string;
  target?: number;
  unit?: string;
  createdAt: number;
}

export interface HabitLog {
  id: string;
  habitId: string;
  date: string;
  completed: boolean;
  value?: number;
}

export interface Profile {
  name: string;
  email: string;
  university?: string;
  course?: string;
  year?: string;
  bio?: string;
  goals?: string[];
  interests?: string[];
  timezone?: string;
  avatarColor: string;
}

export interface Settings {
  theme: "light" | "dark" | "system";
  notifications: {
    dailyCheckIn: boolean;
    habitReminder: boolean;
    weeklyReflection: boolean;
    monthlyReflection: boolean;
  };
}

export interface LumoraState {
  user: { id: string; email: string } | null;
  profile: Profile;
  checkIns: CheckIn[];
  journal: JournalEntry[];
  habits: Habit[];
  habitLogs: HabitLog[];
  bookmarks: string[];
  settings: Settings;
}
