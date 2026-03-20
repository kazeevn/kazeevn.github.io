import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-1 px-6 py-10 sm:px-8 sm:py-14">
      <section className="w-full">
        <div className="space-y-10">
          <div className="border-b border-border pb-8">
            <div className="grid gap-6 sm:grid-cols-[140px_1fr] sm:gap-8">
              <div className="mx-auto w-full max-w-[8.75rem] sm:mx-0">
                <div className="overflow-hidden rounded-2xl">
                  <Image
                    src="/nikita-kazeev.webp"
                    alt="Portrait of Nikita Kazeev"
                    width={900}
                    height={900}
                    priority
                    className="aspect-[4/5] h-auto w-full object-cover object-top"
                  />
                </div>
              </div>

              <div className="space-y-4 sm:space-y-5">
                <div className="space-y-2 text-sm text-muted">
                  <p className="text-[0.72rem] uppercase tracking-[0.2em] text-accent-strong">
                    Research Fellow, NUS
                  </p>
                  <p>Double PhD in computer science and physics.</p>
                  <p>Machine learning for science, from particles to materials.</p>
                </div>

                <p className="text-2xl font-medium tracking-[0.18em] text-accent-strong sm:text-3xl">
                  Nikita Kazeev
                </p>
                <h1 className="max-w-3xl text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl">
                  Turning hard science into usable intelligence.
                </h1>
                <p className="max-w-3xl hyphens-auto text-justify text-lg leading-8 text-muted">
                  Nikita Kazeev is a research fellow at the National University of
                  Singapore with a double PhD in computer science and physics. He has
                  worked across particle physics, materials, and autonomous systems,
                  built communities around machine learning for science, and mentored
                  researchers along the way. His vision is direct: AI should not stop
                  at fitting data, it should help scientists discover the right
                  abstractions, at the right scale, in time to matter.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(18rem,1fr)] lg:gap-12">
            <div className="space-y-8">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="border-t border-border pt-4">
                  <p className="mb-2 text-[0.72rem] uppercase tracking-[0.2em] text-accent-strong">
                    What stands out
                  </p>
                  <p className="hyphens-auto text-justify leading-7 text-muted">
                    Research depth in both physics and machine learning, paired with
                    a track record of making ambitious scientific ideas legible to
                    broader research communities.
                  </p>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="mb-2 text-[0.72rem] uppercase tracking-[0.2em] text-accent-strong">
                    What comes next
                  </p>
                  <p className="hyphens-auto text-justify leading-7 text-muted">
                    Building tools and collaborations that let scientists move from
                    expensive low-level simulations to robust, decision-grade models.
                  </p>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-[0.72rem] uppercase tracking-[0.2em] text-accent-strong">
                  Current direction
                </p>
                <p className="mt-3 max-w-3xl hyphens-auto text-justify leading-8 text-muted">
                  The work focuses on scientific machine learning that respects scale,
                  structure, and computational cost. The goal is not only predictive
                  accuracy, but usable models that can guide experiments, engineering,
                  and scientific decision-making.
                </p>
              </div>
            </div>

            <div className="space-y-1 border-t border-border pt-4">
              <p className="text-[0.72rem] uppercase tracking-[0.2em] text-accent-strong">
                Read next
              </p>

              <Link
                href="/mastery-of-matter"
                className="block border-b border-border/80 py-4 transition-colors hover:text-accent"
              >
                <p className="text-xl font-medium tracking-tight text-foreground">
                  Mastery of Matter
                </p>
                <p className="mt-2 hyphens-auto text-justify leading-7 text-muted">
                  A research statement on science as approximate computation and machine
                  learning as the path to tractable, decision-grade models.
                </p>
              </Link>

              <Link
                href="/leadership"
                className="block border-b border-border/80 py-4 transition-colors hover:text-accent"
              >
                <p className="text-xl font-medium tracking-tight text-foreground">
                  Leadership
                </p>
                <p className="mt-2 hyphens-auto text-justify leading-7 text-muted">
                  A view of research leadership, mentorship, teaching, and public-facing
                  scientific communication.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
