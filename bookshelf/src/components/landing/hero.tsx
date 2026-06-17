import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="flex flex-col items-center px-6 py-20 text-center sm:py-28">
      <h1 className="max-w-2xl font-serif text-4xl font-bold leading-tight text-[var(--color-text-primary)] sm:text-5xl">
        Your reading life, beautifully organised
      </h1>
      <p className="mt-4 max-w-xl text-lg text-[var(--color-text-secondary)]">
        Track what you&apos;re reading, organise your shelves, and hit your reading
        goals — all in one place.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/signup">
          <Button className="w-full sm:w-auto">Get started — it&apos;s free</Button>
        </Link>
        <Link href="/guest/library">
          <Button variant="secondary" className="w-full sm:w-auto">
            Try as Guest
          </Button>
        </Link>
      </div>
    </section>
  );
}
