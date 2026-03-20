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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${poiretOne.variable} h-full antialiased`}
    >
      <body className="mx-4 mt-8 flex min-h-full max-w-4xl flex-col lg:mx-auto">
        <header className="sticky top-0 z-10 bg-background/92 backdrop-blur-sm">
          <div className="flex w-full flex-wrap items-center justify-between gap-x-6 gap-y-2 px-2 py-2 md:px-0">
            <Link
              href="/"
              className="font-[family:var(--font-poiret-one)] text-xl tracking-tight text-accent-strong transition-colors hover:text-accent"
            >
              Nikita Kazeev
            </Link>

            <nav className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1 text-sm tracking-tight text-muted">
              <Link href="/" className="transition-colors hover:text-foreground">
                Home
              </Link>
              <Link href="/mastery-of-matter" className="transition-colors hover:text-foreground">
                Mastery of Matter
              </Link>
              <Link href="/leadership" className="transition-colors hover:text-foreground">
                Leadership
              </Link>
            </nav>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
