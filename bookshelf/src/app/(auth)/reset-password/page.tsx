import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata = { title: "Reset password" };

export default function ResetPasswordPage() {
  // TODO: wire up Supabase auth (send password-reset email).
  return (
    <div className="space-y-4">
      <h1 className="font-serif text-xl font-semibold">Reset your password</h1>
      <p className="text-sm text-[var(--color-text-secondary)]">
        Enter your email and we&apos;ll send you a reset link.
      </p>

      <form className="space-y-3">
        <Input type="email" name="email" placeholder="Email" autoComplete="email" required />
        <Button type="submit" className="w-full">
          Send reset link
        </Button>
      </form>

      <Link href="/login" className="block text-sm text-[var(--color-accent)] hover:underline">
        Back to log in
      </Link>
    </div>
  );
}
