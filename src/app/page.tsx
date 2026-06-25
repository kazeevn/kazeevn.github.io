import ExportedImage from "next-image-export-optimizer";
import Link from "next/link";

type ProfileLink = {
  href: string;
  label: string;
  iconSrc: string;
  iconClassName: string;
  external: boolean;
};

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
    iconSrc: "/main/linkedin.png",
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
] satisfies readonly ProfileLink[];

export default function Home() {
  return (
    <main className="prose prose-neutral dark:prose-invert max-w-none flex w-full flex-1 flex-col px-2 py-6 md:px-0 md:py-8">
      <section className="w-full">
        <div className="space-y-8">
          <div className="pb-4">
            <div className="grid gap-5 md:grid-cols-[128px_1fr] md:gap-6">
              <div className="mx-auto grid w-full max-w-sm grid-cols-[96px_minmax(0,1fr)] items-center gap-3 sm:grid-cols-[112px_minmax(0,1fr)] sm:gap-4 md:mx-0 md:block md:max-w-[128px]">
                <div className="relative aspect-square overflow-hidden rounded-2xl">
                  <ExportedImage
                    src="/main/nikita-kazeev.webp"
                    alt="Portrait of Nikita Kazeev"
                    fill
                    preload
                    placeholder="blur"
                    sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 128px"
                    className="!m-0 object-cover object-top"
                    style={{ objectFit: "cover", objectPosition: "top" }}
                  />
                </div>

                <div className="space-y-1.5 text-left sm:space-y-2 md:mt-4">
                  <div className="eyebrow text-sm md:text-xs leading-snug">
                    <span className="block">Research Fellow</span>
                    <span className="block">National University of Singapore</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 md:justify-start">
                    {profileLinks.map((profileLink) => (
                      <Link
                        key={profileLink.label}
                        href={profileLink.href}
                        aria-label={profileLink.label}
                        title={profileLink.label}
                        className="rounded-sm p-0.5 transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500 sm:p-1"
                        target={profileLink.external ? "_blank" : undefined}
                        rel={profileLink.external ? "noreferrer" : undefined}
                      >
                        <span className="relative block h-5 w-5 sm:h-6 sm:w-6">
                          <ExportedImage
                            src={profileLink.iconSrc}
                            alt=""
                            fill
                            placeholder="empty"
                            sizes="(max-width: 640px) 20px, 24px"
                            aria-hidden="true"
                            className={`!m-0 ${profileLink.iconClassName}`}
                          />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h1 className="max-w-4xl">
                  Turning hard science into usable intelligence
                </h1>
                <p className="max-w-4xl">
                  Nikita Kazeev is a Research Fellow in the laboratory of Professor Kostya Novoselov at the National University of Singapore (NUS). His work starts from the premise that, if you look deep enough, <Link href="/mastery-of-matter">most of science is approximate computation</Link>, and machine learning is the best tool we have for building those approximations – a way to expand the frontier of what we can predict and, ultimately, control in the physical world.
                </p>
                <p className="max-w-4xl">
                  He holds a dual PhD in Computer Science from HSE University and in Physics from Sapienza Università di Roma, studied as an undergraduate at the Moscow Institute of Physics and Technology, and graduated from the Yandex School of Data Analysis.
                </p>
                <p className="max-w-4xl">
                  Prior to joining NUS, Dr. Kazeev worked at CERN, applying machine learning to structured data and ML-driven simulation in high-energy physics; he received the <Link href="https://breakthroughprize.org/Laureates/1/L3995" target="_blank" rel="noreferrer">2025 Breakthrough Prize in Fundamental Physics</Link> as a part of the LHCb collaboration.
                </p>
                <p className="max-w-4xl">
                  At NUS his research centers on making AI an instrument for scientific discovery – starting with the design of new materials, and reaching beyond. He is deeply involved in building the AI-for-science community: he was the main organizer of the <Link href="https://multiscale-ai.github.io/" target="_blank">ICLR 2025 Workshop on Machine Learning for Multiscale Processes</Link> and Program Chair for the <Link href="https://ai4x.cc/" target="_blank">AI4X 2025/6 conference</Link>, and is co-Principal Investigator on a US$3.4 million AI Singapore grant for multiscale machine learning. He works on turning AI into <Link href="/reward-signal-for-the-academy">a fair and objective tool</Link> for science governance.
                </p>
                <p className="max-w-4xl">
                  Beyond academia, he is an AI Advisor at <Link href="https://perfomax.io/" target="_blank">Perfomax</Link> and has been a machine learning consultant to the <Link href="https://constructor.org/" target="_blank">Constructor Group</Link> since 2021, helping translate frontier methods into shipped products across science and industry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
