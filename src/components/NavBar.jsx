import { Link, NavLink } from "react-router-dom";
import { Ticket, Plus } from "lucide-react";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-40 bg-ink/95 backdrop-blur border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <Ticket className="text-marigold" size={22} />
          <span className="font-display text-2xl tracking-wide">MARQUEE</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-paper/70">
          <NavLink to="/" end className={({ isActive }) => isActive ? "text-marigold" : "hover:text-paper transition-colors"}>
            Discover
          </NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "text-marigold" : "hover:text-paper transition-colors"}>
            Organizer Dashboard
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/create"
            className="hidden sm:inline-flex items-center gap-1.5 bg-marigold text-ink font-semibold text-sm px-4 py-2 rounded-full hover:bg-marigold-soft transition-colors"
          >
            <Plus size={16} /> Create event
          </Link>
          <Link
            to="/login"
            className="text-sm font-medium text-paper/70 hover:text-paper transition-colors"
          >
            Log in
          </Link>
        </div>
      </div>
    </header>
  );
}
