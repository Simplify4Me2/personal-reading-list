interface ProgressBarProps {
  /** Progress percentage, 0–100. */
  value: number;
}

export function ProgressBar({ value }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className="h-2 w-full overflow-hidden rounded-[var(--radius-full)] bg-[var(--color-bg-tertiary)]"
    >
      <div
        className="h-full rounded-[var(--radius-full)] bg-[var(--color-progress)] transition-all"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
