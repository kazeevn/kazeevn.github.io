import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nikita Kazeev",
  description:
    "Personal website of Nikita Kazeev, a researcher building machine learning tools for science across physics, materials, and multiscale systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur">
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-6 py-4 sm:px-8">
            <Link href="/" className="text-sm font-medium tracking-[0.2em] text-accent-strong uppercase">
              Nikita Kazeev
            </Link>

            <nav className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-sm text-muted">
              <Link href="/">Home</Link>
              <Link href="/mastery-of-matter">Mastery of Matter</Link>
              <Link href="/leadership">Leadership</Link>
            </nav>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
