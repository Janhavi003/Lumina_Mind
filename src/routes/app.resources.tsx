import { createFileRoute } from "@tanstack/react-router";
import { RESOURCES } from "@/lib/constants";
import { Disclaimer } from "@/components/shared/Disclaimer";

export const Route = createFileRoute("/app/resources")({
  component: ResourcesPage,
});

function ResourcesPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-rose">Resources</p>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">
          If you need real support.
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Lumora is not a crisis service. These are.
        </p>
      </div>

      <Disclaimer variant="prominent" />

      {RESOURCES.map((group) => (
        <section key={group.category} className="glass rounded-3xl p-6">
          <div className="mb-4 flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: `var(--color-${group.tone})` }}
            />
            <h2 className="font-display text-lg font-semibold">{group.category}</h2>
          </div>
          <ul className="space-y-3">
            {group.items.map((item) => (
              <li
                key={item.name}
                className="rounded-2xl border border-border/60 bg-background/60 p-4"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="font-semibold">{item.name}</div>
                  <div
                    className="text-sm font-medium"
                    style={{ color: `var(--color-${group.tone})` }}
                  >
                    {item.contact}
                  </div>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
