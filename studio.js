// studio.js
// AIVO Studio - Basit JS MVP

document.addEventListener("DOMContentLoaded", () => {
  setupPages();
  setupModeToggle();
  setupMusicForm();
  setupCoverGallery();
  setupCreditModal();
});

/* ------------------- */
/*  SAYFA SEKME GEÇİŞİ */
/* ------------------- */

function setupPages() {
  const pageButtons = document.querySelectorAll(".js-page-link");
  const pages = document.querySelectorAll(".page");

  if (!pageButtons.length || !pages.length) return;

  pageButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-target");
      if (!target) return;

      // tab active
      pageButtons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      // page active
      pages.forEach((p) => {
        const pageName = p.getAttribute("data-page");
        p.classList.toggle("is-active", pageName === target);
      });
    });
  });
}

/* ------------------- */
/*  MOD GEÇİŞİ (B/G)   */
/* ------------------- */

function setupModeToggle() {
  const modeToggle = document.getElementById("modeToggle");
  const basicSections = document.querySelectorAll(".js-basic-section");
  const advancedSections = document.querySelectorAll(".js-advanced-section");

  if (!modeToggle) return;

  let currentMode = "basic";

  const buttons = modeToggle.querySelectorAll(".mode-btn");
  const highlight = modeToggle.querySelector(".mode-highlight");

  function updateModeUI() {
    // form bloklarını göster / gizle
    basicSections.forEach((el) => {
      el.style.display = currentMode === "basic" ? "flex" : "none";
    });
    advancedSections.forEach((el) => {
      el.style.display = currentMode === "advanced" ? "flex" : "none";
    });

    // buton aktifliği
    buttons.forEach((btn) => {
      const isActive = btn.dataset.mode === currentMode;
      btn.classList.toggle("is-active", isActive);
    });

    // highlight sağa / sola
    if (highlight) {
      highlight.style.transform =
        currentMode === "basic" ? "translateX(0%)" : "translateX(100%)";
    }
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const mode = btn.dataset.mode === "advanced" ? "advanced" : "basic";
      currentMode = mode;
      updateModeUI();
    });
  });

  // ilk yüklemede
  updateModeUI();
}

/* ------------------- */
/*  MÜZİK FORMU (FAKE) */
/* ------------------- */

function setupMusicForm() {
  const form = document.getElementById("musicForm");
  const recentList = document.getElementById("recentList");
  const recentEmpty = document.getElementById("recentEmpty");
  const recentMeta = document.getElementById("recentMeta");

  if (!form) return;

  let recentItems = [];

  function renderRecent() {
    if (!recentList || !recentEmpty || !recentMeta) return;

    if (recentItems.length === 0) {
      recentEmpty.style.display = "flex";
      recentList.style.display = "none";
      recentMeta.textContent = "Toplam 0 müzik";
      return;
    }

    recentEmpty.style.display = "none";
    recentList.style.display = "flex";
    recentList.innerHTML = "";

    recentItems.forEach((item) => {
      const li = document.createElement("li");
      li.className = "recent-item";
      li.innerHTML = `
        <div class="recent-main">
          <div class="recent-title">${item.title}</div>
          <div class="recent-sub">${item.meta}</div>
        </div>
        <div class="recent-actions">
          <button class="play-btn">▶</button>
        </div>
      `;
      recentList.appendChild(li);
    });

    recentMeta.textContent = `Toplam ${recentItems.length} müzik`;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const titleInput = form.querySelector('input[name="songTitle"]');
    const moodSelect = form.querySelector('select[name="mood"]');
    const genreSelect = form.querySelector('select[name="genre"]');

    const title = titleInput?.value?.trim() || "Yeni AIVO Track";
    const mood = moodSelect?.value || "Mood";
    const genre = genreSelect?.value || "Tür";

    recentItems.unshift({
      title,
      meta: `${genre} • ${mood}`,
    });

    renderRecent();

    alert(
      "MVP modunda: Müzik formu submit edildi. Backend bağlanınca burada gerçek AI müzik üretilecek."
    );
  });

  renderRecent();
}

/* ------------------- */
/*  KAPAK GALERİSİ     */
/* ------------------- */

function setupCoverGallery() {
  const coverForm = document.getElementById("coverForm");
  const coverList = document.getElementById("coverList");
  const coverEmpty = document.getElementById("coverEmpty");
  const coverMeta = document.getElementById("coverMeta");

  if (!coverForm) return;

  let coverItems = [
    {
      title: "DALZAL – Ahlat Oyun Havası",
      platform: "Spotify • 1:1",
      theme: "Pastel Bahçe",
      style: "Illustrasyon",
    },
    {
      title: "Harun Erkezen – Kül Bahçesi",
      platform: "YouTube • 16:9",
      theme: "Mor / Lila Neon",
      style: "Vaporwave",
    },
  ];

  function renderCovers() {
    if (!coverList || !coverEmpty || !coverMeta) return;

    if (coverItems.length === 0) {
      coverEmpty.style.display = "flex";
      coverList.style.display = "none";
      coverMeta.textContent = "Toplam 0 kapak";
      return;
    }

    coverEmpty.style.display = "none";
    coverList.style.display = "grid";
    coverList.innerHTML = "";

    coverItems.forEach((c) => {
      const li = document.createElement("li");
      li.className = "cover-card";
      li.innerHTML = `
        <div class="cover-thumb"></div>
        <div class="cover-meta">
          <div class="cover-title">${c.title}</div>
          <div class="cover-sub">${c.platform}</div>
          <div class="cover-tags">
            <span class="cover-tag">${c.theme}</span>
            <span class="cover-tag">${c.style}</span>
          </div>
        </div>
      `;
      coverList.appendChild(li);
    });

    coverMeta.textContent = `Toplam ${coverItems.length} kapak`;
  }

  coverForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(coverForm);
    const title = (formData.get("coverTitle") || "Yeni AIVO Kapak").toString();
    const platformValue = (formData.get("coverPlatform") || "spotify").toString();
    const ratio = (formData.get("coverRatio") || "1:1").toString();
    const theme = (formData.get("coverTheme") || "Neon").toString();
    const style = (formData.get("coverStyle") || "Illustrasyon").toString();

    let platformLabel = "Spotify";
    if (platformValue === "youtube") platformLabel = "YouTube";
    if (platformValue === "shorts") platformLabel = "YouTube Shorts";
    if (platformValue === "apple") platformLabel = "Apple Music";

    coverItems.unshift({
      title,
      platform: `${platformLabel} • ${ratio}`,
      theme,
      style,
    });

    renderCovers();

    alert(
      "MVP modunda: Kapak formu submit edildi. Görsel AI API bağlandığında burada gerçek kapaklar üretilecek."
    );
  });

  renderCovers();
}

/* ------------------- */
/*  KREDİ MODALİ       */
/* ------------------- */

function setupCreditModal() {
  const openBtn = document.getElementById("openCreditModal");
  const backdrop = document.querySelector(".modal-backdrop");
  const closeBtn = backdrop ? backdrop.querySelector(".modal-close") : null;

  if (!openBtn || !backdrop) return;

  function openModal() {
    backdrop.classList.add("is-open");
  }

  function closeModal() {
    backdrop.classList.remove("is-open");
  }

  openBtn.addEventListener("click", openModal);

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}
