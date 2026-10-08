function handler(event) {
    var request = event.request;
    var uri = request.uri;

    // Normalize only the church commercial route; preserve unrelated routing.
    if (uri === '/solutions/churches' || uri === '/solutions/churches/' || uri === '/solutions/churches/index.html') {
        var host = request.headers && request.headers.host && request.headers.host.value;
        if (uri !== '/solutions/churches/' || host !== 'www.exbabel.com') {
            var query = [];
            var params = request.querystring || {};
            for (var key in params) {
                var values = params[key].multiValue || [params[key]];
                for (var i = 0; i < values.length; i++) {
                    query.push(key + '=' + values[i].value);
                }
            }
            return {
                statusCode: 301,
                statusDescription: 'Moved Permanently',
                headers: { location: { value: 'https://www.exbabel.com/solutions/churches/' + (query.length ? '?' + query.join('&') : '') } }
            };
        }
    }

    // Check if the URI is missing a file name.
    if (uri.endsWith('/')) {
        request.uri += 'index.html';
    }
    // Check if the URI is missing a file extension.
    else if (!uri.includes('.')) {
        request.uri += '/index.html';
    }

    return request;
}
