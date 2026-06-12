export const metadata = { title: "Shelf" };

/** Single shelf view (Feature 2): all books on one shelf + shelf management. */
export default async function ShelfPage({
  params,
}: {
  params: Promise<{ shelfId: string }>;
}) {
  const { shelfId } = await params;

  // TODO: load the shelf and its books, render the full book grid and
  // rename/delete actions for custom shelves.
  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-2xl font-semibold">Shelf</h1>
        <p className="text-sm text-[var(--color-text-secondary)]">Shelf ID: {shelfId}</p>
      </header>

      <p className="rounded-[var(--radius-md)] border border-dashed border-[var(--color-border)] p-8 text-center text-sm text-[var(--color-text-tertiary)]">
        The books on this shelf will appear here.
      </p>
    </div>
  );
}
