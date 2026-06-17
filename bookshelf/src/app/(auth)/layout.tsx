import Link from "next/link";

/** Minimal centered layout for login / signup / reset — no app shell. */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
      <Link href="/" className="mb-8 font-serif text-xl font-bold">
        Bookshelf
      </Link>
      <div className="w-full max-w-sm rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)]">
        {children}
      </div>
    </div>
  );
}
