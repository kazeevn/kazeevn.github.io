import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "A Reward Signal for the Academy | Nikita Kazeev",
  description:
    "On replacing the stumbling of peer review with a feedback loop: AI as the path from philosophical wandering to reinforcement learning over scientific progress.",
};

export default function ResourceAllocationPage() {
  return (
    <main className="prose flex w-full flex-1 flex-col px-2 py-6 md:px-0 md:py-8">
      <div className="w-full space-y-10">
        <div>
          <p className="eyebrow">Research Statement</p>
          <h1>A Reward Signal for the Academy</h1>
          <p>
            Research as a whole is an activity with sparse reward. A fundamental
            discovery or a useful material are not the result of a single
            experiment, but the end point of a long sequence of decisions about
            what to try next. So far, the science operates on the principle of
            peer review. This process is flawed on many levels. The technical
            level is something a well-motivated human can reliably do; it's a
            low-hanging fruit for an AI:
          </p>
          <ul>
            <li>
              Peer review is supposed to check technical validity. Humans are
              lazy, AI is not. AI will check the math.
            </li>
            <li>
              Peer review is supposed to assess the context of the related work.
              With a human it's a hit or miss, with Deep Research it's not.
            </li>
          </ul>
          <p>
            The high-hanging fruit is the strategic level, the mystic novelty,
            significance, and research taste. Human reviewers are notoriously bad
            at it:
          </p>
          <ul>
            <li>Novelty and significance are subjective and not well-defined</li>
            <li>
              Echo Chambers leading to model collapse – of course I think that{" "}
              <Link href="https://arxiv.org/abs/2503.02407">space groups</Link>{" "}
              are the most important part of generating new crystals.
            </li>
            <li>
              The problem is genuinely insanely hard. Answering the question "is
              this study useful?" requires tracing its implications all the way
              to the real-world applications.
            </li>
            <li>
              Fundamentally, the system lacks any kind of feedback mechanism. An
              enthusiastic, polite, well-meaning reviewer who is simply bad at
              significance assessment will do a lot of reviews without ever
              knowing he is wrong.
            </li>
          </ul>
          <p>
            AI, in its text and agentic LLM form, has a unique ability at
            gathering and processing information at scale. It can read every
            paper, every blog post, every tweet, and every grant proposal. It can
            track the impact of each piece of work on the field and on the real
            world.
          </p>
          <p>
            AI will have a feedback loop. Human reviewers are not incentivized to
            be right, but AI is.
          </p>
          <p>
            Finally, elegance. For too long the scientific progress was a
            mysterious philosopher's journey among Platonic Forms. Let's finally
            make it{" "}
            <Link href="https://miro.com/app/board/uXjVJnuhKys=/?share_link_id=792830040596">
              into an RL policy.
            </Link>
          </p>
          <p>
            The impact will be profound. A 10% improvement in annual grant
            allocation is a compounding 10% acceleration of scientific progress.
          </p>
        </div>
      </div>
    </main>
  );
}
