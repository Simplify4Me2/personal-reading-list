import { NextResponse } from "next/server";
import { getOpenLibraryBook } from "@/lib/books/open-library";

/**
 * GET /api/books/:id
 * Fetches full details for a single book from the external API.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const book = await getOpenLibraryBook(id);

  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  return NextResponse.json(book);
}
