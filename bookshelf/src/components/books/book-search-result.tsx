import type { BookResult } from "@/types/book";
import { BookCover } from "./book-cover";
import { Button } from "@/components/ui/button";

interface BookSearchResultProps {
  book: BookResult;
}

/** A single row in the search results list, with an "add to shelf" action. */
export function BookSearchResult({ book }: BookSearchResultProps) {
  return (
    <div className="flex gap-4 rounded-[var(--radius-md)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-4">
      <BookCover coverUrl={book.coverUrl} title={book.title} className="w-16 shrink-0" />
      <div className="min-w-0 flex-1">
        <h3 className="font-medium text-[var(--color-text-primary)]">{book.title}</h3>
        <p className="text-sm text-[var(--color-text-secondary)]">
          {book.authors.join(", ")}
          {book.publishYear ? ` · ${book.publishYear}` : null}
        </p>
      </div>
      {/* TODO: open a ShelfSelector to add this book to a shelf */}
      <Button variant="secondary" className="self-start">
        Add to shelf
      </Button>
    </div>
  );
}
