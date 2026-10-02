(function () {
    const COOKIE_NAME = 'cookie_consent_status';
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    const declineBtn = document.getElementById('decline-cookies');

    // Helper function to set a cookie
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = 'expires=' + date.toUTCString();
        // ${name}=${value} sets the key-value pair of the cookie
        // ${expires} tells the browser exactly when to delete the cookie
        // ${path} makes the cookie available across the entire website.
        // SameSite=Lax is a defense mechanism against Cross-Site Request
        // Forgery attacks ensuring the browser only sends the cookie
        // along first-party requests and safe top-level cross-site
        // navigations (like clicking a link from this website on
        // Google)
        // Secure ensures that the cookie can only be transmitted
        // over encrypted (HTTPS) connections
        document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Lax; Secure`;
    }

    // Helper function to get a cookie value
    function getCookie(name) {
        const cookieString = document.cookie;
        const cookies = cookieString.split('; ');
        for (let i = 0; i < cookies.length; i++) {
            const [key, val] = cookies[i].split('=');
            if (key === name) return val;
        }
        return null;
    }

    // Check existing preference on page load
    function init() {
        const consent = getCookie(COOKIE_NAME);
        if (!consent) {
            // Show the banner if no choice has been made yet
            banner.classList.remove('hidden');
        } else if (consent === 'accepted') {
            triggerTrackingScripts();
        }
    }

    // User accepts cookies
    acceptBtn.addEventListener('click', () => {
        setCookie(COOKIE_NAME, 'accepted', 1);
        banner.classList.add('hidden');
        triggerTrackingScripts();
    });

    // User declines cookies
    declineBtn.addEventListener('click', () => {
        setCookie(COOKIE_NAME, 'declined', 1);
        banner.classList.add('hidden');
    });

    function triggerTrackingScripts() {
        console.log('Cookie consent granted. Loading analytics scripts...');
        // Initialization logic here
    }

    // Initialize
    document.addEventListener('DOMContentLoaded', init);
})();