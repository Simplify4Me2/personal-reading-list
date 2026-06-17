"use client";

import type { ProgressEntry } from "@/types/stats";

/** Reading-progress history + updates for a single book. */
export function useProgress(bookId: string) {
  // TODO: load the progress history and expose an updateProgress(page) mutation.
  void bookId;
  const entries: ProgressEntry[] = [];
  return { entries, isLoading: false, error: null as Error | null };
}
