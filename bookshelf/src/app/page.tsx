import Link from "next/link";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Cta } from "@/components/landing/cta";

export default function LandingPage() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between px-6 py-4">
        <span className="font-serif text-lg font-bold">Bookshelf</span>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/login" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">
            Log in
          </Link>
          <Link href="/signup" className="font-medium text-[var(--color-accent)]">
            Sign up
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        <Hero />
        <Features />
        <Cta />
      </main>

      <footer className="border-t border-[var(--color-border-subtle)] px-6 py-6 text-center text-sm text-[var(--color-text-tertiary)]">
        Bookshelf — a personal reading list.
      </footer>
    </div>
  );
}
