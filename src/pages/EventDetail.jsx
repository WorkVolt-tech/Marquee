import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, MapPin, User, Minus, Plus, ArrowLeft, Check } from "lucide-react";
import { getEventById } from "../lib/mockData";
import FeeBreakdown from "../components/FeeBreakdown";

const CATEGORY_GRADIENTS = {
  music: "from-coral to-marigold",
  conference: "from-teal to-ink-soft",
  community: "from-marigold to-coral",
  sports: "from-teal-soft to-teal",
  food: "from-marigold-soft to-coral",
  workshop: "from-ink-soft to-teal",
  arts: "from-coral to-ink-soft",
};

export default function EventDetail() {
  const { id } = useParams();
  const event = getEventById(id);
  const [qty, setQty] = useState(1);
  const [claimed, setClaimed] = useState(false);

  if (!event) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <p className="font-display text-3xl tracking-wide">Event not found</p>
        <Link to="/" className="text-marigold underline mt-4 inline-block">Back to Discover</Link>
      </div>
    );
  }

  const d = new Date(event.date);
  const dateStr = d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  const timeStr = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  const remaining = event.capacity - event.sold;
  const gradient = CATEGORY_GRADIENTS[event.category] || "from-marigold to-coral";

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-paper/50 hover:text-paper mb-6">
        <ArrowLeft size={16} /> Back to Discover
      </Link>

      <div className={`h-56 sm:h-72 rounded-2xl bg-gradient-to-br ${gradient} mb-8 flex items-end p-6`}>
        <span className="font-mono text-xs uppercase tracking-widest bg-ink/70 text-marigold px-3 py-1.5 rounded-full">
          {event.category}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
        <div>
          <h1 className="font-display text-4xl sm:text-5xl tracking-wide leading-tight">{event.title}</h1>
          <p className="text-paper/60 text-lg mt-3 max-w-2xl">{event.blurb}</p>

          <div className="grid sm:grid-cols-2 gap-4 mt-8">
            <div className="flex items-start gap-3">
              <Calendar className="text-marigold mt-0.5" size={20} />
              <div>
                <div className="font-medium">{dateStr}</div>
                <div className="text-paper/50 text-sm">{timeStr}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="text-marigold mt-0.5" size={20} />
              <div>
                <div className="font-medium">{event.venue}</div>
                <div className="text-paper/50 text-sm">{event.city}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <User className="text-marigold mt-0.5" size={20} />
              <div>
                <div className="font-medium">{event.organizer}</div>
                <div className="text-paper/50 text-sm">Organizer</div>
              </div>
            </div>
          </div>

          <div className="ticket-perforation mt-10" />

          <div className="mt-8">
            <h2 className="font-display text-2xl tracking-wide mb-3">About this event</h2>
            <p className="text-paper/60 leading-relaxed">
              {event.blurb} Doors open 30 minutes before start. {remaining} spot{remaining === 1 ? "" : "s"} left
              out of {event.capacity} — this event is {Math.round((event.sold / event.capacity) * 100)}% claimed.
            </p>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 h-fit bg-paper text-ink rounded-2xl p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-teal">Tickets</span>
            <span className="font-mono text-xs text-ink/40">{remaining} left</span>
          </div>

          {!claimed ? (
            <>
              <div className="flex items-center justify-between border border-line-light rounded-xl px-4 py-3">
                <span className="font-medium">Quantity</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-full border border-line-light flex items-center justify-center hover:border-ink transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-6 text-center font-mono">{qty}</span>
                  <button
                    onClick={() => setQty((q) => Math.min(remaining, q + 1))}
                    className="w-8 h-8 rounded-full border border-line-light flex items-center justify-center hover:border-ink transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <FeeBreakdown price={event.price} quantity={qty} variant="light" />

              <button
                onClick={() => setClaimed(true)}
                className="w-full bg-marigold text-ink font-semibold py-3 rounded-full hover:bg-marigold-soft transition-colors"
              >
                {event.price === 0 ? "Reserve free spot" : "Get tickets"}
              </button>
              <p className="text-center text-xs text-ink/40 font-mono">Demo checkout — no payment is processed.</p>
            </>
          ) : (
            <div className="flex flex-col items-center text-center gap-3 py-6">
              <div className="w-12 h-12 rounded-full bg-teal/15 flex items-center justify-center">
                <Check className="text-teal" size={22} />
              </div>
              <p className="font-display text-xl tracking-wide">You're in</p>
              <p className="text-ink/50 text-sm">{qty} ticket{qty > 1 ? "s" : ""} reserved for {event.title}.</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
