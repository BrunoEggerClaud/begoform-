// BE GO FORM — Master Page (Global Code)
// Runs on every page: nav, cart counter, announcement bar

import wixStores from 'wix-stores';
import wixLocation from 'wix-location';
import wixWindow from 'wix-window';

const BRAND_ORANGE = '#FF6B00';

$w.onReady(async function () {
    initAnnouncementBar();
    await updateCartCounter();
    initNavigation();
});

// --- Announcement Bar ---
function initAnnouncementBar() {
    const messages = [
        '⚡ FREE UK DELIVERY OVER £50 • 30-DAY NO-QUIBBLE RETURNS • 10% OFF FIRST ORDER — CODE: FORM10 ⚡',
        '⚡ NEXT-DAY DISPATCH ON ORDERS BEFORE 3PM ⚡',
        '⚡ JOIN 50,000+ UK CUSTOMERS ⚡',
        '⚡ NEW SUMMER DROP — LIVE NOW ⚡',
    ];
    let idx = 0;

    if ($w('#announcementText').length === 0) return;

    $w('#announcementText').text = messages[idx];

    setInterval(() => {
        idx = (idx + 1) % messages.length;
        $w('#announcementText').text = messages[idx];
    }, 4000);
}

// --- Cart Counter ---
async function updateCartCounter() {
    try {
        const cart = await wixStores.getCurrentCart();
        const count = cart.lineItems ? cart.lineItems.length : 0;

        if ($w('#cartCount').length > 0) {
            $w('#cartCount').text = count > 0 ? String(count) : '';
            $w('#cartCount').show();
        }
    } catch (e) {
        // Cart not available on this page
    }

    wixStores.onCartChanged(async (cart) => {
        const count = cart.lineItems ? cart.lineItems.length : 0;
        if ($w('#cartCount').length > 0) {
            $w('#cartCount').text = count > 0 ? String(count) : '';
        }
    });
}

// --- Navigation ---
function initNavigation() {
    const navLinks = {
        '#navShop': '/shop',
        '#navCategories': '/shop',
        '#navAbout': '/about',
        '#navReviews': '/reviews',
        '#navContact': '/contact',
    };

    Object.entries(navLinks).forEach(([id, path]) => {
        if ($w(id).length > 0) {
            $w(id).onClick(() => wixLocation.to(path));
        }
    });

    // Mobile menu toggle
    if ($w('#menuButton').length > 0) {
        $w('#menuButton').onClick(() => {
            const menu = $w('#mobileMenu');
            if (menu.collapsed) {
                menu.expand();
            } else {
                menu.collapse();
            }
        });
    }
}
