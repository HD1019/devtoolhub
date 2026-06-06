<p align="center">
  <img src="https://img.shields.io/badge/tools-10-blue?style=for-the-badge" alt="10 Tools">
  <img src="https://img.shields.io/badge/privacy-first-green?style=for-the-badge" alt="Privacy First">
  <img src="https://img.shields.io/badge/no%20signup%20required-orange?style=for-the-badge" alt="No Signup">
  <img src="https://img.shields.io/badge/license-MIT-purple?style=for-the-badge" alt="MIT License">
</p>

<h1 align="center">🛠 DevToolHub</h1>
<p align="center"><strong>10 Free, Private, Client-Side Developer Tools. No signup. No uploads. No BS.</strong></p>

<p align="center">
  <a href="https://hd1019.github.io/devtoolhub/">🔗 Live Site</a> ·
  <a href="#-tools">Tools</a> ·
  <a href="#-why">Why</a> ·
  <a href="#-deploy-your-own">Deploy</a>
</p>

---

## 🚀 Why This Exists

Every "free online tool" site uploads your data to their server. JSON formatters send your code to a backend. Image compressors store your photos. Password generators log what they generate.

**This one doesn't.** Every tool runs entirely in your browser using:

| Technology | Used For |
|------------|----------|
| `Canvas API` | Image compression without upload |
| `crypto.getRandomValues()` | Cryptographically secure passwords & UUIDs |
| `JSON.parse/stringify` | Local JSON processing |
| `FileReader API` | In-browser file handling |
| `marked.js` | Client-side Markdown rendering |

> **TEST IT:** Open DevTools Network tab, use any tool, and see — zero outgoing requests with your data.

---

## 🧰 Tools

| # | Tool | What It Does | Searches/mo |
|---|------|-------------|-------------|
| 1 | [JSON Formatter](https://hd1019.github.io/devtoolhub/tools/json-formatter/) | Format, validate, minify JSON | 100K+ |
| 2 | [Image Compressor](https://hd1019.github.io/devtoolhub/tools/image-compressor/) | Compress images locally, no upload | 50K+ |
| 3 | [QR Code Generator](https://hd1019.github.io/devtoolhub/tools/qr-code/) | Real scannable QR codes, download PNG | 30K+ |
| 4 | [Password Generator](https://hd1019.github.io/devtoolhub/tools/password-generator/) | Crypto-safe random passwords | 20K+ |
| 5 | [Base64 Encoder/Decoder](https://hd1019.github.io/devtoolhub/tools/base64/) | Text & file to Base64 | 15K+ |
| 6 | [UUID Generator](https://hd1019.github.io/devtoolhub/tools/uuid-generator/) | UUID v4, batch generate | 10K+ |
| 7 | [URL Encoder/Decoder](https://hd1019.github.io/devtoolhub/tools/url-encoder/) | encodeURI + encodeURIComponent | 8K+ |
| 8 | [Color Converter](https://hd1019.github.io/devtoolhub/tools/color-converter/) | HEX ↔ RGB ↔ HSL, color picker | 20K+ |
| 9 | [Markdown Preview](https://hd1019.github.io/devtoolhub/tools/markdown-preview/) | Live GFM preview | 5K+ |
| 10 | [Text Diff Checker](https://hd1019.github.io/devtoolhub/tools/text-diff/) | Line-by-line diff with LCS algorithm | 8K+ |

---

## 🔒 Privacy Comparison

| Feature | DevToolHub | TinyWow | Code Beautify | JSONFormatter.org |
|---------|-----------|---------|---------------|-------------------|
| **No upload** | ✅ | ❌ | ❌ | ❌ |
| **No signup** | ✅ | ✅ | ✅ | ✅ |
| **Open source** | ✅ | ❌ | ❌ | ❌ |
| **Works offline** | ✅ | ❌ | ❌ | ❌ |
| **No ads (yet)** | ✅ | ❌ | ❌ | ❌ |
| **Free** | ✅ | ✅ | ✅ | ✅ |

---

## 🚀 Deploy Your Own

One click to deploy a copy to your own GitHub Pages:

1. **Fork** this repo
2. Go to **Settings → Pages**
3. Select `main` branch, root (`/`)
4. Done — your site is live at `yourname.github.io/devtoolhub`

Or run locally:
```bash
git clone https://github.com/HD1019/devtoolhub.git
cd devtoolhub
python -m http.server 8000  # or any static server
# Open http://localhost:8000
```

---

## 🧑‍💻 Tech Stack

- **Zero frameworks** — Vanilla HTML, CSS, JavaScript
- **Zero dependencies** — Except `marked.js` (CDN) for Markdown preview
- **Zero build step** — Just HTML files. Edit and refresh.
- **Zero server costs** — Static files on GitHub Pages
- **Zero tracking** — No Google Analytics, no cookies, no fingerprinting

---

## 📈 Roadmap

- [ ] Add 10 more tools (Word Counter, Timestamp Converter, JSON to CSV, etc.)
- [ ] PWA support (install as app, full offline)
- [ ] Dark/light theme toggle
- [ ] Keyboard shortcuts
- [ ] i18n (Chinese + English already, more coming)

---

## ⭐ Support

If this project saved you 5 minutes, give it a ⭐ on GitHub — it helps others find it.

**[→ Star this repo](https://github.com/HD1019/devtoolhub)** · **[→ Get the Developer Launch Kit](https://hd1019.github.io/devtoolhub/products/developer-launch-kit/)**

---

## 📜 License

MIT — use it, modify it, deploy it, sell it. Just don't resell the source as-is.

---

<p align="center"><sub>Built in 1 day by <a href="https://github.com/HD1019">HD1019</a> · No AI-generated anythings here (ok maybe a little)</sub></p>
