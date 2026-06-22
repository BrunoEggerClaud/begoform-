// BE GO FORM — Contact Form Backend

import wixCrm from 'wix-crm-backend';

const SUBJECTS = {
    'order': 'Order Enquiry',
    'product': 'Product Question',
    'wholesale': 'Wholesale',
    'collab': 'Collaboration',
    'other': 'Other',
};

export async function submitContactForm({ name, email, subject, orderNumber, message }) {
    if (!name || !email || !message) {
        return { success: false, message: 'Please fill in all required fields.' };
    }

    if (!isValidEmail(email)) {
        return { success: false, message: 'Please enter a valid email address.' };
    }

    try {
        // Create activity in Wix CRM
        const subjectLabel = SUBJECTS[subject] || subject || 'General Enquiry';

        await wixCrm.createContact({
            name: { first: name.split(' ')[0], last: name.split(' ').slice(1).join(' ') },
            emails: [{ tag: 'MAIN', email }],
            labelKeys: ['contact-form-submission'],
        });

        // Log activity
        await wixCrm.createActivity({
            type: wixCrm.ActivityType.CONTACT_FORM_SENT,
            info: {
                field1: subjectLabel,
                field2: orderNumber || 'N/A',
                field3: message,
            },
        }).catch(() => {});

        return {
            success: true,
            message: 'Message sent! We\'ll reply within 4 working hours.',
        };
    } catch (err) {
        return { success: false, message: 'Something went wrong. Email us at hello@begoform.co.uk' };
    }
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
