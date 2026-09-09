/* =====================================================
   GLYPHIC PALETTE — BLOG DATA LAYER
   Shared by: index.html (home blog section), blog.html,
   blog-post.html. Uses the SAME Firebase project + collections
   that the admin panel (admin.html) writes to, so anything
   published there appears here instantly.

   IMPORTANT: this config is identical, on purpose, to the one
   in admin.html. If you ever rotate keys, update both places.
===================================================== */
const firebaseConfig = {
  apiKey: "AIzaSyA3BL6qvC6OkcLql_CBBTOCWXSuTuUuunU",
  authDomain: "gp-blog-admin.firebaseapp.com",
  projectId: "gp-blog-admin",
  storageBucket: "gp-blog-admin.firebasestorage.app",
  messagingSenderId: "454725222443",
  appId: "1:454725222443:web:e27f38252a4013824e2a6e",
  measurementId: "G-YB94M7KK2T"
};

if (!firebase.apps || !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const blogDb = firebase.firestore();

/* ---------- fetch helpers ---------- */

/** All published posts, newest first. Cached per page-load. */
let _publishedPostsCache = null;
async function fetchPublishedPosts() {
  if (_publishedPostsCache) return _publishedPostsCache;
  const snap = await blogDb.collection('blogPosts')
    .where('published', '==', true)
    .get();
  const posts = [];
  snap.forEach(doc => posts.push({ id: doc.id, ...doc.data() }));
  // sort client-side (avoids needing a composite index for where+orderBy)
  posts.sort((a, b) => (b.createdAt ? b.createdAt.toMillis() : 0) - (a.createdAt ? a.createdAt.toMillis() : 0));
  _publishedPostsCache = posts;
  return posts;
}

async function fetchPostBySlug(slug) {
  const posts = await fetchPublishedPosts();
  return posts.find(p => p.slug === slug) || null;
}

let _dailyCache = null;
async function fetchPublishedDailyUpdates(limit) {
  if (!_dailyCache) {
    const snap = await blogDb.collection('dailyUpdates')
      .where('published', '==', true)
      .get();
    const updates = [];
    snap.forEach(doc => updates.push({ id: doc.id, ...doc.data() }));
    updates.sort((a, b) => (b.createdAt ? b.createdAt.toMillis() : 0) - (a.createdAt ? a.createdAt.toMillis() : 0));
    _dailyCache = updates;
  }
  return typeof limit === 'number' ? _dailyCache.slice(0, limit) : _dailyCache;
}

/* ---------- formatting helpers ---------- */

function blogFormatDate(ts) {
  if (!ts) return '';
  return ts.toDate().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function blogReadTime(post) {
  const text = (post.content || '').replace(/<[^>]*>/g, ' ');
  const words = text.trim().length ? text.trim().split(/\s+/).filter(Boolean).length : 0;
  return Math.max(1, Math.round(words / 200));
}

function blogCoverImage(post) {
  return post.imageUrl || (post.imageUrls && post.imageUrls[0]) || 'assets/gp_logo.png';
}

function blogEscapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str == null ? '' : String(str);
  return div.innerHTML;
}

/** Renders a single blog card's inner HTML (used by home + listing + related). */
function blogCardHTML(post) {
  const cover = blogCoverImage(post);
  const tag = (post.tags && post.tags[0]) || 'Journal';
  return `
    <a class="blog-card" href="blog-post.html?slug=${encodeURIComponent(post.slug)}">
      <div class="blog-card-img"><img src="${cover}" alt="" loading="lazy"></div>
      <div class="blog-card-body">
        <div class="blog-card-tagrow">
          <span class="blog-card-tag">${blogEscapeHtml(tag)}</span>
          ${post.featured ? '<span class="blog-card-featured">Featured</span>' : ''}
        </div>
        <h3 class="blog-card-title">${blogEscapeHtml(post.title)}</h3>
        <p class="blog-card-excerpt">${blogEscapeHtml(post.excerpt || '')}</p>
        <div class="blog-card-meta">
          <span>${blogFormatDate(post.createdAt)}</span>
          <span class="blog-card-dot">·</span>
          <span>${blogReadTime(post)} min read</span>
        </div>
      </div>
    </a>`;
}