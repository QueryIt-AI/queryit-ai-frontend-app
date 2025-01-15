import { SignUpButton } from "@clerk/nextjs";

export default function WaitlistPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Join Our Waitlist
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Be among the first to experience QueryIt AI
        </p>
        <div className="mt-10">
          <SignUpButton mode="modal">
            <button className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Sign Up for Waitlist
            </button>
          </SignUpButton>
        </div>
      </div>
    </div>
  );
}
