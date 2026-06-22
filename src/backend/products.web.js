// BE GO FORM — Products Backend
// Exposed web methods for the frontend to call

import { ok, notFound, badRequest } from 'wix-http-functions';
import wixData from 'wix-data';

// All 12 best-seller products seeded in Wix Data
export const PRODUCTS_DATA = [
    {
        _id: 'prod-001',
        name: 'Beast Whey Protein 2kg',
        category: 'Supplements',
        slug: 'beast-whey-protein-2kg',
        price: 39.99,
        comparePrice: 54.99,
        badge: 'SALE',
        rating: 4.9,
        reviews: 847,
        description: 'Premium 24g protein per scoop. Triple-filtered whey isolate blend. Chocolate, vanilla, salted caramel.',
        inStock: true,
        sku: 'BGF-SUP-001',
    },
    {
        _id: 'prod-002',
        name: 'Pro Adjustable Dumbbells 24kg',
        category: 'Equipment',
        slug: 'pro-adjustable-dumbbells-24kg',
        price: 189.99,
        comparePrice: null,
        badge: 'HOT',
        rating: 4.8,
        reviews: 312,
        description: '5kg–24kg adjustable in seconds. Space-saving, gym-grade build.',
        inStock: true,
        sku: 'BGF-EQP-001',
    },
    {
        _id: 'prod-003',
        name: 'Forge Performance Tee',
        category: 'Apparel',
        slug: 'forge-performance-tee',
        price: 24.99,
        comparePrice: 34.99,
        badge: 'NEW',
        rating: 4.7,
        reviews: 521,
        description: 'Sweat-wicking, four-way stretch. Designed for high-intensity training.',
        inStock: true,
        sku: 'BGF-APP-001',
    },
    {
        _id: 'prod-004',
        name: 'Smart Fitness Tracker Pro',
        category: 'Accessories',
        slug: 'smart-fitness-tracker-pro',
        price: 79.99,
        comparePrice: 99.99,
        badge: 'SALE',
        rating: 4.8,
        reviews: 634,
        description: 'Heart rate, sleep, 14-day battery. Sync with iOS & Android.',
        inStock: true,
        sku: 'BGF-ACC-001',
    },
    {
        _id: 'prod-005',
        name: 'Ignite Pre-Workout 30 Servings',
        category: 'Supplements',
        slug: 'ignite-pre-workout-30-servings',
        price: 29.99,
        comparePrice: null,
        badge: 'HOT',
        rating: 4.9,
        reviews: 1023,
        description: 'Clean energy. No jitters, no crash. Beta-alanine + L-citrulline blend.',
        inStock: true,
        sku: 'BGF-SUP-002',
    },
    {
        _id: 'prod-006',
        name: 'Resistance Band Set 5pc',
        category: 'Equipment',
        slug: 'resistance-band-set-5pc',
        price: 19.99,
        comparePrice: 29.99,
        badge: 'SALE',
        rating: 4.6,
        reviews: 892,
        description: '5 resistance levels, 10–50lbs. Travel bag included.',
        inStock: true,
        sku: 'BGF-EQP-002',
    },
    {
        _id: 'prod-007',
        name: 'Beast Mode Hoodie',
        category: 'Apparel',
        slug: 'beast-mode-hoodie',
        price: 54.99,
        comparePrice: null,
        badge: 'NEW',
        rating: 4.9,
        reviews: 267,
        description: 'Heavyweight 380gsm. Brushed-cotton inner. Built for cold gym mornings.',
        inStock: true,
        sku: 'BGF-APP-002',
    },
    {
        _id: 'prod-008',
        name: 'Premium Lifting Belt',
        category: 'Accessories',
        slug: 'premium-lifting-belt',
        price: 44.99,
        comparePrice: 59.99,
        badge: 'SALE',
        rating: 4.8,
        reviews: 445,
        description: '10mm thick genuine leather. Powerlifting-grade buckle.',
        inStock: true,
        sku: 'BGF-ACC-002',
    },
    {
        _id: 'prod-009',
        name: 'Creatine Monohydrate 500g',
        category: 'Supplements',
        slug: 'creatine-monohydrate-500g',
        price: 22.99,
        comparePrice: null,
        badge: 'HOT',
        rating: 5.0,
        reviews: 1547,
        description: 'Micronised, unflavoured. 100 servings. Lab-tested purity.',
        inStock: true,
        sku: 'BGF-SUP-003',
    },
    {
        _id: 'prod-010',
        name: 'Kettlebell Pro 16kg',
        category: 'Equipment',
        slug: 'kettlebell-pro-16kg',
        price: 64.99,
        comparePrice: 79.99,
        badge: 'SALE',
        rating: 4.7,
        reviews: 338,
        description: 'Cast iron, rubber-coated base. Won\'t damage your floor.',
        inStock: true,
        sku: 'BGF-EQP-003',
    },
    {
        _id: 'prod-011',
        name: 'Compression Leggings',
        category: 'Apparel',
        slug: 'compression-leggings',
        price: 39.99,
        comparePrice: 54.99,
        badge: 'NEW',
        rating: 4.8,
        reviews: 712,
        description: 'Squat-proof. Side pockets. Buttery-soft compression fabric.',
        inStock: true,
        sku: 'BGF-APP-003',
    },
    {
        _id: 'prod-012',
        name: 'Shaker Bottle 700ml',
        category: 'Accessories',
        slug: 'shaker-bottle-700ml',
        price: 12.99,
        comparePrice: null,
        badge: 'HOT',
        rating: 4.6,
        reviews: 2103,
        description: 'Leak-proof. Wire-ball mixer. BPA-free. Branded BE GO FORM.',
        inStock: true,
        sku: 'BGF-ACC-003',
    },
];

export const CATEGORIES = [
    { name: 'Supplements', slug: 'supplements', count: 128, icon: '💊' },
    { name: 'Equipment', slug: 'equipment', count: 94, icon: '🏋️' },
    { name: 'Apparel', slug: 'apparel', count: 186, icon: '👕' },
    { name: 'Accessories', slug: 'accessories', count: 72, icon: '⌚' },
];

// Web method: get all products (optionally filtered by category)
export function getProducts(category = 'all') {
    if (category === 'all') return Promise.resolve(PRODUCTS_DATA);
    return Promise.resolve(
        PRODUCTS_DATA.filter(p => p.category.toLowerCase() === category.toLowerCase())
    );
}

// Web method: get single product by slug
export function getProduct(slug) {
    const product = PRODUCTS_DATA.find(p => p.slug === slug);
    if (!product) return Promise.reject(new Error('Product not found'));
    return Promise.resolve(product);
}

// Web method: get categories
export function getCategories() {
    return Promise.resolve(CATEGORIES);
}

// Web method: get best sellers (top 4 by reviews)
export function getBestSellers() {
    return Promise.resolve(
        [...PRODUCTS_DATA].sort((a, b) => b.reviews - a.reviews).slice(0, 4)
    );
}

// Web method: search products
export function searchProducts(query) {
    const q = query.toLowerCase();
    return Promise.resolve(
        PRODUCTS_DATA.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q)
        )
    );
}
