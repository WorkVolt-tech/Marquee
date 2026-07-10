export default function MarqueeTicker({ items }) {
  const doubled = [...items, ...items];
  return (
    <div className="bg-marigold text-ink overflow-hidden border-y-2 border-ink/10">
      <div className="flex whitespace-nowrap py-2 marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="font-mono text-xs font-semibold uppercase tracking-wider mx-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-ink inline-block" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
