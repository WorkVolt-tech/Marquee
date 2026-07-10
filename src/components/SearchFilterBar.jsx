import { Search } from "lucide-react";
import { CATEGORIES } from "../lib/mockData";

export default function SearchFilterBar({ query, setQuery, activeCategory, setActiveCategory, sort, setSort }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-paper/40" size={18} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events, cities, organizers…"
            className="w-full bg-ink-soft border border-line rounded-full pl-11 pr-4 py-3 text-paper placeholder:text-paper/40 focus:border-marigold outline-none transition-colors"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-ink-soft border border-line rounded-full px-4 py-3 text-paper text-sm font-mono outline-none focus:border-marigold"
        >
          <option value="soonest">Soonest</option>
          <option value="trending">Trending</option>
          <option value="price-low">Price: Low to High</option>
          <option value="almost-gone">Almost gone</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition-colors ${
            activeCategory === null
              ? "bg-marigold text-ink border-marigold"
              : "border-line text-paper/60 hover:border-paper/40 hover:text-paper"
          }`}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              activeCategory === c.id
                ? "bg-marigold text-ink border-marigold"
                : "border-line text-paper/60 hover:border-paper/40 hover:text-paper"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}
