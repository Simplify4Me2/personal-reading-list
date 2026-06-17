import type { BookResult } from "@/types/book";

/**
 * Open Library API client.
 * Called server-side only (from Route Handlers) — see Phase 5 of the
 * implementation guide.
 */
export async function searchOpenLibrary(query: string): Promise<BookResult[]> {
  // TODO: call https://openlibrary.org/search.json?q=... and normalise
  // the response via normalizeOpenLibraryDoc().
  void query;
  return [];
}

export async function getOpenLibraryBook(workId: string): Promise<BookResult | null> {
  // TODO: fetch a single work/edition by ID.
  void workId;
  return null;
}
