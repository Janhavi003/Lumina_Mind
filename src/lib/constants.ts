import type { Habit } from "./types";

export const DISCLAIMER =
  "Lumora is a wellbeing companion designed to support self-reflection and healthy habits. It is not a medical device, therapist, diagnosis tool, or emergency mental health service. If you are in crisis, please contact local emergency services or a qualified mental health professional.";

export const MOOD_OPTIONS: {
  level: 1 | 2 | 3 | 4 | 5;
  emoji: string;
  label: string;
  tone: string;
}[] = [
  { level: 1, emoji: "😔", label: "Low", tone: "rose" },
  { level: 2, emoji: "😐", label: "Meh", tone: "amber" },
  { level: 3, emoji: "🙂", label: "Okay", tone: "sky" },
  { level: 4, emoji: "😊", label: "Good", tone: "teal" },
  { level: 5, emoji: "✨", label: "Great", tone: "emerald" },
];

export const EMOTION_WHEEL: {
  category: string;
  color: string;
  emoji: string;
  emotions: string[];
}[] = [
  {
    category: "Happy",
    color: "amber",
    emoji: "☀️",
    emotions: ["Joyful", "Proud", "Excited", "Hopeful", "Content", "Grateful", "Playful"],
  },
  {
    category: "Sad",
    color: "sky",
    emoji: "🌧️",
    emotions: ["Lonely", "Disappointed", "Guilty", "Hopeless", "Hurt", "Melancholy"],
  },
  {
    category: "Angry",
    color: "rose",
    emoji: "🔥",
    emotions: ["Frustrated", "Irritated", "Resentful", "Jealous", "Annoyed"],
  },
  {
    category: "Fear",
    color: "lavender",
    emoji: "🌫️",
    emotions: ["Anxious", "Nervous", "Worried", "Overwhelmed", "Insecure", "Scared"],
  },
  {
    category: "Surprise",
    color: "teal",
    emoji: "✨",
    emotions: ["Amazed", "Curious", "Confused", "Startled", "Inspired"],
  },
  {
    category: "Calm",
    color: "emerald",
    emoji: "🍃",
    emotions: ["Peaceful", "Relaxed", "Balanced", "Present", "Reflective"],
  },
];

export const DEFAULT_HABITS: Habit[] = [
  { id: "h-sleep", name: "Sleep 7+ hours", icon: "🌙", color: "lavender", createdAt: 0 },
  {
    id: "h-water",
    name: "Drink water",
    icon: "💧",
    color: "sky",
    target: 8,
    unit: "cups",
    createdAt: 0,
  },
  { id: "h-move", name: "Move your body", icon: "🏃", color: "emerald", createdAt: 0 },
  { id: "h-read", name: "Read 10 minutes", icon: "📖", color: "amber", createdAt: 0 },
  { id: "h-meditate", name: "Meditate", icon: "🧘", color: "teal", createdAt: 0 },
  { id: "h-walk", name: "Walk outside", icon: "🚶", color: "emerald", createdAt: 0 },
  { id: "h-journal", name: "Journal", icon: "✍️", color: "primary", createdAt: 0 },
  { id: "h-stretch", name: "Stretch", icon: "🌿", color: "teal", createdAt: 0 },
];

export const JOURNAL_PROMPTS = [
  "What happened today?",
  "What challenged you?",
  "What went well?",
  "What are you grateful for?",
  "What did you learn?",
  "How do you feel now?",
  "What are you looking forward to?",
];

export const WELLNESS_ARTICLES: {
  id: string;
  title: string;
  category: string;
  minutes: number;
  excerpt: string;
  body: string;
  color: string;
  emoji: string;
}[] = [
  {
    id: "a1",
    title: "The Two-Minute Reset",
    category: "Stress",
    minutes: 3,
    emoji: "🌬️",
    color: "teal",
    excerpt: "A grounding practice you can do between lectures.",
    body: "When stress spikes, the fastest reset is often the simplest. Sit down, exhale for six counts, notice five things you can see, four you can feel, three you can hear. It takes about two minutes and interrupts the loop.",
  },
  {
    id: "a2",
    title: "Sleep Is a Study Skill",
    category: "Sleep",
    minutes: 5,
    emoji: "🌙",
    color: "lavender",
    excerpt: "Why 7+ hours protects memory and mood.",
    body: "Sleep consolidates what you learned that day. Consistent bed and wake times matter more than perfect hours. Anchor them, and let the rest follow.",
  },
  {
    id: "a3",
    title: "Beating the Blank Page",
    category: "Study Skills",
    minutes: 4,
    emoji: "📝",
    color: "amber",
    excerpt: "Write badly on purpose to start.",
    body: "Perfectionism is the enemy of drafts. Give yourself permission to write a bad first sentence. The second one is always easier.",
  },
  {
    id: "a4",
    title: "Micro-Mindfulness",
    category: "Mindfulness",
    minutes: 3,
    emoji: "🍃",
    color: "emerald",
    excerpt: "Small moments of attention, all day long.",
    body: "You don't need thirty minutes on a cushion. Notice your feet on the ground before you walk into class. That counts.",
  },
  {
    id: "a5",
    title: "Recovering from Burnout",
    category: "Burnout",
    minutes: 6,
    emoji: "🕯️",
    color: "rose",
    excerpt: "Recognising the signs before they take root.",
    body: "Burnout isn't a busy week. It's chronic exhaustion, cynicism, and reduced effectiveness. Recovery starts with rest, then rebuilds through meaning.",
  },
  {
    id: "a6",
    title: "The Habit Loop",
    category: "Healthy Habits",
    minutes: 4,
    emoji: "🔁",
    color: "primary",
    excerpt: "Cue, routine, reward: how habits stick.",
    body: "Design the cue. Make the routine small enough you can't fail. Celebrate the reward. Repeat until it's automatic.",
  },
  {
    id: "a7",
    title: "Fuel That Feels Good",
    category: "Nutrition",
    minutes: 4,
    emoji: "🥗",
    color: "emerald",
    excerpt: "Eating for energy without perfectionism.",
    body: "Regular meals stabilise energy far more than the perfect diet. Aim for consistency, protein at breakfast, and water throughout the day.",
  },
  {
    id: "a8",
    title: "Time-Blocking for Real Life",
    category: "Time Management",
    minutes: 5,
    emoji: "⏳",
    color: "sky",
    excerpt: "A calmer alternative to endless to-do lists.",
    body: "Assign your work to time, not just tasks. Block deep work in the morning, admin in the afternoon, and protect one evening a week entirely for rest.",
  },
  {
    id: "a9",
    title: "Talking to Yourself Kindly",
    category: "Self Compassion",
    minutes: 4,
    emoji: "💛",
    color: "amber",
    excerpt: "The inner voice you'd offer a friend.",
    body: "Notice your inner critic. Ask: would I say this to my best friend? If not, try again with softer language. It's a skill, and it grows.",
  },
  {
    id: "a10",
    title: "Deep Work in Short Windows",
    category: "Productivity",
    minutes: 5,
    emoji: "🎯",
    color: "primary",
    excerpt: "Focus without becoming a monk.",
    body: "45 minutes of undistracted work beats 3 hours of half-attention. Phone in another room. One tab. One task. Timer on.",
  },
];

export const RESOURCES = [
  {
    category: "Emergency",
    tone: "rose",
    items: [
      {
        name: "Emergency Services",
        detail: "Call your local emergency number immediately.",
        contact: "911 / 999 / 112",
      },
      { name: "Samaritans (UK & IE)", detail: "24/7 emotional support line.", contact: "116 123" },
      {
        name: "988 Suicide & Crisis Lifeline (US)",
        detail: "24/7 confidential support.",
        contact: "Call or text 988",
      },
    ],
  },
  {
    category: "Student Support",
    tone: "teal",
    items: [
      {
        name: "Campus Counselling",
        detail: "Most universities offer free confidential counselling.",
        contact: "Check your student services portal",
      },
      {
        name: "Nightline",
        detail: "Student-led listening service in many universities.",
        contact: "nightline.ac.uk",
      },
    ],
  },
  {
    category: "Helpful Reading",
    tone: "lavender",
    items: [
      {
        name: "Mind (UK)",
        detail: "Trusted mental health information and resources.",
        contact: "mind.org.uk",
      },
      { name: "NAMI (US)", detail: "National Alliance on Mental Illness.", contact: "nami.org" },
      {
        name: "Headspace for Students",
        detail: "Free meditation resources for students.",
        contact: "headspace.com/studentsbtn",
      },
    ],
  },
];
