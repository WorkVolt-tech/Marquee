import { calculateFees, formatCurrency, SERVICE_FEE_RATE, SERVICE_FEE_FLAT } from "../lib/fees";

export default function FeeBreakdown({ price, quantity = 1, variant = "dark" }) {
  const { subtotal, serviceFee, total } = calculateFees(price, quantity);
  const isFree = price === 0;
  const light = variant === "light";

  if (isFree) {
    return (
      <div className="bg-teal/10 border border-teal/30 rounded-xl p-4 font-mono text-sm text-teal-soft">
        Free event — no fees, no card required.
      </div>
    );
  }

  const rowMuted = light ? "text-ink/70" : "text-paper/70";
  const rowFaint = light ? "text-ink/50" : "text-paper/50";
  const rowFooter = light ? "text-ink/40" : "text-paper/30";
  const box = light ? "bg-ink/5 border-line-light" : "bg-ink-soft border-line";
  const totalText = light ? "text-ink" : "text-paper";
  const border = light ? "border-line-light" : "border-line";

  return (
    <div className={`${box} border rounded-xl p-4 font-mono text-sm`}>
      <div className={`flex justify-between ${rowMuted} mb-1.5`}>
        <span>Ticket × {quantity}</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>
      <div className={`flex justify-between ${rowFaint} mb-3`}>
        <span>Service fee ({(SERVICE_FEE_RATE * 100).toFixed(1)}% + {formatCurrency(SERVICE_FEE_FLAT)}/ticket)</span>
        <span>{formatCurrency(serviceFee)}</span>
      </div>
      <div className={`flex justify-between ${totalText} font-semibold pt-3 border-t ${border}`}>
        <span>Total due today</span>
        <span className="text-marigold">{formatCurrency(total)}</span>
      </div>
      <p className={`${rowFooter} text-xs mt-3 leading-relaxed`}>
        This is the full price. It won't change at checkout.
      </p>
    </div>
  );
}
