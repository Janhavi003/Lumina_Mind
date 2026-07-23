"use client";

import AuthClient from "./AuthClient";

export default function AuthClientWrapper({ initialMode }: { initialMode: "signin" | "signup" }) {
  return <AuthClient initialMode={initialMode} />;
}
