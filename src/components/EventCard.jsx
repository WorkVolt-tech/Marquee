import { Link } from "react-router-dom";
import { MapPin, Calendar, TrendingUp } from "lucide-react";
import { calculateFees, formatCurrency } from "../lib/fees";

const CATEGORY_GRADIENTS = {
  music: "from-coral to-marigold",
  conference: "from-teal to-ink-soft",
  community: "from-marigold to-coral",
  sports: "from-teal-soft to-teal",
  food: "from-marigold-soft to-coral",
  workshop: "from-ink-soft to-teal",
  arts: "from-coral to-ink-soft",
};

function formatDate(iso) {
  const d = new Date(iso);
  return {
    month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    day: d.toLocaleDateString("en-US", { day: "2-digit" }),
    weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
    time: d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
  };
}

export default function EventCard({ event }) {
  const { month, day, weekday, time } = formatDate(event.date);
  const { total } = calculateFees(event.price);
  const isFree = event.price === 0;
  const pctSold = Math.round((event.sold / event.capacity) * 100);
  const gradient = CATEGORY_GRADIENTS[event.category] || "from-marigold to-coral";

  return (
    <Link
      to={`/events/${event.id}`}
      className="group flex flex-col bg-paper text-ink rounded-2xl overflow-hidden shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 hover:-translate-y-1 transition-all duration-200"
    >
      <div className={`relative h-36 bg-gradient-to-br ${gradient} flex items-end p-4`}>
        {event.trending && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 bg-ink/80 text-marigold text-xs font-mono font-semibold px-2 py-1 rounded-full">
            <TrendingUp size={12} /> trending
          </span>
        )}
        <div className="bg-ink text-paper rounded-lg px-3 py-1.5 font-mono leading-tight">
          <div className="text-[10px] tracking-widest text-marigold">{month}</div>
          <div className="text-xl font-semibold -mt-0.5">{day}</div>
        </div>
      </div>

      <div className="ticket-perforation ticket-perforation-light" />

      <div className="flex flex-col gap-2 p-4 flex-1">
        <span className="text-xs font-mono uppercase tracking-wider text-teal">
          {event.category}
        </span>
        <h3 className="font-display text-xl leading-tight tracking-wide">
          {event.title}
        </h3>
        <p className="text-sm text-ink/60 line-clamp-2">{event.blurb}</p>

        <div className="mt-auto pt-3 flex flex-col gap-1 text-sm text-ink/70">
          <span className="flex items-center gap-1.5">
            <Calendar size={14} /> {weekday} · {time}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={14} /> {event.venue}, {event.city}
          </span>
        </div>

        <div className="flex items-center justify-between pt-3 mt-1 border-t border-line-light">
          <div className="font-mono">
            {isFree ? (
              <span className="text-teal font-semibold">Free</span>
            ) : (
              <>
                <span className="font-semibold">{formatCurrency(total)}</span>
                <span className="text-ink/40 text-xs"> all-in</span>
              </>
            )}
          </div>
          <div className="text-xs text-ink/40 font-mono">{pctSold}% claimed</div>
        </div>
      </div>
    </Link>
  );
}
