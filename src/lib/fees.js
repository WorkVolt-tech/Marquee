// Marquee's fee model: one flat, visible rate. No surprise fees revealed
// only at the last step of checkout. This is the entire point of the product.

export const SERVICE_FEE_RATE = 0.035; // 3.5%
export const SERVICE_FEE_FLAT = 0.99; // per ticket

export function calculateFees(basePrice, quantity = 1) {
  const subtotal = basePrice * quantity;
  const serviceFee = basePrice > 0 ? (basePrice * SERVICE_FEE_RATE + SERVICE_FEE_FLAT) * quantity : 0;
  const total = subtotal + serviceFee;
  return {
    subtotal,
    serviceFee,
    total,
    perTicket: basePrice,
  };
}

export function formatCurrency(amount) {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
}
