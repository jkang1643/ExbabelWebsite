function handler(event) {
    var response = event.response;
    var headers = response.headers;

    // Strict-Transport-Security tells browsers to only access the site via HTTPS
    headers['strict-transport-security'] = { value: 'max-age=31536000; includeSubDomains' };

    // Content-Security-Policy mitigates XSS attacks but we allow external frames and scripts for widgets
    headers['content-security-policy'] = { value: "default-src 'self' https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; font-src 'self' data: https:; connect-src 'self' https: wss:; frame-src 'self' https:;" };

    // X-Frame-Options prevents clickjacking by disallowing framing
    headers['x-frame-options'] = { value: 'SAMEORIGIN' };

    // X-Content-Type-Options stops browsers from MIME-sniffing
    headers['x-content-type-options'] = { value: 'nosniff' };

    // Referrer-Policy controls information sent in the Referer header
    headers['referrer-policy'] = { value: 'strict-origin-when-cross-origin' };

    // Permissions-Policy restricts access to browser features
    headers['permissions-policy'] = { value: 'geolocation=(), microphone=(), camera=()' };

    return response;
}
