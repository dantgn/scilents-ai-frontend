import { useState } from "react";

export default function ArticleCard({ article }) {
  const [showAbstract, setShowAbstract] = useState(false);

  const {
    title,
    abstract,
    authors = [],
    doi,
    pmid,
    pmc,
    url,
    summary
  } = article;

  return (
    <article className="relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">
      {/* Accent bar */}
      <div className="absolute left-0 top-6 h-12 w-1 rounded-full bg-teal-500" />


      {/* Title */}
      <h2 className="pl-4 text-lg font-semibold leading-snug text-slate-900
               transition hover:text-teal-600">
        {title}
      </h2>
      

      {/* Metadata row */}
      <div className="mt-3 pl-4 flex flex-wrap gap-3 text-xs text-slate-500">
        {doi && <MetaBadge label="DOI" value={doi} />}
        {pmid && <MetaBadge label="PMID" value={pmid} />}
        {pmc && <MetaBadge label="PMC" value={pmc} />}
      </div>

      {/* Authors */}
      <p className="mt-4 pl-4 text-sm text-slate-700">
        <span className="font-medium text-slate-900">Authors:</span>{" "}
        {authors.map(a => a.full_name).join(", ") || "Unknown"}
      </p>

      {/* Abstract */}
      {abstract && (
        <section className="mt-5 pl-4">
          <button
            onClick={() => setShowAbstract(!showAbstract)}
            className="text-sm font-medium text-teal-600 hover:text-teal-800"
          >
            {showAbstract ? "Hide abstract" : "Read abstract"}
          </button>

          {showAbstract && (
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              {abstract}
            </p>
          )}
        </section>
      )}

      {/* Summary */}
      {summary && (
        <section className="mt-5 pl-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Summary
          </h3>

          <div className="mt-2 space-y-1 text-sm text-slate-700">
            {summary.objective && (
              <p><strong>Objective:</strong> {summary.objective}</p>
            )}
            {summary.methodology && (
              <p><strong>Methodology:</strong> {summary.methodology}</p>
            )}
            {summary.key_results && (
              <p><strong>Key Results:</strong> {summary.key_results}</p>
            )}
            {summary.conclusion && (
              <p><strong>Conclusion:</strong> {summary.conclusion}</p>
            )}
          </div>
        </section>
      )}

      {/* Footer */}
      {url && (
        <footer className="mt-auto pl-4 pt-6">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-semibold
                    text-teal-600 hover:text-teal-800"
        >
            View full article
            <span className="ml-1">→</span>
          </a>
        </footer>
      )}
    </article>
  );
}

function MetaBadge({ label, value }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md
                     bg-cyan-50 px-2 py-0.5 font-medium text-cyan-700">
      {label}:
      <span className="max-w-[140px] truncate text-cyan-600">
        {value}
      </span>
    </span>
  );
}
