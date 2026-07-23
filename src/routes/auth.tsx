import { createFileRoute, Link } from "@tanstack/react-router";
import { createClientOnlyFn } from "@tanstack/react-start";
import { z } from "zod";
import { Logo } from "@/components/shared/Logo";
import { Disclaimer } from "@/components/shared/Disclaimer";
import { AuthClientLoader } from "@/components/auth/AuthClientLoader";

const AuthClient = AuthClientLoader;

const searchSchema = z.object({ mode: z.enum(["signin", "signup"]).optional() });

export const Route = createFileRoute("/auth")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Sign in | Lumora" },
      { name: "description", content: "Sign in to Lumora to continue your wellbeing journey." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { mode } = Route.useSearch();
  const initialMode = (mode as "signin" | "signup") ?? "signin";

  return <AuthClient initialMode={initialMode} />;
}
