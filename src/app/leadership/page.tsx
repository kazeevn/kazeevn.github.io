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

const teachingAndOutreach = [
  {
    title: "Teaching",
    body:
      "Teaching is presented here as a form of leadership because it scales expertise beyond a single project. This includes teaching at the Machine Learning in High Energy Physics Summer School across eight editions between 2015 and 2023, lecturing in the Coursera Advanced Machine Learning specialization, and contributing teaching and course development for an introductory data analysis course at HSE.",
  },
  {
    title: "Outreach",
    body:
      "Outreach extends that same work into broader audiences through newspaper features, research blogs, interviews, public talks, and science-slam style presentations. The purpose is not promotion for its own sake, but building public and interdisciplinary understanding around what machine learning for science can realistically do.",
  },
  {
    title: "Why it belongs here",
    body:
      "Teaching and outreach belong on this page because they shape agendas, grow technical communities, and make difficult ideas transferable across students, collaborators, and the public.",
  },
];

export default function LeadershipPage() {
  return (
    <main className="flex w-full flex-1 flex-col px-2 py-6 md:px-0 md:py-8">
      <div className="w-full space-y-10">
        <section className="grid gap-6 pb-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="space-y-4">
            <p className="text-sm tracking-tight text-accent-strong">
              Leadership
            </p>
            <h1 className="max-w-4xl text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
              Leading through research, community, and intellectual clarity.
            </h1>
            <p className="max-w-3xl hyphens-auto text-justify leading-6 text-muted">
              My leadership work spans research teams, scientific events,
              mentorship, and public communication. The common thread is simple:
              create structures that help difficult ideas move further, faster,
              and with more people able to contribute meaningfully.
            </p>
          </div>

          <div className="pt-1 lg:pl-6">
            <p className="text-sm tracking-tight text-accent-strong">
              Leadership principle
            </p>
            <p className="mt-3 leading-6 text-foreground">
              Strong leadership in science means setting direction, creating
              systems for others to do excellent work, and making the field more
              coherent than you found it.
            </p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {leadershipItems.map((section) => (
            <article key={section.title} className="pt-1">
              <p className="text-sm tracking-tight text-accent-strong">
                {section.title}
              </p>
              <ul className="mt-3 space-y-2 text-muted">
                {section.items.map((item) => (
                  <li key={item} className="leading-6 hyphens-auto text-justify">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="space-y-5">
          <div className="max-w-3xl space-y-3">
            <p className="text-sm tracking-tight text-accent-strong">
              Teaching and outreach
            </p>
            <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">
              Teaching and outreach as leadership.
            </h2>
            <p className="hyphens-auto text-justify leading-6 text-muted">
              This section is included here because teaching and outreach are
              part of how scientific leadership works in practice. They scale
              expertise, expand the pipeline of collaborators, and make advanced
              work legible beyond a narrow specialist audience.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {teachingAndOutreach.map((item) => (
              <article key={item.title} className="pt-1">
                <p className="text-sm tracking-tight text-accent-strong">
                  {item.title}
                </p>
                <p className="mt-3 hyphens-auto text-justify leading-6 text-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}