import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex w-full flex-1 flex-col px-2 py-6 md:px-0 md:py-8">
      <section className="w-full">
        <div className="space-y-8">
          <div className="pb-4">
            <div className="grid gap-5 sm:grid-cols-[128px_1fr] sm:gap-6">
              <div className="mx-auto w-full max-w-32 sm:mx-0">
                <div className="overflow-hidden">
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

              <div className="space-y-3">
                <div className="space-y-1.5 text-sm text-muted">
                  <p className="text-sm tracking-tight text-accent-strong">
                    Research Fellow, NUS
                  </p>
                  <p>Double PhD in computer science and physics.</p>
                  <p>Machine learning for science, from particles to materials.</p>
                </div>

                <p className="font-[family:var(--font-poiret-one)] text-3xl tracking-tight text-accent-strong sm:text-4xl">
                  Nikita Kazeev
                </p>
                <h1 className="max-w-3xl text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
                  Turning hard science into usable intelligence.
                </h1>
                <p className="max-w-3xl hyphens-auto text-justify leading-6 text-muted">
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

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(16rem,1fr)] lg:gap-10">
            <div className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="pt-1">
                  <p className="mb-2 text-sm tracking-tight text-accent-strong">
                    What stands out
                  </p>
                  <p className="hyphens-auto text-justify leading-6 text-muted">
                    Research depth in both physics and machine learning, paired with
                    a track record of making ambitious scientific ideas legible to
                    broader research communities.
                  </p>
                </div>
                <div className="pt-1">
                  <p className="mb-2 text-sm tracking-tight text-accent-strong">
                    What comes next
                  </p>
                  <p className="hyphens-auto text-justify leading-6 text-muted">
                    Building tools and collaborations that let scientists move from
                    expensive low-level simulations to robust, decision-grade models.
                  </p>
                </div>
              </div>

              <div className="pt-1">
                <p className="text-sm tracking-tight text-accent-strong">
                  Current direction
                </p>
                <p className="mt-3 max-w-3xl hyphens-auto text-justify leading-6 text-muted">
                  The work focuses on scientific machine learning that respects scale,
                  structure, and computational cost. The goal is not only predictive
                  accuracy, but usable models that can guide experiments, engineering,
                  and scientific decision-making.
                </p>
              </div>
            </div>

            <div className="space-y-1 pt-1">
              <p className="text-sm tracking-tight text-accent-strong">
                Read next
              </p>

              <Link
                href="/mastery-of-matter"
                className="block py-3 transition-colors hover:text-accent"
              >
                <p className="text-lg font-medium tracking-tight text-foreground">
                  Mastery of Matter
                </p>
                <p className="mt-2 hyphens-auto text-justify leading-6 text-muted">
                  A research statement on science as approximate computation and machine
                  learning as the path to tractable, decision-grade models.
                </p>
              </Link>

              <Link
                href="/leadership"
                className="block py-3 transition-colors hover:text-accent"
              >
                <p className="text-lg font-medium tracking-tight text-foreground">
                  Leadership
                </p>
                <p className="mt-2 hyphens-auto text-justify leading-6 text-muted">
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
