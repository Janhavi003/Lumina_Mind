import { cn } from "@/lib/utils";

export function Logo({ className, showText = true }: { className?: string; showText?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span
        aria-hidden
        className="relative grid h-8 w-8 place-items-center rounded-2xl"
        style={{
          background:
            "conic-gradient(from 200deg at 50% 50%, var(--color-primary), var(--color-teal), var(--color-lavender), var(--color-amber), var(--color-primary))",
        }}
      >
        <span className="h-3 w-3 rounded-full bg-background/90" />
      </span>
      {showText && (
        <span className="font-display text-lg font-semibold tracking-tight">Lumora</span>
      )}
    </div>
  );
}
