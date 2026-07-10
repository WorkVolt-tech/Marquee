import { useMemo } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, Users, Wallet, Plus } from "lucide-react";
import { EVENTS } from "../lib/mockData";
import { calculateFees, formatCurrency } from "../lib/fees";

export default function Dashboard() {
  // Demo: treat the first four mock events as "your" events.
  const myEvents = EVENTS.slice(0, 4);

  const stats = useMemo(() => {
    let ticketsSold = 0;
    let grossRevenue = 0;
    let feesCollected = 0;

    myEvents.forEach((e) => {
      ticketsSold += e.sold;
      const { subtotal, serviceFee } = calculateFees(e.price, e.sold);
      grossRevenue += subtotal;
      feesCollected += serviceFee;
    });

    return { ticketsSold, grossRevenue, feesCollected, payout: grossRevenue };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-teal-soft">Organizer Dashboard</span>
          <h1 className="font-display text-4xl tracking-wide mt-2">Your events</h1>
        </div>
        <Link
          to="/create"
          className="inline-flex items-center gap-1.5 bg-marigold text-ink font-semibold text-sm px-4 py-2.5 rounded-full hover:bg-marigold-soft transition-colors w-fit"
        >
          <Plus size={16} /> Create event
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <StatCard icon={Users} label="Tickets sold" value={stats.ticketsSold.toLocaleString()} accent="text-marigold" />
        <StatCard icon={TrendingUp} label="Gross revenue" value={formatCurrency(stats.grossRevenue)} accent="text-teal-soft" />
        <StatCard
          icon={Wallet}
          label="You keep"
          value={formatCurrency(stats.payout)}
          accent="text-coral"
          sub="100% of ticket price — fees are added on top for buyers, never deducted from you"
        />
      </div>

      <div className="bg-ink-soft border border-line rounded-2xl overflow-hidden">
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-3 text-xs font-mono uppercase tracking-wider text-paper/40 border-b border-line">
          <span>Event</span>
          <span className="text-right">Sold</span>
          <span className="text-right">Capacity</span>
          <span className="text-right">Revenue</span>
        </div>
        {myEvents.map((e) => {
          const { subtotal } = calculateFees(e.price, e.sold);
          const pct = Math.round((e.sold / e.capacity) * 100);
          return (
            <Link
              key={e.id}
              to={`/events/${e.id}`}
              className="grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center px-5 py-4 border-b border-line last:border-b-0 hover:bg-ink transition-colors"
            >
              <div>
                <div className="font-medium">{e.title}</div>
                <div className="text-paper/40 text-sm">{e.city}</div>
                <div className="w-full h-1.5 bg-line rounded-full mt-2 max-w-[220px]">
                  <div className="h-full bg-marigold rounded-full" style={{ width: `${pct}%` }} />
                </div>
              </div>
              <span className="text-right font-mono text-sm">{e.sold}</span>
              <span className="text-right font-mono text-sm text-paper/50">{e.capacity}</span>
              <span className="text-right font-mono text-sm text-teal-soft">{formatCurrency(subtotal)}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, accent, sub }) {
  return (
    <div className="bg-ink-soft border border-line rounded-2xl p-5">
      <div className="flex items-center gap-2 text-paper/50 text-sm font-mono uppercase tracking-wider">
        <Icon size={15} className={accent} />
        {label}
      </div>
      <div className="font-display text-3xl tracking-wide mt-2">{value}</div>
      {sub && <p className="text-paper/30 text-xs mt-2 leading-relaxed">{sub}</p>}
    </div>
  );
}
