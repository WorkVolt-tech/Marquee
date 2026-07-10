import { useMemo, useState } from "react";
import { EVENTS } from "../lib/mockData";
import EventCard from "../components/EventCard";
import SearchFilterBar from "../components/SearchFilterBar";
import MarqueeTicker from "../components/MarqueeTicker";

export default function Discover() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [sort, setSort] = useState("soonest");

  const trendingTitles = useMemo(
    () => EVENTS.filter((e) => e.trending).map((e) => `${e.title} — ${e.city}`),
    []
  );

  const filtered = useMemo(() => {
    let list = EVENTS.filter((e) => {
      const matchesQuery =
        query.trim() === "" ||
        [e.title, e.city, e.venue, e.organizer].join(" ").toLowerCase().includes(query.toLowerCase());
      const matchesCategory = !activeCategory || e.category === activeCategory;
      return matchesQuery && matchesCategory;
    });

    switch (sort) {
      case "trending":
        list = list.sort((a, b) => Number(b.trending) - Number(a.trending));
        break;
      case "price-low":
        list = list.sort((a, b) => a.price - b.price);
        break;
      case "almost-gone":
        list = list.sort((a, b) => b.sold / b.capacity - a.sold / a.capacity);
        break;
      default:
        list = list.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    return list;
  }, [query, activeCategory, sort]);

  return (
    <div>
      <MarqueeTicker items={trendingTitles} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-10">
        <div className="max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-widest text-teal-soft">
            Live events, honestly priced
          </span>
          <h1 className="font-display text-5xl sm:text-6xl leading-[0.95] tracking-wide mt-3">
            Every ticket, priced
            <br />
            <span className="text-marigold">in the open.</span>
          </h1>
          <p className="mt-5 text-paper/60 text-lg max-w-xl">
            One flat service fee, shown before you ever reach checkout. No surprise
            charges, no bait-and-switch pricing — for attendees or organizers.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-6">
        <SearchFilterBar
          query={query}
          setQuery={setQuery}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          sort={sort}
          setSort={setSort}
        />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-24 pt-6">
        {filtered.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-line rounded-2xl">
            <p className="font-display text-2xl tracking-wide text-paper/70">Nothing here yet</p>
            <p className="text-paper/40 mt-2">Try a different search or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
