import { Badge } from "@/components/ui/badge";

interface ProgressBadgeProps {
  /** Progress percentage, 0–100. */
  percentage: number;
}

/** Inline "42%" badge shown on book covers for books in progress. */
export function ProgressBadge({ percentage }: ProgressBadgeProps) {
  return <Badge>{Math.round(percentage)}%</Badge>;
}
