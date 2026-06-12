"use client";

import type { ShelfWithBooks } from "@/types/shelf";

/** Fetches and mutates the signed-in user's library. */
export function useLibrary() {
  // TODO: fetch the user's shelves + books from Supabase and expose
  // mutations (add book, remove book, move between shelves).
  const shelves: ShelfWithBooks[] = [];
  return { shelves, isLoading: false, error: null as Error | null };
}
