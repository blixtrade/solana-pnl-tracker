// Plain-string formatters for the bin output. These return plain strings
// with no colour codes; the bin file applies colour (see bin/pnl.js).

/** SOL amount with an explicit sign, e.g. "+1.500", "-1.500", or "?" when unknown. */
export const sol = (n, digits = 3) =>
  n === null || n === undefined ? "?" : (n >= 0 ? "+" : "") + n.toFixed(digits);

/**
 * USD value of a SOL amount, e.g. " ($112)", " (-$111)", " ($1.2K)".
 * The minus sign goes in front of the "$", matching how `sol` shows its sign.
 * Returns "" when there is no SOL price. Amounts of $1,000 or more use the "K" suffix.
 */
export const usdOf = (n, solPrice) => {
  if (!solPrice) return "";
  const usd = n * solPrice;
  const abs = Math.abs(usd);
  const amount = abs >= 1000 ? (abs / 1000).toFixed(1) + "K" : abs.toFixed(0);
  return ` (${usd < 0 ? "-" : ""}$${amount})`;
};
