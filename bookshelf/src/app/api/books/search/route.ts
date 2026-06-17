import { NextResponse, type NextRequest } from "next/server";
import { searchOpenLibrary } from "@/lib/books/open-library";

/**
 * GET /api/books/search?q=...
 * Proxies the external book APIs server-side and returns normalised
 * BookResult[] — the browser never calls Open Library / Google Books directly.
 */
export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim();

  if (!query) {
    return NextResponse.json({ error: "Missing query parameter 'q'" }, { status: 400 });
  }

  // TODO: add caching, rate-limiting, and a Google Books fallback.
  const results = await searchOpenLibrary(query);

  return NextResponse.json({ results, total: results.length });
}
