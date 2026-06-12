import { notFound } from "next/navigation";
import { getGuestBook } from "@/lib/guest/data";
import { BookDetail } from "@/components/books/book-detail";

export const metadata = { title: "Book (Guest)" };

/** Guest book detail view, backed by sample data. */
export default async function GuestBookPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;
  const book = getGuestBook(bookId);

  if (!book) notFound();

  return <BookDetail book={book} />;
}
