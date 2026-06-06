# Hacker News - Show HN

**Title**: Show HN: DevToolHub — 15 client-side dev tools, zero data leaves your browser

**Body**:

I built a collection of 15 developer tools where every operation happens entirely in the browser. No data is ever uploaded to any server.

You can verify this by opening your browser's Network tab and using any tool — you'll see zero outgoing requests with your data.

**The privacy problem with existing tools:**

Most "free" online tools (JSON formatters, image compressors, password generators) work by sending your data to a backend. You paste your API response with API keys in it? It goes to their server. You upload a screenshot with personal info? Stored somewhere. You generate a password? They could log it.

These tools use only browser-native APIs:
- `Canvas API` for image compression
- `crypto.getRandomValues()` for passwords/UUIDs
- `JSON.parse/stringify` for formatting
- `FileReader` for local file access

**Tools included:**
JSON Formatter, Image Compressor, QR Generator, Password Generator, Base64, UUID, URL Encoder, Color Converter, Markdown Preview, Text Diff, Word Counter, Timestamp Converter, HTML Encoder, JSON→CSV, Lorem Ipsum

**Stack:** Vanilla HTML/CSS/JS. One <200 line HTML file per tool. No frameworks, no build step, no npm install. Deployed on GitHub Pages (free, zero server costs).

**Proof of privacy:** Open any tool, F12 → Network tab, use the tool. You'll see the page HTML load once, then nothing else. The image compressor, JSON formatter, password generator — all compute locally.

Live: https://hd1019.github.io/devtoolhub/
GitHub: https://github.com/HD1019/devtoolhub (MIT licensed)

Curious what r/hn thinks — especially about the privacy angle. Is "your data never leaves your browser" a compelling enough differentiator in 2026?

---

**Posting tip**: Submit as "Show HN: DevToolHub — 15 client-side dev tools, zero data leaves your browser"

**Best time**: Monday-Friday 9-11am ET
