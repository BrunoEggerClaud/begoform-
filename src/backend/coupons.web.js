// BE GO FORM — Coupon Validation Backend

const COUPONS = {
    'FORM10':    { discount: 10, type: 'percent', description: '10% off your first order', validDays: 14 },
    'BACK10':    { discount: 10, type: 'percent', description: '10% off — welcome back!', validDays: 1 },
    'STUDENT15': { discount: 15, type: 'percent', description: '15% student discount', validDays: 365 },
    'SUMMER25':  { discount: 25, type: 'percent', description: '25% Summer Sale', validDays: 30 },
    'BFRIDAY40': { discount: 40, type: 'percent', description: '40% Black Friday', validDays: 3 },
    'JANUARY30': { discount: 30, type: 'percent', description: '30% New Year', validDays: 31 },
    'FRIEND20':  { discount: 20, type: 'percent', description: '20% referral reward', validDays: 60 },
    'WELCOME5':  { discount: 5,  type: 'fixed',   description: '£5 off after review', validDays: 90 },
};

// Validate a coupon code
export function validateCoupon(code) {
    if (!code) return Promise.resolve({ valid: false, message: 'Please enter a coupon code.' });

    const upper = code.toUpperCase().trim();
    const coupon = COUPONS[upper];

    if (!coupon) {
        return Promise.resolve({ valid: false, message: 'Invalid coupon code. Try FORM10 for 10% off.' });
    }

    return Promise.resolve({
        valid: true,
        code: upper,
        discount: coupon.discount,
        type: coupon.type,
        description: coupon.description,
        message: `✓ ${coupon.description} applied!`,
    });
}

// Get all active promotional codes (for display only)
export function getPromoCodes() {
    return Promise.resolve(
        Object.entries(COUPONS).map(([code, data]) => ({ code, ...data }))
    );
}
