import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  /** Rating from 1–5, or null when unrated. */
  rating: number | null;
}

export function StarRating({ rating }: StarRatingProps) {
  return (
    <div className="flex items-center gap-0.5" aria-label={rating ? `Rated ${rating} out of 5` : "Not rated"}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={cn(
            rating && star <= rating
              ? "fill-[var(--color-rating)] text-[var(--color-rating)]"
              : "text-[var(--color-border)]",
          )}
        />
      ))}
    </div>
  );
}
