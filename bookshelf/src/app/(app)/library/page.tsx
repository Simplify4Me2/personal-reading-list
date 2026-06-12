export const metadata = { title: "Library" };

/** Library overview (Feature 4): all shelves with book previews + totals. */
export default function LibraryPage() {
  // TODO: load the user's shelves + books and render a <ShelfSection> per shelf.
  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-2xl font-semibold">My Library</h1>
        <p className="text-sm text-[var(--color-text-secondary)]">
          All your shelves at a glance.
        </p>
      </header>

      <p className="rounded-[var(--radius-md)] border border-dashed border-[var(--color-border)] p-8 text-center text-sm text-[var(--color-text-tertiary)]">
        Your shelves will appear here once the library is wired up.
      </p>
    </div>
  );
}
