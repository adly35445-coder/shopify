# 4M Cosmetics – Shopify theme

Theme for the 4M Cosmetics store, built on Shopify's Dawn theme (v16).

## What's custom
- **Arabic first:** `locales/ar.json` translation, right-to-left layout when the store language is Arabic, Cairo font.
- **Brand colors:** white / beige / orange (`#E85D0F`) color schemes, rounded buttons and cards (`assets/brand-4m.css`).
- **Animated hero slider** (`sections/hero-slider.liquid`): auto-rotates, slow image zoom, text slides in, swipe on mobile.
- **Skin concerns** (`sections/skin-concerns.liquid`): pick your skin problem → recommended product.
- **Routine steps** (`sections/routine-steps.liquid`): cleanse → moisturize → protect.
- **Customer reviews** (`sections/customer-reviews.liquid`) and **trust badges** (`sections/trust-badges.liquid`).
- **Free shipping progress bar** in the cart (`snippets/free-shipping-bar.liquid`), threshold in Theme settings → 4M Brand.
- **Floating WhatsApp button** (`snippets/whatsapp-button.liquid`), off until a number is added in Theme settings → 4M Brand.

## Connecting to Shopify
Online Store → Themes → Add theme → Connect from GitHub → pick this repo and the `main` branch.
The theme is added unpublished, so customers don't see it until it's published.
