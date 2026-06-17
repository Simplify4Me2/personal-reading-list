import { ReadingGoal } from "@/components/stats/reading-goal";

export const metadata = { title: "Goals" };

/** Reading goals (Feature 6): set a yearly goal and track pace. */
export default function GoalsPage() {
  // TODO: load the goal via useReadingGoal and add a set/edit goal form.
  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-2xl font-semibold">Reading goals</h1>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Set a target and keep yourself on pace.
        </p>
      </header>

      <ReadingGoal goal={null} booksFinished={0} />
    </div>
  );
}
