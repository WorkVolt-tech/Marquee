import { Ticket } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Ticket className="text-marigold" size={18} />
          <span className="font-display text-lg tracking-wide">MARQUEE</span>
        </div>
        <p className="text-sm text-paper/40 font-mono">
          One flat fee. No surprises at checkout. Built for organizers first.
        </p>
      </div>
    </footer>
  );
}
