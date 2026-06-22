// BE GO FORM — Homepage
// Connects all UI elements to the backend data and handles interactions

import wixLocation from 'wix-location';
import wixWindow from 'wix-window';
import { getProducts, getCategories, getBestSellers } from 'backend/products.web';
import { subscribeNewsletter } from 'backend/newsletter.web';
import { STATS, TESTIMONIALS, formatPrice, renderStars } from 'public/begoform-utils';

let allProducts = [];
let activeCategory = 'all';
let currentTestimonialIndex = 0;

$w.onReady(async function () {
    initStatsBar();
    initHeroCTAs();
    loadCategories();
    await loadProducts('all');
    initProductFilters();
    initTestimonials();
    initNewsletterForm();
    initScrollAnimations();
});

// --- Stats Bar ---
function initStatsBar() {
    const statsElements = ['#stat1', '#stat2', '#stat3', '#stat4'];
    statsElements.forEach((id, i) => {
        if ($w(id).length > 0 && STATS[i]) {
            $w(id).text = `${STATS[i].number}\n${STATS[i].label}`;
        }
    });
}

// --- Hero CTAs ---
function initHeroCTAs() {
    if ($w('#heroShopBtn').length > 0) {
        $w('#heroShopBtn').onClick(() => {
            wixWindow.scrollTo(0, $w('#productsSection').getY());
        });
    }

    if ($w('#heroStoryBtn').length > 0) {
        $w('#heroStoryBtn').onClick(() => wixLocation.to('/about'));
    }
}

// --- Categories ---
async function loadCategories() {
    try {
        const categories = await getCategories();
        const catIds = ['#catSupplements', '#catEquipment', '#catApparel', '#catAccessories'];

        catIds.forEach((id, i) => {
            if ($w(id).length > 0 && categories[i]) {
                const cat = categories[i];
                $w(id).onClick(() => wixLocation.to(`/shop/${cat.slug}`));
            }
        });
    } catch (e) {
        console.error('Failed to load categories:', e);
    }
}

// --- Products ---
async function loadProducts(category) {
    activeCategory = category;

    if ($w('#productsLoading').length > 0) $w('#productsLoading').show();
    if ($w('#productsGrid').length > 0) $w('#productsGrid').hide();

    try {
        allProducts = await getProducts(category);
        renderProducts(allProducts);
    } catch (e) {
        console.error('Failed to load products:', e);
    } finally {
        if ($w('#productsLoading').length > 0) $w('#productsLoading').hide();
        if ($w('#productsGrid').length > 0) $w('#productsGrid').show();
    }
}

function renderProducts(products) {
    if ($w('#productsRepeater').length === 0) return;

    $w('#productsRepeater').data = products.map(p => ({
        _id: p._id,
        title: p.name,
        subtitle: p.description,
        category: p.category,
        badge: p.badge,
        rating: renderStars(p.rating),
        reviewCount: `(${p.reviews})`,
        price: formatPrice(p.price, p.comparePrice).current,
        comparePrice: formatPrice(p.price, p.comparePrice).original || '',
        inStock: p.inStock,
        slug: p.slug,
    }));

    $w('#productsRepeater').onItemReady(($item, itemData) => {
        if ($item('#productTitle').length > 0) $item('#productTitle').text = itemData.title;
        if ($item('#productDesc').length > 0) $item('#productDesc').text = itemData.subtitle;
        if ($item('#productPrice').length > 0) $item('#productPrice').text = itemData.price;
        if ($item('#productBadge').length > 0) {
            $item('#productBadge').text = itemData.badge;
            $item('#productBadge').show();
        }
        if ($item('#productRating').length > 0) $item('#productRating').text = itemData.rating;
        if ($item('#productReviews').length > 0) $item('#productReviews').text = itemData.reviewCount;
        if ($item('#addToCartBtn').length > 0) {
            $item('#addToCartBtn').onClick(() => {
                wixLocation.to(`/product-page/${itemData.slug}`);
            });
        }
    });
}

// --- Product Filter Tabs ---
function initProductFilters() {
    const filters = [
        { id: '#filterAll', category: 'all', label: 'ALL PRODUCTS' },
        { id: '#filterSupplements', category: 'Supplements', label: 'SUPPLEMENTS' },
        { id: '#filterEquipment', category: 'Equipment', label: 'EQUIPMENT' },
        { id: '#filterApparel', category: 'Apparel', label: 'APPAREL' },
        { id: '#filterAccessories', category: 'Accessories', label: 'ACCESSORIES' },
    ];

    filters.forEach(({ id, category }) => {
        if ($w(id).length > 0) {
            $w(id).onClick(async () => {
                // Update active state
                filters.forEach(f => {
                    if ($w(f.id).length > 0) $w(f.id).style.backgroundColor = 'transparent';
                });
                $w(id).style.backgroundColor = '#FF6B00';

                await loadProducts(category);
            });
        }
    });
}

// --- Testimonials Carousel ---
function initTestimonials() {
    if (TESTIMONIALS.length === 0) return;
    renderTestimonial(0);

    if ($w('#testimonialsNext').length > 0) {
        $w('#testimonialsNext').onClick(() => {
            currentTestimonialIndex = (currentTestimonialIndex + 1) % TESTIMONIALS.length;
            renderTestimonial(currentTestimonialIndex);
        });
    }

    if ($w('#testimonialsPrev').length > 0) {
        $w('#testimonialsPrev').onClick(() => {
            currentTestimonialIndex = (currentTestimonialIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
            renderTestimonial(currentTestimonialIndex);
        });
    }

    // Auto-rotate every 5 seconds
    setInterval(() => {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % TESTIMONIALS.length;
        renderTestimonial(currentTestimonialIndex);
    }, 5000);
}

function renderTestimonial(index) {
    const t = TESTIMONIALS[index];
    if (!t) return;

    if ($w('#testimonialText').length > 0) $w('#testimonialText').text = t.text;
    if ($w('#testimonialName').length > 0) $w('#testimonialName').text = `— ${t.name}`;
    if ($w('#testimonialLocation').length > 0) $w('#testimonialLocation').text = `${t.location} · VERIFIED BUYER`;
    if ($w('#testimonialStars').length > 0) $w('#testimonialStars').text = '★★★★★';
}

// --- Newsletter Form ---
function initNewsletterForm() {
    if ($w('#newsletterBtn').length === 0) return;

    $w('#newsletterBtn').onClick(async () => {
        const email = $w('#newsletterEmail').value;

        if (!email) {
            showNewsletterMessage('Please enter your email address.', false);
            return;
        }

        $w('#newsletterBtn').disable();
        $w('#newsletterBtn').label = 'JOINING...';

        try {
            const result = await subscribeNewsletter(email);
            showNewsletterMessage(result.message, result.success);
            if (result.success) {
                $w('#newsletterEmail').value = '';
                if ($w('#couponCodeDisplay').length > 0) {
                    $w('#couponCodeDisplay').text = result.couponCode;
                    $w('#couponCodeDisplay').show();
                }
            }
        } catch (e) {
            showNewsletterMessage('Something went wrong. Please try again.', false);
        } finally {
            $w('#newsletterBtn').enable();
            $w('#newsletterBtn').label = 'GET THE CODE';
        }
    });
}

function showNewsletterMessage(msg, success) {
    if ($w('#newsletterMessage').length > 0) {
        $w('#newsletterMessage').text = msg;
        $w('#newsletterMessage').style.color = success ? '#22c55e' : '#ef4444';
        $w('#newsletterMessage').show();
    }
}

// --- Scroll Animations ---
function initScrollAnimations() {
    // Reveal elements on scroll using Wix animations
    const animatedElements = ['#heroContent', '#categoriesSection', '#productsSection', '#whySection', '#testimonialsSection', '#newsletterSection'];

    animatedElements.forEach(id => {
        if ($w(id).length > 0) {
            wixWindow.getBoundingRect().then(rect => {
                $w(id).onViewportEnter(() => {
                    $w(id).show('fade', { duration: 600, delay: 100 });
                });
            });
        }
    });
}
