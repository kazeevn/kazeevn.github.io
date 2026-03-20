import Image from "next/image";
import Link from "next/link";

const profileLinks = [
  {
    href: "https://scholar.google.com/citations?user=vamy2okAAAAJ&hl=en",
    label: "Google Scholar",
    iconSrc: "/google-scholar-square.svg",
    iconAlt: "",
    iconClassName: "object-contain",
    external: true,
  },
  {
    href: "https://www.linkedin.com/in/nikita-kazeev/",
    label: "LinkedIn",
    iconSrc: "/LinkedIn.png",
    iconAlt: "",
    iconClassName: "object-contain",
    external: true,
  },
  {
    href: "https://orcid.org/0000-0002-5699-7634",
    label: "ORCID",
    iconSrc: "/ORCID-iD_icon_vector.svg",
    iconAlt: "",
    iconClassName: "object-contain",
    external: true,
  },
  {
    href: "mailto:kna@nus.edu.sg",
    label: "Email",
    iconSrc: "/email.svg",
    iconAlt: "",
    iconClassName: "object-contain",
    external: false,
  },
  {
    href: "https://github.com/kazeevn/",
    label: "GitHub",
    iconSrc: "/GitHub_Invertocat_Black.svg",
    iconAlt: "",
    iconClassName: "object-contain dark:invert",
    external: true,
  },
] as const;

export default function Home() {
  return (
    <main className="flex w-full flex-1 flex-col px-2 py-6 md:px-0 md:py-8">
      <section className="w-full">
        <div className="space-y-8">
          <div className="pb-4">
            <div className="grid gap-5 md:grid-cols-[128px_1fr] md:gap-6">
              <div className="mx-auto w-full max-w-32 md:mx-0">
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

                <p className="mt-4 text-center text-sm tracking-tight text-neutral-900 dark:text-neutral-100 md:text-left">
                  <span className="block">Research Fellow</span>
                  <span className="block">National University of Singapore</span>
                </p>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                  {profileLinks.map((profileLink) => (
                    <Link
                      key={profileLink.label}
                      href={profileLink.href}
                      aria-label={profileLink.label}
                      title={profileLink.label}
                      className="rounded-sm p-1 transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500"
                      target={profileLink.external ? "_blank" : undefined}
                      rel={profileLink.external ? "noreferrer" : undefined}
                    >
                      <span className="relative block h-6 w-6">
                        <Image
                          src={profileLink.iconSrc}
                          alt={profileLink.iconAlt}
                          fill
                          sizes="24px"
                          aria-hidden="true"
                          className={profileLink.iconClassName}
                        />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="space-y-1.5 text-sm text-neutral-800 dark:text-neutral-200">
                  <p>Double PhD in computer science and physics.</p>
                  <p>Machine learning for science, from particles to materials.</p>
                </div>

                <p className="font-[family:var(--font-poiret-one)] text-3xl tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl">
                  Nikita Kazeev
                </p>
                <h1 className="max-w-3xl text-3xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl lg:text-5xl">
                  Turning hard science into usable intelligence.
                </h1>
                <p className="max-w-3xl hyphens-auto text-justify leading-6 text-neutral-800 dark:text-neutral-200">
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
                  <p className="mb-2 text-sm tracking-tight text-neutral-900 dark:text-neutral-100">
                    What stands out
                  </p>
                  <p className="hyphens-auto text-justify leading-6 text-neutral-800 dark:text-neutral-200">
                    Research depth in both physics and machine learning, paired with
                    a track record of making ambitious scientific ideas legible to
                    broader research communities.
                  </p>
                </div>
                <div className="pt-1">
                  <p className="mb-2 text-sm tracking-tight text-neutral-900 dark:text-neutral-100">
                    What comes next
                  </p>
                  <p className="hyphens-auto text-justify leading-6 text-neutral-800 dark:text-neutral-200">
                    Building tools and collaborations that let scientists move from
                    expensive low-level simulations to robust, decision-grade models.
                  </p>
                </div>
              </div>

              <div className="pt-1">
                <p className="text-sm tracking-tight text-neutral-900 dark:text-neutral-100">
                  Current direction
                </p>
                <p className="mt-3 max-w-3xl hyphens-auto text-justify leading-6 text-neutral-800 dark:text-neutral-200">
                  The work focuses on scientific machine learning that respects scale,
                  structure, and computational cost. The goal is not only predictive
                  accuracy, but usable models that can guide experiments, engineering,
                  and scientific decision-making.
                </p>
              </div>
            </div>

            <div className="space-y-1 pt-1">
              <p className="text-sm tracking-tight text-neutral-900 dark:text-neutral-100">
                Read next
              </p>

              <Link
                href="/mastery-of-matter"
                className="block py-3 transition-colors hover:text-neutral-700 dark:hover:text-neutral-300"
              >
                <p className="text-lg font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
                  Mastery of Matter
                </p>
                <p className="mt-2 hyphens-auto text-justify leading-6 text-neutral-800 dark:text-neutral-200">
                  A research statement on science as approximate computation and machine
                  learning as the path to tractable, decision-grade models.
                </p>
              </Link>

              <Link
                href="/leadership"
                className="block py-3 transition-colors hover:text-neutral-700 dark:hover:text-neutral-300"
              >
                <p className="text-lg font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
                  Leadership
                </p>
                <p className="mt-2 hyphens-auto text-justify leading-6 text-neutral-800 dark:text-neutral-200">
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
