/** Normalize user input to E.164 (Saudi +966 default when local 5xxxxxxxx). */
export function normalizeMobile(mobile) {
  const raw = String(mobile || "").trim().replace(/\s/g, "");
  if (!raw) return "";
  if (raw.startsWith("+")) return raw;
  if (raw.startsWith("966")) return `+${raw}`;
  if (raw.startsWith("0") && raw.length === 10) return `+966${raw.slice(1)}`;
  if (/^5\d{8}$/.test(raw)) return `+966${raw}`;
  return `+${raw}`;
}
