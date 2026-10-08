/* =====================================================================
   Glyphic Palette — Shop (e-books), cart, product page, checkout
   Edit the CONFIG and BOOKS below. Nothing else needs touching.
   ===================================================================== */
(function () {
"use strict";

/* ---------------- CONFIG ---------------- */
var CFG = {
  brand: "Glyphic Palette",
  whatsapp: "918249614226",
  support: "info@glyphicpalette.com",
  /* RAZORPAY — fill these in when your backend is ready (see checkout notes). */
  razorpay: {
    keyId: "",           // e.g. "rzp_live_xxxxxxxx"  (public key only — never put the secret here)
    createOrderUrl: "",  // POST: {items,coupon,customer} -> {orderId, amount, currency}
    verifyUrl: ""        // POST: {razorpay_order_id, razorpay_payment_id, razorpay_signature} -> {ok:true, orderRef}
  },
  /* Coupons here are for display only. Your backend MUST re-check the coupon and price. */
  coupons: { WELCOME10: { type: "percent", value: 10 } }
};

/* ---------------- E-BOOKS (placeholder content — replace with your real books) ---------------- */
var BOOKS = [
  { id: "brand-identity-playbook", title: "The Brand Identity Playbook", cover: "Brand Identity Playbook", category: "Branding",
    subtitle: "Build a brand people remember, from positioning to a full visual system.",
    price: 399, mrp: 799, pages: 60, size: "8 MB", level: "Beginner to intermediate", c1: "#e2233a", c2: "#7f0f22", badge: "Bestseller",
    short: "A step-by-step guide to positioning, naming and designing a brand that looks and sounds consistent everywhere.",
    about: ["Most small businesses have a logo but no brand. This playbook walks you through the decisions that sit behind a memorable identity: who you serve, what you stand for, and how that shows up in colour, type and tone.",
            "Every chapter ends with a short exercise, so you finish with a real brand foundation instead of just notes."],
    learn: ["Define your positioning in one clear sentence", "Choose a name and tagline that stick", "Pick colours and fonts with a reason behind them", "Write a simple brand voice guide", "Brief a designer without wasting rounds", "Keep your brand consistent across social, web and print"],
    toc: [["Why brands fail","The gap between a logo and an identity"],["Positioning","Who you serve and why you are different"],["Naming and taglines","Rules and a naming worksheet"],["Visual identity","Colour, type, logo and layout"],["Brand voice","Writing the way your brand sounds"],["Brand guidelines","A one-page system your team can follow"]] },
  { id: "instagram-growth-blueprint", title: "Instagram Growth Blueprint for Small Businesses", cover: "Instagram Growth Blueprint", category: "Social Media",
    subtitle: "A practical system for posting, reels and engagement that turns followers into customers.",
    price: 499, mrp: 999, pages: 55, size: "7 MB", level: "Beginner", c1: "#ff7849", c2: "#c81c33",
    short: "Plan, create and measure Instagram content that brings enquiries, not just likes.",
    about: ["Posting every day without a plan burns time and gets little back. This blueprint gives you a weekly rhythm, content pillars and simple templates so you always know what to post and why.",
            "It focuses on what a small business can realistically do in a few hours a week."],
    learn: ["Set up a profile that converts visitors", "Build 4 content pillars for your business", "Plan a month of posts in one sitting", "Write hooks and captions that get saves", "Use reels without being on camera", "Read insights and double down on what works"],
    toc: [["Profile that converts","Bio, highlights and link setup"],["Content pillars","What to post and why"],["The weekly rhythm","A repeatable posting plan"],["Reels and carousels","Formats and hook formulas"],["Engagement","Comments, DMs and community"],["Measuring results","The few numbers that matter"]] },
  { id: "meta-ads-starter-guide", title: "Meta Ads Starter Guide", cover: "Meta Ads Starter Guide", category: "Paid Ads",
    subtitle: "Launch your first Facebook and Instagram campaign without wasting budget.",
    price: 599, mrp: 1199, pages: 70, size: "10 MB", level: "Beginner", c1: "#2b3a67", c2: "#e2233a",
    short: "From pixel setup to your first optimised campaign, explained in plain language.",
    about: ["Meta Ads can feel like a maze of settings. This guide cuts it down to the essentials: what to set up, how to structure a campaign, and how to read results so you know when to scale or stop.",
            "Written for business owners who want to understand their ads, whether they run them or hire someone."],
    learn: ["Set up your ad account, pixel and events correctly", "Choose the right objective for your goal", "Build audiences that are neither too wide nor too narrow", "Write ad copy and pick creatives that test well", "Set a sensible starting budget", "Know when to scale, pause or change an ad"],
    toc: [["How Meta ads work","Auction, audiences and objectives"],["Account and tracking setup","Business Manager, pixel, events"],["Campaign structure","Campaigns, ad sets and ads"],["Audiences","Cold, warm and lookalike"],["Creative and copy","What to test first"],["Budget and optimisation","Reading results and scaling"]] },
  { id: "local-seo-handbook", title: "The Local SEO Handbook", cover: "Local SEO Handbook", category: "SEO",
    subtitle: "Get found on Google Maps and local search by people ready to buy nearby.",
    price: 499, mrp: 999, pages: 50, size: "6 MB", level: "Beginner", c1: "#0f6b4f", c2: "#0b3d36",
    short: "A clear checklist for ranking higher in your city, built around Google Business Profile.",
    about: ["If your customers search \"near me\", local SEO decides whether they find you or a competitor. This handbook covers the few things that move the needle: your Google Business Profile, reviews, citations and on-page basics.",
            "Every section is a checklist you can finish in an afternoon."],
    learn: ["Fully optimise your Google Business Profile", "Choose categories and services that match searches", "Collect more reviews, the right way", "Build consistent local listings", "Add local keywords to your website", "Track calls, directions and clicks"],
    toc: [["How local search works","Map pack and organic results"],["Google Business Profile","Setup and optimisation checklist"],["Reviews","Getting them and replying to them"],["Citations and listings","Keeping your details consistent"],["On-page local SEO","Pages, titles and schema"],["Tracking","What to measure monthly"]] },
  { id: "content-calendar-kit", title: "The 90-Day Content Calendar Kit", cover: "90-Day Content Calendar", category: "Content",
    subtitle: "Three months of content ideas, templates and a planner so you never run out of things to post.",
    price: 299, mrp: 599, pages: 45, size: "5 MB", level: "All levels", c1: "#7a3df0", c2: "#3a1d8f",
    short: "A ready-to-use planner with idea prompts and templates for blogs, social and email.",
    about: ["Consistency is the hardest part of content marketing. This kit gives you a 90-day structure with weekly themes, idea prompts and fill-in templates, so planning takes minutes instead of hours.",
            "Use it for social media, blogs, email, or all three."],
    learn: ["Plan 90 days of content in one weekend", "Turn one idea into five pieces of content", "Use proven post and email templates", "Match content to each stage of the buying journey", "Batch-create to save time", "Review and refresh your plan every month"],
    toc: [["The planning method","Themes, pillars and goals"],["Month 1","Awareness: ideas and templates"],["Month 2","Trust: stories and proof"],["Month 3","Conversion: offers and calls to action"],["Repurposing","One idea, many formats"],["Monthly review","What to keep and what to cut"]] },
  { id: "website-that-converts", title: "Websites That Convert", cover: "Websites That Convert", category: "Web Design",
    subtitle: "Plan, write and structure a small-business website that turns visitors into enquiries.",
    price: 599, mrp: 1199, pages: 65, size: "9 MB", level: "Beginner to intermediate", c1: "#1b1214", c2: "#e2233a",
    short: "A practical guide to page structure, copy and calls to action for a site that actually gets enquiries.",
    about: ["A good-looking site is not the same as one that sells. This guide shows you how to organise each page, write copy that answers real questions, and place calls to action where people are ready to act.",
            "Useful whether you are building your own site or briefing a developer."],
    learn: ["Map the pages your business really needs", "Write a homepage that answers \"why you?\" in seconds", "Place calls to action that get clicked", "Make your site fast and mobile-first", "Add trust signals without clutter", "Set up basic analytics to learn from visitors"],
    toc: [["Goals and pages","What your site must achieve"],["The homepage","Structure and hero copy"],["Service and product pages","Persuasive page layouts"],["Calls to action","Wording and placement"],["Speed and mobile","What to check before launch"],["Analytics","Measuring and improving"]] }
];
var BUNDLE = { id: "complete-library", bundle: true, title: "The Complete Library", cover: "Complete Library", category: "Bundle",
  subtitle: "All 6 e-books in one pack, at a lower price than buying them separately.",
  price: 1799, pages: 345, size: "45 MB", level: "All levels", c1: "#1b1214", c2: "#e2233a", badge: "Best value",
  includes: BOOKS.map(function (b) { return b.id; }),
  short: "Branding, social, ads, SEO, content and web: the full set of Glyphic Palette e-books.",
  about: ["Get every e-book in the shop in a single purchase. Start with the one you need most, then work through the rest as your business grows.",
          "Includes all six titles listed below."],
  learn: ["Everything in all six e-books", "One payment, one download email", "Works as a complete marketing curriculum"],
  toc: BOOKS.map(function (b) { return [b.title, b.subtitle]; }) };
BUNDLE.mrp = BOOKS.reduce(function (s, b) { return s + b.price; }, 0); // "buying separately" price
var ALL = BOOKS.concat([BUNDLE]);

var FAQ = [
  ["How will I get my e-book?", "As soon as your payment is confirmed, a download link is sent to the email address you enter at checkout. Please check your spam folder if it doesn't arrive within a few minutes."],
  ["What format are the e-books in?", "PDF. They open on any phone, tablet or computer, and you can read them offline once downloaded."],
  ["Can I get a refund?", "Because e-books are digital and delivered instantly, refunds are limited to specific cases such as duplicate payments or a file that won't open. See our <a href=\"policies.html#refunds\">Refund Policy</a> for details."],
  ["Is my payment secure?", "Yes. Payments are processed by Razorpay. We never see or store your card, UPI or bank details."],
  ["Can I share or print the e-book?", "Each purchase is for your personal use. You can print it for yourself, but please don't share or resell the file."],
  ["I need help with my order.", "Message us on WhatsApp or email " + CFG.support + " and we'll sort it out."]
];

/* ---------------- helpers ---------------- */
var $ = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
var fmt = function (n) { return "\u20B9" + Number(n).toLocaleString("en-IN"); };
var find = function (id) { return ALL.filter(function (b) { return b.id === id; })[0]; };
var off = function (b) { return b.mrp > b.price ? Math.round((b.mrp - b.price) / b.mrp * 100) : 0; };
var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
var ICON = {
  bag: '<svg viewBox="0 0 24 24"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
  bolt: '<svg viewBox="0 0 24 24"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></svg>',
  lock: '<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
  chat: '<svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-5.4A8 8 0 1 1 21 12z"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7"/></svg>'
};

/* ---------------- cart ---------------- */
var KEY = "gp_cart_v1", mem = [];
function getCart() {
  try { var c = JSON.parse(localStorage.getItem(KEY)); if (Array.isArray(c)) return c.filter(find); } catch (e) {}
  return mem.filter(find);
}
function setCart(c) {
  mem = c;
  try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {}
  renderCart();
  document.dispatchEvent(new Event("gp-cart"));
}
function inCart(id) { var c = getCart(); return c.indexOf(id) > -1 || (c.indexOf(BUNDLE.id) > -1 && id !== BUNDLE.id); }
function addToCart(id) {
  var c = getCart(), b = find(id);
  if (!b) return false;
  if (id === BUNDLE.id) { setCart([BUNDLE.id]); toast("Complete Library added. Single titles were merged into it."); return true; }
  if (c.indexOf(BUNDLE.id) > -1) { toast("Already included in your Complete Library bundle."); return false; }
  if (c.indexOf(id) > -1) return true;
  c.push(id); setCart(c); return true;
}
function removeFromCart(id) { setCart(getCart().filter(function (x) { return x !== id; })); }
function totals(c, couponCode) {
  var items = c.map(find), sub = 0, mrp = 0;
  items.forEach(function (b) { sub += b.price; mrp += (b.mrp || b.price); });
  var cp = couponCode && CFG.coupons[couponCode], disc = 0;
  if (cp) disc = cp.type === "percent" ? Math.round(sub * cp.value / 100) : Math.min(sub, cp.value);
  return { items: items, sub: sub, mrp: mrp, save: mrp - sub, disc: disc, total: Math.max(0, sub - disc) };
}

/* ---------------- shared UI ---------------- */
function cover(b, cls) {
  if (b.image) return '<div class="sh-cover ' + (cls || "") + '"><img src="' + esc(b.image) + '" alt="' + esc(b.title) + ' cover"></div>';
  return '<div class="sh-cover ' + (cls || "") + '" style="--c1:' + b.c1 + ';--c2:' + b.c2 + '" role="img" aria-label="' + esc(b.title) + ' cover"><span class="sh-cover-brand">' + CFG.brand + '</span><strong class="sh-cover-title">' + esc(b.cover || b.title) + '</strong><span class="sh-cover-foot">' + esc(b.category) + ' \u00B7 E-book</span></div>';
}
function priceHTML(b) {
  var o = off(b);
  return '<div class="sh-price"><b>' + fmt(b.price) + '</b>' + (b.mrp > b.price ? '<s>' + fmt(b.mrp) + '</s>' : '') + (b.bundle ? '<em>Save ' + fmt(b.mrp - b.price) + '</em>' : (o ? '<em>' + o + '% off</em>' : '')) + '</div>';
}
function toast(msg) {
  var t = $(".sh-toast"); if (!t) return;
  t.textContent = msg; t.classList.add("is-on");
  clearTimeout(toast._t); toast._t = setTimeout(function () { t.classList.remove("is-on"); }, 2600);
}
function buildShell() {
  var cartBtn = '<button type="button" class="sh-cart-btn" data-open-cart aria-label="Open cart">' + ICON.bag + '<span class="sh-cart-count" data-n="0"></span></button>';
  var cta = $(".nav-cta"); if (cta) cta.insertAdjacentHTML("afterbegin", cartBtn);
  var tg = $(".nav-toggle"); if (tg) tg.insertAdjacentHTML("beforebegin", cartBtn.replace('class="sh-cart-btn"', 'class="sh-cart-btn sh-cart-m"'));
  document.body.insertAdjacentHTML("beforeend",
    '<div class="sh-dim" id="sh-dim"></div>' +
    '<aside class="sh-drawer" id="sh-drawer" aria-label="Your cart" aria-hidden="true"><div class="sh-d-head"><h3>Your cart</h3><button type="button" class="sh-x" data-close-cart aria-label="Close cart">&times;</button></div><div class="sh-d-body" id="sh-d-body"></div><div class="sh-d-foot" id="sh-d-foot"></div></aside>' +
    '<div class="sh-toast" role="status" aria-live="polite"></div>');
}
function openCart(v) {
  $("#sh-drawer").classList.toggle("is-open", v); $("#sh-dim").classList.toggle("is-open", v);
  $("#sh-drawer").setAttribute("aria-hidden", v ? "false" : "true");
  document.body.classList.toggle("nav-lock", v);
}
function renderCart() {
  var c = getCart(), t = totals(c);
  $$(".sh-cart-count").forEach(function (e) { e.textContent = c.length || ""; e.setAttribute("data-n", c.length); });
  var body = $("#sh-d-body"), foot = $("#sh-d-foot");
  if (body) {
    if (!c.length) {
      body.innerHTML = '<div class="sh-d-empty"><p style="margin-bottom:18px">Your cart is empty.</p><a class="sh-btn sh-btn-primary" href="shop.html">Browse e-books</a></div>';
      foot.style.display = "none";
    } else {
      foot.style.display = "";
      body.innerHTML = t.items.map(function (b) {
        return '<div class="sh-line">' + cover(b) + '<div><b>' + esc(b.title) + '</b><span>' + (b.bundle ? "6 e-books" : "PDF e-book") + '</span><br><button type="button" class="sh-rm" data-remove="' + b.id + '">Remove</button></div><b>' + fmt(b.price) + '</b></div>';
      }).join("");
      foot.innerHTML = (t.save > 0 ? '<div class="sh-sum is-save"><span>You save</span><span>' + fmt(t.save) + '</span></div>' : '') +
        '<div class="sh-sum is-total"><span>Subtotal</span><span>' + fmt(t.sub) + '</span></div>' +
        '<a class="sh-btn sh-btn-primary sh-btn-block" href="checkout.html">Checkout</a>';
    }
  }
  $$("[data-add]").forEach(function (b) {
    var id = b.getAttribute("data-add"), has = inCart(id);
    b.classList.toggle("is-in", has);
    b.textContent = has ? "In cart \u2713" : "Add to cart";
  });
}
function bindGlobal() {
  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-add],[data-buy],[data-remove],[data-open-cart],[data-close-cart],#sh-dim");
    if (!el) return;
    if (el.hasAttribute("data-add")) { var id = el.getAttribute("data-add"); if (inCart(id)) { openCart(true); } else if (addToCart(id)) openCart(true); }
    else if (el.hasAttribute("data-buy")) { if (addToCart(el.getAttribute("data-buy")) || inCart(el.getAttribute("data-buy"))) location.href = "checkout.html"; }
    else if (el.hasAttribute("data-remove")) removeFromCart(el.getAttribute("data-remove"));
    else if (el.hasAttribute("data-open-cart")) openCart(true);
    else openCart(false);
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { openCart(false); closeModal(); } });
}

/* ---------------- SHOP PAGE ---------------- */
function cardHTML(b) {
  var o = off(b);
  return '<article class="sh-card"><a class="sh-card-cover" href="product.html?id=' + b.id + '" aria-label="' + esc(b.title) + '">' + (b.badge ? '<span class="sh-badge">' + b.badge + '</span>' : '') + (o ? '<span class="sh-off">' + o + '% off</span>' : '') + cover(b) + '</a>' +
    '<div class="sh-card-body"><span class="sh-cat">' + b.category + '</span><h3><a href="product.html?id=' + b.id + '">' + esc(b.title) + '</a></h3><p class="sh-sub">' + esc(b.subtitle) + '</p><p class="sh-meta">PDF \u00B7 ' + b.pages + ' pages \u00B7 Instant delivery</p>' + priceHTML(b) +
    '<div class="sh-actions"><button type="button" class="sh-btn" data-add="' + b.id + '">Add to cart</button><button type="button" class="sh-btn sh-btn-primary" data-buy="' + b.id + '">Buy now</button></div></div></article>';
}
function renderShop() {
  var st = { cat: "All", q: "", sort: "featured" };
  var cats = ["All"]; BOOKS.forEach(function (b) { if (cats.indexOf(b.category) < 0) cats.push(b.category); });
  var chips = $("#sh-chips"), grid = $("#sh-grid"), count = $("#sh-count"), bun = $("#sh-bundle");
  chips.innerHTML = cats.map(function (c) { return '<button type="button" class="sh-chip' + (c === "All" ? " is-active" : "") + '" data-cat="' + c + '">' + c + '</button>'; }).join("");
  bun.innerHTML = '<div>' + cover(BUNDLE) + '</div><div><h2>' + BUNDLE.title + '</h2><p>' + BUNDLE.subtitle + '</p>' + priceHTML(BUNDLE) + '</div>' +
    '<div class="sh-bundle-act"><button type="button" class="sh-btn sh-btn-primary" data-buy="' + BUNDLE.id + '">Buy the bundle</button><a class="sh-btn" href="product.html?id=' + BUNDLE.id + '">See what\u2019s inside</a></div>';
  function draw() {
    var list = BOOKS.filter(function (b) {
      return (st.cat === "All" || b.category === st.cat) && (!st.q || (b.title + " " + b.subtitle + " " + b.category).toLowerCase().indexOf(st.q) > -1);
    });
    if (st.sort === "low") list.sort(function (a, b) { return a.price - b.price; });
    if (st.sort === "high") list.sort(function (a, b) { return b.price - a.price; });
    if (st.sort === "off") list.sort(function (a, b) { return off(b) - off(a); });
    bun.style.display = (st.cat === "All" && !st.q) ? "" : "none";
    count.textContent = list.length + (list.length === 1 ? " e-book" : " e-books");
    grid.innerHTML = list.length ? list.map(cardHTML).join("") : '<div class="sh-empty" style="grid-column:1/-1"><p>No e-books match your search. Try a different word or category.</p></div>';
    renderCart();
  }
  chips.addEventListener("click", function (e) { var b = e.target.closest("[data-cat]"); if (!b) return; st.cat = b.getAttribute("data-cat"); $$(".sh-chip", chips).forEach(function (x) { x.classList.toggle("is-active", x === b); }); draw(); });
  $("#sh-search").addEventListener("input", function (e) { st.q = e.target.value.trim().toLowerCase(); draw(); });
  $("#sh-sort").addEventListener("change", function (e) { st.sort = e.target.value; draw(); });
  draw();
}

/* ---------------- PRODUCT PAGE ---------------- */
function renderProduct() {
  var root = $("#sh-product"), id = new URLSearchParams(location.search).get("id"), b = find(id);
  if (!b) {
    root.innerHTML = '<div class="sh-center"><h2>E-book not found</h2><p>This link may be old or mistyped.</p><a class="sh-btn sh-btn-primary" href="shop.html">Back to the shop</a></div>'; return;
  }
  document.title = b.title + " | E-book \u2014 " + CFG.brand;
  var md = $('meta[name="description"]'); if (md) md.setAttribute("content", b.short);
  var ld = document.createElement("script"); ld.type = "application/ld+json";
  ld.textContent = JSON.stringify({ "@context": "https://schema.org", "@type": "Product", name: b.title, description: b.short, category: "E-book", brand: { "@type": "Brand", name: CFG.brand }, offers: { "@type": "Offer", priceCurrency: "INR", price: b.price, availability: "https://schema.org/InStock", url: location.href } });
  document.head.appendChild(ld);
  var facts = ['PDF e-book', b.pages + ' pages', b.size, b.level];
  var rows = [["Format", "PDF (digital download)"], ["Pages", b.pages], ["File size", b.size], ["Language", "English"], ["Level", b.level], ["Publisher", CFG.brand], ["Delivery", "Download link emailed after payment"]];
  var related = BOOKS.filter(function (x) { return x.id !== b.id; }).slice(0, 3);
  var incl = b.bundle ? '<section class="sh-sec"><h2>What\u2019s in the bundle</h2><div class="sh-incl">' + BOOKS.map(function (x) { return '<a href="product.html?id=' + x.id + '">' + cover(x) + '<span>' + esc(x.title) + '</span></a>'; }).join("") + '</div></section>' : "";
  root.innerHTML =
    '<div class="sh-crumbs"><a href="index.html">Home</a><span>/</span><a href="shop.html">Shop</a><span>/</span><span>' + esc(b.title) + '</span></div>' +
    '<div class="sh-pd"><div class="sh-pd-media">' + cover(b) + '</div>' +
    '<div class="sh-pd-info"><span class="sh-cat">' + b.category + '</span><h1>' + esc(b.title) + '</h1><p class="sh-pd-sub">' + esc(b.subtitle) + '</p><p class="sh-by">By <b>' + CFG.brand + '</b></p>' +
    '<ul class="sh-facts">' + facts.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join("") + '</ul><hr>' + priceHTML(b) + '<p class="sh-tax">Inclusive of all taxes</p><hr>' +
    '<h4 style="font-family:var(--font-body);font-size:17px">What you\u2019ll get</h4><ul class="sh-learn">' + b.learn.slice(0, 4).map(function (l) { return '<li>' + esc(l) + '</li>'; }).join("") + '</ul></div>' +
    '<aside class="sh-buybox">' + priceHTML(b) + '<p class="sh-stock">Instant digital download</p>' +
    '<button type="button" class="sh-btn sh-btn-primary sh-btn-block" data-buy="' + b.id + '">Buy now</button><button type="button" class="sh-btn sh-btn-block" data-add="' + b.id + '">Add to cart</button>' +
    '<ul class="sh-tick"><li>Download link sent to your email after payment</li><li>Secure payment via Razorpay (UPI, cards, netbanking, wallets)</li><li>Need help? Chat with us on WhatsApp</li></ul></aside></div>' +
    '<section class="sh-sec"><h2>About this e-book</h2>' + b.about.map(function (p) { return '<p class="sh-body">' + esc(p) + '</p>'; }).join("") + '<ul class="sh-learn" style="max-width:70ch">' + b.learn.map(function (l) { return '<li>' + esc(l) + '</li>'; }).join("") + '</ul></section>' + incl +
    '<section class="sh-sec"><h2>Table of contents</h2><div class="sh-acc">' + b.toc.map(function (t, i) { return '<details><summary><span><span class="sh-ch">' + String(i + 1).padStart(2, "0") + '</span>' + esc(t[0]) + '</span></summary><p>' + esc(t[1]) + '</p></details>'; }).join("") + '</div></section>' +
    '<section class="sh-sec"><h2>Product details</h2><table class="sh-table">' + rows.map(function (r) { return '<tr><th>' + r[0] + '</th><td>' + esc(r[1]) + '</td></tr>'; }).join("") + '</table></section>' +
    '<section class="sh-sec"><h2>Questions</h2><div class="sh-acc">' + FAQ.map(function (f) { return '<details><summary>' + f[0] + '</summary><p>' + f[1] + '</p></details>'; }).join("") + '</div></section>' +
    (b.bundle ? "" : '<section class="sh-sec"><h2>Save more with the bundle</h2><p class="sh-body">Get all six e-books for ' + fmt(BUNDLE.price) + ' (worth ' + fmt(BUNDLE.mrp) + ' if bought separately).</p><a class="sh-btn" href="product.html?id=' + BUNDLE.id + '">View the Complete Library</a></section>') +
    '<section class="sh-sec"><h2>You may also like</h2><div class="sh-related">' + related.map(cardHTML).join("") + '</div></section>' +
    '<div class="sh-bar">' + priceHTML(b) + '<button type="button" class="sh-btn sh-btn-primary" data-buy="' + b.id + '">Buy now</button></div>';
  document.body.classList.add("sh-has-bar");
  renderCart();
}

/* ---------------- CHECKOUT ---------------- */
var coupon = ""; try { coupon = sessionStorage.getItem("gp_coupon") || ""; } catch (e) {}
function closeModal() { var m = $(".sh-modal"); if (m) m.classList.remove("is-open"); }
function modal(html) {
  var m = $(".sh-modal");
  if (!m) { document.body.insertAdjacentHTML("beforeend", '<div class="sh-modal"><div class="sh-modal-card"></div></div>'); m = $(".sh-modal"); m.addEventListener("click", function (e) { if (e.target === m) closeModal(); }); }
  $(".sh-modal-card", m).innerHTML = html; m.classList.add("is-open");
}
function renderCheckout() {
  var root = $("#sh-checkout"), c = getCart();
  if (!c.length) { root.innerHTML = '<div class="sh-center"><h2>Your cart is empty</h2><p>Add an e-book to get started.</p><a class="sh-btn sh-btn-primary" href="shop.html">Browse e-books</a></div>'; return; }
  function draw() {
    var t = totals(getCart(), coupon);
    $("#co-lines").innerHTML = t.items.map(function (b) { return '<div class="sh-line">' + cover(b) + '<div><b>' + esc(b.title) + '</b><span>' + (b.bundle ? "6 e-books" : "PDF e-book") + '</span><br><button type="button" class="sh-rm" data-remove="' + b.id + '">Remove</button></div><b>' + fmt(b.price) + '</b></div>'; }).join("");
    $("#co-totals").innerHTML = '<div class="sh-sum"><span>Subtotal</span><span>' + fmt(t.sub) + '</span></div>' +
      (t.save > 0 ? '<div class="sh-sum is-save"><span>Bundle &amp; offer savings</span><span>' + fmt(t.save) + '</span></div>' : '') +
      (t.disc ? '<div class="sh-sum is-save"><span>Coupon ' + esc(coupon) + '</span><span>\u2212' + fmt(t.disc) + '</span></div>' : '') +
      '<div class="sh-sum is-total"><span>Total</span><span>' + fmt(t.total) + '</span></div><p class="sh-tax">Inclusive of all taxes</p>';
    $("#co-pay").textContent = "Pay " + fmt(t.total) + " securely";
  }
  root.innerHTML = '<div class="sh-co"><form id="co-form" novalidate><div class="sh-panel"><h3><span class="sh-step">1</span>Your details</h3>' +
    '<p class="sh-tax" style="margin:-8px 0 20px">Your e-book download link will be sent to this email.</p>' +
    '<div class="field"><label for="co-name">Full name</label><input id="co-name" name="name" autocomplete="name" required></div>' +
    '<div class="form-row"><div class="field"><label for="co-email">Email</label><input id="co-email" name="email" type="email" autocomplete="email" required></div>' +
    '<div class="field"><label for="co-phone">Mobile number</label><input id="co-phone" name="phone" type="tel" autocomplete="tel" inputmode="numeric" pattern="[0-9+ ]{10,14}" required></div></div></div>' +
    '<div class="sh-panel"><h3><span class="sh-step">2</span>Payment</h3><p style="color:var(--ink-soft);font-size:15px;line-height:1.6;margin-bottom:18px">You\u2019ll pay on Razorpay\u2019s secure page using UPI, card, netbanking or wallet.</p>' +
    '<label class="sh-agree"><input type="checkbox" id="co-agree" required><span>I agree to the <a href="policies.html#terms" target="_blank">Terms</a>, <a href="policies.html#refunds" target="_blank">Refund Policy</a> and <a href="policies.html#privacy" target="_blank">Privacy Policy</a>.</span></label>' +
    '<button type="submit" class="sh-btn sh-btn-primary sh-btn-block" id="co-pay" style="padding:16px;font-size:16px">Pay</button>' +
    '<p class="sh-secure"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>256-bit encrypted \u00B7 Powered by Razorpay</p></div></form>' +
    '<aside class="sh-summary"><h3>Order summary</h3><div id="co-lines"></div>' +
    '<div class="sh-coupon"><input id="co-code" placeholder="Coupon code" value="' + esc(coupon) + '" aria-label="Coupon code"><button type="button" class="sh-btn" id="co-apply">Apply</button></div><p class="sh-msg" id="co-msg" role="status"></p><div id="co-totals"></div></aside></div>';
  draw();
  $("#co-apply").addEventListener("click", function () {
    var code = $("#co-code").value.trim().toUpperCase(), m = $("#co-msg");
    if (!code) { coupon = ""; try { sessionStorage.removeItem("gp_coupon"); } catch (e) {} m.textContent = ""; draw(); return; }
    if (CFG.coupons[code]) { coupon = code; try { sessionStorage.setItem("gp_coupon", code); } catch (e) {} m.className = "sh-msg ok"; m.textContent = "Coupon applied."; }
    else { coupon = ""; m.className = "sh-msg err"; m.textContent = "That code isn\u2019t valid."; }
    draw();
  });
  document.addEventListener("gp-cart", function () { if (!$("#co-lines")) return; if (!getCart().length) renderCheckout(); else draw(); });
  $("#co-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = e.target;
    if (!f.checkValidity()) { f.reportValidity(); return; }
    var t = totals(getCart(), coupon);
    startPayment({ items: getCart(), coupon: coupon, total: t.total, lines: t.items, customer: { name: $("#co-name").value.trim(), email: $("#co-email").value.trim(), phone: $("#co-phone").value.trim() } });
  });
}

/* ---------------- PAYMENT (Razorpay) ---------------- */
function loadRzp() {
  return new Promise(function (res, rej) {
    if (window.Razorpay) return res();
    var s = document.createElement("script"); s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = res; s.onerror = function () { rej(new Error("Could not load Razorpay")); }; document.head.appendChild(s);
  });
}
function waFallback(o) {
  var msg = "Hi " + CFG.brand + ", I'd like to buy:\n" + o.lines.map(function (b) { return "- " + b.title + " (" + fmt(b.price) + ")"; }).join("\n") + "\nTotal: " + fmt(o.total) + (o.coupon ? " (coupon " + o.coupon + ")" : "") + "\nName: " + o.customer.name + "\nEmail: " + o.customer.email + "\nPhone: " + o.customer.phone;
  modal('<h3>Online payment is almost live</h3><p>Card and UPI checkout isn\u2019t switched on yet. You can complete your order on WhatsApp and we\u2019ll send your e-book right away.</p>' +
    '<a class="sh-btn sh-btn-primary sh-btn-block" target="_blank" rel="noopener" href="https://wa.me/' + CFG.whatsapp + '?text=' + encodeURIComponent(msg) + '">Order on WhatsApp</a><button type="button" class="sh-btn sh-btn-block" onclick="this.closest(\'.sh-modal\').classList.remove(\'is-open\')">Close</button>');
}
function startPayment(o) {
  var R = CFG.razorpay, btn = $("#co-pay");
  if (!R.keyId || !R.createOrderUrl || !R.verifyUrl) { waFallback(o); return; }
  var label = btn.textContent; btn.disabled = true; btn.textContent = "Starting secure payment\u2026";
  var reset = function () { btn.disabled = false; btn.textContent = label; };
  loadRzp().then(function () {
    return fetch(R.createOrderUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: o.items, coupon: o.coupon, customer: o.customer }) });
  }).then(function (r) { if (!r.ok) throw new Error("order"); return r.json(); }).then(function (d) {
    var rz = new window.Razorpay({
      key: R.keyId, amount: d.amount, currency: d.currency || "INR", order_id: d.orderId,
      name: CFG.brand, description: o.lines.map(function (b) { return b.title; }).join(", ").slice(0, 250),
      prefill: { name: o.customer.name, email: o.customer.email, contact: o.customer.phone }, theme: { color: "#e2233a" },
      modal: { ondismiss: reset },
      handler: function (resp) {
        btn.textContent = "Confirming payment\u2026";
        fetch(R.verifyUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(resp) })
          .then(function (r) { return r.json(); })
          .then(function (v) { if (v && v.ok) success(o, v.orderRef || resp.razorpay_payment_id); else throw new Error("verify"); })
          .catch(function () { modal('<h3>We\u2019re confirming your payment</h3><p>If money was deducted, don\u2019t pay again. Email ' + CFG.support + ' with your payment ID <b>' + esc(resp.razorpay_payment_id || "") + '</b> and we\u2019ll deliver your e-book.</p><button type="button" class="sh-btn sh-btn-block" onclick="this.closest(\'.sh-modal\').classList.remove(\'is-open\')">OK</button>'); reset(); });
      }
    });
    rz.on("payment.failed", function () { toast("Payment failed. Please try again."); reset(); });
    rz.open();
  }).catch(function () { toast("Couldn\u2019t start payment. Please try again."); reset(); });
}
function success(o, ref) {
  setCart([]); try { sessionStorage.removeItem("gp_coupon"); } catch (e) {}
  $("#sh-checkout").innerHTML = '<div class="sh-center"><div class="sh-ok-ico">' + ICON.check + '</div><h2>Payment received</h2><p>Thank you, <b>' + esc(o.customer.name) + '</b>. Your download link is on its way to <b>' + esc(o.customer.email) + '</b>. Check your spam folder if you don\u2019t see it in a few minutes.</p><p class="sh-tax">Reference: ' + esc(ref) + '</p><a class="sh-btn sh-btn-primary" href="shop.html">Continue shopping</a></div>';
  window.scrollTo(0, 0);
}

/* ---------------- boot ---------------- */
function boot() {
  buildShell(); bindGlobal();
  var page = document.body.getAttribute("data-page");
  if (page === "shop") renderShop();
  if (page === "product") renderProduct();
  if (page === "checkout") renderCheckout();
  renderCart();
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
