import { Input } from "@/components/ui/input";

export const metadata = { title: "Search" };

/** Book discovery & search (Feature 1): search the book API, add to shelves. */
export default function SearchPage() {
  // TODO: turn this into a client component (or extract one) that uses
  // useSearch() and renders <BookSearchResult> rows.
  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-2xl font-semibold">Find a book</h1>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Search by title, author, or ISBN.
        </p>
      </header>

      <Input type="search" placeholder="Search books…" className="max-w-lg" />

      <p className="rounded-[var(--radius-md)] border border-dashed border-[var(--color-border)] p-8 text-center text-sm text-[var(--color-text-tertiary)]">
        Search results will appear here.
      </p>
    </div>
  );
}
