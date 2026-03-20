import Image from "next/image";
import Link from "next/link";

const profileLinks = [
  {
    href: "https://scholar.google.com/citations?user=vamy2okAAAAJ&hl=en",
    label: "Google Scholar",
    iconSrc: "/google-scholar-square.svg",
    iconClassName: "object-contain",
    external: true,
  },
  {
    href: "https://www.linkedin.com/in/nikita-kazeev/",
    label: "LinkedIn",
    iconSrc: "/LinkedIn.png",
    iconClassName: "object-contain",
    external: true,
  },
  {
    href: "https://orcid.org/0000-0002-5699-7634",
    label: "ORCID",
    iconSrc: "/ORCID-iD_icon_vector.svg",
    iconClassName: "object-contain",
    external: true,
  },
  {
    href: "mailto:kna@nus.edu.sg",
    label: "Email",
    iconSrc: "/email.svg",
    iconClassName: "object-contain",
    external: false,
  },
  {
    href: "https://github.com/kazeevn/",
    label: "GitHub",
    iconSrc: "/GitHub_Invertocat_Black.svg",
    iconClassName: "object-contain dark:invert",
    external: true,
  },
  {
    href: "https://signal.me/#eu/DQWx28yS0y5U7K4W7KMnYMCC6DLj4mmg4hZTz5nBWoZxizaCrPlHJbzapVb9rfub",
    label: "Signal",
    iconSrc: "/Signal-Logo-Ultramarine.svg",
    iconClassName: "object-contain",
    external: true,
  }
] as const;

export default function Home() {
  return (
    <main className="prose flex w-full flex-1 flex-col px-2 py-6 md:px-0 md:py-8">
      <section className="w-full">
        <div className="space-y-8">
          <div className="pb-4">
            <div className="grid gap-5 md:grid-cols-[128px_1fr] md:gap-6">
              <div className="mx-auto grid w-full max-w-sm grid-cols-[128px_minmax(0,1fr)] items-center gap-4 md:mx-0 md:block md:max-w-32">
                <div className="overflow-hidden rounded-2xl">
                  <Image
                    src="/nikita-kazeev.webp"
                    alt="Portrait of Nikita Kazeev"
                    width={900}
                    height={900}
                    priority
                    className="aspect-4/5 h-auto w-full object-cover object-top"
                  />
                </div>

                <div className="space-y-4 text-left md:mt-4">
                  <p className="eyebrow">
                    <span className="block">Research Fellow</span>
                    <span className="block">National University of Singapore</span>
                  </p>

                  <div className="flex flex-wrap items-center gap-3 md:justify-start">
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
                            alt=""
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
              </div>

              <div className="space-y-3">
                <h1 className="max-w-3xl">
                  Turning hard science into usable intelligence
                </h1>
                <p className="max-w-3xl">
                  Nikita Kazeev is a Research Fellow in the laboratory of Professor Kostya Novoselov at the Institute for Functional Intelligent Materials, National University of Singapore (NUS). He holds a dual PhD degree in CS from HSE University and in Physics from Sapienza Università di Roma. He completed his undergraduate studies at the Moscow Institute of Physics and Technology and graduated from the Yandex School of Data Analysis.
                </p>
                <p className="max-w-3xl">
                  Prior to joining NUS, Dr. Kazeev worked at CERN, where he specialized in applying machine learning techniques to complex challenges in high-energy physics; he received the <Link href="https://breakthroughprize.org/Laureates/1/L3995">2025 Breakthrough Prize in Fundamental Physics</Link> as a part of the LHCb collaboration.
                </p>
                <p className="max-w-3xl">
                  His current research at NUS is focused on pioneering the use of machine learning for the discovery and design of novel materials. Dr. Kazeev is deeply involved in fostering the AI/ML research community. He was the main organizer for the <Link href="https://multiscale-ai.github.io/">ICLR 2025 Workshop on Machine Learning for Multiscale Processes</Link> and the deputy chair of the scientific committee for the <Link href="https://ai4x.cc/">AI4X conference</Link>. Furthermore, he is a co-Principal Investigator on a US$3.4 million AI Singapore grant dedicated to advancing multiscale machine learning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
