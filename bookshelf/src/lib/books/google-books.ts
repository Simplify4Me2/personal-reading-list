import type { BookResult } from "@/types/book";

/**
 * Google Books API client (optional / supplemental source).
 * Uses GOOGLE_BOOKS_API_KEY — server-side only, never expose to the browser.
 */
export async function searchGoogleBooks(query: string): Promise<BookResult[]> {
  // TODO: call https://www.googleapis.com/books/v1/volumes?q=... and
  // normalise the response via normalizeGoogleVolume().
  void query;
  return [];
}
