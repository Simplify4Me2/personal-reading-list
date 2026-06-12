import type { Book } from "./book";

export interface Shelf {
  id: string;
  name: string;
  position: number;
  isDefault: boolean;
}

/** A shelf together with the books currently on it. */
export interface ShelfWithBooks extends Shelf {
  books: Book[];
}

/** Links a book to the (single) shelf it lives on. */
export interface ShelfAssignment {
  bookId: string;
  shelfId: string;
  addedAt: string;
}
