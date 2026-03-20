"use client";

import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

type ReferenceLink = {
  href: string;
  label: string;
};

type Highlight = {
  title: string;
  references?: ReferenceLink[];
  bullets: ReactNode[];
  skills: string[];
};

type WorkEntry = {
  organization: string;
  role: string;
  period: string;
  note?: ReactNode;
  highlights: Highlight[];
};

type SimpleSectionItem = {
  title?: string;
  period?: string;
  body: ReactNode;
};

type Publication = {
  citation: ReactNode;
};

type SkillTag = {
  label: string;
  detail?: string;
};

type Stat = {
  value: ReactNode;
  label: string;
  note?: {
    title: string;
    body: ReactNode;
    align?: "left" | "right";
  };
};

const pdfHref = "/Nikita%20Kazeev%20-%20CV%20%5BJanuary%202026%5D.pdf";

const skillTags: SkillTag[] = [
  { label: "ML & AI", detail: "Structured, non-text, domain-specific data" },
  { label: "Python & PyTorch", detail: "Research coding" },
  { label: "C++", detail: "Production" },
  { label: "Linux", detail: "Administration" },
  { label: "Research Writing & Speaking" },
  { label: "Physics", detail: "Deep domain understanding" },
  { label: "Leadership & Mentorship" },
  { label: "Russian", detail: "Native" },
  { label: "English", detail: "Fluent · IELTS 8" },
];

const workExperience: WorkEntry[] = [
  {
    organization: "National University of Singapore",
    role: "Postdoc under Kostya Novoselov",
    period: "2022 - present",
    highlights: [
      {
        title: "Leadership",
        skills: ["Leadership & Mentorship", "Research Writing & Speaking"],
        references: [
          {
            href: "https://ai4x.cc/",
            label: "AI4X 2025 conference",
          },
          {
            href: "https://openreview.net/forum?id=uAtjhZW1QV",
            label: "ICLR 2025 workshop",
          },
        ],
        bullets: [
          "Speaker search and selection for the 500-person AI4X 2025 conference.",
          "Main organizer of the ICLR 2025 workshop on multiscale machine learning.",
        ],
      },
      {
        title: "Transformer for generating symmetric crystals",
        skills: ["ML & AI", "Python & PyTorch", "Physics", "Leadership & Mentorship"],
        references: [
          {
            href: "https://icml.cc/virtual/2025/poster/44595",
            label: "ICML 2025",
          },
          {
            href: "https://github.com/SymmetryAdvantage/WyckoffTransformer",
            label: "code",
          },
        ],
        bullets: [
          "Created a generative model for material design based on symmetry inductive bias.",
          "Implemented the model in PyTorch.",
          "Achieved the best generation quality and diversity among space-group-conditioned models.",
          "Led a team of 6.",
        ],
      },
      {
        title: "ML for predicting properties of defects in 2D crystals",
        skills: ["ML & AI", "Python & PyTorch", "Physics", "Leadership & Mentorship", "Linux"],
        references: [
          {
            href: "https://www.nature.com/articles/s41699-023-00369-1",
            label: "paper 1",
          },
          {
            href: "https://www.nature.com/articles/s41524-023-01062-z",
            label: "paper 2",
          },
          {
            href: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=vamy2okAAAAJ&sortby=pubdate&citation_for_view=vamy2okAAAAJ:uAPFzskPt0AC",
            label: "patent",
          },
          {
            href: "https://mh22-mrs.org.sg/files/MH22_Programme_Booklet_SYMPOSIA_GROUPING_13_SEPT.pdf",
            label: "conference",
          },
          {
            href: "https://github.com/HSE-LAMBDA/ai4material_design",
            label: "code",
          },
        ],
        bullets: [
          "Created a sparse representation of crystals with defects, achieving 4x energy prediction error reduction.",
          "Developed code for reproducible parallel running of machine learning experiments.",
          "Led a team of 3.",
        ],
      },
    ],
  },
  {
    organization: "CERN [Yandex -> HSE University]",
    role: "Research scientist",
    period: "2014 - 2022",
    note: (
      <>
        <a href="https://breakthroughprize.org/Laureates/1/L3995" target="_blank" rel="noreferrer">
          2025 Breakthrough Prize in Fundamental Physics
        </a>
        {" "}as a member of LHCb.
      </>
    ),
    highlights: [
      {
        title: "Generative models uncertainty estimation",
        skills: ["ML & AI", "Python & PyTorch", "Physics", "Leadership & Mentorship"],
        references: [
          {
            href: "https://iopscience.iop.org/article/10.1088/1742-6596/2438/1/012088",
            label: "paper",
          },
          {
            href: "https://cds.cern.ch/record/2837844",
            label: "conference",
          },
          {
            href: "https://gitlab.com/lambda-hse/lhcb-rich-gan-uncertainty",
            label: "code 1",
          },
          {
            href: "https://gitlab.com/lambda-hse/gan-uncertainty-ensembles",
            label: "code 2",
          },
        ],
        bullets: [
          "Developed the first methods for estimating uncertainty of conditional GANs.",
          "Led a team of 3 students.",
        ],
      },
      {
        title: "Generative models for fast simulation",
        skills: ["ML & AI", "Python & PyTorch", "Physics", "Research Writing & Speaking"],
        references: [
          {
            href: "https://www.sciencedirect.com/science/article/pii/S0168900219300701",
            label: "paper 1",
          },
          {
            href: "https://arxiv.org/abs/1905.11825",
            label: "paper 2",
          },
          {
            href: "https://ml4physicalsciences.github.io/files/NeurIPS_ML4PS_2019_40.pdf",
            label: "paper 3",
          },
          {
            href: "https://github.com/yandexdataschool/QuantileTransformerTF",
            label: "code",
          },
          {
            href: "https://www.eurekalert.org/pub_releases/2019-03/nruh-ail031419.php",
            label: "news 1",
          },
          {
            href: "https://ria.ru/20190311/1551698619.html",
            label: "news 2",
          },
          {
            href: "https://www.popmech.ru/science/news-468032-sozdana-neyroset-uskoryayushchaya-poisk-novyh-chastic-na-lhc/",
            label: "news 3",
          },
          {
            href: "https://nauka.vesti.ru/article/1190805",
            label: "news 4",
          },
          {
            href: "https://hightech.fm/2019/03/12/cern-gun",
            label: "news 5",
          },
        ],
        bullets: [
          "Developed a GAN-based machine learning model for high-fidelity simulation of a Cherenkov detector trained on tabular data.",
          "Achieved approximately 10^5 speed-up compared to the ab-initio simulator.",
        ],
      },
      {
        title: "Machine learning on noisy data",
        skills: ["ML & AI", "Python & PyTorch", "Physics"],
        references: [
          {
            href: "http://doi.org/10.1088/1748-0221/14/08/P08020",
            label: "paper 1",
          },
          {
            href: "https://ml4physicalsciences.github.io/files/NeurIPS_ML4PS_2019_122.pdf",
            label: "paper 2",
          },
          {
            href: "https://github.com/yandexdataschool/ML-sWeights-experiments/",
            label: "code",
          },
          {
            href: "https://youtu.be/f9EhbrNxLjs?t=4298",
            label: "presentation video",
          },
        ],
        bullets: [
          "Developed a rigorous way to train ML algorithms on data with the label-noise model common in high-energy physics.",
        ],
      },
      {
        title: "Muon identification at the LHCb experiment at CERN",
        skills: ["ML & AI", "Python & PyTorch", "C++", "Physics"],
        references: [
          {
            href: "https://iopscience.iop.org/article/10.1088/1742-6596/1525/1/012100/pdf",
            label: "paper",
          },
          {
            href: "https://indico.cern.ch/event/708041/contributions/3272104/",
            label: "poster",
          },
          {
            href: "https://idao.world/history/#idao-2019",
            label: "IDAO-2019",
          },
        ],
        bullets: [
          "Solved a classification problem over tabular data with noisy labels under timing constraints.",
          "Developed a gradient boosting model that reduced the false positive rate by 30% in the critical low-track-momentum region.",
          "Integrated the model into LHCb production, mostly in C++.",
          "Packaged the work as a data science competition problem for IDAO-2019.",
        ],
      },
      {
        title: "CatBoost aka fighting biases with dynamic boosting",
        skills: ["ML & AI", "Python & PyTorch", "Linux"],
        references: [
          {
            href: "https://arxiv.org/abs/1706.09516v1",
            label: "paper",
          },
        ],
        bullets: [
          "Set up a distributed system for running experiments for the team with Bash and Python.",
          "Studied gradient boosting improvements with experiments on toy data.",
        ],
      },
    ],
  },
];

const education: SimpleSectionItem[] = [
  {
    title: "Higher School of Economics (HSE University)",
    period: "2016 - 2020",
    body: (
      <>
        PhD in Computer Science, supervisor{" "}
        <a href="https://www.linkedin.com/profile/view?id=2422149" target="_blank" rel="noreferrer">
          Andrey Ustyuzhanin
        </a>
        ;{" "}
        <a href="http://cds.cern.ch/record/2744601" target="_blank" rel="noreferrer">
          Machine Learning for particle identification in the LHCb detector
        </a>
        .
      </>
    ),
  },
  {
    title: "Sapienza - Universita di Roma",
    period: "2016 - 2020",
    body: (
      <>
        PhD in Physics (double degree with HSE), supervisor{" "}
        <a href="https://it.linkedin.com/in/barbara-sciascia-234935a" target="_blank" rel="noreferrer">
          Barbara Sciascia
        </a>
        .
      </>
    ),
  },
  {
    title: "Product Management course at Yandex",
    period: "Spring 2018",
    body: <>Focused coursework in product strategy and execution.</>,
  },
  {
    title: "Yandex School of Data Analysis",
    period: "2013 - 2015",
    body: <>Master&apos;s level CS course covering algorithms, machine learning, deep learning, and distributed systems.</>,
  },
  {
    title: "Moscow Institute of Physics and Technology",
    body: (
      <>
        <strong>MS in Physics</strong> (2014 - 2016): Optimisation of data processing of the LHCb experiment.
        <br />
        <strong>BS in Physics</strong> (2010 - 2014): Study of the quantum states of the electrons in nonideal plasma and selected molecules using wave packet molecular dynamics with packet splitting.
      </>
    ),
  },
];

const mentorship: ReactNode[] = [
  <>
    Mentored 9 students (
    <CompactLinks
      links={[
        { href: "https://www.hse.ru/edu/vkr/219430466", label: "1" },
        { href: "https://www.hse.ru/edu/vkr/296294066", label: "2" },
        { href: "https://www.hse.ru/edu/vkr/219524130", label: "3" },
        { href: "https://www.hse.ru/en/edu/vkr/470561417", label: "4" },
        { href: "https://www.hse.ru/en/edu/vkr/470935224", label: "5" },
        { href: "https://www.hse.ru/ma/datasci/students/diplomas/631565328", label: "6" },
        { href: "https://www.hse.ru/ma/datasci/students/diplomas/631565422", label: "7" },
        { href: "https://www.hse.ru/edu/vkr/624890096", label: "8" },
        { href: "https://www.hse.ru/ba/ami/students/diplomas/834351454", label: "9" },
      ]}
    />
    ), 3 interns, and student workshop projects (
    <CompactLinks
      links={[
        { href: "https://sochisirius.ru/news/3148", label: "1" },
        { href: "https://academy.yandex.ru/posts/vossozdat-arkhitekturu-bazy-dannykh-i-nauchit-golosovogo-pomoschnika-predskazyvat-namereniya-polzovatelya", label: "2" },
      ]}
    />
    ).
  </>,
  "Student council member from 2013 to 2016, leading several dormitory-scale IT projects.",
  "Co-PI of a $3.4m AI Singapore grant on multiscale machine learning.",
];

const teachingAndOutreach: ReactNode[] = [
  <>
    Pitch research to the general public through major Russian newspaper coverage (
    <CompactLinks
      links={[
        { href: "https://www.kommersant.ru/doc/7832307", label: "1" },
        { href: "https://www.kommersant.ru/doc/6122817", label: "2" },
      ]}
    />
    ), blog posts (
    <CompactLinks
      links={[
        { href: "https://ifim.nus.edu.sg/tailor-made-2d-materials-became-closer-with-the-new-machine-learning-algorithm-developed-at-nus/", label: "1" },
        { href: "https://communities.springernature.com/posts/sparse-representation-for-machine-learning-the-properties-of-defects-in-2d-materials", label: "2" },
      ]}
    />
    ), a{" "}
    <a href="https://elementy.ru/events/435506/IV_Nauchnye_boi_NIU_VShE_na_Dne_Vyshki" target="_blank" rel="noreferrer">
      science slam
    </a>
    , interviews (
    <CompactLinks
      links={[
        { href: "https://academy.yandex.ru/posts/beresh-i-razbiraeshsya", label: "1" },
        { href: "https://habr.com/en/company/yandex/blog/422761/", label: "2" },
      ]}
    />
    ), and a public{" "}
    <a href="https://www.youtube.com/watch?v=zLFZ_z-7-JI&feature=youtu.be&t=7779" target="_blank" rel="noreferrer">
      talk
    </a>
    .
  </>,
  <>
    Taught at the Machine Learning in High Energy Physics Summer School in{" "}
    <CompactLinks
      links={[
        { href: "https://indico.cern.ch/event/439520/", label: "2015" },
        { href: "https://indico.cern.ch/event/497368/", label: "2016" },
        { href: "https://indico.cern.ch/event/613571/", label: "2017" },
        { href: "https://indico.cern.ch/event/687473/", label: "2018" },
        { href: "https://indico.cern.ch/event/768915/", label: "2019" },
        { href: "https://indico.cern.ch/event/838377/", label: "2020" },
        { href: "https://indico.cern.ch/event/1025052/", label: "2021" },
        { href: "https://indico.cern.ch/event/1229514/", label: "2023" },
      ]}
    />
    .
  </>,
  <>
    Lecturer in the{" "}
    <a href="https://www.coursera.org/specializations/aml" target="_blank" rel="noreferrer">
      Coursera Advanced Machine Learning specialisation
    </a>
    , which is{" "}
    <a href="https://www.hse.ru/en/news/edu/259378493.html" target="_blank" rel="noreferrer">
      award-winning
    </a>
    .
  </>,
  <>
    Taught and developed an introductory data analysis{" "}
    <a href="https://we.hse.ru/en/courses/206646463.html" target="_blank" rel="noreferrer">
      course
    </a>{" "}
    at HSE.
  </>,
  <>
    Delivered more than 20{" "}
    <a href="https://docs.google.com/document/d/1IOlBse4q0YgEoL_RCJTvJfbFhFaD_YMAIJJ3W77B_X0/edit?usp=sharing" target="_blank" rel="noreferrer">
      conference talks
    </a>
    .
  </>,
];

const service: ReactNode[] = [
  "Reviewer for RSC Advances, Machine Learning: Science and Technology, and AI for Accelerated Materials Design workshops at NeurIPS and ICLR (2023 - 2025).",
  "Peer Staff Supporter at NUS, serving as a first-line support for mental wellbeing.",
];

const otherItems: ReactNode[] = [
  "Aspiring stand-up comedian; bombed more than 20 times at open mics.",
  "International Junior Science Olympiad 2008 in Korea, silver medal.",
];

const stats: Stat[] = [
  { value: "12", label: "years in research" },
  {
    value: "\u226578",
    label: "h-index",
    note: {
      title: "h-index",
      body: (
        <>
          And from the hight of my{" "}
          <Link href="https://scholar.google.com/citations?hl=en&user=vamy2okAAAAJ" target="_blank" rel="noreferrer">
            citation pile
          </Link>
          , I&apos;m telling you: don&apos;t use h-index to judge people
        </>
      ),
      align: "right",
    },
  },
  { value: "9", label: "students mentored" },
  { value: "$3.4M", label: "grant co-PI" },
  { value: "20+", label: "conference talks" },
  {
    value: (
      <Image
        src="/Breakthrough_Prize_logo.webp"
        alt="Breakthrough Prize logo"
        width={28}
        height={28}
        className="cv-stat-icon"
      />
    ),
    label: "Breakthrough Prize 2025",
  },
];

const sectionNav = [
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Mentorship", href: "#mentorship" },
  { label: "Teaching", href: "#teaching" },
  { label: "Publications", href: "#publications" },
];

const publications: Publication[] = [
  {
    citation: (
      <>
        <strong>Kazeev, Nikita</strong>, et al.{" "}
        <a href="https://arxiv.org/abs/2503.02407" target="_blank" rel="noreferrer">
          WyckoffTransformer: Generation of Symmetric Crystals
        </a>
        . ICML 2025.
      </>
    ),
  },
  {
    citation: (
      <>
        <strong>Kazeev, N.</strong>, Al-Maeeni, A.R., Romanov, I. et al.{" "}
        <a href="https://doi.org/10.1038/s41524-023-01062-z" target="_blank" rel="noreferrer">
          Sparse representation for machine learning the properties of defects in 2D materials
        </a>
        . npj Comput Mater 9, 113 (2023).
      </>
    ),
  },
  {
    citation: (
      <>
        Anderlini, L., Chimpoesh, C., Kazeev, N., Shishigina, A., &amp; LHCb collaboration.{" "}
        <a href="https://iopscience.iop.org/article/10.1088/1742-6596/2438/1/012088/meta" target="_blank" rel="noreferrer">
          Generative models uncertainty estimation
        </a>
        . Journal of Physics: Conference Series, 2023. <strong>I&apos;m the corresponding author.</strong>
      </>
    ),
  },
  {
    citation: (
      <>
        M. Borisyak and N. Kazeev.{" "}
        <a href="https://doi.org/10.1088%2F1748-0221%2F14%2F08%2Fp08020" target="_blank" rel="noreferrer">
          Machine Learning on data with sPlot background subtraction
        </a>
        . Journal of Instrumentation 14.08 (2019). <strong>I&apos;m the corresponding author.</strong>
      </>
    ),
  },
  {
    citation: (
      <>
        Derkach, D., Kazeev, N., Ratnikov, F., Ustyuzhanin, A., &amp; Volokhova, A. (2019).{" "}
        <a href="https://doi.org/10.1016/j.nima.2019.01.031" target="_blank" rel="noreferrer">
          Cherenkov detectors fast simulation using neural networks
        </a>
        . <i>Nuclear Instruments and Methods in Physics Research Section A</i>.{" "}
        <strong>I&apos;m the corresponding author.</strong>
      </>
    ),
  },
];

/* ── Compute which skills have associated projects ── */
const skillsWithProjects = new Set<string>();
for (const entry of workExperience) {
  for (const h of entry.highlights) {
    for (const s of h.skills) {
      skillsWithProjects.add(s);
    }
  }
}

/* ── Helper components ── */

function CompactLinks({ links }: { links: ReferenceLink[] }) {
  return (
    <>
      {links.map((link, index) => (
        <span key={link.href}>
          {index > 0 ? ", " : ""}
          <a href={link.href} target="_blank" rel="noreferrer">
            {link.label}
          </a>
        </span>
      ))}
    </>
  );
}

function ReferenceList({ links }: { links: ReferenceLink[] }) {
  return (
    <p className="cv-links">
      <CompactLinks links={links} />
    </p>
  );
}

function CvStatCard({ stat }: { stat: Stat }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const popoverId = useId();
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!stat.note) {
    return (
      <div className="cv-stat">
        <p className="cv-stat-value">{stat.value}</p>
        <p className="cv-stat-label">{stat.label}</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-controls={popoverId}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        onClick={() => setIsOpen((current) => !current)}
        className="cv-stat cv-stat--button"
      >
        <p className="cv-stat-value">{stat.value}</p>
        <p className="cv-stat-label cv-stat-label--interactive">{stat.label}</p>
      </button>

      {isOpen ? (
        <span
          id={popoverId}
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          className={`absolute top-[calc(100%+0.75rem)] z-20 block w-[calc(100vw-1.5rem)] max-w-[24rem] rounded-2xl border border-neutral-300 bg-white/95 p-5 text-left shadow-xl shadow-neutral-950/10 backdrop-blur dark:border-neutral-700 dark:bg-neutral-950/95 dark:shadow-black/40 ${
            stat.note.align === "right" ? "right-0" : "left-0"
          }`}
        >
          <span className="flex items-start justify-between gap-4">
            <span
              id={titleId}
              className="block text-xs font-medium tracking-[0.2em] text-neutral-600 uppercase dark:text-neutral-400"
            >
              {stat.note.title}
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-sm text-neutral-600 transition-colors hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-500/40 dark:text-neutral-400 dark:hover:text-neutral-100 dark:focus:ring-neutral-300/30"
              style={{ font: "inherit" }}
            >
              Close
            </button>
          </span>

          <span className="mt-3 block text-sm leading-6 text-neutral-800 dark:text-neutral-200">
            {stat.note.body}
          </span>
        </span>
      ) : null}
    </div>
  );
}

/* ── Main component ── */

export default function CvContent() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const toggleSkill = useCallback((skill: string) => {
    setActiveSkill((prev) => {
      const next = prev === skill ? null : skill;
      if (next) {
        document.getElementById("experience")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return next;
    });
  }, []);

  const clearFilter = useCallback(() => setActiveSkill(null), []);

  function highlightMatches(highlight: Highlight): boolean {
    return activeSkill === null || highlight.skills.includes(activeSkill);
  }

  function entryHasMatch(entry: WorkEntry): boolean {
    return activeSkill === null || entry.highlights.some((h) => h.skills.includes(activeSkill));
  }

  return (
    <main className="prose cv-page flex w-full flex-1 flex-col px-2 py-6 md:px-0 md:py-8">
      <div className="w-full space-y-8">
        {/* ── Hero ── */}
        <section className="cv-hero space-y-6 border-b border-neutral-200 pb-6 dark:border-neutral-800">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <p className="eyebrow">Curriculum Vitae</p>
              <h1>Nikita Kazeev</h1>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a href={pdfHref} download="Nikita Kazeev - CV [January 2026].pdf" className="cv-download">
                Download PDF
              </a>
              <span className="text-xs text-neutral-400">Jan 2026</span>
            </div>
          </div>

          <p className="max-w-3xl">
            Research scientist at the intersection of AI and physics. Postdoc with{" "}
            <a href="https://en.wikipedia.org/wiki/Konstantin_Novoselov" target="_blank" rel="noreferrer">
              Kostya Novoselov
            </a>{" "}
            at NUS.
          </p>

          <div className="cv-stats" aria-label="Key metrics">
            {stats.map((stat) => (
              <CvStatCard key={stat.label} stat={stat} />
            ))}
          </div>
        </section>

        {/* ── Sticky section nav ── */}
        <nav className="cv-section-nav-sticky" aria-label="CV sections">
          <div className="cv-section-nav">
            {sectionNav.map((link) => (
              <a key={link.href} href={link.href} className="cv-nav-pill">
                {link.label}
              </a>
            ))}
          </div>
        </nav>

        {/* ── Skills ── */}
        <section id="skills" className="space-y-4">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2>Skills</h2>
            {activeSkill && (
              <button onClick={clearFilter} className="text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">
                Clear filter
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {skillTags.map((skill) => {
              const hasProjects = skillsWithProjects.has(skill.label);
              const isActive = activeSkill === skill.label;
              return (
                <button
                  key={skill.label}
                  type="button"
                  onClick={hasProjects ? () => toggleSkill(skill.label) : undefined}
                  className={`cv-skill-tag${hasProjects ? " cv-skill-tag--clickable" : ""}${isActive ? " cv-skill-tag--active" : ""}`}
                  aria-pressed={isActive}
                  title={hasProjects ? `Filter projects by ${skill.label}` : undefined}
                >
                  <strong>{skill.label}</strong>
                  {skill.detail ? <span className="cv-skill-detail">{skill.detail}</span> : null}
                </button>
              );
            })}
          </div>
        </section>

        {/* ── Work Experience ── */}
        <section id="experience" className="space-y-4">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2>Work Experience</h2>
            {activeSkill && (
              <span className="cv-filter-bar">
                Filtered by <strong>{activeSkill}</strong>
                <button onClick={clearFilter} className="cv-filter-clear" aria-label="Clear filter">&times;</button>
              </span>
            )}
          </div>

          <div className="space-y-5">
            {workExperience.map((entry) => (
              <article
                key={`${entry.organization}-${entry.period}`}
                className={`cv-entry rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800 dark:bg-neutral-950/30 transition-opacity${
                  !entryHasMatch(entry) ? " cv-entry--dimmed" : ""
                }`}
              >
                <div className="cv-entry-header">
                  <div>
                    <h3 className="text-lg font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
                      {entry.organization}
                    </h3>
                    <p className="cv-role">{entry.role}</p>
                  </div>
                  <p className="cv-period">{entry.period}</p>
                </div>

                {entry.note && (
                  <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">{entry.note}</p>
                )}

                <div className="mt-3 space-y-1.5">
                  {entry.highlights.map((highlight, hIndex) => {
                    const matches = highlightMatches(highlight);
                    const shouldOpen = activeSkill ? matches : hIndex === 0;
                    return (
                      <details
                        key={highlight.title}
                        className={`cv-highlight transition-opacity${!matches ? " cv-highlight--dimmed" : ""}`}
                        open={shouldOpen || undefined}
                      >
                        <summary>
                          <span className="flex flex-wrap items-center gap-2">
                            {highlight.title}
                            <span className="cv-project-skills">
                              {highlight.skills.map((skill) => (
                                <button
                                  key={skill}
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    toggleSkill(skill);
                                  }}
                                  className={`cv-project-skill${activeSkill === skill ? " cv-project-skill--active" : ""}`}
                                >
                                  {skill}
                                </button>
                              ))}
                            </span>
                          </span>
                          <svg className="cv-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </summary>
                        <div className="cv-highlight-content">
                          {highlight.references ? <ReferenceList links={highlight.references} /> : null}
                          <ul className="space-y-1.5">
                            {highlight.bullets.map((bullet, index) => (
                              <li key={index}>{bullet}</li>
                            ))}
                          </ul>
                        </div>
                      </details>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Education ── */}
        <section id="education" className="space-y-4">
          <h2>Education</h2>
          <div className="cv-timeline">
            {education.map((item, index) => (
              <div key={`${item.title ?? "item"}-${index}`} className="cv-timeline-item">
                <div className="cv-timeline-dot" />
                <div className="cv-timeline-content">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    {item.title ? <p className="font-medium text-neutral-900 dark:text-neutral-100">{item.title}</p> : null}
                    {item.period ? <p className="cv-period">{item.period}</p> : null}
                  </div>
                  <p className="mt-1 text-sm">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Mentorship & Teaching ── */}
        <section id="mentorship" className="space-y-4">
          <h2>Mentorship</h2>
          <ul className="space-y-2">
            {mentorship.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section id="teaching" className="space-y-4">
          <h2>Teaching &amp; Outreach</h2>
          <ul className="space-y-2">
            {teachingAndOutreach.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        {/* ── Publications ── */}
        <section id="publications" className="space-y-4">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2>Selected Publications</h2>
            <a href="https://scholar.google.com/citations?user=vamy2okAAAAJ" target="_blank" rel="noreferrer" className="text-sm">
              Full list on Google Scholar &rarr;
            </a>
          </div>
          <ol className="cv-publications space-y-3">
            {publications.map((publication, index) => (
              <li key={index}>{publication.citation}</li>
            ))}
          </ol>
        </section>

        {/* ── Service & Other (compact) ── */}
        <section className="cv-compact-section space-y-3 border-t border-neutral-200 pt-6 dark:border-neutral-800">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="eyebrow mb-2">Service</p>
              <ul className="space-y-1.5 text-sm">
                {service.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-2">Also</p>
              <ul className="space-y-1.5 text-sm">
                {otherItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
