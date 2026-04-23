// lib/utils.ts

export function getTodayStr(): string {
  return new Date().toISOString().split("T")[0];
}

export function formatDate(s: string): string {
  if (!s) return "";
  return new Date(s + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function genId(): string {
  return Math.random().toString(36).slice(2, 10);
}
