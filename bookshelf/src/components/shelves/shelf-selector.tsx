"use client";

import type { Shelf } from "@/types/shelf";

interface ShelfSelectorProps {
  shelves: Shelf[];
  value: string | null;
  onChange: (shelfId: string) => void;
}

/** Dropdown to move a book between shelves. */
export function ShelfSelector({ shelves, value, onChange }: ShelfSelectorProps) {
  return (
    <select
      value={value ?? ""}
      onChange={(event) => onChange(event.target.value)}
      className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text-primary)]"
    >
      <option value="" disabled>
        Choose a shelf…
      </option>
      {shelves.map((shelf) => (
        <option key={shelf.id} value={shelf.id}>
          {shelf.name}
        </option>
      ))}
    </select>
  );
}
