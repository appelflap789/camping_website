/* ============================================================
   Latest TikToks sidebar
   ------------------------------------------------------------
   HOW TO UPDATE: open a video on TikTok -> Share -> Copy link,
   then paste the full links below (newest first, max 3).
   Links must be the full form:
   https://www.tiktok.com/@itsmrbearr/video/1234567890123456789
   ============================================================ */

const TIKTOK_VIDEOS = [
  // "https://www.tiktok.com/@itsmrbearr/video/PASTE_VIDEO_ID_HERE",
  // "https://www.tiktok.com/@itsmrbearr/video/PASTE_VIDEO_ID_HERE",
  // "https://www.tiktok.com/@itsmrbearr/video/PASTE_VIDEO_ID_HERE",
];

const TIKTOK_PROFILE = "https://www.tiktok.com/@itsmrbearr";
const ROTATE_SECONDS = 9; // how long each video stays before sliding to the next

/* ------------------------------------------------------------ */

function videoIdFromUrl(url) {
  const m = url.match(/video\/(\d+)/);
  return m ? m[1] : null;
}

function buildSidebar() {
  const ids = TIKTOK_VIDEOS.map(videoIdFromUrl).filter(Boolean).slice(0, 3);

  const aside = document.createElement("aside");
  aside.className = "tiktok-sidebar";
  aside.innerHTML = `
    <button class="tiktok-toggle" title="Show/hide latest TikToks">🎵</button>
    <div class="tiktok-panel">
      <div class="tiktok-panel-head">
        <span>Latest TikToks</span>
        <a href="${TIKTOK_PROFILE}" target="_blank">@itsmrbearr ↗</a>
      </div>
      <div class="tiktok-slides"></div>
      <div class="tiktok-dots"></div>
    </div>
  `;
  document.body.appendChild(aside);

  const slidesEl = aside.querySelector(".tiktok-slides");
  const dotsEl = aside.querySelector(".tiktok-dots");

  if (ids.length === 0) {
    // No video links configured yet -> show the profile embed instead,
    // which always displays the newest videos automatically.
    slidesEl.innerHTML = `
      <blockquote class="tiktok-embed" cite="${TIKTOK_PROFILE}"
        data-unique-id="itsmrbearr" data-embed-type="creator"
        style="max-width:100%; min-width:280px;">
        <section><a target="_blank" href="${TIKTOK_PROFILE}">@itsmrbearr</a></section>
      </blockquote>`;
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://www.tiktok.com/embed.js";
    document.body.appendChild(s);
    dotsEl.remove();
  } else {
    ids.forEach((id, i) => {
      const slide = document.createElement("div");
      slide.className = "tiktok-slide" + (i === 0 ? " active" : "");
      slide.innerHTML = `<iframe src="https://www.tiktok.com/embed/v2/${id}"
        allow="autoplay; encrypted-media" allowfullscreen loading="lazy"></iframe>`;
      slidesEl.appendChild(slide);

      const dot = document.createElement("button");
      dot.className = "tiktok-dot" + (i === 0 ? " active" : "");
      dot.addEventListener("click", () => show(i, true));
      dotsEl.appendChild(dot);
    });

    let current = 0;
    let timer = null;

    function show(i, manual) {
      current = i;
      slidesEl.querySelectorAll(".tiktok-slide").forEach((el, j) =>
        el.classList.toggle("active", j === i));
      dotsEl.querySelectorAll(".tiktok-dot").forEach((el, j) =>
        el.classList.toggle("active", j === i));
      if (manual) restart();
    }

    function next() {
      show((current + 1) % ids.length);
    }

    function restart() {
      clearInterval(timer);
      timer = setInterval(next, ROTATE_SECONDS * 1000);
    }

    restart();
  }

  // Collapse / expand
  const toggle = aside.querySelector(".tiktok-toggle");
  const stored = localStorage.getItem("tiktokSidebarCollapsed");
  const collapsed = stored === null ? window.innerWidth < 1200 : stored === "1";
  if (collapsed) aside.classList.add("collapsed");
  toggle.addEventListener("click", () => {
    aside.classList.toggle("collapsed");
    localStorage.setItem("tiktokSidebarCollapsed",
      aside.classList.contains("collapsed") ? "1" : "0");
  });
}

document.addEventListener("DOMContentLoaded", buildSidebar);
