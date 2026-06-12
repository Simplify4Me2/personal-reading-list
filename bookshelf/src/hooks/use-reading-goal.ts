"use client";

import type { ReadingGoal } from "@/types/stats";

/** Reading goal for a year: fetch, set/update, and pace calculation. */
export function useReadingGoal(year: number) {
  // TODO: load the goal, expose setGoal(target), and compute pace
  // (books finished vs. expected at this point in the year).
  void year;
  const goal: ReadingGoal | null = null;
  return { goal, booksFinished: 0, isLoading: false, error: null as Error | null };
}
