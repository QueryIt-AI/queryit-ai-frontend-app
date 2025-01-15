'use client';

import { useAuth, SignInButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function AuthCheck() {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && userId) {
      router.push('/dashboard');
    }
  }, [isLoaded, userId, router]);

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="mt-10 flex items-center justify-center gap-x-6">
      <SignInButton mode="modal">
        <button className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Sign In
        </button>
      </SignInButton>
      <Link
        href="/waitlist"
        className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600"
      >
        Join Waitlist <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
