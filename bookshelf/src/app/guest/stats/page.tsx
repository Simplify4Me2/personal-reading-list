import { getGuestLibrary } from "@/lib/guest/data";
import { YearInReview } from "@/components/stats/year-in-review";

export const metadata = { title: "Stats (Guest)" };

/** Guest year-in-review, derived from the sample library. */
export default function GuestStatsPage() {
  const readShelf = getGuestLibrary().find((shelf) => shelf.name === "Read");
  const books = readShelf?.books ?? [];

  // TODO: richer demo stats once progress/rating sample data exists.
  const stats = {
    year: new Date().getFullYear(),
    booksFinished: books.length,
    pagesRead: books.reduce((sum, book) => sum + (book.pageCount ?? 0), 0),
    averageRating: null,
    topGenres: books.flatMap((book) => book.genres).slice(0, 1),
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-2xl font-semibold">Your year in books</h1>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Sample statistics — sign up to track your own reading.
        </p>
      </header>

      <YearInReview stats={stats} />
    </div>
  );
}
