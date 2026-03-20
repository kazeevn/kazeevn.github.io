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
    <main className="mx-auto flex w-full max-w-5xl flex-1 px-6 py-10 sm:px-8 sm:py-16">
      <div className="w-full space-y-12">
        <section className="grid gap-8 border-b border-border pb-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="space-y-5">
            <p className="text-[0.72rem] uppercase tracking-[0.24em] text-accent-strong">
              Research Statement
            </p>
            <h1 className="max-w-4xl text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl">
              Mastery of matter starts with better approximations.
            </h1>
            <p className="max-w-3xl hyphens-auto text-justify text-lg leading-8 text-muted">
              My working view of science is simple: in the end, we are trying to
              compute consequences of the laws of physics for specific systems.
              The underlying theory may be known, but exact calculation is
              usually impossible, wasteful, or simply at the wrong scale. Real
              progress comes from finding approximations that preserve what
              matters for the question at hand.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-accent-strong">
              Core idea
            </p>
            <p className="mt-4 text-lg leading-8 text-foreground">
              I use machine learning to build approximations that are faster than
              brute-force simulation, more structured than generic black-box
              fitting, and useful for actual scientific decisions.
            </p>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-3">
          {principles.map((item) => (
            <article key={item.title} className="rounded-3xl border border-border bg-card p-6">
              <p className="text-sm uppercase tracking-[0.18em] text-accent-strong">
                {item.title}
              </p>
              <p className="mt-4 hyphens-auto text-justify leading-7 text-muted">{item.body}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="space-y-5 rounded-3xl border border-border bg-card p-7">
            <p className="text-sm uppercase tracking-[0.2em] text-accent-strong">
              What I mean by this
            </p>
            <p className="hyphens-auto text-justify leading-8 text-muted">
              If one takes the Standard Model seriously, then most of science and
              engineering can be viewed as the art of computing approximate
              solutions for relevant effective degrees of freedom. Nobody designs
              a material, analyzes a detector, or studies a defect by solving the
              microscopic equations in full generality. We work through reduced
              descriptions, symmetries, coarse-graining, and controlled shortcuts.
            </p>
            <p className="hyphens-auto text-justify leading-8 text-muted">
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

          <article className="space-y-5 rounded-3xl border border-border p-7">
            <p className="text-sm uppercase tracking-[0.2em] text-accent-strong">
              Research program
            </p>
            <ul className="space-y-4 text-muted">
              {agenda.map((item) => (
                <li key={item} className="flex gap-3 leading-7">
                  <span className="mt-2 h-2 w-2 rounded-full bg-accent" />
                  <span className="hyphens-auto text-justify">{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="space-y-5">
          <div className="max-w-3xl space-y-3">
            <p className="text-sm uppercase tracking-[0.2em] text-accent-strong">
              Selected work
            </p>
            <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
              Concrete projects behind the argument.
            </h2>
            <p className="hyphens-auto text-justify leading-8 text-muted">
              These are the projects that shaped the way I think about machine
              learning for science: not as generic prediction, but as the craft
              of building the right approximation for a hard physical problem.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {selectedWork.map((item) => (
              <article key={item.title} className="rounded-3xl border border-border bg-card p-6">
                <p className="text-sm uppercase tracking-[0.18em] text-accent-strong">
                  {item.title}
                </p>
                <p className="mt-4 hyphens-auto text-justify leading-7 text-muted">{item.body}</p>
                <ul className="mt-5 space-y-3 text-sm text-muted">
                  {item.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-baseline gap-2 transition-colors hover:text-accent-strong"
                      >
                        <span className="font-medium text-foreground">{link.label}</span>
                        <span className="text-muted">{link.note}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-border bg-card p-7 sm:p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-accent-strong">
            End goal
          </p>
          <p className="mt-4 max-w-4xl hyphens-auto text-justify text-lg leading-8 text-muted">
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