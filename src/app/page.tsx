import AuthCheck from "@/components/auth/AuthCheck";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Welcome to QueryIt AI
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Your intelligent query solution powered by AI
        </p>
        <AuthCheck />
      </div>
    </div>
  );
}
