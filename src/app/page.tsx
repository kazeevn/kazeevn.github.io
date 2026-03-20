import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-1 px-6 py-10 sm:px-8 sm:py-16">
      <section className="w-full">
        <div className="grid gap-8 lg:grid-cols-[300px_1fr] lg:gap-12">
          <div className="mx-auto w-full max-w-[18rem] space-y-4 sm:max-w-[20rem] lg:mx-0 lg:max-w-none">
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <Image
                src="/nikita-kazeev.webp"
                alt="Portrait of Nikita Kazeev"
                width={900}
                height={900}
                priority
                className="aspect-[4/5] h-auto w-full object-cover object-top lg:aspect-auto"
              />
            </div>

            <div className="space-y-2 text-sm text-muted">
              <p className="text-[0.72rem] uppercase tracking-[0.2em] text-accent-strong">
                Research Fellow, NUS
              </p>
              <p>Double PhD in computer science and physics.</p>
              <p>Machine learning for science, from particles to materials.</p>
            </div>
          </div>

          <div className="space-y-5 sm:space-y-6">
            <p className="text-2xl font-medium tracking-[0.18em] text-accent-strong sm:text-3xl">
              Nikita Kazeev
            </p>
            <h1 className="max-w-3xl text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl">
              Turning hard science into usable intelligence.
            </h1>
            <p className="max-w-2xl hyphens-auto text-justify text-lg leading-8 text-muted">
              Nikita Kazeev is a research fellow at the National University of
              Singapore with a double PhD in computer science and physics. He has
              worked across particle physics, materials, and autonomous systems,
              built communities around machine learning for science, and mentored
              researchers along the way. His vision is direct: AI should not stop
              at fitting data, it should help scientists discover the right
              abstractions, at the right scale, in time to matter.
            </p>

            <div className="grid gap-4 border-t border-border pt-6 text-sm text-muted sm:grid-cols-2">
              <div>
                <p className="mb-2 text-[0.72rem] uppercase tracking-[0.2em] text-accent-strong">
                  What stands out
                </p>
                <p className="hyphens-auto text-justify leading-7">
                  Research depth in both physics and machine learning, paired with
                  a track record of making ambitious scientific ideas legible to
                  broader research communities.
                </p>
              </div>
              <div>
                <p className="mb-2 text-[0.72rem] uppercase tracking-[0.2em] text-accent-strong">
                  What comes next
                </p>
                <p className="hyphens-auto text-justify leading-7">
                  Building tools and collaborations that let scientists move from
                  expensive low-level simulations to robust, decision-grade models.
                </p>
              </div>
            </div>

            <div className="grid gap-4 pt-2 sm:grid-cols-2">
              <Link
                href="/mastery-of-matter"
                className="rounded-3xl border border-border bg-card p-5 transition-colors hover:border-accent"
              >
                <p className="text-[0.72rem] uppercase tracking-[0.2em] text-accent-strong">
                  Research Statement
                </p>
                <p className="mt-3 text-xl font-medium tracking-tight text-foreground">
                  Mastery of Matter
                </p>
                <p className="mt-3 hyphens-auto text-justify leading-7 text-muted">
                  A narrative about science as approximate computation and machine
                  learning as the path to tractable, decision-grade models of the
                  physical world.
                </p>
              </Link>

              <Link
                href="/leadership"
                className="rounded-3xl border border-border bg-card p-5 transition-colors hover:border-accent"
              >
                <p className="text-[0.72rem] uppercase tracking-[0.2em] text-accent-strong">
                  Leadership
                </p>
                <p className="mt-3 text-xl font-medium tracking-tight text-foreground">
                  Research, mentorship, and outreach
                </p>
                <p className="mt-3 hyphens-auto text-justify leading-7 text-muted">
                  A consolidated view of research leadership, institution building,
                  teaching, and public-facing scientific communication.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
