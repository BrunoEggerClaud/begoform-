// BE GO FORM — Shared Utilities (public)

export const BRAND = {
    name: 'BE GO FORM',
    tagline: 'Fuel Your Form. Forge Your Future.',
    manifesto: 'Be Bold. Go Hard. Form Greatness.',
    email: 'hello@begoform.co.uk',
    phone: '+44 20 0000 0000',
    instagram: 'https://instagram.com/begoform',
    tiktok: 'https://tiktok.com/@begoform',
    twitter: 'https://twitter.com/begoform',
};

export const STATS = [
    { number: '50K+', label: 'UK CUSTOMERS' },
    { number: '4.9★', label: 'TRUSTPILOT RATING' },
    { number: '24h', label: 'UK DISPATCH' },
    { number: '500+', label: 'PRODUCTS IN STOCK' },
];

export const TESTIMONIALS = [
    {
        name: 'JAMES MITCHELL',
        location: 'LONDON',
        rating: 5,
        text: '"Switched to BE GO FORM six months ago and never looking back. The whey is unreal, delivery is properly fast, and the kit looks the part too. Genuine quality."',
    },
    {
        name: 'SOPHIE CLARKE',
        location: 'MANCHESTER',
        rating: 5,
        text: '"Brilliant service. Ordered Monday afternoon, kit was on my doorstep Tuesday morning. The resistance bands set is a steal for the price. Highly recommend."',
    },
    {
        name: 'RYAN PATEL',
        location: 'BIRMINGHAM',
        rating: 5,
        text: '"Been training 12 years, tried every brand going. Their pre-workout actually works without the jitters. Apparel fits properly too. Found my new go-to."',
    },
    {
        name: 'EMMA WALKER',
        location: 'LEEDS',
        rating: 5,
        text: '"The hoodie is unreal quality. Heavier than my Gymshark stuff, fits properly, washes well. Will be ordering more."',
    },
    {
        name: 'TOM HARRINGTON',
        location: 'BRISTOL',
        rating: 5,
        text: '"Genuine British brand that delivers. Customer service answered my email in under an hour. Refreshing change."',
    },
    {
        name: 'PRIYA SHARMA',
        location: 'GLASGOW',
        rating: 5,
        text: '"Creatine is pharma-grade, dissolves clean, no chalky aftertaste. Best I\'ve had at this price."',
    },
];

export function formatPrice(price, comparePrice = null) {
    const fmt = (p) => `£${p.toFixed(2)}`;
    if (comparePrice && comparePrice > price) {
        return { current: fmt(price), original: fmt(comparePrice), saving: fmt(comparePrice - price) };
    }
    return { current: fmt(price), original: null, saving: null };
}

export function renderStars(rating) {
    const full = Math.floor(rating);
    return '★'.repeat(full) + (rating % 1 >= 0.5 ? '★' : '') ;
}
