import Link from "next/link";
import { Library, Search, BarChart3, Target, BookMarked } from "lucide-react";

interface SidebarProps {
  /** Route prefix, e.g. "" for the app or "/guest" for guest mode. */
  basePath?: string;
}

const navItems = [
  { label: "Library", href: "/library", icon: Library },
  { label: "Search", href: "/search", icon: Search },
  { label: "Stats", href: "/stats", icon: BarChart3 },
  { label: "Goals", href: "/goals", icon: Target },
];

export function Sidebar({ basePath = "" }: SidebarProps) {
  // Guest mode only exposes a subset of routes (no /search or /goals yet).
  const items = basePath
    ? navItems.filter((item) => ["/library", "/stats"].includes(item.href))
    : navItems;

  return (
    <aside className="hidden w-[var(--sidebar-width)] shrink-0 flex-col border-r border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)] p-4 md:flex">
      <Link
        href="/"
        className="mb-8 flex items-center gap-2 font-serif text-lg font-bold text-[var(--color-text-primary)]"
      >
        <BookMarked size={20} className="text-[var(--color-accent)]" />
        Bookshelf
      </Link>

      <nav className="flex flex-col gap-1">
        {items.map((item) => (
          <Link
            key={item.href}
            href={`${basePath}${item.href}`}
            className="flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]"
          >
            <item.icon size={18} />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
