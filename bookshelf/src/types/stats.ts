export interface ReadingGoal {
  id: string;
  year: number;
  target: number;
  completedAt: string | null;
}

/** A single reading-progress entry for a book (history, not just current page). */
export interface ProgressEntry {
  id: string;
  bookId: string;
  page: number;
  percentage: number | null;
  recordedAt: string;
}

/** Aggregated stats for the year-in-review view. */
export interface YearStats {
  year: number;
  booksFinished: number;
  pagesRead: number;
  averageRating: number | null;
  topGenres: string[];
}
