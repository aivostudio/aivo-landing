// AIVO STUDIO – STUDIO.JS (FINAL v2)
// - Sayfa geçişleri: music / cover / video / myworks / studio / settings / profile
// - Sol menü: Müzik (Geleneksel/Ses Kaydı) + Video + Kapak + Ürettiklerim + Studio(Beta) + Ayarlar + Çıkış
// - Video sayfası: üstte form, altta 3 kolon galeri (sağ panel YOK)
// - Kartlar: sadece görsel + ikonlar (preview/detail, download, delete)
// - Detay Panel: sağdan açılır (EITA)
// - Kullanıcı dropdown: top-right
// - Bottom player bar: sadece UI (locked)

document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================
     UTIL
     ========================================================= */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function safeText(el, txt) { if (el) el.textContent = txt; }

  /* =========================================================
     PAGE SWITCHING
     ========================================================= */
  const pages = $$(".page");
  const pageLinks = $$("[data-page-link]");

  function switchPage(target) {
    pages.forEach((p) => p.classList.toggle("is-active", p.dataset.page === target));
    window.scrollTo({ top: 0, behavior: "smooth" });
    syncPlayerVisibility(target);
  }

  pageLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = link.getAttribute("data-page-link");
      if (!target) return;

      // Pricing link separate
      if (link.hasAttribute("data-open-pricing")) return;

      e.preventDefault();

      // Active class only for actual page links in topnav (anchors)
      pageLinks.forEach((l) => {
        if (l.matches(".topnav-link") && !l.hasAttribute("data-open-pricing")) {
          l.classList.remove("is-active");
        }
      });

      if (link.matches(".topnav-link")) link.classList.add("is-active");

      switchPage(target);
    });
  });

  /* =========================================================
     MODE TOGGLE (BASIC / ADVANCED) – only on music form
     ========================================================= */
  const body = document.body;
  const modeButtons = $$("[data-mode-button]");
  const advancedSections = $$("[data-visible-in='advanced']");
  const basicSections = $$("[data-visible-in='basic']");

  function updateMode(mode) {
    body.setAttribute("data-mode", mode);

    modeButtons.forEach((btn) => {
      btn.classList.toggle("is-active", btn.getAttribute("data-mode-button") === mode);
    });

    advancedSections.forEach((el) => {
      if (mode === "basic") el.classList.add("hidden");
      else el.classList.remove("hidden");
    });

    basicSections.forEach((el) => {
      if (mode === "basic") el.classList.remove("hidden");
      else el.classList.add("hidden");
    });
  }

  modeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const mode = btn.getAttribute("data-mode-button");
      if (!mode) return;
      updateMode(mode);
    });
  });
  updateMode("advanced");

  /* =========================================================
     PRICING MODAL
     ========================================================= */
  const pricingModal = $("#pricingModal");
  const creditsButton = $("#creditsButton");
  const closePricing = $("#closePricing");
  const openPricingLinks = $$("[data-open-pricing]");

  function openPricing() {
    if (!pricingModal) return;
    pricingModal.classList.add("is-open");
  }
  function closePricingModal() {
    if (!pricingModal) return;
    pricingModal.classList.remove("is-open");
  }

  if (creditsButton) {
    creditsButton.addEventListener("click", (e) => {
      e.preventDefault();
      openPricing();
    });
  }
  openPricingLinks.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      openPricing();
    });
  });
  if (closePricing) {
    closePricing.addEventListener("click", (e) => {
      e.preventDefault();
      closePricingModal();
    });
  }
  if (pricingModal) {
    const backdrop = $(".pricing-backdrop", pricingModal);
    if (backdrop) backdrop.addEventListener("click", closePricingModal);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && pricingModal.classList.contains("is-open")) {
        closePricingModal();
      }
    });
  }

  /* =========================================================
     USER DROPDOWN (Top-right)
     - Requires:
       #userPill  (button)
       #userDropdown (panel)
     ========================================================= */
  const userPill = $("#userPill");
  const userDropdown = $("#userDropdown");

  function closeUserDropdown() {
    if (!userDropdown) return;
    userDropdown.classList.remove("is-open");
  }
  function toggleUserDropdown() {
    if (!userDropdown) return;
    userDropdown.classList.toggle("is-open");
  }

  if (userPill && userDropdown) {
    userPill.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleUserDropdown();
    });

    // click outside
    document.addEventListener("click", () => closeUserDropdown());
    userDropdown.addEventListener("click", (e) => e.stopPropagation());
  }

  /* =========================================================
     MUSIC VIEWS: Geleneksel / Ses Kaydı
     - AI Video view removed from music tabs in new structure
     ========================================================= */
  const musicViews = $$(".music-view");
  const musicTabButtons = $$(".sidebar-sublink[data-music-tab]");

  let recordController = null;

  function switchMusicView(targetKey) {
    musicViews.forEach((view) => {
      const key = view.getAttribute("data-music-view");
      view.classList.toggle("is-active", key === targetKey);
    });

    // right panel mode only for music page
    if (targetKey === "geleneksel") setRightPanelMode("music");
    if (targetKey === "ses-kaydi") setRightPanelMode("record");

    if (recordController && targetKey !== "ses-kaydi") recordController.forceStopAndReset();

    refreshEmptyStates();
    syncPlayerVisibility("music");
  }

  if (musicViews.length && musicTabButtons.length) {
    musicTabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-music-tab");
        if (!target) return;

        musicTabButtons.forEach((b) => b.classList.toggle("is-active", b === btn));
        switchMusicView(target);
      });
    });
    switchMusicView("geleneksel");
  }

  /* =========================================================
     RIGHT PANEL (Music Page only): music / record
     ========================================================= */
  const rightTitle = $("#rightPanelTitle");
  const rightSubtitle = $("#rightPanelSubtitle");

  const musicList = $("#musicList");
  const recordList = $("#recordList");

  const musicEmpty = $("#musicEmpty");
  const recordEmpty = $("#recordEmpty");

  function setRightPanelMode(mode) {
    // mode: "music" | "record"
    const isMusic = mode === "music";
    const isRecord = mode === "record";

    if (rightTitle) rightTitle.textContent = isMusic ? "Müziklerim" : "Kayıtlarım";
    if (rightSubtitle) rightSubtitle.textContent = isMusic ? "Son üretilen müzikler" : "Son kayıtlar";

    if (musicList) musicList.classList.toggle("hidden", !isMusic);
    if (recordList) recordList.classList.toggle("hidden", !isRecord);
  }

  function refreshEmptyStates() {
    if (musicEmpty && musicList) {
      const hasItem = !!musicList.querySelector(".media-item");
      musicEmpty.style.display = hasItem ? "none" : "flex";
    }
    if (recordEmpty && recordList) {
      const hasItem = !!recordList.querySelector(".media-item");
      recordEmpty.style.display = hasItem ? "none" : "flex";
    }
  }

  function createIconButton(symbol, aria, extraClass = "") {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `media-ico ${extraClass}`.trim();
    btn.textContent = symbol;
    btn.setAttribute("aria-label", aria);
    return btn;
  }

  function createMusicItem({ placeholder = false } = {}) {
    const item = document.createElement("div");
    item.className = "media-item music-item";
    item.dataset.kind = "music";
    item.dataset.status = placeholder ? "pending" : "ready";

    const playBtn = createIconButton("▶", "Oynat/Duraklat");
    const downloadBtn = createIconButton("⬇", "İndir");
    const delBtn = createIconButton("✖", "Sil", "danger");

    const left = document.createElement("div");
    left.style.display = "flex";
    left.style.gap = "10px";
    left.style.alignItems = "center";

    playBtn.style.width = "46px";
    playBtn.style.height = "46px";
    playBtn.style.borderRadius = "999px";

    const right = document.createElement("div");
    right.className = "icon-row";
    right.appendChild(downloadBtn);
    right.appendChild(delBtn);

    left.appendChild(playBtn);
    item.appendChild(left);
    item.appendChild(right);

    if (placeholder) {
      playBtn.classList.add("is-disabled");
      downloadBtn.classList.add("is-disabled");
      delBtn.classList.add("is-disabled");
    } else {
      let isPlaying = false;
      playBtn.addEventListener("click", () => {
        isPlaying = !isPlaying;
        playBtn.textContent = isPlaying ? "❚❚" : "▶";
      });
      downloadBtn.addEventListener("click", () => console.log("Music download (placeholder)"));
      delBtn.addEventListener("click", () => { item.remove(); refreshEmptyStates(); });
    }

    return item;
  }

  function createRecordItem({ placeholder = false } = {}) {
    const item = document.createElement("div");
    item.className = "media-item record-item";
    item.dataset.kind = "record";
    item.dataset.status = placeholder ? "pending" : "ready";

    const playBtn = createIconButton("▶", "Oynat");
    const row = document.createElement("div");
    row.className = "icon-row";

    const downloadBtn = createIconButton("⬇", "İndir");
    const toMusicBtn = createIconButton("🎵", "Müzikte referans");
    const delBtn = createIconButton("✖", "Sil", "danger");

    row.appendChild(downloadBtn);
    row.appendChild(toMusicBtn);
    row.appendChild(delBtn);

    item.appendChild(playBtn);
    item.appendChild(row);

    if (placeholder) {
      playBtn.classList.add("is-disabled");
      downloadBtn.classList.add("is-disabled");
      toMusicBtn.classList.add("is-disabled");
      delBtn.classList.add("is-disabled");
    } else {
      playBtn.addEventListener("click", () => console.log("Record play (placeholder)"));
      downloadBtn.addEventListener("click", () => console.log("Record download (placeholder)"));
      toMusicBtn.addEventListener("click", () => {
        switchMusicView("geleneksel");
        setRightPanelMode("music");
      });
      delBtn.addEventListener("click", () => { item.remove(); refreshEmptyStates(); });
    }

    return item;
  }

  function addPlaceholderAndActivate(listEl, itemFactory, activateDelay = 1400) {
    if (!listEl) return;
    const placeholder = itemFactory({ placeholder: true });
    listEl.prepend(placeholder);
    refreshEmptyStates();

    setTimeout(() => {
      const ready = itemFactory({ placeholder: false });
      placeholder.replaceWith(ready);
      refreshEmptyStates();
    }, activateDelay);
  }

  /* =========================================================
     MUSIC GENERATE
     ========================================================= */
  const musicGenerateBtn = $("#musicGenerateBtn");
  if (musicGenerateBtn) {
    musicGenerateBtn.addEventListener("click", () => {
      setRightPanelMode("music");
      if (musicGenerateBtn.classList.contains("is-loading")) return;

      const originalText = musicGenerateBtn.textContent;
      musicGenerateBtn.classList.add("is-loading");
      musicGenerateBtn.textContent = "Üretiliyor...";

      addPlaceholderAndActivate(musicList, createMusicItem, 1200);

      setTimeout(() => {
        musicGenerateBtn.classList.remove("is-loading");
        musicGenerateBtn.textContent = originalText;
      }, 1200);
    });
  }

  /* =========================================================
     RECORD UI (existing logic)
     ========================================================= */
  const sesView = document.querySelector('.music-view[data-music-view="ses-kaydi"]');
  if (sesView) {
    const mainCard = $(".record-main-card", sesView);
    const circle = $(".record-circle", sesView);
    const button = $(".record-btn", sesView);
    const title = $(".record-main-title", sesView);
    const timerEl = $(".record-timer", sesView);

    const resultCard = $("#recordResult");
    const resultTimeEl = $("#recordResultTime");

    const playBtn = $('[data-record-action="play"]', sesView);
    const downloadBtn = $('[data-record-action="download"]', sesView);
    const toMusicBtn = $('[data-record-action="to-music"]', sesView);
    const deleteBtn = $('[data-record-action="delete"]', sesView);

    let isRecording = false;
    let timerInterval = null;
    let startTime = 0;
    let lastDurationMs = 0;

    function formatTime(ms) {
      const totalSec = Math.floor(ms / 1000);
      const min = String(Math.floor(totalSec / 60)).padStart(2, "0");
      const sec = String(totalSec % 60).padStart(2, "0");
      return `${min}:${sec}`;
    }

    function setResultVisible(visible) {
      if (!resultCard) return;
      resultCard.style.display = visible ? "flex" : "none";
    }

    function startTimer() {
      if (!timerEl) return;
      startTime = Date.now();
      timerEl.textContent = "00:00";
      if (timerInterval) clearInterval(timerInterval);

      timerInterval = setInterval(() => {
        const diff = Date.now() - startTime;
        timerEl.textContent = formatTime(diff);
      }, 200);
    }

    function stopTimer() {
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
      lastDurationMs = startTime ? (Date.now() - startTime) : 0;
      startTime = 0;
    }

    function applyUIRecordingState(active) {
      isRecording = active;

      if (circle) circle.classList.toggle("is-recording", isRecording);
      if (mainCard) mainCard.classList.toggle("is-recording", isRecording);

      if (title) title.textContent = isRecording ? "Kayıt Devam Ediyor" : "Ses Kaydetmeye Başlayın";
      if (button) button.textContent = isRecording ? "⏹ Kaydı Durdur" : "⏺ Kaydı Başlat";

      document.body.classList.toggle("is-recording", isRecording);

      if (isRecording) {
        setResultVisible(false);
        startTimer();
      } else {
        stopTimer();

        if (lastDurationMs >= 500 && resultTimeEl) {
          resultTimeEl.textContent = formatTime(lastDurationMs);
          setResultVisible(true);

          setRightPanelMode("record");
          if (recordList) {
            recordList.prepend(createRecordItem({ placeholder: false }));
            refreshEmptyStates();
          }
        } else {
          setResultVisible(false);
        }
      }
    }

    function toggleRecording() {
      applyUIRecordingState(!isRecording);
    }

    setResultVisible(false);

    if (circle) {
      circle.style.cursor = "pointer";
      circle.addEventListener("click", toggleRecording);
    }
    if (button) {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        toggleRecording();
      });
    }

    if (playBtn) playBtn.addEventListener("click", () => console.log("Play (placeholder)"));
    if (downloadBtn) downloadBtn.addEventListener("click", () => console.log("Download (placeholder)"));
    if (toMusicBtn) toMusicBtn.addEventListener("click", () => {
      switchMusicView("geleneksel");
      setRightPanelMode("music");
    });
    if (deleteBtn) deleteBtn.addEventListener("click", () => setResultVisible(false));

    recordController = {
      forceStopAndReset() {
        if (isRecording) applyUIRecordingState(false);

        document.body.classList.remove("is-recording");
        if (circle) circle.classList.remove("is-recording");
        if (mainCard) mainCard.classList.remove("is-recording");
        if (title) title.textContent = "Ses Kaydetmeye Başlayın";
        if (button) button.textContent = "⏺ Kaydı Başlat";
        if (timerEl) timerEl.textContent = "00:00";
        setResultVisible(false);

        if (timerInterval) clearInterval(timerInterval);
        timerInterval = null;
        startTime = 0;
        lastDurationMs = 0;
        isRecording = false;
      },
    };
  }

 /* =========================================================
   DETAIL DRAWER (senin HTML'ine uyumlu)
   ========================================================= */
const detailDrawer = $("#detailDrawer");
const detailBackdrop2 = detailDrawer ? $("[data-detail-close]", detailDrawer) : null;
const detailCloseBtns = detailDrawer ? $$("[data-detail-close]", detailDrawer) : [];
const detailTitle2 = $("#detailTitle");
const detailBody2 = $("#detailBody");
const detailDownloadBtn = $("#detailDownloadBtn");
const detailDeleteBtn = $("#detailDeleteBtn");

let lastOpenedCard = null;

function openDetailDrawer({ title = "Önizleme", kind = "video" } = {}) {
  if (!detailDrawer) return;

  if (detailTitle2) detailTitle2.textContent = title;

  if (detailBody2) {
    // MVP placeholder preview
    detailBody2.innerHTML = `
      <div style="
        border-radius:16px;
        border:1px solid rgba(255,255,255,0.10);
        background: radial-gradient(circle at top left, rgba(108,92,231,0.55), rgba(0,206,201,0.25));
        aspect-ratio:${kind === "cover" ? "1 / 1" : "16 / 9"};
        width:100%;
      "></div>
      <div style="margin-top:12px; color: rgba(255,255,255,0.70); font-size:13px;">
        Detaylar (MVP) – indirme/silme aksiyonları bağlandı.
      </div>
    `;
  }

  detailDrawer.setAttribute("aria-hidden", "false");
  detailDrawer.classList.add("is-open");
}

function closeDetailDrawer() {
  if (!detailDrawer) return;
  detailDrawer.setAttribute("aria-hidden", "true");
  detailDrawer.classList.remove("is-open");
  lastOpenedCard = null;
}

if (detailCloseBtns.length) {
  detailCloseBtns.forEach((btn) => btn.addEventListener("click", closeDetailDrawer));
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeDetailDrawer();
});

if (detailDownloadBtn) {
  detailDownloadBtn.addEventListener("click", () => {
    console.log("Download (placeholder)");
  });
}

if (detailDeleteBtn) {
  detailDeleteBtn.addEventListener("click", () => {
    if (lastOpenedCard) lastOpenedCard.remove();
    closeDetailDrawer();
  });
}


  /* =========================================================
     GALLERY CARD FACTORY (Video/Cover/MyWorks)
     - Requires containers:
       #videoGallery (page-video)
       #coverGallery (page-cover)
       #myworksGallery (page-myworks)
     ========================================================= */
  function createMediaCard({ kind = "video", placeholder = false } = {}) {
    const card = document.createElement("div");
    card.className = `media-card ${kind === "cover" ? "cover" : ""}`.trim();
    card.dataset.kind = kind;
    card.dataset.status = placeholder ? "pending" : "ready";

    const thumb = document.createElement("div");
    thumb.className = "media-thumb";
    if (kind === "cover") {
      thumb.style.background = "radial-gradient(circle at top left, #6c5ce7, #22a6b3)";
    } else {
      thumb.style.background = "radial-gradient(circle at top left, rgba(253,121,168,0.9), rgba(108,92,231,0.55))";
    }
    if (placeholder) thumb.style.opacity = "0.55";

    const overlay = document.createElement("div");
    overlay.className = "media-overlay";

    const row = document.createElement("div");
    row.className = "icon-row";

    const previewBtn = createIconButton("🔍", "Önizle");
    const downloadBtn = createIconButton("⬇", "İndir");
    const delBtn = createIconButton("✖", "Sil", "danger");

    row.appendChild(previewBtn);
    row.appendChild(downloadBtn);
    row.appendChild(delBtn);

    overlay.appendChild(row);
    card.appendChild(thumb);
    card.appendChild(overlay);

    function disableAll() {
      previewBtn.classList.add("is-disabled");
      downloadBtn.classList.add("is-disabled");
      delBtn.classList.add("is-disabled");
    }

    if (placeholder) {
      disableAll();
      return card;
    }

    // Click card opens detail too (EITA)
    card.addEventListener("click", (e) => {
      // if user clicked icon, still open detail but avoid double
      e.preventDefault();
      lastOpenedCard = card;
      openDetail({
        kind,
        title: kind === "video" ? "Video Detayı" : "Görsel Detayı",
        subtitle: "Önizleme ve işlemler",
        previewKind: kind === "cover" ? "cover" : "video",
      });
    });

    previewBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      lastOpenedCard = card;
      openDetail({
        kind,
        title: kind === "video" ? "Video Detayı" : "Görsel Detayı",
        subtitle: "Önizleme ve işlemler",
        previewKind: kind === "cover" ? "cover" : "video",
      });
    });

    downloadBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      console.log("Download card (placeholder)");
    });

    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      card.remove();
    });

    return card;
  }

  function addGalleryPlaceholderThenReady(galleryEl, kind, delay = 1400) {
    if (!galleryEl) return;

    const ph = createMediaCard({ kind, placeholder: true });
    galleryEl.prepend(ph);

    setTimeout(() => {
      const ready = createMediaCard({ kind, placeholder: false });
      ph.replaceWith(ready);
    }, delay);
  }

  /* =========================================================
     VIDEO PAGE: tabs + counters + generate -> gallery
     ========================================================= */
  const videoTabs = $$(".video-tab[data-video-tab]");
  const videoViews = $$(".video-view[data-video-view]");

  function switchVideoTab(target) {
    videoTabs.forEach((tab) => tab.classList.toggle("is-active", tab.dataset.videoTab === target));
    videoViews.forEach((view) => view.classList.toggle("is-active", view.dataset.videoView === target));
  }

  videoTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.videoTab;
      if (!target) return;
      switchVideoTab(target);
    });
  });

  function bindCounter(textareaId, counterId, max) {
    const textarea = $("#" + textareaId);
    const counter = $("#" + counterId);
    if (!textarea || !counter) return;

    const update = () => {
      counter.textContent = `${textarea.value.length} / ${max}`;
    };
    textarea.addEventListener("input", update);
    update();
  }

  bindCounter("videoPrompt", "videoPromptCounter", 1000);
  bindCounter("videoImagePrompt", "videoImagePromptCounter", 500);

  const videoGallery = $("#videoGallery");

  function attachVideoGenerate(btnId, loadingText, delay = 1400) {
    const btn = $("#" + btnId);
    if (!btn) return;

    btn.addEventListener("click", () => {
      if (btn.classList.contains("is-loading")) return;

      const original = btn.textContent;
      btn.classList.add("is-loading");
      btn.textContent = loadingText;

      addGalleryPlaceholderThenReady(videoGallery, "video", delay);

      setTimeout(() => {
        btn.classList.remove("is-loading");
        btn.textContent = original;
      }, delay);
    });
  }

  attachVideoGenerate("videoGenerateTextBtn", "🎬 Video Oluşturuluyor...", 1400);
  attachVideoGenerate("videoGenerateImageBtn", "🎞 Video Oluşturuluyor...", 1600);

  const imageInput = $("#videoImageInput");
  if (imageInput) {
    imageInput.addEventListener("change", () => {
      if (!imageInput.files || !imageInput.files[0]) return;
      console.log("Seçilen görsel:", imageInput.files[0].name);
    });
  }

  /* =========================================================
     COVER: generate -> cover gallery (existing #coverGallery)
     ========================================================= */
  const coverGenerateBtn = $("#coverGenerateBtn");
  const coverGallery = $("#coverGallery");

  if (coverGenerateBtn) {
    coverGenerateBtn.addEventListener("click", () => {
      if (coverGenerateBtn.classList.contains("is-loading")) return;

      const originalText = coverGenerateBtn.textContent;
      coverGenerateBtn.classList.add("is-loading");
      coverGenerateBtn.textContent = "Üretiliyor...";

      if (coverGallery) {
        // cover gallery uses 1:1 cards; but we can still prepend
        const placeholder = createMediaCard({ kind: "cover", placeholder: true });
        coverGallery.prepend(placeholder);

        setTimeout(() => {
          const ready = createMediaCard({ kind: "cover", placeholder: false });
          placeholder.replaceWith(ready);
          coverGenerateBtn.classList.remove("is-loading");
          coverGenerateBtn.textContent = originalText;
        }, 1400);
      } else {
        setTimeout(() => {
          coverGenerateBtn.classList.remove("is-loading");
          coverGenerateBtn.textContent = originalText;
        }, 1000);
      }
    });
  }

  /* =========================================================
     MYWORKS (Ürettiklerim): segment switch + gallery
     - Requires:
       #myworksGallery
       #myworksSegVideo, #myworksSegCover
     ========================================================= */
  const myworksGallery = $("#myworksGallery");
  const segVideo = $("#myworksSegVideo");
  const segCover = $("#myworksSegCover");

  let myworksMode = "video"; // default

  function setMyworksMode(mode) {
    myworksMode = mode;
    if (segVideo) segVideo.classList.toggle("is-active", mode === "video");
    if (segCover) segCover.classList.toggle("is-active", mode === "cover");

    // For MVP: filter by dataset.kind
    if (!myworksGallery) return;
    $$(".media-card", myworksGallery).forEach((card) => {
      card.style.display = (card.dataset.kind === mode) ? "" : "none";
    });
  }

  if (segVideo && segCover) {
    segVideo.addEventListener("click", () => setMyworksMode("video"));
    segCover.addEventListener("click", () => setMyworksMode("cover"));
    setMyworksMode("video");
  }

  /* =========================================================
     BOTTOM PLAYER BAR (UI only)
     - Requires: #playerBar
     - Visible only on music page
     ========================================================= */
  const playerBar = $("#playerBar");
  function syncPlayerVisibility(activePage) {
    if (!playerBar) return;
    // Show only on music page
    playerBar.classList.toggle("hidden", activePage !== "music");
  }

  /* =========================================================
     INITIAL STATE
     ========================================================= */
  refreshEmptyStates();
  // default: music page active (HTML sets), sync player
  const active = $(".page.is-active");
  syncPlayerVisibility(active ? active.dataset.page : "music");
});
