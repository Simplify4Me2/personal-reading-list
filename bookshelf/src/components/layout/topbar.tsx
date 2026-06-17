import Link from "next/link";
import { Button } from "@/components/ui/button";

interface TopbarProps {
  /** True when rendered inside the guest shell. */
  isGuest?: boolean;
}

export function Topbar({ isGuest = false }: TopbarProps) {
  return (
    <header className="flex h-14 items-center justify-between border-b border-[var(--color-border-subtle)] bg-[var(--color-surface)] px-4 sm:px-6">
      {/* TODO: mobile nav toggle + global search input */}
      <div />
      <div className="flex items-center gap-3">
        {isGuest ? (
          <Link href="/signup">
            <Button>Sign up</Button>
          </Link>
        ) : (
          // TODO: user menu (profile, preferences, sign out)
          <div
            className="h-8 w-8 rounded-[var(--radius-full)] bg-[var(--color-bg-tertiary)]"
            aria-label="User menu placeholder"
          />
        )}
      </div>
    </header>
  );
}
