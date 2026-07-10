import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { CATEGORIES } from "../lib/mockData";
import { calculateFees, formatCurrency } from "../lib/fees";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

const initialForm = {
  title: "",
  category: CATEGORIES[0].id,
  venue: "",
  city: "",
  date: "",
  time: "",
  price: "",
  capacity: "",
  blurb: "",
};

export default function CreateEvent() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const price = Number(form.price) || 0;
  const { total } = calculateFees(price);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    if (isSupabaseConfigured) {
      // Real backend is connected — write the event to Supabase.
      await supabase.from("events").insert({
        title: form.title,
        category: form.category,
        venue: form.venue,
        city: form.city,
        event_date: form.date && form.time ? `${form.date}T${form.time}` : null,
        price,
        capacity: Number(form.capacity) || 0,
        blurb: form.blurb,
      });
    } else {
      // Demo mode — no backend connected yet, just show success.
      await new Promise((r) => setTimeout(r, 500));
    }

    setSaving(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center flex flex-col items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-teal/15 flex items-center justify-center">
          <Check className="text-teal" size={26} />
        </div>
        <h1 className="font-display text-3xl tracking-wide">Event published</h1>
        <p className="text-paper/50">
          {isSupabaseConfigured
            ? "Your event has been saved to Supabase."
            : "This is a demo — connect Supabase in .env to actually persist events."}
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-2 bg-marigold text-ink font-semibold px-5 py-2.5 rounded-full hover:bg-marigold-soft transition-colors"
        >
          Go to dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <span className="font-mono text-xs uppercase tracking-widest text-teal-soft">Create event</span>
      <h1 className="font-display text-4xl tracking-wide mt-2 mb-8">Tell people what's happening</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
        <div className="flex flex-col gap-5">
          <Field label="Event title">
            <input
              required
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="Riverside Sessions: Live at Dusk"
              className="input"
            />
          </Field>

          <Field label="Category">
            <select value={form.category} onChange={(e) => update("category", e.target.value)} className="input">
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </Field>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Venue">
              <input required value={form.venue} onChange={(e) => update("venue", e.target.value)} placeholder="Riverside Amphitheater" className="input" />
            </Field>
            <Field label="City">
              <input required value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="Portland, OR" className="input" />
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Date">
              <input required type="date" value={form.date} onChange={(e) => update("date", e.target.value)} className="input" />
            </Field>
            <Field label="Time">
              <input required type="time" value={form.time} onChange={(e) => update("time", e.target.value)} className="input" />
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Ticket price (USD, 0 = free)">
              <input required type="number" min="0" step="1" value={form.price} onChange={(e) => update("price", e.target.value)} placeholder="0" className="input" />
            </Field>
            <Field label="Capacity">
              <input required type="number" min="1" step="1" value={form.capacity} onChange={(e) => update("capacity", e.target.value)} placeholder="100" className="input" />
            </Field>
          </div>

          <Field label="Description">
            <textarea
              required
              rows={4}
              value={form.blurb}
              onChange={(e) => update("blurb", e.target.value)}
              placeholder="What should people expect?"
              className="input resize-none"
            />
          </Field>
        </div>

        <aside className="h-fit bg-paper text-ink rounded-2xl p-6 flex flex-col gap-5 lg:sticky lg:top-24">
          <span className="font-mono text-xs uppercase tracking-widest text-teal">What attendees will see</span>
          <div>
            <div className="font-mono text-sm text-ink/50">Ticket price</div>
            <div className="font-display text-3xl tracking-wide mt-1">{price === 0 ? "Free" : formatCurrency(price)}</div>
          </div>
          {price > 0 && (
            <div>
              <div className="font-mono text-sm text-ink/50">All-in price shown at checkout</div>
              <div className="font-display text-3xl tracking-wide mt-1 text-teal">{formatCurrency(total)}</div>
            </div>
          )}
          <p className="text-ink/40 text-xs leading-relaxed">
            You always receive the full {price === 0 ? "$0" : formatCurrency(price)} per ticket. The service fee is
            added on top for the buyer — it's never deducted from your payout.
          </p>
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-marigold text-ink font-semibold py-3 rounded-full hover:bg-marigold-soft transition-colors disabled:opacity-60"
          >
            {saving ? "Publishing…" : "Publish event"}
          </button>
          {!isSupabaseConfigured && (
            <p className="text-center text-xs text-ink/40 font-mono">
              Demo mode — connect Supabase to persist events.
            </p>
          )}
        </aside>
      </form>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-paper/70">{label}</span>
      {children}
    </label>
  );
}
