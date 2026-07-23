import { createFileRoute, redirect } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";

export const Route = createFileRoute("/app")({
  ssr: false,
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem("lumora:v1");
      const parsed = raw ? JSON.parse(raw) : null;
      if (!parsed?.user) {
        throw redirect({ to: "/auth" });
      }
    } catch (e) {
      // rethrow redirects
      if (e && typeof e === "object" && "isRedirect" in e) throw e;
      throw redirect({ to: "/auth" });
    }
  },
  component: AppShell,
});
