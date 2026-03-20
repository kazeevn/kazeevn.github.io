import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono, Poiret_One } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poiretOne = Poiret_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-poiret-one",
});

export const metadata: Metadata = {
  title: "Nikita Kazeev",
  description:
    "Personal website of Nikita Kazeev, a researcher building machine learning tools for science across physics, materials, and multiscale systems.",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentYear = new Date().getFullYear();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${poiretOne.variable} h-full antialiased`}
    >
      <body className="mx-4 mt-8 flex min-h-full max-w-4xl flex-col bg-neutral-50 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 lg:mx-auto">
        <header className="sticky top-0 z-10 bg-neutral-50/92 backdrop-blur-sm dark:bg-neutral-900/92">
          <div className="flex w-full flex-wrap items-center justify-between gap-x-6 gap-y-2 px-2 py-2 md:px-0">
            <Link
              href="/"
              className="font-[family:var(--font-poiret-one)] text-xl tracking-tight text-neutral-900 transition-colors hover:text-neutral-700 dark:text-neutral-100 dark:hover:text-neutral-300"
            >
              Nikita Kazeev
            </Link>

            <nav className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1 text-sm tracking-tight text-neutral-600 dark:text-neutral-300">
              <Link href="/" className="transition-colors hover:text-neutral-900 dark:hover:text-neutral-100">
                Home
              </Link>
              <Link
                href="/cv"
                className="transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                CV
              </Link>
              <Link
                href="/mastery-of-matter"
                className="transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                Mastery of Matter
              </Link>
              <Link
                href="/reward-signal-for-the-academy"
                className="transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                A Reward Signal for the Academy
              </Link>
              <Link
                href="/leadership"
                className="transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                Leadership
              </Link>
            </nav>
          </div>
        </header>

        {children}

        <footer className="border-t border-neutral-200 px-2 py-4 text-sm tracking-tight text-neutral-600 dark:border-neutral-800 dark:text-neutral-400 md:px-0">
          <p>Copyright © {currentYear} Nikita Kazeev</p>
        </footer>
      </body>
    </html>
  );
}
