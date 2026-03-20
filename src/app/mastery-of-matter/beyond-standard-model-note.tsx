"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

const beyondStandardModelObservations = [
  {
    title: "Dark matter",
    body:
      "Galactic rotation curves, gravitational lensing, and cosmology point to extra gravitating matter, but the Standard Model does not contain a particle that fits the role.",
  },
  {
    title: "Neutrino oscillations",
    body:
      "Neutrinos are observed changing flavor, which means they have mass. The minimal Standard Model does not account for that.",
  },
  {
    title: "Matter-antimatter asymmetry",
    body:
      "The observable universe is overwhelmingly matter, and the amount of CP violation in the Standard Model appears too small to explain that imbalance on its own.",
  },
];

type BeyondStandardModelNoteProps = {
  children: ReactNode;
};

export default function BeyondStandardModelNote({
  children,
}: BeyondStandardModelNoteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
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

  return (
    <span ref={containerRef} className="relative inline">
      <button
        type="button"
        aria-controls={popoverId}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        onClick={() => setIsOpen((current) => !current)}
        className="inline cursor-pointer rounded-sm border-0 bg-transparent p-0 text-left underline decoration-dotted decoration-neutral-500 underline-offset-[0.18em] transition-colors hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-500/40 dark:hover:text-neutral-100 dark:focus:ring-neutral-300/30"
        style={{ font: "inherit" }}
      >
        {children}
      </button>

      {isOpen ? (
        <span
          id={popoverId}
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          className="absolute left-0 top-[calc(100%+0.75rem)] z-20 block w-[calc(100vw-1.5rem)] max-w-[34rem] rounded-2xl border border-neutral-300 bg-white/95 p-5 text-left shadow-xl shadow-neutral-950/10 backdrop-blur dark:border-neutral-700 dark:bg-neutral-950/95 dark:shadow-black/40"
        >
          <span className="flex items-start justify-between gap-4">
            <span
              id={titleId}
              className="block text-xs font-medium tracking-[0.2em] text-neutral-600 uppercase dark:text-neutral-400"
            >
              Beyond the Standard Model
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
            The Standard Model is extraordinarily successful, but current data
            and cosmology already show it is not the whole story.
          </span>

          {beyondStandardModelObservations.map((item) => (
            <span
              key={item.title}
              className="mt-3 block text-sm leading-6 text-neutral-800 dark:text-neutral-200"
            >
              <strong className="font-medium text-neutral-900 dark:text-neutral-100">
                {item.title}:
              </strong>{" "}
              {item.body}
            </span>
          ))}

          <span className="mt-3 block text-sm leading-6 text-neutral-800 dark:text-neutral-200">
            Quantum gravity is a different kind of gap: there is no confirmed
            direct signal of a graviton or another quantum-gravity effect yet,
            but the Standard Model does not include gravity at all, so it cannot
            be the final framework for black holes, the Big Bang, or any regime
            where quantum mechanics and general relativity must both apply.
          </span>

          <a
            href="https://en.wikipedia.org/wiki/Physics_beyond_the_Standard_Model"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex text-sm no-underline transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            Reference: Physics beyond the Standard Model
          </a>
        </span>
      ) : null}
    </span>
  );
}
