import type { Book } from "@/types/book";
import { BookCover } from "./book-cover";
import { StarRating } from "@/components/ui/star-rating";
import { Badge } from "@/components/ui/badge";

interface BookDetailProps {
  book: Book;
}

/** Full book detail view: metadata, rating, notes. Shared by app + guest routes. */
export function BookDetail({ book }: BookDetailProps) {
  return (
    <article className="flex flex-col gap-8 sm:flex-row">
      <BookCover coverUrl={book.coverUrl} title={book.title} className="w-40 shrink-0 sm:w-48" />

      <div className="min-w-0 flex-1 space-y-4">
        <header>
          <h1 className="font-serif text-2xl font-semibold text-[var(--color-text-primary)]">
            {book.title}
          </h1>
          <p className="text-[var(--color-text-secondary)]">{book.authors.join(", ")}</p>
        </header>

        <StarRating rating={book.rating} />

        <div className="flex flex-wrap gap-2">
          {book.genres.map((genre) => (
            <Badge key={genre}>{genre}</Badge>
          ))}
        </div>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-[var(--color-text-secondary)]">
          {book.pageCount && (
            <>
              <dt className="font-medium">Pages</dt>
              <dd>{book.pageCount}</dd>
            </>
          )}
          {book.publishYear && (
            <>
              <dt className="font-medium">Published</dt>
              <dd>{book.publishYear}</dd>
            </>
          )}
          {book.publisher && (
            <>
              <dt className="font-medium">Publisher</dt>
              <dd>{book.publisher}</dd>
            </>
          )}
        </dl>

        {book.description && (
          <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
            {book.description}
          </p>
        )}

        {/* TODO: shelf selector, progress updater, and editable notes */}
      </div>
    </article>
  );
}
