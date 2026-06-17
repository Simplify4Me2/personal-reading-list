"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProgressBar } from "@/components/ui/progress-bar";

interface ProgressUpdaterProps {
  currentPage: number;
  pageCount: number | null;
}

/** Page input + progress bar for updating reading progress (Design Challenge 3). */
export function ProgressUpdater({ currentPage, pageCount }: ProgressUpdaterProps) {
  const percentage = pageCount ? Math.round((currentPage / pageCount) * 100) : 0;

  // TODO: wire up to useProgress to record new progress entries.
  return (
    <div className="space-y-3">
      <ProgressBar value={percentage} />
      <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
        <span>Page</span>
        <Input type="number" defaultValue={currentPage} className="w-24" min={0} max={pageCount ?? undefined} />
        {pageCount && <span>of {pageCount}</span>}
        <Button variant="secondary">Update</Button>
      </div>
    </div>
  );
}
