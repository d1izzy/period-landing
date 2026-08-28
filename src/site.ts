export const BOT = "https://t.me/Periodmy_bot";

export type LegalKind = "privacy" | "terms";

export function currentRoute(): "home" | LegalKind {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (path.endsWith("/privacy")) return "privacy";
  if (path.endsWith("/terms")) return "terms";
  return "home";
}
