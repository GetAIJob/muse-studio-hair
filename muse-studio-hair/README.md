# Muse Studio Hair

**Type:** Boutique hair salon — cuts, color, specialist treatments
**Location:** Barcelona, Spain (demo)
**Pipeline:** LeadForge AI by GrowthSite Lab

## Design System

- **Heading font:** Libre Baskerville (400, 700)
- **Body font:** Nunito Sans (300, 400, 600)
- **Hero bg:** #1C2B1E (deep forest green) — the visual signature
- **Accent:** #B08F5A (brass/honey gold)
- **Body bg:** #F8F6F2 (warm white)
- **Mood:** Organic editorial, authoritative but approachable, forest green + brass palette

## Images Required

Place the following images in `assets/images/` before going live:

- `assets/images/gallery-1.webp` — Before and after balayage transformation on dark brunette hair (800×600)
- `assets/images/gallery-2.webp` — Warm honey highlights on medium-length hair (800×600)
- `assets/images/gallery-3.webp` — Interior of Muse Studio Hair salon in Barcelona (800×600)
- `assets/images/gallery-4.webp` — Stylist applying balayage color at Muse Studio (800×600)
- `assets/images/gallery-5.webp` — Rich auburn full-color result on long straight hair (800×600)
- `assets/images/gallery-6.webp` — Soft blonde balayage with natural root shadow, loose waves (800×600)
- `assets/images/about-studio.webp` — Salon interior with natural light (600×750)

## To Serve Locally

```bash
npx serve ./sites/muse-studio-hair -p 3002
```

## To Validate HTML

```bash
npx html-validate ./sites/muse-studio-hair/index.html
```

## Sections

1. Header — sticky, transparent → opaque on scroll, mobile burger overlay
2. Hero — 100vh, deep forest green (#1C2B1E), H1 + stats
3. Services — 4 service cards: Haircut, Color, Balayage, Keratin
4. Gallery — 3×2 grid, hover captions
5. About — 2-col layout, studio story, 3 differentiator bullets
6. Process — 4 steps on dark forest bg
7. Testimonials — 3 client quotes
8. Pricing — 3 tiers, Color & Cut featured
9. Contact & Booking — address, hours, booking form with validation
10. Footer — dark forest green, nav links, credits
