export default function HowItWorks() {
  const steps = [
    {
      title: "Search scientific literature",
      description:
        "Search by topic or research area to discover scientific articles aligned with your interests. An AI-driven search interprets context to highlight the most relevant studies.",
      icon: "🔍",
    },
    {
      title: "Access PubMed via NCBI",
      description:
        "The application queries the public NCBI Entrez API to retrieve articles matching the search criteria from the PubMed database.",
      icon: "🧬",
    },
    {
      title: "AI-powered insights",
      description:
        "Artificial Intelligence extracts key concepts and generates concise, structured summaries to help you quickly understand the main findings without replacing the original sources.",
      icon: "🤖",
    },
  ];

  return (
    <section className="px-4">
      <header className="mb-10 text-center">
        <h2 className="text-2xl font-semibold text-slate-900">
          How it works
        </h2>
        <p className="mt-3 text-slate-600">
          An open-source tool designed to help the scientific community
          quickly discover and better understand relevant research.
        </p>
      </header>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {steps.map((step, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-lg">
              {step.icon}
            </div>

            <h3 className="mb-2 text-base font-semibold text-slate-900">
              {step.title}
            </h3>

            <p className="text-sm text-slate-600">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
