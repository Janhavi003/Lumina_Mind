import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Bookmark, BookmarkCheck, Clock, Search, X } from "lucide-react";
import { WELLNESS_ARTICLES } from "@/lib/constants";
import { useLumora } from "@/lib/lumora-context";

export const Route = createFileRoute("/app/library")({
  component: LibraryPage,
});

const CATEGORIES = Array.from(new Set(WELLNESS_ARTICLES.map((a) => a.category)));

function LibraryPage() {
  const { state, toggleBookmark } = useLumora();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const [open, setOpen] = useState<(typeof WELLNESS_ARTICLES)[number] | null>(null);

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return WELLNESS_ARTICLES.filter(
      (a) =>
        (!cat || a.category === cat) &&
        (!q ||
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q)),
    );
  }, [query, cat]);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          Wellness library
        </p>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">
          Short reads. Real science.
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Educational, never prescriptive.</p>
      </div>

      <div className="glass flex items-center gap-2 rounded-2xl px-4 py-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles…"
          aria-label="Search library"
          className="h-9 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCat(null)}
          className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
            cat === null
              ? "border-primary bg-primary/10 text-primary"
              : "border-border/60 hover:bg-muted"
          }`}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
              cat === c
                ? "border-primary bg-primary/10 text-primary"
                : "border-border/60 hover:bg-muted"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((a) => {
          const saved = state.bookmarks.includes(a.id);
          return (
            <button
              key={a.id}
              type="button"
              onClick={() => setOpen(a)}
              className="glass group text-left rounded-3xl p-6 transition-transform hover:-translate-y-1"
            >
              <div
                className="grid h-12 w-12 place-items-center rounded-2xl text-2xl"
                style={{
                  background: `color-mix(in oklab, var(--color-${a.color}) 20%, transparent)`,
                }}
              >
                {a.emoji}
              </div>
              <div className="mt-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                {a.category} <span>·</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {a.minutes} min
                </span>
              </div>
              <h3 className="mt-2 font-display text-lg font-semibold">{a.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{a.excerpt}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs font-medium text-primary">Read →</span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(a.id);
                  }}
                  aria-label="Toggle bookmark"
                  className="cursor-pointer text-muted-foreground hover:text-primary"
                >
                  {saved ? (
                    <BookmarkCheck className="h-4 w-4 text-primary" />
                  ) : (
                    <Bookmark className="h-4 w-4" />
                  )}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-background/70 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(null)}
        >
          <div
            className="glass max-h-[85dvh] w-full max-w-2xl overflow-auto rounded-3xl p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {open.category} · {open.minutes} min read
                </div>
                <h2 className="mt-2 font-display text-2xl font-semibold">{open.title}</h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="grid h-9 w-9 place-items-center rounded-xl hover:bg-muted"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-4 leading-relaxed text-muted-foreground">{open.body}</p>
          </div>
        </div>
      )}
    </div>
  );
}
