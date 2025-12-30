import { useState } from "react";
import ArticleCard from "./components/ArticleCard";
import "./App.css";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false)

  const searchArticles = async (searchQuery) => {
    if (!searchQuery.trim()) return;

    if (!searched)
      setSearched(true)
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/search_articles?query=${encodeURIComponent(
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
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* Header */}
      <header className="mb-8 max-w-3xl">
        <h1 className="text-3xl font-bold text-slate-900">
          Scilents AI <span className="text-sm">Your AI Research Assistant</span>
        </h1>
        <p className="mt-2 text-slate-600">
          
        </p>
        <p className="mt-2 text-slate-600">
          Search scientific literature and get key concepts.
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
          placeholder="Search for articles or topics you are interested in  (e.g. diabetes, breast cancer, etc.)"
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
        <p className="text-sm text-red-600">{error}</p>
      )}

      {!loading && articles.length === 0 && searched && (
        <p className="text-sm text-slate-500">
          No articles found for “{query}”
        </p>
      )}

      {!loading && articles.length > 0 && query && (
        <p className="mb-6 text-sm text-slate-600">
          Results for query:{" "}
          <span className="font-medium text-teal-700">
            “{query}”
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
  );
}