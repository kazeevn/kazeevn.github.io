"use client";

import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";
import ExportedImage from "next-image-export-optimizer";
import { renderFormattedText } from "@/utils/format";
import cvData from "@/data/cv_data.json";
import publicationsData from "@/data/publications.json";

type ReferenceLink = {
  href: string;
  label: string;
};

type Highlight = {
  title: string;
  references?: ReferenceLink[];
  bullets?: string[];
  skills: string[];
};

type WorkEntry = {
  organization: string;
  role: string;
  period: string;
  note?: string;
  highlights?: Highlight[];
};

type SimpleSectionItem = {
  title?: string;
  period?: string;
  body: string;
};

type EducationDegree = {
  degree: string;
  period?: string;
  detail?: string;
};

type EducationItem = {
  title: string;
  period?: string;
  degree?: string;
  details?: string[];
  degrees?: EducationDegree[];
};

type Publication = {
  citation: string;
  category?: string;
};

type SkillTag = {
  label: string;
  detail?: string;
  tags?: string[];
};

type Differentiator = {
  body: string;
  tags?: string[];
};

type Stat = {
  value: string;
  label: string;
  icon?: string;
  note?: {
    title: string;
    body: string;
    align?: string;
  };
};

const pdfHref = "/Nikita_Kazeev_CV.pdf";

const differentiators: Differentiator[] = cvData.differentiators;
const skillTags: SkillTag[] = cvData.skills;
const workExperience: WorkEntry[] = cvData.workExperience;
const education: EducationItem[] = cvData.education;
const mentorship = cvData.mentorship;
const teachingAndOutreach = cvData.teachingAndOutreach;
const service = cvData.service;
const stats: Stat[] = cvData.stats;
const publications: Publication[] = publicationsData;
const icmlPapers = publications.filter((p) => p.category === "icml2026");
const selectedPubs = publications.filter((p) => p.category !== "icml2026");

const sectionNav = [
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Mentorship", href: "#mentorship" },
  { label: "Teaching", href: "#teaching" },
  ...(icmlPapers.length > 0 ? [{ label: "ICML 2026", href: "#icml2026" }] : []),
  { label: "Publications", href: "#publications" },
];

/* ── Compute which skills have associated projects ── */
const skillsWithProjects = new Set<string>();
for (const entry of workExperience) {
  for (const h of entry.highlights ?? []) {
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
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
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

  const cardContent = (
    <>
      <div className="cv-stat-value flex flex-1 flex-col items-center justify-center gap-1.5 min-h-[2.75rem]">
        {stat.icon ? (
          <>
            <ExportedImage
              src={stat.icon}
              alt=""
              width={36}
              height={36}
              placeholder="empty"
              className="h-9 w-9 object-contain"
            />
            <span className="text-xs font-bold leading-tight tracking-tight text-neutral-800 dark:text-neutral-200">
              {stat.value}
            </span>
          </>
        ) : (
          <span>{stat.value}</span>
        )}
      </div>
      <p className={`cv-stat-label ${stat.note ? "cv-stat-label--interactive" : ""}`}>{stat.label}</p>
    </>
  );

  if (!stat.note) {
    return (
      <div className="cv-stat">
        {cardContent}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative h-full">
      <button
        type="button"
        aria-controls={popoverId}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        onClick={() => setIsOpen((current) => !current)}
        className="cv-stat cv-stat--button"
      >
        {cardContent}
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
            {renderFormattedText(stat.note.body)}
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
    return activeSkill === null || (entry.highlights?.some((h) => h.skills.includes(activeSkill)) ?? false);
  }

  return (
    <main className="cv-page flex w-full flex-1 flex-col px-2 py-6 text-neutral-800 dark:text-neutral-200 md:px-0 md:py-8">
      <div className="w-full space-y-12">
        {/* ── Hero ── */}
        <section className="cv-hero space-y-6 border-b border-neutral-200 pb-6 dark:border-neutral-800">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <p className="text-xs font-bold tracking-widest text-neutral-500 dark:text-neutral-400 uppercase">Curriculum Vitae</p>
              <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl">
                {cvData.personal.name}
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a href={pdfHref} download="Nikita Kazeev – CV.pdf" className="cv-download">
                Download PDF
              </a>
              <span className="text-xs text-neutral-400">June 2026</span>
            </div>
          </div>

          <p className="max-w-4xl text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
            {cvData.personal.title}. Postdoc with{" "}
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
            <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 pb-2 dark:border-neutral-800 w-full flex justify-between items-baseline">
              <span>Skills</span>
              {activeSkill && (
                <button onClick={clearFilter} className="text-sm font-normal text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">
                  Clear filter
                </button>
              )}
            </h2>
          </div>
          <ul className="list-disc pl-5 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
            {differentiators.map((item, index) => (
              <li key={index}>{renderFormattedText(item.body)}</li>
            ))}
          </ul>
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
            <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 pb-2 dark:border-neutral-800 w-full flex justify-between items-baseline">
              <span>Work Experience</span>
              {activeSkill && (
                <span className="cv-filter-bar text-sm font-normal">
                  Filtered by <strong>{activeSkill}</strong>
                  <button onClick={clearFilter} className="cv-filter-clear" aria-label="Clear filter">&times;</button>
                </span>
              )}
            </h2>
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
                    <h3 className="text-base font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                      {entry.organization}
                    </h3>
                    <p className="cv-role">{entry.role}</p>
                  </div>
                  <p className="cv-period">{entry.period}</p>
                </div>

                {entry.note && (
                  <p className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                    {renderFormattedText(entry.note)}
                  </p>
                )}

                <div className="mt-4 space-y-2">
                  {(entry.highlights ?? []).map((highlight, hIndex) => {
                    const matches = highlightMatches(highlight);
                    const shouldOpen = activeSkill ? matches : hIndex === 0;
                    return (
                      <details
                        key={highlight.title}
                        className={`cv-highlight transition-opacity${!matches ? " cv-highlight--dimmed" : ""}`}
                        open={shouldOpen || undefined}
                      >
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm font-medium tracking-tight text-neutral-900 transition-colors select-none hover:bg-neutral-50 dark:text-neutral-100 dark:hover:bg-neutral-800/30">
                          <span>{highlight.title}</span>
                          <svg className="cv-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </summary>
                        <div className="cv-highlight-content border-t border-neutral-100 dark:border-neutral-800/50 p-3.5 space-y-3">
                          <div className="cv-project-skills flex flex-wrap gap-1">
                            {highlight.skills.map((skill) => (
                              <button
                                key={skill}
                                type="button"
                                onClick={() => toggleSkill(skill)}
                                className={`cv-project-skill${activeSkill === skill ? " cv-project-skill--active" : ""}`}
                              >
                                {skill}
                              </button>
                            ))}
                          </div>
                          {highlight.references ? <ReferenceList links={highlight.references} /> : null}
                          {highlight.bullets && highlight.bullets.length > 0 ? (
                            <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
                              {highlight.bullets.map((bullet, index) => (
                                <li key={index}>{renderFormattedText(bullet)}</li>
                              ))}
                            </ul>
                          ) : null}
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
          <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 pb-2 dark:border-neutral-800">
            Education
          </h2>
          <div className="cv-timeline">
            {education.map((item, index) => (
              <div key={`${item.title ?? "item"}-${index}`} className="cv-timeline-item">
                <div className="cv-timeline-dot" />
                <div className="cv-timeline-content">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    {item.title ? <p className="font-semibold text-neutral-900 dark:text-neutral-100">{item.title}</p> : null}
                    {item.period ? <p className="cv-period">{item.period}</p> : null}
                  </div>
                  {item.degree ? <p className="mt-1 text-sm italic text-neutral-700 dark:text-neutral-300">{renderFormattedText(item.degree)}</p> : null}
                  {item.details?.map((detail, detailIndex) => (
                    <p key={detailIndex} className="mt-1 pl-4 text-sm text-neutral-700 dark:text-neutral-300">{renderFormattedText(detail)}</p>
                  ))}
                  {item.degrees?.map((deg, degIndex) => (
                    <div key={degIndex} className="mt-2">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                        <p className="text-sm italic text-neutral-700 dark:text-neutral-300">{renderFormattedText(deg.degree)}</p>
                        {deg.period ? <p className="cv-period">{deg.period}</p> : null}
                      </div>
                      {deg.detail ? <p className="mt-1 pl-4 text-sm text-neutral-700 dark:text-neutral-300">{renderFormattedText(deg.detail)}</p> : null}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Mentorship & Teaching ── */}
        <section id="mentorship" className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 pb-2 dark:border-neutral-800">
            Mentorship
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
            {mentorship.map((item, index) => (
              <li key={index}>{renderFormattedText(item.body)}</li>
            ))}
          </ul>
        </section>

        <section id="teaching" className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 pb-2 dark:border-neutral-800">
            Teaching &amp; Outreach
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
            {teachingAndOutreach.map((item, index) => (
              <li key={index}>{renderFormattedText(item.body)}</li>
            ))}
          </ul>
        </section>

        {/* ── Presenting at ICML 2026 ── */}
        {icmlPapers.length > 0 && (
          <section id="icml2026" className="space-y-4">
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-neutral-200 pb-2 dark:border-neutral-800">
              <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                Presenting at ICML 2026
              </h2>
            </div>
            <ol className="cv-publications space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
              {icmlPapers.map((publication, index) => (
                <li key={index}>{renderFormattedText(publication.citation)}</li>
              ))}
            </ol>
          </section>
        )}

        {/* ── Publications ── */}
        <section id="publications" className="space-y-4">
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-neutral-200 pb-2 dark:border-neutral-800">
            <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Selected Publications
            </h2>
            <a href="https://scholar.google.com/citations?user=vamy2okAAAAJ" target="_blank" rel="noreferrer" className="text-sm font-medium">
              Full list on Google Scholar &rarr;
            </a>
          </div>
          <ol className="cv-publications space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
            {selectedPubs.map((publication, index) => (
              <li key={index}>{renderFormattedText(publication.citation)}</li>
            ))}
          </ol>
        </section>

        {/* ── Service (compact) ── */}
        <section className="cv-compact-section space-y-3 border-t border-neutral-200 pt-6 dark:border-neutral-800">
          <div>
            <p className="text-xs font-bold tracking-widest text-neutral-500 dark:text-neutral-400 uppercase mb-2">Service</p>
            <ul className="list-disc pl-4 space-y-1.5 text-sm text-neutral-700 dark:text-neutral-300">
              {service.map((item, index) => (
                <li key={index}>{renderFormattedText(item.body)}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
