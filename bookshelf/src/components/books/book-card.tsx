import Link from "next/link";
import type { Book } from "@/types/book";
import { BookCover } from "./book-cover";

interface BookCardProps {
  book: Book;
  /** Where the card links to — defaults to the authenticated book route. */
  href?: string;
}

/** Grid thumbnail: cover + title + author. */
export function BookCard({ book, href }: BookCardProps) {
  return (
    <Link href={href ?? `/book/${book.id}`} className="group block w-full">
      <BookCover coverUrl={book.coverUrl} title={book.title} />
      <p className="mt-2 line-clamp-2 text-sm font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)]">
        {book.title}
      </p>
      <p className="line-clamp-1 text-xs text-[var(--color-text-secondary)]">
        {book.authors.join(", ")}
      </p>
    </Link>
  );
}
