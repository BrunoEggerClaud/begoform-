// BE GO FORM — Contact Page

import { submitContactForm } from 'backend/contact.web';

$w.onReady(function () {
    initContactForm();
});

function initContactForm() {
    if ($w('#contactSubmitBtn').length === 0) return;

    $w('#contactSubmitBtn').onClick(async () => {
        const name = $w('#contactName').value;
        const email = $w('#contactEmail').value;
        const subject = $w('#contactSubject').value;
        const orderNumber = $w('#contactOrderNumber').value;
        const message = $w('#contactMessage').value;

        if (!name || !email || !message) {
            showMessage('Please fill in all required fields.', false);
            return;
        }

        $w('#contactSubmitBtn').disable();
        $w('#contactSubmitBtn').label = 'SENDING...';

        try {
            const result = await submitContactForm({ name, email, subject, orderNumber, message });
            showMessage(result.message, result.success);

            if (result.success) {
                $w('#contactName').value = '';
                $w('#contactEmail').value = '';
                $w('#contactMessage').value = '';
                $w('#contactOrderNumber').value = '';
            }
        } catch (e) {
            showMessage('Something went wrong. Email us at hello@begoform.co.uk', false);
        } finally {
            $w('#contactSubmitBtn').enable();
            $w('#contactSubmitBtn').label = 'SEND MESSAGE →';
        }
    });
}

function showMessage(msg, success) {
    if ($w('#contactMessage_result').length > 0) {
        $w('#contactMessage_result').text = msg;
        $w('#contactMessage_result').style.color = success ? '#22c55e' : '#ef4444';
        $w('#contactMessage_result').show();
    }
}
