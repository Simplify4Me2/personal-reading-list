import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookCoverProps {
  coverUrl: string | null;
  title: string;
  className?: string;
}

/** Cover image with a placeholder fallback when no cover is available. */
export function BookCover({ coverUrl, title, className }: BookCoverProps) {
  return (
    <div
      className={cn(
        "aspect-2/3 w-full overflow-hidden rounded-[var(--radius-sm)] bg-[var(--color-bg-tertiary)] shadow-[var(--shadow-book)]",
        className,
      )}
    >
      {coverUrl ? (
        // eslint-disable-next-line @next/next/no-img-element -- external cover URLs; switch to next/image once remotePatterns are configured
        <img src={coverUrl} alt={`Cover of ${title}`} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-[var(--color-text-tertiary)]">
          <BookOpen size={32} aria-hidden />
        </div>
      )}
    </div>
  );
}
