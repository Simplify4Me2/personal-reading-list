/**
 * Book-related types.
 *
 * `BookResult` is the normalised shape returned by the book search API
 * (Open Library / Google Books) — see docs/implementation-guide.md, Phase 5.
 * `Book` is a book saved to a user's library.
 */

export interface BookResult {
  apiId: string;
  apiSource: "open_library" | "google_books";
  title: string;
  authors: string[];
  coverUrl: string | null;
  isbn10: string | null;
  isbn13: string | null;
  pageCount: number | null;
  publishYear: number | null;
  publisher: string | null;
  description: string | null;
  genres: string[];
}

export interface Book extends BookResult {
  id: string;
  rating: number | null;
  notes: string | null;
  dateAdded: string;
  dateFinished: string | null;
}

export interface BookSearchResult {
  results: BookResult[];
  total: number;
}
