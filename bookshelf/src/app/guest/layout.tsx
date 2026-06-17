import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { GuestBanner } from "@/components/layout/guest-banner";

/**
 * Guest mode shell — same app shell as (app), but fully public (no auth
 * checks, never touches the database) and with sign-up prompts.
 */
export default function GuestLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col">
      <GuestBanner />
      <div className="flex flex-1">
        <Sidebar basePath="/guest" />
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar isGuest />
          <main className="mx-auto w-full max-w-[var(--library-max-width)] flex-1 px-4 py-8 sm:px-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
