import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mastery of Matter | Nikita Kazeev",
  description:
    "A research statement on science as approximate computation and machine learning as a path to practical mastery over matter.",
};

const principles = [
  {
    title: "The base theory is not the bottleneck",
    body:
      "For much of the physical world, we already know the underlying rules well enough. The Standard Model and its effective descendants define the game. The hard part is not writing the equations down, but extracting useful answers for specific materials, devices, defects, and operating conditions.",
  },
  {
    title: "Science works through approximations",
    body:
      "Every practical scientific workflow is an approximation stack: choose the right variables, discard irrelevant detail, exploit symmetry, and compute only what matters for the decision at hand. The value of a scientific model is its ability to preserve the essential structure while making prediction tractable.",
  },
  {
    title: "Machine learning extends the approximation toolkit",
    body:
      "Machine learning becomes useful when it is treated not as a replacement for physics, but as a disciplined way to learn reduced representations, surrogate simulators, and multiscale bridges. It should compress expensive computation without breaking the invariants that make the answers scientifically meaningful.",
  },
];

const agenda = [
  "Learn representations that respect symmetry, sparsity, and scale separation.",
  "Build surrogates for expensive simulations so the search space becomes explorable.",
  "Quantify uncertainty well enough that models can support real decisions rather than only retrospective fits.",
  "Turn domain expertise into reusable tools that let more scientists reason at the right level of abstraction.",
];

const selectedWork = [
  {
    title: "Symmetry-aware generation for crystal design",
    body:
      "This line of work asks how generative models can internalize the symmetries that make crystals physically meaningful, so search over candidate materials becomes both broader and more faithful.",
    links: [
      {
        href: "https://arxiv.org/abs/2503.02407",
        label: "WyckoffTransformer paper",
        note: "ICML 2025 / arXiv",
      },
      {
        href: "https://icml.cc/virtual/2025/poster/44595",
        label: "ICML poster",
        note: "Conference presentation",
      },
      {
        href: "https://github.com/SymmetryAdvantage/WyckoffTransformer",
        label: "Code",
        note: "Implementation",
      },
    ],
  },
  {
    title: "Defects, sparse structure, and materials property prediction",
    body:
      "For materials with defects, the core challenge is finding a representation that preserves the right physics while remaining computationally manageable. This is approximation in its most practical form: choosing the structure that lets prediction become useful.",
    links: [
      {
        href: "https://www.nature.com/articles/s41524-023-01062-z",
        label: "Sparse representation for defects in 2D materials",
        note: "npj Computational Materials 2023",
      },
      {
        href: "https://www.nature.com/articles/s41699-023-00369-1",
        label: "Related defects-and-properties paper",
        note: "Digital Discovery 2023",
      },
      {
        href: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=vamy2okAAAAJ&sortby=pubdate&citation_for_view=vamy2okAAAAJ:uAPFzskPt0AC",
        label: "Patent",
        note: "Defect-property modeling",
      },
    ],
  },
  {
    title: "Surrogates for expensive physics simulation",
    body:
      "In high-energy physics, the problem becomes stark: exact simulation is too slow for large-scale iteration. Learned surrogates make the design loop navigable, provided they preserve the observables that matter.",
    links: [
      {
        href: "https://doi.org/10.1016/j.nima.2019.01.031",
        label: "Cherenkov detector fast simulation",
        note: "Nuclear Instruments and Methods A 2019",
      },
      {
        href: "https://arxiv.org/abs/1905.11825",
        label: "Fast simulation preprint",
        note: "arXiv",
      },
      {
        href: "https://ml4physicalsciences.github.io/files/NeurIPS_ML4PS_2019_40.pdf",
        label: "NeurIPS ML4PS workshop paper",
        note: "Workshop version",
      },
    ],
  },
  {
    title: "Uncertainty and learning under imperfect supervision",
    body:
      "Approximation is only useful if its limits are visible. That is why uncertainty estimation and learning under noisy labels are part of the same agenda: they determine when a learned approximation is safe to act on.",
    links: [
      {
        href: "https://iopscience.iop.org/article/10.1088/1742-6596/2438/1/012088",
        label: "Generative models uncertainty estimation",
        note: "Journal of Physics: Conference Series 2023",
      },
      {
        href: "https://doi.org/10.1088/1748-0221/14/08/P08020",
        label: "Machine learning on data with sPlot background subtraction",
        note: "JINST 2019",
      },
      {
        href: "https://www.youtube.com/watch?v=f9EhbrNxLjs&t=4298s",
        label: "Presentation video",
        note: "Noise-aware learning talk",
      },
    ],
  },
];

export default function MasteryOfMatterPage() {
  return (
    <main className="prose flex w-full flex-1 flex-col px-2 py-6 md:px-0 md:py-8">
      <div className="w-full space-y-10">
        <section className="grid gap-6 pb-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="space-y-4">
            <p className="eyebrow">
              Research Statement
            </p>
            <h1 className="max-w-4xl">
              Mastery of matter starts with better approximations.
            </h1>
            <p className="max-w-3xl">
              My working view of science is simple: in the end, we are trying to
              compute consequences of the laws of physics for specific systems.
              The underlying theory may be known, but exact calculation is
              usually impossible, wasteful, or simply at the wrong scale. Real
              progress comes from finding approximations that preserve what
              matters for the question at hand.
            </p>
          </div>

          <div className="pt-1 lg:pl-6">
            <p className="eyebrow">
              Core idea
            </p>
            <p className="lead mt-3">
              I use machine learning to build approximations that are faster than
              brute-force simulation, more structured than generic black-box
              fitting, and useful for actual scientific decisions.
            </p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {principles.map((item) => (
            <article key={item.title} className="pt-1">
              <p className="eyebrow">
                {item.title}
              </p>
              <p className="mt-3">
                {item.body}
              </p>
            </article>
          ))}
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="space-y-5 pt-1">
            <p className="eyebrow">
              What I mean by this
            </p>
            <p>
              If one takes the Standard Model seriously, then most of science and
              engineering can be viewed as the art of computing approximate
              solutions for relevant effective degrees of freedom. Nobody designs
              a material, analyzes a detector, or studies a defect by solving the
              microscopic equations in full generality. We work through reduced
              descriptions, symmetries, coarse-graining, and controlled shortcuts.
            </p>
            <p>
              Machine learning is useful here not because it replaces physics,
              but because it can help construct these shortcuts. In the best
              case, it learns representations, surrogates, and uncertainty models
              that let us compute at the right level of abstraction. In particle
              physics this means extracting signal from noisy or weakly labeled
              data and replacing expensive detector simulation where appropriate.
              In materials science it means navigating huge spaces of structures,
              symmetries, and defects without paying the full microscopic cost at
              every step.
            </p>
          </article>

          <article className="space-y-5 pt-1">
            <p className="eyebrow">
              Research program
            </p>
            <ul className="space-y-3">
              {agenda.map((item) => (
                <li key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="space-y-5">
          <div className="max-w-3xl space-y-3">
            <p className="eyebrow">
              Selected work
            </p>
            <h2>
              Concrete projects behind the argument.
            </h2>
            <p>
              These are the projects that shaped the way I think about machine
              learning for science: not as generic prediction, but as the craft
              of building the right approximation for a hard physical problem.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {selectedWork.map((item) => (
              <article key={item.title} className="pt-1">
                <p className="eyebrow">
                  {item.title}
                </p>
                <p className="mt-3">
                  {item.body}
                </p>
                <ul className="mt-5 space-y-3 text-sm">
                  {item.links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} target="_blank" rel="noreferrer">
                        <strong>{link.label}</strong>
                        <small>{link.note}</small>
                      </a>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="pt-1">
          <p className="eyebrow">
            End goal
          </p>
          <p className="mt-3 max-w-4xl">
            The point is not machine learning for its own sake. The point is to
            expand our ability to understand and deliberately shape the physical
            world. Better approximations mean better experiments, better models,
            better materials, and eventually a more direct form of human control
            over matter. That is the direction of my research.
          </p>
        </section>
      </div>
    </main>
  );
}