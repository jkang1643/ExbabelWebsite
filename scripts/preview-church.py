"""Local-only static export preview. Add ?nojs=1 to block all page JavaScript."""
import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlsplit


class PreviewHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        if parse_qs(urlsplit(self.path).query).get("nojs") == ["1"]:
            self.send_header("Content-Security-Policy", "script-src 'none'")
        super().end_headers()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=3100)
    args = parser.parse_args()
    server = ThreadingHTTPServer(("127.0.0.1", args.port), partial(PreviewHandler, directory="out"))
    print(f"Preview: http://localhost:{args.port}/solutions/churches/", flush=True)
    print("No JavaScript: append ?nojs=1. Stop with Ctrl+C.", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.server_close()
