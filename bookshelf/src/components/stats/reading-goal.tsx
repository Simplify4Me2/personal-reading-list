import type { ReadingGoal as ReadingGoalType } from "@/types/stats";
import { ProgressBar } from "@/components/ui/progress-bar";

interface ReadingGoalProps {
  goal: ReadingGoalType | null;
  booksFinished: number;
}

/** Yearly reading goal card: target, progress, and pace indicator. */
export function ReadingGoal({ goal, booksFinished }: ReadingGoalProps) {
  if (!goal) {
    return (
      <div className="rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border)] p-6 text-center text-sm text-[var(--color-text-tertiary)]">
        No reading goal set for this year yet.
      </div>
    );
  }

  const percentage = goal.target > 0 ? (booksFinished / goal.target) * 100 : 0;

  return (
    <div className="space-y-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
      <h3 className="font-serif text-lg font-semibold text-[var(--color-text-primary)]">
        {goal.year} Reading Goal
      </h3>
      <p className="text-sm text-[var(--color-text-secondary)]">
        {booksFinished} of {goal.target} books
      </p>
      <ProgressBar value={percentage} />
      {/* TODO: pace calculation — ahead/behind schedule indicator */}
    </div>
  );
}
