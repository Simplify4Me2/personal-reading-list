"use client";

import type { Shelf } from "@/types/shelf";
import { Button } from "@/components/ui/button";

interface ShelfManagerProps {
  shelves: Shelf[];
}

/** Create, rename, and delete custom shelves (default shelves are locked). */
export function ShelfManager({ shelves }: ShelfManagerProps) {
  // TODO: wire up create/rename/delete via useShelf once persistence exists.
  return (
    <div className="space-y-3">
      <ul className="divide-y divide-[var(--color-border-subtle)] rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)]">
        {shelves.map((shelf) => (
          <li key={shelf.id} className="flex items-center justify-between px-4 py-3 text-sm">
            <span className="text-[var(--color-text-primary)]">{shelf.name}</span>
            {shelf.isDefault && (
              <span className="text-xs text-[var(--color-text-tertiary)]">Default</span>
            )}
          </li>
        ))}
      </ul>
      <Button variant="secondary">New shelf</Button>
    </div>
  );
}
