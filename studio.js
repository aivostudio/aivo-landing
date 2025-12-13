/* =========================================================
   AIVO STUDIO – FINAL STUDIO.JS
   - Tek sayfa (studio.html)
   - Net view mimarisi
   - Sol menü + üst menü stabil
   - Video / Müzik / Ses birbirine karışmaz
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
     GENEL YARDIMCILAR
     ===================================================== */
  const qs = (s, c = document) => c.querySelector(s);
  const qsa = (s, c = document) => [...c.querySelectorAll(s)];

  /* =====================================================
     SAYFA ROUTER (music / cover)
     ===================================================== */
  const pages = qsa(".page");
  const pageLinks = qsa("[data-page-link]");

  function switchPage(key) {
    pages.forEach(p => {
      p.classList.toggle("is-active", p.dataset.page === key);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  pageLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const key = link.dataset.pageLink;
      if (!key) return;

      pageLinks.forEach(l => l.classList.remove("is-active"));
      link.classList.add("is-active");
      switchPage(key);
    });
  });

  switchPage("music");

  /* =====================================================
     SOL MENÜ – MÜZİK ALT VIEW (geleneksel / ses-kaydi / video)
     ===================================================== */
  const musicViews = qsa(".music-view");
  const musicTabs = qsa("[data-music-tab]");

  function switchMusicView(key) {
    musicViews.forEach(v => {
      v.classList.toggle("is-active", v.dataset.musicView === key);
    });

    musicTabs.forEach(t => {
      t.classList.toggle("is-active", t.dataset.musicTab === key);
    });

    // sağ panel başlıkları
    if (key === "geleneksel") setRightPanel("music");
    if (key === "ses-kaydi") setRightPanel("record");
    if (key === "ai-video") setRightPanel("video");
  }

  musicTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      switchMusicView(tab.dataset.musicTab);
    });
  });

  switchMusicView("geleneksel");

  /* =====================================================
     SAĞ PANEL MODU
     ===================================================== */
  const rightTitle = qs("#rightPanelTitle");
  const rightSubtitle = qs("#rightPanelSubtitle");

  const lists = {
    music: qs("#musicList"),
    video: qs("#videoList"),
    record: qs("#recordList")
  };

  function setRightPanel(mode) {
    Object.entries(lists).forEach(([k, el]) => {
      if (el) el.classList.toggle("hidden", k !== mode);
    });

    if (rightTitle) {
      rightTitle.textContent =
        mode === "music" ? "Müziklerim" :
        mode === "video" ? "Videolarım" :
        "Kayıtlarım";
    }

    if (rightSubtitle) {
      rightSubtitle.textContent =
        mode === "music" ? "Son üretilen müzikler" :
        mode === "video" ? "Son üretilen videolar" :
        "Son kayıtlar";
    }
  }

  setRightPanel("music");

  /* =====================================================
     MÜZİK ÜRET (PLACEHOLDER)
     ===================================================== */
  const musicBtn = qs("#musicGenerateBtn");
  if (musicBtn) {
    musicBtn.addEventListener("click", () => {
      if (musicBtn.classList.contains("is-loading")) return;

      setRightPanel("music");
      musicBtn.classList.add("is-loading");
      const original = musicBtn.textContent;
      musicBtn.textContent = "Üretiliyor...";

      const item = document.createElement("div");
      item.className = "media-item music-item";
      item.innerHTML = `<button class="media-ico">▶</button>`;

      lists.music.prepend(item);

      setTimeout(() => {
        musicBtn.classList.remove("is-loading");
        musicBtn.textContent = original;
      }, 1200);
    });
  }

  /* =====================================================
     SES KAYDI (UI SADE – GERÇEK KAYIT YOK)
     ===================================================== */
  const recordCircle = qs(".record-circle");
  const recordBtn = qs(".record-btn");
  const recordTimer = qs("#recordTimer");

  let recording = false;
  let timer = null;
  let start = 0;

  function updateTimer() {
    const diff = Date.now() - start;
    const m = String(Math.floor(diff / 60000)).padStart(2, "0");
    const s = String(Math.floor(diff / 1000) % 60).padStart(2, "0");
    recordTimer.textContent = `${m}:${s}`;
  }

  function toggleRecord() {
    recording = !recording;

    if (recording) {
      start = Date.now();
      recordTimer.textContent = "00:00";
      timer = setInterval(updateTimer, 300);
      recordBtn.textContent = "⏹ Kaydı Durdur";
      recordCircle.classList.add("is-recording");
    } else {
      clearInterval(timer);
      recordBtn.textContent = "⏺ Kaydı Başlat";
      recordCircle.classList.remove("is-recording");

      setRightPanel("record");
      const item = document.createElement("div");
      item.className = "media-item record-item";
      item.innerHTML = `<button class="media-ico">▶</button>`;
      lists.record.prepend(item);
    }
  }

  if (recordCircle) recordCircle.addEventListener("click", toggleRecord);
  if (recordBtn) recordBtn.addEventListener("click", toggleRecord);

  /* =====================================================
     AI VIDEO – TAB + PLACEHOLDER
     ===================================================== */
  const videoTabs = qsa(".video-tab");
  const videoViews = qsa(".video-view");

  function switchVideoTab(key) {
    videoTabs.forEach(t => t.classList.toggle("is-active", t.dataset.videoTab === key));
    videoViews.forEach(v => v.classList.toggle("is-active", v.dataset.videoView === key));
  }

  videoTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      switchVideoTab(tab.dataset.videoTab);
    });
  });

  switchVideoTab("text");

  function bindVideoBtn(id, label) {
    const btn = qs(id);
    if (!btn) return;

    btn.addEventListener("click", () => {
      if (btn.classList.contains("is-loading")) return;

      setRightPanel("video");
      btn.classList.add("is-loading");
      const original = btn.textContent;
      btn.textContent = label;

      const item = document.createElement("div");
      item.className = "media-item video-item";
      item.innerHTML = `
        <div class="media-overlay">
          <button class="play-overlay">▶</button>
        </div>
      `;
      lists.video.prepend(item);

      setTimeout(() => {
        btn.classList.remove("is-loading");
        btn.textContent = original;
      }, 1400);
    });
  }

  bindVideoBtn("#videoGenerateTextBtn", "🎬 Video Oluşturuluyor...");
  bindVideoBtn("#videoGenerateImageBtn", "🎞 Video Oluşturuluyor...");

  /* =====================================================
     KREDİ MODALI
     ===================================================== */
  const pricingModal = qs("#pricingModal");
  const openPricing = qsa("[data-open-pricing]");
  const closePricing = qs("#closePricing");

  function openModal() {
    pricingModal.classList.add("is-open");
  }
  function closeModal() {
    pricingModal.classList.remove("is-open");
  }

  openPricing.forEach(b => b.addEventListener("click", e => {
    e.preventDefault();
    openModal();
  }));

  if (closePricing) closePricing.addEventListener("click", closeModal);
});
