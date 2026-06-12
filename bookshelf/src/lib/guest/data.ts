import sampleBooks from "../../../data/sample-books.json";
import type { Book } from "@/types/book";
import type { ShelfWithBooks } from "@/types/shelf";

/**
 * Guest mode data — the single entry point for all guest data.
 * Guest mode never touches the database: everything is derived from the
 * bundled sample-books.json (see Phase 6 of the implementation guide).
 */

interface SampleBook {
  title: string;
  author: string;
  isbn13: string;
  isbn10: string;
  coverUrl: string;
  pageCount: number;
  publishedDate: string;
  genres: string[];
  description: string;
  publisher: string;
}

function toBook(sample: SampleBook, index: number): Book {
  return {
    id: `guest-${index}`,
    apiId: sample.isbn13,
    apiSource: "open_library",
    title: sample.title,
    authors: [sample.author],
    coverUrl: sample.coverUrl,
    isbn10: sample.isbn10,
    isbn13: sample.isbn13,
    pageCount: sample.pageCount,
    publishYear: Number.parseInt(sample.publishedDate, 10) || null,
    publisher: sample.publisher,
    description: sample.description,
    genres: sample.genres,
    rating: null,
    notes: null,
    dateAdded: new Date().toISOString(),
    dateFinished: null,
  };
}

/** Returns the sample library shaped exactly like an authenticated one. */
export function getGuestLibrary(): ShelfWithBooks[] {
  const books = (sampleBooks as SampleBook[]).map(toBook);

  // TODO: distribute the sample books across shelves more deliberately
  // (and seed some ratings/progress for a richer demo).
  return [
    { id: "guest-shelf-0", name: "Want to Read", position: 0, isDefault: true, books: books.slice(0, 4) },
    { id: "guest-shelf-1", name: "Currently Reading", position: 1, isDefault: true, books: books.slice(4, 6) },
    { id: "guest-shelf-2", name: "Read", position: 2, isDefault: true, books: books.slice(6) },
  ];
}

export function getGuestBook(bookId: string): Book | null {
  return (
    getGuestLibrary()
      .flatMap((shelf) => shelf.books)
      .find((book) => book.id === bookId) ?? null
  );
}
