import { createClientOnlyFn } from "@tanstack/react-start";

export const AuthClientLoader = createClientOnlyFn(() =>
  import("./AuthClient").then((mod) => mod.default),
);
