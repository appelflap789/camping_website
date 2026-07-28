/* ============================================================
   Trail & Peak — site scripts
   ------------------------------------------------------------
   LATEST TIKTOKS: open a video on TikTok -> Share -> Copy link,
   then paste the full links below (newest first, max 3).
   Links must be the full form:
   https://www.tiktok.com/@itsmrbearr/video/1234567890123456789
   While this list is empty, the section shows your profile
   embed instead, which always displays your newest videos.
   ============================================================ */

const TIKTOK_VIDEOS = [
  "https://www.tiktok.com/@itsmrbearr/video/7667316069568105761",
  // "https://www.tiktok.com/@itsmrbearr/video/PASTE_VIDEO_ID_HERE",
  // "https://www.tiktok.com/@itsmrbearr/video/PASTE_VIDEO_ID_HERE",
];

const TIKTOK_PROFILE = "https://www.tiktok.com/@itsmrbearr";

/* ---------- Mobile navigation ---------- */

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    navToggle.textContent = navLinks.classList.contains("open") ? "✕" : "☰";
  });
}

/* ---------- Latest TikToks section ---------- */

function videoIdFromUrl(url) {
  const m = url.match(/video\/(\d+)/);
  return m ? m[1] : null;
}

const feed = document.getElementById("tiktok-feed");

if (feed) {
  const ids = TIKTOK_VIDEOS.map(videoIdFromUrl).filter(Boolean).slice(0, 3);

  if (ids.length > 0) {
    ids.forEach((id) => {
      const card = document.createElement("div");
      card.className = "tiktok-card";
      card.innerHTML = `<iframe src="https://www.tiktok.com/embed/v2/${id}"
        allow="autoplay; encrypted-media" allowfullscreen loading="lazy"
        title="TikTok video"></iframe>`;
      feed.appendChild(card);
    });
  } else {
    // No video links configured yet -> profile embed (auto-updates)
    feed.classList.add("tiktok-feed-profile");
    feed.innerHTML = `
      <blockquote class="tiktok-embed" cite="${TIKTOK_PROFILE}"
        data-unique-id="itsmrbearr" data-embed-type="creator"
        style="max-width:780px; min-width:288px;">
        <section><a target="_blank" href="${TIKTOK_PROFILE}">@itsmrbearr</a></section>
      </blockquote>`;
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://www.tiktok.com/embed.js";
    document.body.appendChild(s);
  }
}
