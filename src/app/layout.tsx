import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QueryIt AI",
  description: "Your AI-powered query solution",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
