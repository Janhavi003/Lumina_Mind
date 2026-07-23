import { createFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";
import { useMemo, useState } from "react";
import { Plus, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useLumora } from "@/lib/lumora-context";
import { todayISO } from "@/lib/dates";
import { JOURNAL_PROMPTS, MOOD_OPTIONS } from "@/lib/constants";
import type { MoodLevel } from "@/lib/types";

export const Route = createFileRoute("/app/journal")({
  component: JournalPage,
});

function JournalPage() {
  const { state, addJournal, deleteJournal } = useLumora();
  const [composing, setComposing] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return state.journal;
    return state.journal.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.content.toLowerCase().includes(q) ||
        j.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }, [state.journal, query]);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Journal</p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">
            Reflect gently.
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">Autosaved. Only you can see this.</p>
        </div>
        <button
          type="button"
          onClick={() => setComposing(true)}
          className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-transform"
        >
          <Plus className="h-4 w-4" /> New entry
        </button>
      </div>

      <div className="glass flex items-center gap-2 rounded-2xl px-4 py-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search your entries…"
          aria-label="Search journal"
          className="h-9 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      {composing && (
        <Composer
          onSave={(entry) => {
            addJournal(entry);
            setComposing(false);
            toast.success("Entry saved.");
          }}
          onCancel={() => setComposing(false)}
        />
      )}

      {filtered.length === 0 && !composing ? (
        <div className="glass rounded-3xl p-10 text-center">
          <p className="text-sm text-muted-foreground">
            No entries yet. A gentle first line is enough.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((j) => {
            const mood = j.mood ? MOOD_OPTIONS.find((m) => m.level === j.mood) : null;
            return (
              <article
                key={j.id}
                className="glass group rounded-3xl p-5 transition-transform hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    {format(new Date(j.createdAt), "EEE, d MMM · HH:mm")}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      deleteJournal(j.id);
                      toast("Entry removed");
                    }}
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                    aria-label="Delete entry"
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                  </button>
                </div>
                {j.title && <h3 className="mt-2 font-display text-lg font-semibold">{j.title}</h3>}
                <p className="mt-2 line-clamp-6 whitespace-pre-wrap text-sm text-muted-foreground">
                  {j.content}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {mood && (
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
                      {mood.emoji} {mood.label}
                    </span>
                  )}
                  {j.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Composer({
  onSave,
  onCancel,
}: {
  onSave: (e: {
    date: string;
    title: string;
    content: string;
    mood?: MoodLevel;
    tags: string[];
  }) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState<MoodLevel | undefined>();
  const [prompt, setPrompt] = useState(JOURNAL_PROMPTS[0]);

  return (
    <div className="glass space-y-4 rounded-3xl p-6">
      <div className="flex flex-wrap gap-2">
        {JOURNAL_PROMPTS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPrompt(p)}
            className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
              prompt === p
                ? "border-primary bg-primary/10 text-primary"
                : "border-border/60 hover:bg-muted"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Give this entry a title (optional)"
        className="h-11 w-full rounded-xl border border-input bg-background px-3 text-base font-semibold outline-none focus:ring-2 focus:ring-primary/40"
      />

      <div>
        <p className="mb-2 text-xs text-muted-foreground">{prompt}</p>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          placeholder="Start where you are…"
          className="w-full resize-none rounded-2xl border border-input bg-background p-4 text-sm leading-relaxed outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted-foreground">Mood while writing:</span>
        {MOOD_OPTIONS.map((m) => (
          <button
            key={m.level}
            type="button"
            onClick={() => setMood(mood === m.level ? undefined : m.level)}
            className={`grid h-9 w-9 place-items-center rounded-xl border transition-all ${
              mood === m.level ? "border-primary bg-primary/10" : "border-border/60 hover:bg-muted"
            }`}
            aria-pressed={mood === m.level}
          >
            <span aria-hidden>{m.emoji}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-2xl border border-border px-4 py-2 text-sm hover:bg-muted"
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={!content.trim()}
          onClick={() =>
            onSave({
              date: todayISO(),
              title: title.trim(),
              content: content.trim(),
              mood,
              tags: [],
            })
          }
          className="rounded-2xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-40"
        >
          Save entry
        </button>
      </div>
    </div>
  );
}
