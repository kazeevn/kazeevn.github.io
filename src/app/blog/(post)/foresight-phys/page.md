# Can an AI Forecast a Physics Experiment?
*July 1, 2026*

![Foresight-Phys: fresh arXiv preprint to AI forecast to scored against reality](/foresight-phys/foresight-phys.svg)

Can an AI predict the outcome of a physics experiment before the result is in? Ian Babich and I built a benchmark to find out, and the answer turned out more sobering than we had hoped.

The aspiration behind this is [objective governance of science](/reward-signal-for-the-academy). One way or another, doing science means making calibrated guesses. Every grant is a bet that an experiment will, in some way, succeed, and it lives in a delicate balance: bet on something completely new and failure is nearly guaranteed; bet on something you can reliably predict and there is no novelty. Today grants and peer review rest on human judgment with no feedback loop — nothing ever tells us whether a reviewer's bet that "this will work" was actually right. So the natural test: can frontier LLMs make those bets?

To keep the models from simply looking up the answer, we take the newest arXiv physics preprints — released after each model's training cutoff — and ask the LLM to forecast the experimental results as calibrated (p10, p50, p90) intervals, scored against each paper's ground truth. The pipeline is automated and online, so the benchmark grows with every arXiv month and every new model. We call it Foresight-Phys.

The honest headline: the positivity-bias bottleneck is higher than we hoped. On results stated in abstracts, the best model reaches 94.5% — but just guessing "it worked" already scores 84.6%, because published papers overwhelmingly report successes. That leaves under ten points of genuine foresight. Strip out the trivial fields and performance drops from ~87% to ~71%. And on the numbers that actually decide whether a result holds — the buried efficiencies that never make it into the abstract — the models land the right order of magnitude but are systematically overconfident: their uncertainty intervals are simply too narrow.

So: a meaningful bar, but well below the super-human ceiling you would want before trusting anything like automated governance. Calibration on continuous quantities is the open problem.

I'll be presenting this at the ICML 2026 Forecasting Workshop. If you'll be there, I'd genuinely love to talk — about forecasting, about the [reward-signal-for-science idea](/reward-signal-for-the-academy), or about why the whole premise might be wrong.

The [paper is on OpenReview](https://openreview.net/forum?id=GhUK6VGW67); the code, data, and per-paper reports are [on GitHub](https://github.com/kazeevn/Foresight-Phys).

---

[View the original post on LinkedIn](https://www.linkedin.com/posts/nikita-kazeev_can-an-ai-predict-the-outcome-of-a-physics-share-7478041454775414784-R3k0/)
