import type { YearStats } from "@/types/stats";

interface YearInReviewProps {
  stats: YearStats;
}

/** Year-in-review summary cards (Design Challenge 1). */
export function YearInReview({ stats }: YearInReviewProps) {
  const cards = [
    { label: "Books finished", value: String(stats.booksFinished) },
    { label: "Pages read", value: stats.pagesRead.toLocaleString() },
    { label: "Average rating", value: stats.averageRating?.toFixed(1) ?? "—" },
    { label: "Top genre", value: stats.topGenres[0] ?? "—" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
        >
          <p className="font-serif text-2xl font-semibold text-[var(--color-text-primary)]">
            {card.value}
          </p>
          <p className="text-sm text-[var(--color-text-secondary)]">{card.label}</p>
        </div>
      ))}
    </div>
  );
}
