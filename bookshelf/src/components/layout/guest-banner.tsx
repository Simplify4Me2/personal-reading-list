import Link from "next/link";

/** "Sign up to save your data" prompt shown on every guest page. */
export function GuestBanner() {
  return (
    <div className="border-b border-[var(--color-border-subtle)] bg-[var(--color-accent-subtle)] px-4 py-2 text-center text-sm text-[var(--color-text-primary)]">
      You&apos;re browsing as a guest — changes won&apos;t be saved.{" "}
      <Link href="/signup" className="font-medium text-[var(--color-accent)] underline">
        Sign up
      </Link>{" "}
      to keep your library.
    </div>
  );
}
