import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <section className="px-6 py-16 text-center">
      <h2 className="font-serif text-2xl font-semibold text-[var(--color-text-primary)]">
        Start building your library today
      </h2>
      <p className="mt-2 text-[var(--color-text-secondary)]">
        No credit card, no clutter — just your books.
      </p>
      <Link href="/signup" className="mt-6 inline-block">
        <Button>Create your account</Button>
      </Link>
    </section>
  );
}
