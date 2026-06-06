# Reddit r/webdev Post

**Title**: I built 15 free developer tools that process everything locally — no uploads, no signups

**Body**:

I got tired of "free online tools" that upload my JSON/ images/ passwords to their servers. So I built a collection of 15 tools where **everything runs client-side in the browser**. You can verify this yourself — open DevTools Network tab, use any tool, zero data leaves your computer.

**The tools:**
- JSON Formatter & Validator
- Image Compressor (Canvas API, no upload)
- QR Code Generator (real scannable codes)
- Password Generator (crypto.getRandomValues)
- Base64 Encoder/Decoder
- UUID Generator
- URL Encoder/Decoder
- Color Converter (HEX ↔ RGB ↔ HSL + color picker)
- Markdown Preview (live GFM rendering)
- Text Diff Checker (LCS algorithm)
- Word Counter
- Unix Timestamp Converter
- HTML Entity Encoder/Decoder
- JSON to CSV Converter
- Lorem Ipsum Generator

**Why I built this:**
1. Every JSON formatter I found sends your code to a backend server
2. Image compressors store your photos (who knows what they do with them)
3. Password generators could theoretically log what they generate

These tools use Canvas API, crypto.getRandomValues(), FileReader API, and JSON.parse — all browser-native APIs. No frameworks, no tracking, no cookies.

**Tech stack**: Vanilla HTML/CSS/JS. Zero dependencies (except marked.js CDN for markdown preview). Deployed on GitHub Pages.

**Live**: https://hd1019.github.io/devtoolhub/
**Source**: https://github.com/HD1019/devtoolhub

Would love feedback — especially on privacy verification (check Network tab while using any tool).

---

**Flair**: Showoff Saturday (if posting on Saturday) or Resource

**Posting time**: Saturday 8-10am EST (Saturday Showoff thread) or weekday 11am EST
