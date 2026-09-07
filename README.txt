Drop your own video files here with these exact names and the site will
pick them up automatically — no code changes needed.

Home hero (floating card over the vortex):
  hero-reel.mp4            — recommended: vertical 9:16, ~10-20s loop

Featured Work vortex reel (in reel order — 6 shown, but you can add or
remove entries, see below):
  work-1.mp4                — Zero Grease — Brand Film
  work-2.mp4                — Ledger — Product Walkthrough
  work-3.mp4                — Northside Kitchens — Site
  work-4.mp4                — Solstice Fitness — Campaign
  work-5.mp4                — Marrow Coffee — Identity
  work-6.mp4                — Vantage Realty — Web App

What We Do vortex reel (in tab order):
  brand-identity.mp4       — Brand Identity & Strategy
  social-media.mp4         — Social Media Marketing
  paid-advertising.mp4     — Paid Advertising
  content-marketing.mp4    — Content Marketing
  web-design.mp4           — Web Design & Dev
  seo-search.mp4           — SEO & Search

All videos autoplay muted and loop, so keep them free of dialogue/narration
that needs sound. H.264 .mp4, vertical (9:16) framing, and a small file
size (under ~6MB each) will load fastest — the reel holds several cards
on screen at once so lighter files keep it smooth.

Renaming files, using an external CDN URL, changing the project names/
descriptions on each Featured Work card, or adding a 7th (or 3rd) project:
edit assets/script.js — the WORK_ITEMS array for Featured Work, the
SERVICE_ITEMS array for What We Do, and the hero <source src="..."> in
index.html for the hero clip. Nothing else needs to change; both reels
size themselves to however many items are in their array.