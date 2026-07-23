import { AlertCircle } from "lucide-react";
import { DISCLAIMER } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Disclaimer({
  className,
  variant = "soft",
}: {
  className?: string;
  variant?: "soft" | "prominent";
}) {
  return (
    <div
      role="note"
      className={cn(
        "flex items-start gap-3 rounded-2xl border p-4 text-xs leading-relaxed",
        variant === "prominent"
          ? "border-rose/30 bg-rose-soft/60 text-foreground"
          : "border-border/60 bg-muted/40 text-muted-foreground",
        className,
      )}
    >
      <AlertCircle
        className={cn(
          "mt-0.5 h-4 w-4 shrink-0",
          variant === "prominent" ? "text-rose" : "text-muted-foreground",
        )}
        aria-hidden
      />
      <p>{DISCLAIMER}</p>
    </div>
  );
}
