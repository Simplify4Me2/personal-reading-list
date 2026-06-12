import type { BookResult } from "@/types/book";

/**
 * Normalisers that map raw API responses to the shared BookResult type,
 * so the rest of the app never depends on either API's response shape.
 */

export function normalizeOpenLibraryDoc(doc: unknown): BookResult {
  // TODO: map an Open Library search doc to BookResult, handling
  // missing fields gracefully.
  void doc;
  throw new Error("Not implemented");
}

export function normalizeGoogleVolume(volume: unknown): BookResult {
  // TODO: map a Google Books volume to BookResult.
  void volume;
  throw new Error("Not implemented");
}
