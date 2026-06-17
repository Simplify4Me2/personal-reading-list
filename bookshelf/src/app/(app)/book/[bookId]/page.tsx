export const metadata = { title: "Book" };

/** Book detail view (Feature 3): metadata, shelf, rating, notes, progress. */
export default async function BookPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;

  // TODO: load the book and render <BookDetail>, plus shelf selector,
  // progress updater, and notes editor.
  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-2xl font-semibold">Book details</h1>
        <p className="text-sm text-[var(--color-text-secondary)]">Book ID: {bookId}</p>
      </header>

      <p className="rounded-[var(--radius-md)] border border-dashed border-[var(--color-border)] p-8 text-center text-sm text-[var(--color-text-tertiary)]">
        The book&apos;s details will appear here.
      </p>
    </div>
  );
}
