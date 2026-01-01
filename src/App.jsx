import { useState } from "react";
import ArticleCard from "./components/ArticleCard";
import "./App.css";
import Footer from "./components/Footer";
import HowItWorks from "./components/howItWorks";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false)
  const [lastQuery, setLastQuery] = useState()
  const api_endpoint = import.meta.env.VITE_BACKEND_API_ENDPOINT

  const searchArticles = async (searchQuery) => {
    if (!searchQuery.trim()) return;

    if (!searched)
      setSearched(true)
    setLoading(true);
    setError(null);
    setLastQuery(searchQuery);

    try {
      const res = await fetch(
        `${api_endpoint}/search_articles?query=${encodeURIComponent(
          searchQuery
        )}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch articles");
      }

      const data = await res.json();
      setArticles(data.articles || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchArticles(query);
  };

  return (
    <div className='min-h-screen flex flex-col'>

      <div className="max-w-7xl px-6 py-10">
        {/* Header */}
        <header className="max-w-3xl mb-12">
          <h1 className="flex items-baseline gap-2 text-3xl font-bold text-slate-900">
            <span>Scilents AI</span><span className="hidden sm:flex sm:leading-none text-sm">Your AI Research Assistant</span>
          </h1>
          <span className="block sm:hidden font-bold text-sm">Your AI Research Assistant</span>
          <p className="mt-2 text-slate-600">
            
          </p>
          <p className="mt-2 text-slate-600">
            Instant key concepts from scientific literature
          </p>
        </header>

        {/* Search bar */}
        <form
          onSubmit={handleSubmit}
          className="mb-10 flex gap-2"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-sm
                      focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white
                      transition hover:bg-teal-700 disabled:opacity-50"
          >
            Search
          </button>
        </form>

        {/* Status */}
        {loading && (
          <p className="text-sm text-slate-500">Searching articles…</p>
        )}

        {error && (
          <div className="my-2">
              <p className="text-sm text-red-600">{error}</p>
              <p className="text-sm mt-2">Since this is still an experimental app, the API token might have reach the rate limit, please wait a few seconds and try again</p>
          </div>
        )}

        {!loading && articles.length === 0 && searched && !error && (
          <p className="text-sm text-slate-500">
            No results found for “{query}”
          </p>
        )}

        {!loading && articles.length > 0 && lastQuery && !error && (
          <p className="mb-6 text-sm text-slate-600">
            Results for query:{" "}
            <span className="font-medium text-teal-700">
              “{lastQuery}”
            </span>
          </p>
  )}

        {/* Articles */}
        <div className="mt-6 space-y-6">
          {articles.map((article, index) => (
            <ArticleCard
              key={article.pmid || article.doi || index}
              article={article}
            />
          ))}
        </div>
      </div>
      <div className="flex-grow">
        <HowItWorks  />
      </div>
      <Footer />
    </div>
  );
}