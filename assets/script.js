/* =========================================================
   Glyphic Palette — shared behavior
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initHeroVideoFit();
  initWorkVortexReel();
  initServicePhones();
  initTestimonials();
  initFAQ();
  initContactForm();
  initFounderReveal();
  initWelcomeModal();
  requestAnimationFrame(() => {
    document.querySelectorAll(".hero").forEach(h => h.classList.add("is-ready"));
  });
});

/* ---------- Nav ---------- */
function initNav(){
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav-toggle");
  const panel = document.querySelector(".nav-panel");
  const closeBtn = document.querySelector(".nav-panel-close");
  const backdrop = document.querySelector(".nav-backdrop");
  if(!nav) return;

  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if(!toggle || !panel) return;

  function openMenu(){
    panel.classList.add("is-open");
    backdrop && backdrop.classList.add("is-open");
    toggle.classList.add("is-active");
    toggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("nav-lock");
  }
  function closeMenu(){
    panel.classList.remove("is-open");
    backdrop && backdrop.classList.remove("is-open");
    toggle.classList.remove("is-active");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-lock");
  }
  function toggleMenu(){
    panel.classList.contains("is-open") ? closeMenu() : openMenu();
  }

  toggle.addEventListener("click", toggleMenu);
  closeBtn && closeBtn.addEventListener("click", closeMenu);
  backdrop && backdrop.addEventListener("click", closeMenu);

  panel.querySelectorAll(".nav-links-list a").forEach(a =>
    a.addEventListener("click", closeMenu)
  );

  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape" && panel.classList.contains("is-open")) closeMenu();
  });

  // If the viewport grows back past the mobile breakpoint while the
  // panel is open (e.g. rotating a tablet), close it so it doesn't
  // get stuck open behind the desktop layout.
  window.addEventListener("resize", () => {
    if(window.innerWidth > 860 && panel.classList.contains("is-open")) closeMenu();
  });
}

/* ---------- Hero video: shape the frame to match the actual clip ----------
   Rather than forcing every clip into a fixed 4:3 (desktop) / 9:16
   (mobile) box — which either crops the footage (object-fit: cover) or
   leaves black bars (object-fit: contain) — this reads the clip's own
   width/height once its metadata loads and sets the frame's
   aspect-ratio to match exactly. object-fit: cover then fills the
   frame completely with zero cropping, because the frame is the same
   shape as the footage. Runs again on resize in case a responsive
   layout swaps in a different video element. */
function initHeroVideoFit(){
  const frame = document.querySelector(".hero-video-frame");
  const video = frame && frame.querySelector("video");
  if(!frame || !video) return;

  function applyRatio(){
    if(video.videoWidth && video.videoHeight){
      frame.style.aspectRatio = `${video.videoWidth} / ${video.videoHeight}`;
    }
  }

  if(video.readyState >= 1) applyRatio();
  video.addEventListener("loadedmetadata", applyRatio);
}

function shortestOffset(idx, from, n){
  let diff = (idx - from) % n;
  if(diff > n / 2) diff -= n;
  if(diff < -n / 2) diff += n;
  return diff;
}

/* ---------- Featured Work: pinned horizontal scroll gallery ----------
   Powered by GSAP + ScrollTrigger (loaded in index.html before this
   file). The whole caption block (.vortex-pin) gets pinned in place
   while .vortex-track slides sideways 1:1 with the scroll — scroll
   down to move forward through the reel, scroll up to reverse, stop
   scrolling and it holds exactly where it is. Cards scale/fade/blur
   based on distance from the centre of the stage as they pass through.
   Dots/arrows smooth-scroll the page to the right point in the pin.
   If GSAP/ScrollTrigger didn't load (offline dev, blocked CDN, etc.)
   or the visitor has reduced motion on, it falls back to a plain
   native horizontal scroll-snap strip — always usable, never "broken". */
function initWorkVortexReel(){
  const stage = document.querySelector('[data-vortex-stage="work"]');
  const pinTarget = document.querySelector(".vortex-pin");
  if(!stage || !pinTarget) return;

  const items = WORK_ITEMS;
  const N = items.length;
  if(!N) return;

  const captionTitleEl = document.querySelector('[data-vortex-title="work"]');
  const captionDescEl = document.querySelector('[data-vortex-desc="work"]');
  const dotsEl = document.querySelector('[data-vortex-dots="work"]');
  const prevBtn = document.querySelector('[data-vortex-prev="work"]');
  const nextBtn = document.querySelector('[data-vortex-next="work"]');
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const track = document.createElement("div");
  track.className = "vortex-track";
  stage.appendChild(track);

  let goTo = () => {}; // reassigned below once we know which mode (GSAP or fallback) is active

  const cards = items.map((item, i) => {
    const card = document.createElement("div");
    card.className = "vortex-card";
    card.innerHTML = `
      <video muted autoplay loop playsinline preload="none">
        <source src="${item.video}" type="video/mp4">
      </video>
      <span class="vortex-card-tag">${item.tag || item.name}</span>`;
    card.addEventListener("click", () => goTo(i));
    track.appendChild(card);
    return card;
  });

  let dots = [];
  if(dotsEl){
    items.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.setAttribute("aria-label", `Show ${items[i].name}`);
      dot.addEventListener("click", () => goTo(i));
      dotsEl.appendChild(dot);
    });
    dots = Array.from(dotsEl.children);
  }

  let current = 0;
  function renderCaption(idx){
    current = idx;
    const item = items[idx];
    if(captionTitleEl) captionTitleEl.textContent = item.name;
    if(captionDescEl) captionDescEl.textContent = item.desc || "";
    dots.forEach((d, i) => d.classList.toggle("is-active", i === idx));
    cards.forEach((c, i) => c.classList.toggle("is-center", i === idx));
  }
  renderCaption(0);

  const hasGSAP = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";

  if(!hasGSAP || reduceMotion){
    initFallback();
    return;
  }

  initScrollGallery();

  /* ---- primary: GSAP ScrollTrigger pinned gallery ---- */
  function initScrollGallery(){
    gsap.registerPlugin(ScrollTrigger);

    function scrollDistance(){
      return Math.max(0, track.scrollWidth - stage.clientWidth);
    }

    let st = null;

    function build(){
      if(st){ st.kill(); st = null; }
      gsap.set(track, { x: 0 });

      // Guard: if the stage hasn't been laid out yet (0 width — can
      // happen on first paint, tab restore, or while fonts/webfonts
      // are still swapping and reflowing the page), retry on the next
      // frame instead of pinning against a bogus 0-length track. This
      // is what caused the reel to sometimes render "broken" — collapsed
      // or overlapping cards — depending on load timing/screen size.
      if(stage.clientWidth === 0){
        requestAnimationFrame(build);
        return;
      }

      const dist = scrollDistance();
      if(dist <= 0){
        // Not enough cards to overflow the stage at this width — just
        // keep everything centred and skip pinning entirely.
        updateEmphasis();
        return;
      }
      const tween = gsap.to(track, { x: () => -scrollDistance(), ease: "none" });
      st = ScrollTrigger.create({
        trigger: pinTarget,
        start: "top top+=80",
        end: () => "+=" + (scrollDistance() + window.innerHeight * 0.4),
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        animation: tween,
        onUpdate(self){
          updateEmphasis();
          const idx = Math.max(0, Math.min(N - 1, Math.round(self.progress * (N - 1))));
          if(idx !== current) renderCaption(idx);
        },
      });
    }

    function updateEmphasis(){
      const stageRect = stage.getBoundingClientRect();
      const centerX = stageRect.left + stageRect.width / 2;
      cards.forEach(card => {
        const r = card.getBoundingClientRect();
        const dist = Math.abs((r.left + r.width / 2) - centerX) / (stageRect.width / 2 || 1);
        const scale = Math.max(0.72, 1 - dist * 0.34);
        const op = Math.max(0.28, 1 - dist * 0.85);
        const blur = Math.min(4, dist * 3.2);
        card.style.transform = `scale(${scale.toFixed(3)})`;
        card.style.opacity = op.toFixed(2);
        card.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : "none";

        const video = card.querySelector("video");
        if(op > 0.5){
          if(video.preload !== "auto"){ video.preload = "auto"; video.load(); }
          video.play().catch(() => {});
        }else if(!video.paused){
          video.pause();
        }
      });
    }

    function goToImpl(idx){
      idx = Math.max(0, Math.min(N - 1, idx));
      if(!st){ renderCaption(idx); return; }
      const progress = N > 1 ? idx / (N - 1) : 0;
      const target = st.start + progress * (st.end - st.start);
      window.scrollTo({ top: target, behavior: "smooth" });
    }
    goTo = goToImpl;

    prevBtn && prevBtn.addEventListener("click", () => goTo(current - 1));
    nextBtn && nextBtn.addEventListener("click", () => goTo(current + 1));

    build();
    updateEmphasis();

    // Only rebuild on real width changes — mobile browsers fire resize
    // when the URL bar hides/shows (height-only), which used to
    // retrigger the whole pin calculation and could leave the reel in
    // a half-built state.
    let resizeTimer = null;
    let lastWidth = window.innerWidth;
    window.addEventListener("resize", () => {
      if(window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(build, 200);
    });

    // Re-measure once webfonts and the full page (images/videos) have
    // settled, since either can silently shift layout after the first
    // build and leave ScrollTrigger's cached distances stale.
    window.addEventListener("load", () => ScrollTrigger.refresh());
    if(document.fonts && document.fonts.ready){
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
  }

  /* ---- fallback: plain native horizontal scroll-snap ---- */
  function initFallback(){
    stage.classList.add("is-fallback");

    function nearestIndex(){
      const stageRect = stage.getBoundingClientRect();
      const centerX = stageRect.left + stageRect.width / 2;
      let closest = 0, closestDist = Infinity;
      cards.forEach((c, i) => {
        const r = c.getBoundingClientRect();
        const d = Math.abs((r.left + r.width / 2) - centerX);
        if(d < closestDist){ closestDist = d; closest = i; }
      });
      return closest;
    }

    function goToImpl(idx){
      idx = Math.max(0, Math.min(N - 1, idx));
      cards[idx].scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", inline: "center", block: "nearest" });
    }
    goTo = goToImpl;

    let ticking = false;
    stage.addEventListener("scroll", () => {
      if(ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const idx = nearestIndex();
        if(idx !== current) renderCaption(idx);
      });
    }, { passive: true });

    prevBtn && prevBtn.addEventListener("click", () => goTo(current - 1));
    nextBtn && nextBtn.addEventListener("click", () => goTo(current + 1));
  }
}

/* ---------- Featured Work vortex reel ----------
   One card per project. `tag` is the small label shown on the card
   itself; `desc` is the longer line shown in the caption under the
   reel. Point `video` at your own clip in assets/videos/. */
const WORK_ITEMS = [
  { name: "Zero Grease — Brand Film",    tag: "Zero Grease — Brand Film",    desc: "A full identity and launch film for a D2C skincare label.", video: "assets/videos/work-1.mp4" },
  { name: "Ledger — Product Walkthrough", tag: "Ledger — Product Walkthrough", desc: "Motion-led product explainer for a CA-firm client portal.", video: "assets/videos/work-2.mp4" },
  { name: "Northside Kitchens — Site",    tag: "Northside Kitchens — Site",    desc: "Menu-first website and ordering flow for a local restaurant group.", video: "assets/videos/work-3.mp4" },
  { name: "Solstice Fitness — Campaign",  tag: "Solstice Fitness — Campaign",  desc: "Paid social creative for a studio's membership push.", video: "assets/videos/work-4.mp4" },
  { name: "Marrow Coffee — Identity",     tag: "Marrow Coffee — Identity",     desc: "Naming, packaging, and shopfront system for a roastery.", video: "assets/videos/work-5.mp4" },
  { name: "Vantage Realty — Web App",     tag: "Vantage Realty — Web App",     desc: "Custom listings and enquiry tool built for a brokerage.", video: "assets/videos/work-6.mp4" },
];

/* ---------- What We Do vortex reel ----------
   Same engine, driven by the service tabs instead of dots/arrows. */
const SERVICE_ITEMS = [
  { name: "Brand Identity & Strategy", color: "#e2233a", desc: "Positioning, naming, and visual systems that make a brand instantly recognizable.", video: "assets/videos/brand-identity.mp4" },
  { name: "Social Media Marketing",   color: "#ff7849", desc: "Content calendars and community management that keep a brand part of the conversation.", video: "assets/videos/social-media.mp4" },
  { name: "Paid Advertising",         color: "#ff4757", desc: "Performance campaigns across Meta, Google, and search, built to hit a number.", video: "assets/videos/paid-advertising.mp4" },
  { name: "Content Marketing",        color: "#c81c33", desc: "Blogs, case studies, and video that earn attention on their own merit.", video: "assets/videos/content-marketing.mp4" },
  { name: "Web Design & Dev",         color: "#a11d2e", desc: "Fast, distinctive sites built to convert visitors into customers.", video: "assets/videos/web-design.mp4" },
  { name: "SEO & Search",             color: "#7f0f22", desc: "Technical and content SEO that gets a business found by people already looking.", video: "assets/videos/seo-search.mp4" },
];

function initServicePhones(){
  const tabsEl = document.querySelector(".service-tabs");
  const stage = document.querySelector(".phone-stage");
  if(!tabsEl || !stage) return;

  const capName = document.querySelector("[data-phones-name]");
  const capDesc = document.querySelector("[data-phones-desc]");
  const N = SERVICE_ITEMS.length;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const AUTOPLAY_MS = 4600;
  let current = 0;
  let timer = null;

  SERVICE_ITEMS.forEach((s, i) => {
    const btn = document.createElement("button");
    btn.className = "service-tab";
    btn.setAttribute("role", "tab");
    btn.style.setProperty("--tab-color", s.color);
    btn.innerHTML = `<span class="num">0${i + 1}</span>${s.name}<span class="progress"></span>`;
    btn.addEventListener("click", () => goTo(i, true));
    tabsEl.appendChild(btn);
  });
  const tabs = Array.from(tabsEl.children);

  const orbs = SERVICE_ITEMS.map((s, i) => {
    const orb = document.createElement("div");
    orb.className = "phone-orb";
    orb.innerHTML = `
      <div class="phone">
        <div class="phone-notch"></div>
        <div class="phone-screen">
          <video muted autoplay loop playsinline preload="none">
            <source src="${s.video}" type="video/mp4">
          </video>
          <span class="phone-caption-label">${s.name}</span>
        </div>
      </div>`;
    orb.addEventListener("click", () => {
      if(shortestOffset(i, current, N) !== 0) goTo(i, true);
    });
    stage.appendChild(orb);
    return orb;
  });

  function layout(){
    const spacing = parseFloat(getComputedStyle(stage).getPropertyValue("--spacing")) || 0;
    orbs.forEach((orb, i) => {
      const offset = shortestOffset(i, current, N);
      const abs = Math.abs(offset);
      const x = offset * spacing;
      const scale = Math.max(0.62, 1 - abs * 0.24);
      const op = abs === 0 ? 1 : abs === 1 ? 0.55 : 0;
      const blur = abs === 0 ? 0 : 0.5;
      const sat = abs === 0 ? 1 : 0.7;

      orb.style.setProperty("--x", `${x.toFixed(1)}px`);
      orb.style.setProperty("--scale", scale.toFixed(3));
      orb.style.setProperty("--op", op.toFixed(2));
      orb.style.setProperty("--blur", `${blur}px`);
      orb.style.setProperty("--sat", sat.toFixed(2));
      orb.style.zIndex = String(20 - abs * 5);
      orb.classList.toggle("is-center", abs === 0);
      orb.classList.toggle("is-far", abs > 1);

      const video = orb.querySelector("video");
      if(abs === 0){
        if(video.preload !== "auto"){ video.preload = "auto"; video.load(); }
        video.play().catch(() => {});
      }else if(!video.paused){
        video.pause();
      }
    });
  }

  function render(){
    layout();
    tabs.forEach((tab, i) => {
      tab.classList.toggle("is-active", i === current);
      const prog = tab.querySelector(".progress");
      if(!prog) return;
      if(i === current){
        prog.style.transition = "none";
        prog.style.width = "0%";
        requestAnimationFrame(() => {
          prog.style.transition = `width ${AUTOPLAY_MS}ms linear`;
          prog.style.width = "100%";
        });
      }else{
        prog.style.transition = "none";
        prog.style.width = "0%";
      }
    });
    if(capName) capName.textContent = SERVICE_ITEMS[current].name;
    if(capDesc) capDesc.textContent = SERVICE_ITEMS[current].desc;
    stage.style.setProperty("--glow-color", hexToRgba(SERVICE_ITEMS[current].color, 0.22));
  }

  function hexToRgba(hex, a){
    const v = hex.replace("#", "");
    const r = parseInt(v.substring(0, 2), 16), g = parseInt(v.substring(2, 4), 16), b = parseInt(v.substring(4, 6), 16);
    return `rgba(${r},${g},${b},${a})`;
  }

  function goTo(idx, userInitiated){
    current = ((idx % N) + N) % N;
    render();
    if(userInitiated) resetAutoplay();
  }
  function next(){ goTo(current + 1); }
  function resetAutoplay(){
    clearInterval(timer);
    if(!reduceMotion) timer = setInterval(next, AUTOPLAY_MS);
  }

  window.addEventListener("resize", layout);
  render();
  resetAutoplay();
}

/* ---------- Testimonials: two-row auto-scrolling "wall of love" ----------
   20 placeholder quotes, split evenly across two rows. Each row's
   content is rendered once, then duplicated back-to-back inside its
   .wall-track — that's what makes the CSS animation (translateX(0) to
   translateX(-50%)) loop seamlessly forever, since the second half is
   an exact copy of the first. Row A drifts left, row B drifts right
   (via animation-direction: reverse), and either row pauses on
   hover/focus. Swap these for real client quotes whenever you have them. */
const TESTIMONIALS = [
  { quote: "Our enquiries doubled within six weeks of the new site going live.", name: "Anaya R.", role: "Owner, fashion label" },
  { quote: "They didn't just design a logo — they gave us a whole visual language.", name: "Rohit S.", role: "Founder, skincare brand" },
  { quote: "Every round of feedback came back the same day. Genuinely fast.", name: "Priya N.", role: "Marketing Lead, ed-tech startup" },
  { quote: "Ads that don't feel like ads. Our click-through rate tripled.", name: "Karan M.", role: "Co-founder, fitness studio" },
  { quote: "The team understood our customers better than we did.", name: "Meera J.", role: "Director, home decor store" },
  { quote: "Worth every rupee — the brand finally looks like the business we run.", name: "Suresh K.", role: "Owner, auto dealership" },
  { quote: "Our Instagram went from ignored to actually driving bookings.", name: "Divya T.", role: "Manager, salon chain" },
  { quote: "They handled strategy, design, and ads without a single handoff.", name: "Arjun P.", role: "Partner, CA firm" },
  { quote: "Organic search traffic overtook paid traffic in under four months.", name: "Neha D.", role: "Founder, spice export business" },
  { quote: "The new menu design alone lifted our average order value.", name: "Ramesh V.", role: "Owner, restaurant group" },
  { quote: "Clear communication, no jargon, just results we could measure.", name: "Farah A.", role: "Operations Head, logistics company" },
  { quote: "They rebuilt trust in our brand after a rough rebrand elsewhere.", name: "Vikram S.", role: "CEO, jewelry house" },
  { quote: "Our booking page conversion rate nearly doubled.", name: "Sana I.", role: "Founder, travel agency" },
  { quote: "Content finally sounds like us, not like a template.", name: "Aditya G.", role: "Marketing Manager, bakery chain" },
  { quote: "They caught details in our industry most agencies miss.", name: "Lakshmi R.", role: "Director, dental clinic" },
  { quote: "The web app just works. No more spreadsheet chaos for bookings.", name: "Imran H.", role: "Owner, real-estate brokerage" },
  { quote: "Paid social finally has a strategy behind it, not just spend.", name: "Tanvi B.", role: "Growth Lead, coffee roastery" },
  { quote: "They made our story easy for people to actually donate to.", name: "Ritu C.", role: "Program Director, nonprofit" },
  { quote: "Design sprints kept us moving without endless revision loops.", name: "Devika L.", role: "Product Lead, SaaS startup" },
  { quote: "Footfall noticeably picked up after the local SEO push.", name: "Harish Y.", role: "Owner, retail chain" },
];

function initTestimonials(){
  const wall = document.querySelector("[data-wall]");
  const trackA = document.querySelector('[data-wall-track="a"]');
  const trackB = document.querySelector('[data-wall-track="b"]');
  if(!wall || !trackA || !trackB) return;

  const mid = Math.ceil(TESTIMONIALS.length / 2);
  const rowA = TESTIMONIALS.slice(0, mid);
  const rowB = TESTIMONIALS.slice(mid);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function cardHTML(t){
    return `
      <div class="wall-card">
        <p class="wall-quote">${t.quote}</p>
        <div class="wall-who">
          <div class="wall-avatar">${t.name.charAt(0)}</div>
          <div>
            <p class="wall-name">${t.name}</p>
            <p class="wall-role">${t.role}</p>
          </div>
        </div>
      </div>`;
  }

  function fillRow(track, items){
    const html = items.map(cardHTML).join("");
    // Duplicated once so the 0%→-50% keyframe loops with no visible seam.
    track.innerHTML = reduceMotion ? html : html + html;
  }

  fillRow(trackA, rowA);
  fillRow(trackB, rowB);
  if(reduceMotion) wall.classList.add("is-static");
}

/* ---------- FAQ accordion ---------- */
function initFAQ(){
  document.querySelectorAll(".faq-item").forEach(item => {
    const q = item.querySelector(".faq-q");
    const a = item.querySelector(".faq-a");
    q.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");
      item.closest(".faq-list").querySelectorAll(".faq-item").forEach(other => {
        other.classList.remove("is-open");
        other.querySelector(".faq-a").style.maxHeight = null;
      });
      if(!isOpen){
        item.classList.add("is-open");
        a.style.maxHeight = a.scrollHeight + "px";
      }
    });
  });
}

/* ---------- Scroll reveal: founder section + generic [data-animate] blocks ----------
   One shared observer. The founder section uses its own [data-reveal="left|right"]
   attributes (bespoke slide-in either side); every other section on the site
   opts in with [data-animate="fade-up|zoom-in|fade-left|fade-right"] and picks
   up the matching entrance defined in style.css. Both just get an "is-in"
   class added the first time they cross into view — cheap, one-shot, no
   layout thrashing. */
function initFounderReveal(){
  const els = document.querySelectorAll("[data-reveal], [data-animate]");
  if(!els.length) return;

  if(!("IntersectionObserver" in window)){
    els.forEach(el => el.classList.add("is-in"));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2, rootMargin: "0px 0px -60px 0px" });

  els.forEach(el => io.observe(el));
}

/* ---------- Welcome pop-up ----------
   Shows once per browser tab session (sessionStorage-gated) shortly after
   the home page finishes loading — a personal note from the founder, not
   a hard paywall-style interruption. Closes via the × button, the
   "Continue exploring" link, a backdrop click, or Escape. */
function initWelcomeModal(){
  const backdrop = document.getElementById("welcome-backdrop");
  const modal = document.getElementById("welcome-modal");
  if(!backdrop || !modal) return;

  const closeBtn = document.getElementById("welcome-modal-close");
  const dismissBtn = document.getElementById("welcome-modal-dismiss");
  const STORAGE_KEY = "gp_welcome_shown";

  function openModal(){
    backdrop.classList.add("is-open");
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("nav-lock");
  }
  function closeModal(){
    backdrop.classList.remove("is-open");
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("nav-lock");
    try{ sessionStorage.setItem(STORAGE_KEY, "1"); }catch(e){}
  }

  closeBtn && closeBtn.addEventListener("click", closeModal);
  dismissBtn && dismissBtn.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });

  let alreadyShown = false;
  try{ alreadyShown = sessionStorage.getItem(STORAGE_KEY) === "1"; }catch(e){}
  if(!alreadyShown){
    setTimeout(openModal, 900);
  }
}

/* ---------- Contact form ----------
   Wired for EmailJS. Add your own public key / service ID / template ID
   below (see https://www.emailjs.com/docs/) to send submissions to your inbox.
   Until configured, the form validates and shows a confirmation locally. */
function initContactForm(){
  const form = document.querySelector("#contact-form");
  if(!form) return;
  const status = form.querySelector(".form-status");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if(!form.checkValidity()){
      form.reportValidity();
      return;
    }

    // --- EmailJS integration point ---
    // emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", form, "YOUR_PUBLIC_KEY")
    //   .then(() => showStatus("Thanks — we'll be in touch within a day."))
    //   .catch(() => showStatus("Something went wrong. Email us directly instead."));

    showStatus("Thanks — your message is in. We'll reply within a day.");
    form.reset();
  });

  function showStatus(msg){
    status.textContent = msg;
    status.classList.add("is-success");
  }
}