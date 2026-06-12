import Link from "next/link";
import type { ShelfWithBooks } from "@/types/shelf";
import { BookCard } from "@/components/books/book-card";

interface ShelfSectionProps {
  shelf: ShelfWithBooks;
  /** Route prefix, e.g. "" for the app or "/guest" for guest mode. */
  basePath?: string;
}

/** Shelf header + a preview grid of its books, used on the library overview. */
export function ShelfSection({ shelf, basePath = "" }: ShelfSectionProps) {
  return (
    <section>
      <header className="mb-3 flex items-baseline justify-between">
        <h2 className="font-serif text-lg font-semibold text-[var(--color-text-primary)]">
          <Link href={`${basePath}/shelf/${shelf.id}`} className="hover:text-[var(--color-accent)]">
            {shelf.name}
          </Link>
        </h2>
        <span className="text-sm text-[var(--color-text-tertiary)]">
          {shelf.books.length} {shelf.books.length === 1 ? "book" : "books"}
        </span>
      </header>

      {shelf.books.length === 0 ? (
        <p className="rounded-[var(--radius-md)] border border-dashed border-[var(--color-border)] p-6 text-center text-sm text-[var(--color-text-tertiary)]">
          No books on this shelf yet.
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
          {shelf.books.slice(0, 6).map((book) => (
            <BookCard key={book.id} book={book} href={`${basePath}/book/${book.id}`} />
          ))}
        </div>
      )}
    </section>
  );
}
