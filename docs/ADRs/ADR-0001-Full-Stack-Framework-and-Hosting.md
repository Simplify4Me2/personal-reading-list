# ADR-0001: Adopt Next.js (React) + Supabase + Vercel for Full-Stack Implementation

**Status:** Accepted  
**Date:** 2026-06-09  
**Author:** Simon  
**Scope:** Backend, Frontend, Auth, Database, Deployment

---

## Context

Bookshelf is a full-stack product requiring:
- A real database (Postgres) for relational data (users, books, shelves, progress history, goals, ratings)
- Managed authentication (sign up, sign in, password reset, session persistence)
- Server-side API layer to protect sensitive keys (Google Books API) and cache/throttle book API calls (Open Library rate limits: ~1 req/sec)
- Performance targets: landing page TTI < 2s, library load < 3s, Lighthouse Perf > 85
- A live, deployed product with aggressive free-tier cost constraints (ideally $0)
- Guest mode serving pre-populated sample data without database hits

The developer has React experience (coming from .NET, Angular, JavaScript frameworks) and is open to learning new technologies aligned with market trends.

---

## Decision

We will build Bookshelf as a **Next.js (App Router) full-stack application**, with **Supabase Postgres** for the database and managed authentication, deployed to **Vercel** (Hobby tier).

**Architecture:**
- Frontend: React components in Next.js App Router
- API layer: Next.js Route Handlers (server-side) for book API integration, user data queries, and protected endpoints
- Authentication: Supabase Auth (email/password, password reset, session management)
- Database: Supabase Postgres (relational schema for users, books, shelves, shelf assignments, progress history, goals, ratings, preferences)
- Hosting: Vercel (frontend + API) + Supabase (database + auth)
- Guest mode: served from static `data/sample-books.json` with no database dependency

---

## Consequences

**Positive outcomes:**
- Lowest learning delta: React knowledge transfers directly; new concepts (Server Components, Server Actions, Vercel deployment) are incremental and well-documented
- Excellent ecosystem and documentation: Next.js has the largest community for full-stack JS and highest AI-assistant coverage
- Strongest job market signal: Next.js + React is the dominant stack in job listings and hiring
- Performance targets are achievable by default: `next/image` handles cover-image lazy-loading and sizing; SSR/streaming supports < 2s TTI
- API problem solved in-framework: Route Handlers are server-side by default, so Google Books API keys never reach the client
- Auth + database from one provider: Supabase gives us Postgres + managed auth in one integration, simplifying env vars and dashboard overhead
- True $0 cost: Vercel Hobby + Supabase free tier = no credit card required
- Portfolio value: This stack is recognized and respected by hiring managers and the broader developer community

**Negative outcomes / trade-offs:**
- Supabase free tier pauses a project after ~7 days of inactivity; a cold visitor to a deployed project may hit a paused database. Mitigation: (a) guest mode bypasses the DB entirely, (b) a scheduled ping/keep-alive prevents idle pause
- App Router learning curve: the server/client component boundary is new mental model; easy to trip over early
- Vercel Hobby tier is non-commercial; fine for portfolio projects, not suitable for a commercial product later

**Dependencies:**
- Commits us to JavaScript-first tooling (linting, type-checking, build process)
- Supabase free tier means we'll need to design the guest experience defensively (static JSON fallback)
- Vercel deployment means we're tied to Vercel's cold-start behavior and function limits (generous, but a hard boundary exists)

---

## Alternatives Considered

- **SvelteKit + Supabase + Vercel/Cloudflare:** Same free-tier hosting, same Supabase backend, smaller ecosystem. Pros: highest satisfaction ratings, less boilerplate. Cons: fewer Q&A resources, smaller job market, steeper learning curve for someone new to meta-frameworks. Not chosen because the React expertise and ecosystem dominance justify staying in the React ecosystem for this portfolio piece.

- **ASP.NET Core Web API + React SPA + Fly.io:** Leverages .NET expertise. Pros: fast backend work, strong portfolio signal for .NET roles. Cons: free hosting is fragmented (cold-start pain on Render, no permanent free tier on Azure, Fly.io requires a payment card), two deployables instead of one, doesn't scratch the "try something aligned with market trends" goal. Not chosen because free tier overhead outweighs expertise advantage for a portfolio project.

- **Remix + Supabase:** Similar to Next.js but smaller ecosystem. Pros: strong data-loading architecture. Cons: Remix is acquired by Shopify and transitioning; community clarity is in flux. Not chosen because Next.js ecosystem clarity and stability are stronger right now.

---

## Related ADRs

- [ADR-0002](./ADR-0002-Database-Schema-Design.md) — Database schema and relational design (blocked by this decision)
- [ADR-0003](./ADR-0003-Book-API-Caching-Strategy.md) — Book API caching and stale data handling (depends on Route Handlers architecture)
- [ADR-0004](./ADR-0004-Guest-Mode-Implementation.md) — Guest mode data serving (depends on static JSON fallback strategy)

---

## Follow-up

- **Database schema design (ADR-0002):** TBD after this decision. Will document the Postgres schema for books, shelves, and progress history.
- **Book API caching strategy (ADR-0003):** TBD. Will document whether we cache API responses in the database and how we handle stale data.
- **Guest mode implementation (ADR-0004):** TBD. Will document the static JSON structure and how it's served without DB dependencies.
