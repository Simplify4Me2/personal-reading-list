# Bookshelf — Implementation Guide

This guide covers everything you need to scaffold, configure, and lay the architectural foundation of the app. Follow the phases in order — each phase is a stable stopping point.

**Assumed stack:** Next.js (App Router) + Supabase (Postgres + Auth) + Vercel  
**Reference:** [ADR-0001](./ADRs/ADR-0001-Full-Stack-Framework-and-Hosting.md)

---

## Phase 0 — Prerequisites

Before writing any app code, get these accounts and tools ready.

### Accounts

| Service | What for | Cost |
|---------|----------|------|
| [Vercel](https://vercel.com) | Hosting (frontend + API) | Free (Hobby) |
| [Supabase](https://supabase.com) | Postgres + Auth | Free tier |
| [Open Library](https://openlibrary.org/developers) | Book search API | Free, no key |
| [Google Books API](https://developers.google.com/books) | Alternative/supplemental book API | Free quota |
| [GitHub](https://github.com) | Source control + Vercel integration | Free |

### Local Tools

```bash
node --version       # 20+ required for Next.js 15
npm --version        # 10+ (or pnpm / bun)
git --version
```

Install the Supabase CLI (used later for migrations):

```bash
npm install -g supabase
```

---

## Phase 1 — Project Scaffold

### 1.1 Create the Next.js App

```bash
npx create-next-app@latest bookshelf \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"
```

Flags explained:
- `--app` — uses App Router (required for our architecture)
- `--src-dir` — keeps app code under `src/` for a cleaner root
- `--typescript` — strongly recommended; catches type errors in Supabase queries early

### 1.2 Install Core Dependencies

```bash
# Supabase
npm install @supabase/supabase-js @supabase/ssr

# UI & icons
npm install lucide-react

# Form handling & validation
npm install react-hook-form zod @hookform/resolvers

# Data fetching (optional — you can use native fetch + server components)
npm install swr  # or: npm install @tanstack/react-query

# Utilities
npm install clsx tailwind-merge date-fns
```

### 1.3 Folder Structure

After scaffolding, shape the `src/` directory to match this structure:

```
src/
├── app/                          # Next.js App Router — pages & API
│   ├── (auth)/                   # Route group: login, signup, reset
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   ├── reset-password/
│   │   │   └── page.tsx
│   │   └── layout.tsx            # Minimal layout (no nav sidebar)
│   │
│   ├── (app)/                    # Route group: authenticated app
│   │   ├── library/
│   │   │   └── page.tsx          # Library overview (Feature 4)
│   │   ├── shelf/
│   │   │   └── [shelfId]/
│   │   │       └── page.tsx      # Single shelf view (Feature 2)
│   │   ├── book/
│   │   │   └── [bookId]/
│   │   │       └── page.tsx      # Book detail view (Feature 3)
│   │   ├── search/
│   │   │   └── page.tsx          # Book discovery & search (Feature 1)
│   │   ├── stats/
│   │   │   └── page.tsx          # Year-in-review & statistics (Design Challenge 1)
│   │   ├── goals/
│   │   │   └── page.tsx          # Reading goals (Feature 6)
│   │   └── layout.tsx            # App shell: sidebar + topbar
│   │
│   ├── guest/                    # Guest mode (no auth required)
│   │   ├── library/
│   │   │   └── page.tsx
│   │   ├── book/
│   │   │   └── [bookId]/
│   │   │       └── page.tsx
│   │   ├── stats/
│   │   │   └── page.tsx
│   │   └── layout.tsx            # Same app shell but with "Sign up" prompts
│   │
│   ├── api/                      # Route Handlers (server-side API)
│   │   ├── books/
│   │   │   └── search/
│   │   │       └── route.ts      # Proxies Open Library / Google Books
│   │   └── books/
│   │       └── [id]/
│   │           └── route.ts      # Fetch single book details
│   │
│   ├── layout.tsx                # Root layout (fonts, metadata, theme)
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Imports tokens.css + Tailwind base
│
├── components/
│   ├── ui/                       # Generic, reusable primitives
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── modal.tsx
│   │   ├── progress-bar.tsx
│   │   ├── star-rating.tsx
│   │   ├── skeleton.tsx
│   │   └── badge.tsx
│   │
│   ├── books/                    # Book-specific components
│   │   ├── book-card.tsx         # Cover + title + author (grid thumbnail)
│   │   ├── book-cover.tsx        # Cover image with placeholder fallback
│   │   ├── book-search-result.tsx
│   │   └── book-detail.tsx
│   │
│   ├── shelves/                  # Shelf components
│   │   ├── shelf-section.tsx     # Shelf header + book grid preview
│   │   ├── shelf-selector.tsx    # Dropdown to move book between shelves
│   │   └── shelf-manager.tsx     # Create/rename/delete custom shelves
│   │
│   ├── progress/                 # Reading progress components
│   │   ├── progress-updater.tsx  # Page input + progress bar (Design Challenge 3)
│   │   └── progress-badge.tsx    # Inline "42%" badge on book covers
│   │
│   ├── stats/                    # Statistics & year-in-review (Design Challenge 1)
│   │   ├── reading-goal.tsx
│   │   └── year-in-review.tsx
│   │
│   ├── layout/                   # App shell components
│   │   ├── sidebar.tsx
│   │   ├── topbar.tsx
│   │   └── guest-banner.tsx      # "Sign up to save your data" prompt
│   │
│   └── landing/                  # Landing page sections
│       ├── hero.tsx
│       ├── features.tsx
│       └── cta.tsx
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts             # Browser Supabase client (for client components)
│   │   ├── server.ts             # Server Supabase client (for server components, Route Handlers)
│   │   └── middleware.ts         # Session refresh helper
│   │
│   ├── books/
│   │   ├── open-library.ts       # Open Library API client
│   │   ├── google-books.ts       # Google Books API client (optional)
│   │   └── normalize.ts          # Normalise API responses to a shared BookResult type
│   │
│   ├── guest/
│   │   └── data.ts               # Loads & transforms data/sample-books.json
│   │
│   └── utils.ts                  # clsx/twMerge helpers, date formatting, etc.
│
├── types/
│   ├── book.ts                   # Book, BookResult, BookSearchResult
│   ├── shelf.ts                  # Shelf, ShelfAssignment
│   ├── user.ts                   # UserProfile, UserPreferences
│   └── stats.ts                  # ReadingGoal, YearStats, ProgressEntry
│
├── hooks/
│   ├── use-library.ts            # Fetch + mutate user's library
│   ├── use-shelf.ts              # Shelf CRUD
│   ├── use-progress.ts           # Reading progress updates
│   ├── use-search.ts             # Debounced book API search
│   └── use-reading-goal.ts       # Goal fetch + progress calc
│
└── middleware.ts                 # Next.js middleware — auth session refresh + route protection
```

---

## Phase 2 — Environment & Configuration

### 2.1 Environment Variables

Create `.env.local` (never commit this):

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Only needed if using Google Books (keep server-side only — no NEXT_PUBLIC_)
GOOGLE_BOOKS_API_KEY=your-google-books-key
```

`NEXT_PUBLIC_` variables are exposed to the browser. The Google Books key must stay server-side — it's used only in `src/app/api/books/search/route.ts`.

### 2.2 Supabase Clients

Two clients are needed: one for server components/Route Handlers, one for client components. The `@supabase/ssr` package handles cookie-based sessions correctly for both.

**`src/lib/supabase/server.ts`** — used in Server Components, Route Handlers, and middleware:

```ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )
}
```

**`src/lib/supabase/client.ts`** — used in Client Components:

```ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

### 2.3 Middleware (Route Protection + Session Refresh)

**`src/middleware.ts`** — runs on every request to refresh sessions and protect routes:

```ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Redirect unauthenticated users away from protected routes
  if (!user && request.nextUrl.pathname.startsWith('/library')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
}
```

---

## Phase 3 — Database Schema

Set up Supabase tables via the SQL editor or migration files. This is the core schema — expand as needed.

```sql
-- Users are managed by Supabase Auth (auth.users table)
-- This table extends auth.users with app-specific profile data
create table public.profiles (
  id          uuid references auth.users(id) on delete cascade primary key,
  display_name text,
  created_at  timestamptz default now()
);

create table public.books (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references auth.users(id) on delete cascade not null,
  -- API source data (normalised and cached locally)
  api_id        text not null,           -- Open Library work ID or Google Books ID
  api_source    text not null,           -- 'open_library' | 'google_books'
  title         text not null,
  authors       text[] not null default '{}',
  cover_url     text,
  isbn_10       text,
  isbn_13       text,
  page_count    int,
  publish_year  int,
  publisher     text,
  description   text,
  genres        text[] default '{}',
  -- User data
  rating        int check (rating between 1 and 5),
  notes         text,
  date_added    timestamptz default now(),
  date_finished timestamptz,
  unique (user_id, api_id, api_source)  -- prevent duplicate books per user
);

create table public.shelves (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete cascade not null,
  name        text not null,
  position    int not null default 0,
  is_default  boolean not null default false
);

-- Each book belongs to exactly one shelf
create table public.shelf_books (
  book_id   uuid references public.books(id) on delete cascade primary key,
  shelf_id  uuid references public.shelves(id) on delete restrict not null,
  added_at  timestamptz default now()
);

-- Progress history (not just current page — enables stats like pages/week)
create table public.reading_progress (
  id          uuid primary key default gen_random_uuid(),
  book_id     uuid references public.books(id) on delete cascade not null,
  user_id     uuid references auth.users(id) on delete cascade not null,
  page        int not null,
  percentage  numeric(5,2),             -- computed or manual fallback for books without page count
  recorded_at timestamptz default now()
);

create table public.reading_goals (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references auth.users(id) on delete cascade not null,
  year          int not null,
  target        int not null,
  completed_at  timestamptz,
  unique (user_id, year)
);

create table public.user_preferences (
  user_id             uuid references auth.users(id) on delete cascade primary key,
  theme               text default 'system',   -- 'light' | 'dark' | 'system'
  default_shelf_id    uuid references public.shelves(id) on delete set null
);
```

**Indexes to add for performance:**

```sql
create index on public.books (user_id);
create index on public.shelf_books (shelf_id);
create index on public.reading_progress (book_id, recorded_at desc);
create index on public.reading_goals (user_id, year);
```

**Row-Level Security (required for Supabase — enables safe direct DB access from client):**

```sql
alter table public.books enable row level security;
alter table public.shelves enable row level security;
alter table public.shelf_books enable row level security;
alter table public.reading_progress enable row level security;
alter table public.reading_goals enable row level security;
alter table public.user_preferences enable row level security;

-- Example: users can only see and modify their own data
create policy "users own their books"
  on public.books for all
  using (auth.uid() = user_id);
-- Repeat similar policies for other tables
```

**Default shelves trigger** — auto-create default shelves when a user signs up:

```sql
create function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id) values (new.id);
  insert into public.shelves (user_id, name, position, is_default) values
    (new.id, 'Want to Read',      0, true),
    (new.id, 'Currently Reading', 1, true),
    (new.id, 'Read',              2, true);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

---

## Phase 4 — Design Tokens

Copy the provided starter files into your project. The tokens are the source of truth for all visual decisions — use them instead of hardcoded hex values or pixel values.

```
src/
└── app/
    └── globals.css   ← import tokens here
```

```css
/* globals.css */
@import '../../starter/tokens.css';   /* adjust path if needed */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Load fonts in the root layout:

```tsx
// src/app/layout.tsx
import { Lora, Inter } from 'next/font/google'

const lora = Lora({ subsets: ['latin'], variable: '--font-lora' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${lora.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

---

## Phase 5 — Book API Integration

The book search API is always called server-side — never directly from the browser. This protects any API keys and lets you control rate-limiting and caching.

### Data Flow

```
Browser → Route Handler (/api/books/search) → Open Library API → normalise → Browser
```

### Shared Type

Define a normalised `BookResult` type so you're not dependent on either API's response shape throughout the app:

```ts
// src/types/book.ts
export interface BookResult {
  apiId: string
  apiSource: 'open_library' | 'google_books'
  title: string
  authors: string[]
  coverUrl: string | null
  isbn10: string | null
  isbn13: string | null
  pageCount: number | null
  publishYear: number | null
  publisher: string | null
  description: string | null
  genres: string[]
}
```

### Route Handler Structure

`src/app/api/books/search/route.ts` accepts `?q=` and returns an array of `BookResult`. This is where you:
- Call the external API
- Normalise the response via `src/lib/books/normalize.ts`
- Handle missing fields gracefully
- Return a consistent shape regardless of which API responded

---

## Phase 6 — Guest Mode

Guest mode is the most-visited path — it's the URL you submit for portfolio review. It must never hit the database and must work even if Supabase is paused.

**How it works:**

1. "Try as Guest" button on the landing page navigates to `/guest/library`
2. `/guest/layout.tsx` does **not** check auth — it's fully public
3. Data is loaded from `data/sample-books.json` via `src/lib/guest/data.ts`
4. Guest writes (moving books, updating progress) are held in-memory for the session — nothing persists
5. A `GuestBanner` component appears on every guest page prompting sign-up

**`src/lib/guest/data.ts`** — the single entry point for all guest data:

```ts
import sampleBooks from '../../../data/sample-books.json'

export function getGuestLibrary() {
  // Transform the raw JSON into the same shape your authenticated
  // components expect — same types, same shelf structure
}
```

Using the same types and components for both authenticated and guest views means components don't need to know which mode they're in.

---

## Phase 7 — Vercel Deployment

### Connect GitHub → Vercel

1. Push the repo to GitHub
2. Import the project on vercel.com
3. Framework preset: **Next.js** (auto-detected)
4. Add environment variables in the Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `GOOGLE_BOOKS_API_KEY` (if using)

### Supabase: Prevent Free-Tier Pausing

Supabase pauses inactive free-tier projects after ~7 days. Since guest mode doesn't touch the DB, the live URL stays functional — but authenticated users would hit an error.

**Mitigation options (pick one):**
- Add a lightweight `/api/health` Route Handler that pings Supabase, then schedule a free external cron service (e.g., cron-job.org) to hit it every 5 days
- Upgrade to Supabase Pro ($25/mo) when actively developing or sharing the link

---

## Build Order Reference

This maps the phases above to the features in `spec/core-requirements.md`. Tackle them in this order:

| Order | What to Build | Spec Feature |
|-------|--------------|-------------|
| 1 | Auth: sign up, sign in, sign out, password reset, session persistence | Feature 8 |
| 2 | Database: schema + RLS + default shelves trigger | Feature 11 |
| 3 | Landing page + guest mode (static JSON, no DB) | Features 9, 10 |
| 4 | Library overview: shelves with book previews, totals | Feature 4 |
| 5 | Book search: API Route Handler + search UI + add to shelf | Feature 1 |
| 6 | Shelf management: create, rename, delete, move books | Feature 2 |
| 7 | Book detail view: metadata, shelf, rating, notes | Feature 3 |
| 8 | Reading progress: page input, progress bar, history | Feature 5 |
| 9 | Reading goal: set goal, pace calculation, visual indicator | Feature 6 |
| 10 | Responsive design: adapt all layouts for mobile | Feature 7 |
| 11 | Error handling: API failures, empty states, edge cases | Feature 12 |
| — | Stretch features (stats, dark mode, Goodreads import) | Features 13–19 |

---

## Related ADRs

- [ADR-0001](./ADRs/ADR-0001-Full-Stack-Framework-and-Hosting.md) — Stack and hosting decision (this guide implements it)
