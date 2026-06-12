"use client";

import type { BookResult } from "@/types/book";

/** Debounced book search against /api/books/search. */
export function useSearch(query: string) {
  // TODO: debounce the query, call /api/books/search?q=..., expose results.
  void query;
  const results: BookResult[] = [];
  return { results, isLoading: false, error: null as Error | null };
}
