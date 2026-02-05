/**
 * Parses a price string (e.g., "INR 1.5 Cr", "Rs 85 L") into a numeric value in Crores.
 * Returns NaN if parsing fails.
 *
 * Examples:
 * "1.5 Cr" -> 1.5
 * "85 L" -> 0.85
 * "INR 2.5 Cr" -> 2.5
 */
export const parsePrice = (priceStr) => {
    if (typeof priceStr === 'number') return priceStr;
    if (!priceStr || typeof priceStr !== 'string') return Number.NaN;

    const cleanStr = priceStr
        .replace(/\u20B9/g, ' ')
        .replace(/rs\.?/gi, ' ')
        .replace(/inr/gi, ' ')
        .replace(/,/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();

    const match = cleanStr.match(/([\d.]+)/);
    if (!match) return Number.NaN;

    const value = parseFloat(match[0]);
    if (!Number.isFinite(value)) return Number.NaN;

    const unitMatch = cleanStr.match(/(?:\d|\.)\s*(cr|crore|crores|l|lac|lakh|lakhs|k)\b/);
    const unit = unitMatch?.[1];

    if (unit === 'cr' || unit === 'crore' || unit === 'crores') {
        return value;
    }

    if (unit === 'l' || unit === 'lac' || unit === 'lakh' || unit === 'lakhs') {
        return value / 100;
    }

    if (unit === 'k') {
        return value / 10000;
    }

    return value;
};
