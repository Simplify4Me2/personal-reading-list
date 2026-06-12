import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata = { title: "Log in" };

export default function LoginPage() {
  // TODO: wire up Supabase auth (sign in with email + password).
  return (
    <div className="space-y-4">
      <h1 className="font-serif text-xl font-semibold">Welcome back</h1>

      <form className="space-y-3">
        <Input type="email" name="email" placeholder="Email" autoComplete="email" required />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="current-password"
          required
        />
        <Button type="submit" className="w-full">
          Log in
        </Button>
      </form>

      <div className="flex justify-between text-sm">
        <Link href="/reset-password" className="text-[var(--color-text-secondary)] hover:underline">
          Forgot password?
        </Link>
        <Link href="/signup" className="text-[var(--color-accent)] hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
}
