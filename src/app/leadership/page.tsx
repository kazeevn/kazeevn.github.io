import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leadership | Nikita Kazeev",
  description:
    "Leadership, mentorship, teaching, and outreach across machine learning, physics, and scientific community building.",
};

const leadershipItems = [
  {
    title: "Scientific community building",
    items: [
      "Speaker search and selection for the 500-person AI4X 2025 conference.",
      "Main organizer of the ICLR 2025 workshop on multiscale machine learning.",
      "Reviewer for RSC Advances, Machine Learning: Science and Technology, and AI for Accelerated Materials Design workshops at NeurIPS and ICLR.",
    ],
  },
  {
    title: "Research leadership",
    items: [
      "Led a team of 6 on WyckoffTransformer, a symmetry-aware generative model for crystal design.",
      "Led a team of 3 on machine learning for defects in 2D materials, including reproducible experimental infrastructure.",
      "Led a team of 3 students on uncertainty estimation for generative models in high-energy physics.",
      "Co-PI of a 3.4 million dollar AI Singapore grant on multiscale machine learning.",
    ],
  },
  {
    title: "Mentorship and institutional roles",
    items: [
      "Mentored 9 students and 3 interns across research and applied machine learning projects.",
      "Student council member from 2013 to 2016, leading several dormitory-scale IT projects.",
      "Peer Staff Supporter at NUS, serving as first-line support for mental wellbeing.",
    ],
  },
];

export default function LeadershipPage() {
  return (
    <main className="prose prose-neutral dark:prose-invert max-w-none flex w-full flex-1 flex-col px-2 py-6 md:px-0 md:py-8">
      <div className="w-full space-y-10">
        <section className="grid gap-6 pb-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="space-y-4">
            <p className="eyebrow">
              Leadership
            </p>
            <h1 className="max-w-4xl">
              Leading through research, community, and intellectual clarity.
            </h1>
            <p className="max-w-3xl">
              My leadership work spans research teams, scientific events,
              mentorship, and public communication. The common thread is simple:
              create structures that help difficult ideas move further, faster,
              and with more people able to contribute meaningfully.
            </p>
          </div>

          <div className="pt-1 lg:pl-6">
            <p className="eyebrow">
              Leadership principle
            </p>
            <p className="lead mt-3">
              Strong leadership in science means setting direction, creating
              systems for others to do excellent work, and making the field more
              coherent than you found it.
            </p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {leadershipItems.map((section) => (
            <article key={section.title} className="pt-1">
              <p className="eyebrow">
                {section.title}
              </p>
              <ul className="mt-3 space-y-2">
                {section.items.map((item) => (
                  <li key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}