// BE GO FORM — Newsletter Backend

import wixCrm from 'wix-crm-backend';
import { ok, badRequest, serverError } from 'wix-http-functions';

// Subscribe to newsletter and return the FORM10 coupon
export async function subscribeNewsletter(email) {
    if (!email || !isValidEmail(email)) {
        return { success: false, message: 'Please enter a valid email address.' };
    }

    try {
        // Create or update contact in Wix CRM
        await wixCrm.createContact({
            emails: [{ tag: 'MAIN', email }],
            labelKeys: ['newsletter-subscriber'],
        });

        // Trigger welcome email automation (configure in Wix Automations)
        await wixCrm.emailContact('welcome-email-template', undefined, {
            variables: { couponCode: 'FORM10', discountPercent: '10' },
        }).catch(() => {}); // Non-blocking

        return {
            success: true,
            message: 'Welcome to the movement! Check your email for your 10% off code.',
            couponCode: 'FORM10',
        };
    } catch (err) {
        if (err.message && err.message.includes('already exists')) {
            return {
                success: true,
                message: 'You\'re already subscribed! Your code: FORM10',
                couponCode: 'FORM10',
            };
        }
        return { success: false, message: 'Something went wrong. Please try again.' };
    }
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
