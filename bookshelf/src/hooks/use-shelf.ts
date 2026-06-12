"use client";

import type { ShelfWithBooks } from "@/types/shelf";

/** Shelf CRUD: load a single shelf and create/rename/delete shelves. */
export function useShelf(shelfId: string) {
  // TODO: fetch the shelf + its books, expose rename/delete/move-book mutations.
  void shelfId;
  const shelf: ShelfWithBooks | null = null;
  return { shelf, isLoading: false, error: null as Error | null };
}
