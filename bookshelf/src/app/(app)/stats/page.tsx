export const metadata = { title: "Stats" };

/** Year-in-review & statistics (Design Challenge 1). */
export default function StatsPage() {
  // TODO: compute YearStats from the user's reading history and render
  // <YearInReview> and supporting charts.
  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-2xl font-semibold">Your year in books</h1>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Reading statistics and highlights.
        </p>
      </header>

      <p className="rounded-[var(--radius-md)] border border-dashed border-[var(--color-border)] p-8 text-center text-sm text-[var(--color-text-tertiary)]">
        Your reading stats will appear here.
      </p>
    </div>
  );
}
