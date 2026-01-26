/**
 * Parses a price string (e.g., "₹ 1.5 Cr", "₹ 85 L") into a numeric value in Crores.
 * Returns 0 if parsing fails.
 * 
 * Examples:
 * "1.5 Cr" -> 1.5
 * "85 L" -> 0.85
 * "₹ 2.5 Cr" -> 2.5
 */
export const parsePrice = (priceStr) => {
    if (!priceStr || typeof priceStr !== 'string') return 0;

    // Remove currency symbol and whitespace
    const cleanStr = priceStr.replace(/[₹,]/g, '').trim().toLowerCase();

    // Extract numeric part
    const match = cleanStr.match(/([\d.]+)/);
    if (!match) return 0;

    let value = parseFloat(match[0]);

    // Convert based on unit
    if (cleanStr.includes('cr')) {
        return value;
    } else if (cleanStr.includes('l') || cleanStr.includes('lac') || cleanStr.includes('lakh')) {
        return value / 100;
    } else if (cleanStr.includes('k')) {
        return value / 10000; // Assuming k is thousands, converting to Cr (very small)
    }

    // Default fallback (assume Cr if no unit, or handle as raw number)
    return value;
};
