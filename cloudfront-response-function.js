function handler(event) {
    var response = event.response;
    var headers = response.headers;

    // Strict-Transport-Security
    headers['strict-transport-security'] = { value: 'max-age=31536000; includeSubDomains' };

    // Content-Security-Policy for widgets (Calendly, OneTrust, etc.)
    headers['content-security-policy'] = { 
        value: "default-src 'self' https: data: blob: 'unsafe-inline' 'unsafe-eval'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https: blob:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: blob: https:; font-src 'self' data: https:; connect-src 'self' https: wss:; frame-src * 'self' https: about: blob: data:; child-src * 'self' https: about: blob: data:;" 
    };

    // Referrer-Policy
    headers['referrer-policy'] = { value: 'strict-origin-when-cross-origin' };

    // X-Content-Type-Options
    headers['x-content-type-options'] = { value: 'nosniff' };

    return response;
}
