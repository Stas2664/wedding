# Fixes & Hardening (2025-08-31T20:52:32.191485):

- Fixed portfolio lightbox conflict with page transition handler (script.js)
- Hardened lightbox click handling (preventDefault + stopImmediatePropagation + delegation)
- Added Content Security Policy via meta tag
- Added rel="noopener noreferrer" to external links
- Added `defer` to local scripts for better performance
- Added `loading="lazy"` and `decoding="async"` to images
- Minor CSS tweak present: pointer-events disabled for overlays (already there)

## QA findings
[
  {
    "file": "about.html",
    "tag": "img",
    "src": "фото для сайта/photo_2025-08-25_00-56-30.jpg"
  },
  {
    "file": "index.html",
    "tag": "img",
    "src": "фото для сайта/photo_2025-08-25_00-56-39.jpg"
  },
  {
    "file": "index.html",
    "tag": "img",
    "src": "фото для сайта/photo_2025-08-25_00-56-36.jpg"
  },
  {
    "file": "portfolio.html",
    "tag": "img",
    "src": "фото для сайта/photo_2025-08-25_00-56-42.jpg"
  },
  {
    "file": "portfolio.html",
    "tag": "img",
    "src": "фото для сайта/photo_2025-08-25_00-56-39.jpg"
  },
  {
    "file": "portfolio.html",
    "tag": "img",
    "src": "фото для сайта/photo_2025-08-25_00-56-36.jpg"
  },
  {
    "file": "portfolio.html",
    "tag": "img",
    "src": "фото для сайта/photo_2025-08-25_00-56-33.jpg"
  },
  {
    "file": "portfolio.html",
    "tag": "img",
    "src": "фото для сайта/photo_2025-08-25_00-56-30.jpg"
  },
  {
    "file": "portfolio.html",
    "tag": "img",
    "src": "фото для сайта/photo_2025-08-25_00-56-26.jpg"
  },
  {
    "file": "portfolio.html",
    "tag": "img",
    "src": "фото для сайта/photo_2025-08-25_00-56-24.jpg"
  },
  {
    "file": "portfolio.html",
    "tag": "img",
    "src": "фото для сайта/photo_2025-08-25_00-56-20.jpg"
  },
  {
    "file": "portfolio.html",
    "tag": "img",
    "src": "images/Анна и Ильдар-3608.jpg"
  },
  {
    "file": "portfolio.html",
    "tag": "img",
    "src": "images/Анна и Ильдар-3632.jpg"
  },
  {
    "file": "portfolio.html",
    "tag": "img",
    "src": "images/Анна и Ильдар-3712.jpg"
  },
  {
    "file": "portfolio.html",
    "tag": "img",
    "src": "images/Анна и Ильдар-3463.jpg"
  },
  {
    "file": "portfolio.html",
    "tag": "img",
    "src": "images/Анна и Ильдар-3464.jpg"
  },
  {
    "file": "portfolio.html",
    "tag": "img",
    "src": "images/Анна и Ильдар-3542.jpg"
  },
  {
    "file": "portfolio.html",
    "tag": "img",
    "src": "images/Анна и Ильдар-3806.jpg"
  },
  {
    "file": "portfolio.html",
    "tag": "img",
    "src": "images/Анна и Ильдар-3808.jpg"
  },
  {
    "file": "portfolio.html",
    "tag": "img",
    "src": "images/Анна и Ильдар-3877.jpg"
  },
  {
    "file": "portfolio.html",
    "tag": "img",
    "src": "images/Анна и Ильдар-4302.jpg"
  },
  {
    "file": "portfolio.html",
    "tag": "img",
    "src": "images/Анна и Ильдар-4353.jpg"
  },
  {
    "file": "portfolio.html",
    "tag": "img",
    "src": "images/Анна и Ильдар-3754.jpg"
  },
  {
    "file": "portfolio.html",
    "tag": "a",
    "href": "фото для сайта/photo_2025-08-25_00-56-42.jpg"
  },
  {
    "file": "portfolio.html",
    "tag": "a",
    "href": "фото для сайта/photo_2025-08-25_00-56-39.jpg"
  },
  {
    "file": "portfolio.html",
    "tag": "a",
    "href": "фото для сайта/photo_2025-08-25_00-56-36.jpg"
  },
  {
    "file": "portfolio.html",
    "tag": "a",
    "href": "фото для сайта/photo_2025-08-25_00-56-33.jpg"
  },
  {
    "file": "portfolio.html",
    "tag": "a",
    "href": "фото для сайта/photo_2025-08-25_00-56-30.jpg"
  },
  {
    "file": "portfolio.html",
    "tag": "a",
    "href": "фото для сайта/photo_2025-08-25_00-56-26.jpg"
  },
  {
    "file": "portfolio.html",
    "tag": "a",
    "href": "фото для сайта/photo_2025-08-25_00-56-24.jpg"
  },
  {
    "file": "portfolio.html",
    "tag": "a",
    "href": "фото для сайта/photo_2025-08-25_00-56-20.jpg"
  },
  {
    "file": "portfolio.html",
    "tag": "a",
    "href": "images/Анна и Ильдар-3608.jpg"
  },
  {
    "file": "portfolio.html",
    "tag": "a",
    "href": "images/Анна и Ильдар-3632.jpg"
  },
  {
    "file": "portfolio.html",
    "tag": "a",
    "href": "images/Анна и Ильдар-3712.jpg"
  },
  {
    "file": "portfolio.html",
    "tag": "a",
    "href": "images/Анна и Ильдар-3463.jpg"
  },
  {
    "file": "portfolio.html",
    "tag": "a",
    "href": "images/Анна и Ильдар-3464.jpg"
  },
  {
    "file": "portfolio.html",
    "tag": "a",
    "href": "images/Анна и Ильдар-3542.jpg"
  },
  {
    "file": "portfolio.html",
    "tag": "a",
    "href": "images/Анна и Ильдар-3806.jpg"
  },
  {
    "file": "portfolio.html",
    "tag": "a",
    "href": "images/Анна и Ильдар-3808.jpg"
  },
  {
    "file": "portfolio.html",
    "tag": "a",
    "href": "images/Анна и Ильдар-3877.jpg"
  },
  {
    "file": "portfolio.html",
    "tag": "a",
    "href": "images/Анна и Ильдар-4302.jpg"
  },
  {
    "file": "portfolio.html",
    "tag": "a",
    "href": "images/Анна и Ильдар-4353.jpg"
  },
  {
    "file": "portfolio.html",
    "tag": "a",
    "href": "images/Анна и Ильдар-3754.jpg"
  },
  {
    "file": "reviews.html",
    "tag": "img",
    "src": "фото для сайта/photo_2025-08-25_00-56-42.jpg"
  },
  {
    "file": "reviews.html",
    "tag": "img",
    "src": "фото для сайта/photo_2025-08-25_00-56-39.jpg"
  },
  {
    "file": "reviews.html",
    "tag": "img",
    "src": "фото для сайта/photo_2025-08-25_00-56-36.jpg"
  },
  {
    "file": "reviews.html",
    "tag": "img",
    "src": "фото для сайта/photo_2025-08-25_00-56-33.jpg"
  },
  {
    "file": "reviews.html",
    "tag": "img",
    "src": "фото для сайта/photo_2025-08-25_00-56-30.jpg"
  },
  {
    "file": "reviews.html",
    "tag": "img",
    "src": "фото для сайта/photo_2025-08-25_00-56-26.jpg"
  },
  {
    "file": "reviews.html",
    "tag": "img",
    "src": "фото для сайта/photo_2025-08-25_00-56-24.jpg"
  },
  {
    "file": "reviews.html",
    "tag": "img",
    "src": "фото для сайта/photo_2025-08-25_00-56-20.jpg"
  },
  {
    "file": "reviews.html",
    "tag": "img",
    "src": "фото для сайта/photo_2025-08-25_00-56-12.jpg"
  },
  {
    "file": "services.html",
    "tag": "img",
    "src": "фото для сайта/photo_2025-08-25_00-56-36.jpg"
  },
  {
    "file": "services.html",
    "tag": "img",
    "src": "фото для сайта/photo_2025-08-25_00-56-26.jpg"
  },
  {
    "file": "services.html",
    "tag": "img",
    "src": "фото для сайта/photo_2025-08-25_00-56-24.jpg"
  }
]
