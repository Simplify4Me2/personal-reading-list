import { getGuestLibrary } from "@/lib/guest/data";
import { ShelfSection } from "@/components/shelves/shelf-section";

export const metadata = { title: "Library (Guest)" };

/** Guest library overview — same layout as the real one, backed by sample data. */
export default function GuestLibraryPage() {
  const shelves = getGuestLibrary();

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-2xl font-semibold">My Library</h1>
        <p className="text-sm text-[var(--color-text-secondary)]">
          A sample library to explore — sign up to build your own.
        </p>
      </header>

      {shelves.map((shelf) => (
        <ShelfSection key={shelf.id} shelf={shelf} basePath="/guest" />
      ))}
    </div>
  );
}
