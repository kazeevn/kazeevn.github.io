import type { Metadata } from "next";
import Link from "next/link";
import BeyondStandardModelNote from "./beyond-standard-model-note";
import StandardModelEquation from "./standard-model-equation";

export const metadata: Metadata = {
  title: "Mastery of Matter | Nikita Kazeev",
  description:
    "A research statement on science as approximate computation and machine learning as a path to practical mastery over matter.",
};

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
    <main className="prose prose-neutral dark:prose-invert max-w-none flex w-full flex-1 flex-col px-2 py-6 md:px-0 md:py-8">
      <div>
        <p className="eyebrow">
          Research Statement
        </p>
        <h1 className="max-w-4xl">
          Mastery of matter means approximate computation
        </h1>
        <StandardModelEquation />
        <p>
          <BeyondStandardModelNote>Almost</BeyondStandardModelNote>{" "}
          everything we observe on Earth is governed by this equation, the
          appropriately named Standard Model of particle physics. It is
          fascinating from the machine learning point of view - the ultimate
          example of inductive bias. From a relatively small experimental
          dataset, we inferred an equation which with almost perfect
          generalizability describes a huge range of phenomena, from the
          behavior of quarks in the Large Hadron Collider to the electrons
          inside an H100 GPU, and the DNA of the living organisms.
        </p>
        <p>
          In a way, we have <i>solved</i> science. Aristotle claimed that by using pure reason he could understand the world, now we finally can. And yet, there are no cure for cancer, fusion power plant, or a printer that consistently connects to the Wi-Fi on the first try – all of which are most certainly permitted by the Standard Model.

          The cause of this most unfortunate gap is our meager reasoning power. Anything more complex than a hydrogen atom can't be solved exactly – we enter the realm of approximation. Machine learning, by its nature is the automated tool for approximation building. My research is about using it to expand the frontier of what we can understand and control in the physical world.
        </p>
      </div>
      <h2>Vision</h2>
      <h3>Forward problem: Prediction</h3>
      <p>
        The most straightforward application of machine learning is to take an expensive ab initio simulator, run in it enough times, and train a model to appropriate the result. I did this for a <Link href="https://doi.org/10.1016/j.nima.2019.01.031" target="_blank">Cherenkov detector</Link>, for example. This naive approach has crucial practical and fundamental limitations. Practically, for it to make sense, the training dataset must be much smaller than the number of future model invocations. Fundamentally, such an approach will only ever be capable of modelling the systems which can be reliably and cheaply simulated in the first place. Particle physics detectors, where Monte-Carlo simulation repeatedly models interactions of the same types of particles with the same detector, are a good example where straightforward ML surrogate works.
      </p>
      <p>
        The infinitely more interesting and challenging problem is expanding the range of systems which can be modelled. Solve Schrödinger equation for 10 atoms, train a model to predict for 1000. The issue is that such a model can't ever be a naive black box – it must contain some assuptions, some <i>inductive bias</i> about operation of the world. For example, once we agree that interatomic interactions are limited by physical distance, we suddenly can train an ML model on small systems and predict the properties of much larger ones, leading to machine-learning interatomic potentials, the most successful application of ML in materials science to date. We are <Link href="https://omniscale-ai.github.io/" target="_blank">looking for similar scale transitions</Link> across the board.
      </p>
      <p>
        Short-range interactions are the most obvious inductive bias to use. But it's unlikely that it would lead us to things like a tractable superconductivity model. We need better and more creative assumptions. The ongoing explosion of <i>reasoning models</i> offers enticing opportunities here:
        <ul>
          <li>AI Theoretician, which would carry analytical math to bound and isolate the black-box approximation among strictly derived equations, similarly to Nobel-prize winning <Link href="https://www.nobelprize.org/prizes/chemistry/1998/summary/" target="_blank">density functional theory</Link></li>
          <li>AI Phenomenologist – its softer brother who doesn't rely on strict mathematical derivation, but uses the available experimental data and general physical principles to build a working model.</li>
        </ul>
      </p>
      <h3>Inverse problem: Mastery</h3>
      <p>
        From the point of view of the applied science, prediction is just scaffolding which enables us to make <i>useful</i> things. The ultimate goal is to <i>control</i> the system, to design it to our needs. This is the inverse problem. It is also much harder, as it requires us to navigate the space of possible solutions, rather than just predicting the outcome for a given input.
      </p>
      <p>
        For most real-world applications, the utility function is just too complex to define and expensive to evaluate. The traditional solution is to define a hierachy of proxy functions, each approximating the utility function at a different level of abstraction and cost. For example, see our <Link href="https://doi.org/10.1088/2053-1583/ad4661" target="_blank">review on automated 2D material design</Link>. Again, modern reasoning AI offers an opportunity here: instead of manually crafting proxy functions, they can be generated and refined based on literature and upstream results.
      </p>
      <p>
        Once, at some level, the search space and the fitness function are fixed, the problem becomes an optimization problem. And global optimization is hard, with no unversal algorithm that works for all problems. Optimizaton typically has two things to balance: exploration vs exploitation and the cost of the surrogate model vs the evaluation cost. This leads to very different approaches in different domains.
      </p>
      <p>
        In <Link href="https://doi.org/10.1103/gr2z-3qjp" target="_blank">our work on Terahertz antenna</Link> the fitness function was well-defined and bearable, and the search space high-dimensional, so we went with annealing.
      </p>
      <p>
        In materials science, on the other hand, true fitness is often prohibitively e
      </p>
    </main>
  );
}
