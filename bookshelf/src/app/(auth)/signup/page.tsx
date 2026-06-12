import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata = { title: "Sign up" };

export default function SignupPage() {
  // TODO: wire up Supabase auth (sign up with email + password).
  return (
    <div className="space-y-4">
      <h1 className="font-serif text-xl font-semibold">Create your account</h1>

      <form className="space-y-3">
        <Input type="text" name="displayName" placeholder="Display name" autoComplete="name" />
        <Input type="email" name="email" placeholder="Email" autoComplete="email" required />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="new-password"
          required
        />
        <Button type="submit" className="w-full">
          Sign up
        </Button>
      </form>

      <p className="text-sm text-[var(--color-text-secondary)]">
        Already have an account?{" "}
        <Link href="/login" className="text-[var(--color-accent)] hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
