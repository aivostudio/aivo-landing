// AIVO STUDIO – STUDIO.JS (FULL CLEAN + STABLE + VIDEO CREDIT TOGGLE + RIGHT OUTPUTS)

document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
     SAYFA GEÇİŞLERİ (MÜZİK / KAPAK)
     ========================================= */
  const pages = document.querySelectorAll(".page");
  const pageLinks = document.querySelectorAll("[data-page-link]");

  function switchPage(target) {
    pages.forEach((p) => {
      p.classList.toggle("is-active", p.dataset.page === target);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  pageLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = link.getAttribute("data-page-link");
      if (!target) return;
      e.preventDefault();

      pageLinks.forEach((l) => {
        if (!l.hasAttribute("data-open-pricing")) l.classList.remove("is-active");
      });

      if (!link.hasAttribute("data-open-pricing")) link.classList.add("is-active");
      switchPage(target);
    });
  });

  /* =========================================
     SOL MENÜ – MÜZİK ALT SEKME GEÇİŞLERİ
     (Geleneksel / Ses Kaydı / AI Video)
     ========================================= */
  const musicViews = document.querySelectorAll(".music-view");
  const musicTabButtons = document.querySelectorAll(".sidebar-sublink[data-music-tab]");

  let recordController = null;

  function switchMusicView(targetKey) {
    musicViews.forEach((view) => {
      const key = view.getAttribute("data-music-view");
      view.classList.toggle("is-active", key === targetKey);
    });

    if (recordController && targetKey !== "ses-kaydi") {
      recordController.forceStopAndReset();
    }
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

  /* =========================================
     ÇALIŞMA MODU (BASİT / GELİŞMİŞ)
     ========================================= */
  const body = document.body;
  const modeButtons = document.querySelectorAll("[data-mode-button]");
  const advancedSections = document.querySelectorAll("[data-visible-in='advanced']");
  const basicSections = document.querySelectorAll("[data-visible-in='basic']");

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

  /* =========================================
     KREDİ MODALI
     ========================================= */
  const pricingModal = document.getElementById("pricingModal");
  const creditsButton = document.getElementById("creditsButton");
  const closePricing = document.getElementById("closePricing");
  const openPricingLinks = document.querySelectorAll("[data-open-pricing]");

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
    const backdrop = pricingModal.querySelector(".pricing-backdrop");
    if (backdrop) backdrop.addEventListener("click", closePricingModal);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && pricingModal.classList.contains("is-open")) {
        closePricingModal();
      }
    });
  }

  /* =========================================
     MÜZİK ÜRET BUTONU – UI LOADING
     ========================================= */
  const musicGenerateBtn = document.getElementById("musicGenerateBtn");
  if (musicGenerateBtn) {
    musicGenerateBtn.addEventListener("click", () => {
      if (musicGenerateBtn.classList.contains("is-loading")) return;

      const originalText = musicGenerateBtn.textContent;
      musicGenerateBtn.classList.add("is-loading");
      musicGenerateBtn.textContent = "Üretiliyor...";

      setTimeout(() => {
        musicGenerateBtn.classList.remove("is-loading");
        musicGenerateBtn.textContent = originalText;
        console.log("Müzik üretim isteği burada API'ye gidecek.");
      }, 1200);
    });
  }

  /* =========================================
     KAPAK ÜRET BUTONU – UI LOADING
     ========================================= */
  const coverGenerateBtn = document.getElementById("coverGenerateBtn");
  if (coverGenerateBtn) {
    coverGenerateBtn.addEventListener("click", () => {
      if (coverGenerateBtn.classList.contains("is-loading")) return;

      const originalText = coverGenerateBtn.textContent;
      coverGenerateBtn.classList.add("is-loading");
      coverGenerateBtn.textContent = "Kapak üretiliyor...";

      setTimeout(() => {
        coverGenerateBtn.classList.remove("is-loading");
        coverGenerateBtn.textContent = originalText;
        console.log("Kapak üretim isteği burada görsel AI API'ye gidecek.");
      }, 1400);
    });
  }

  /* =========================================
     SES KAYDI – GÖRSEL KAYIT DURUMU
     ========================================= */
  const sesView = document.querySelector('.music-view[data-music-view="ses-kaydi"]');
  if (sesView) {
    const mainCard = sesView.querySelector(".record-main-card");
    const circle = sesView.querySelector(".record-circle");
    const button = sesView.querySelector(".record-btn");
    const title = sesView.querySelector(".record-main-title");
    const timerEl = sesView.querySelector(".record-timer");

    const resultCard = sesView.querySelector("#recordResult");
    const resultTimeEl = sesView.querySelector("#recordResultTime");

    const playBtn = sesView.querySelector('[data-record-action="play"]');
    const downloadBtn = sesView.querySelector('[data-record-action="download"]');
    const toMusicBtn = sesView.querySelector('[data-record-action="to-music"]');
    const deleteBtn = sesView.querySelector('[data-record-action="delete"]');

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
    if (toMusicBtn) toMusicBtn.addEventListener("click", () => console.log("Send to Music (placeholder)"));
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

  /* =========================================
     AI VIDEO – TAB
     ========================================= */
  const videoTabs = document.querySelectorAll(".video-tab[data-video-tab]");
  const videoViews = document.querySelectorAll(".video-view[data-video-view]");

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

  /* =========================================
     AI VIDEO – COUNTERS
     ========================================= */
  function bindCounter(textareaId, counterId, max) {
    const textarea = document.getElementById(textareaId);
    const counter = document.getElementById(counterId);
    if (!textarea || !counter) return;

    const update = () => {
      counter.textContent = `${textarea.value.length} / ${max}`;
    };
    textarea.addEventListener("input", update);
    update();
  }

  bindCounter("videoPrompt", "videoPromptCounter", 1000);
  bindCounter("videoImagePrompt", "videoImagePromptCounter", 500);

  /* =========================================
     VIDEO KREDİ – SES ÜRETİMİ TOGGLE
     Base: 15
     Ses açıkken +3 => 18
     ========================================= */
  const VIDEO_BASE = 15;
  const VIDEO_SOUND_EXTRA = 3;

  const soundToggle = document.getElementById("videoSoundToggle");
  const baseEl = document.getElementById("videoBaseCredit");
  const extraEl = document.getElementById("videoSoundExtra");

  const badgeText = document.getElementById("videoBadgeText");
  const badgeImage = document.getElementById("videoBadgeImage");

  const btnText = document.getElementById("videoGenerateTextBtn");
  const btnImage = document.getElementById("videoGenerateImageBtn");

  function getVideoCredit() {
    const soundOn = !!(soundToggle && soundToggle.checked);
    return VIDEO_BASE + (soundOn ? VIDEO_SOUND_EXTRA : 0);
  }

  function syncVideoCreditUI() {
    const credit = getVideoCredit();

    if (baseEl) baseEl.textContent = String(VIDEO_BASE);
    if (extraEl) extraEl.textContent = String(VIDEO_SOUND_EXTRA);

    if (badgeText) badgeText.textContent = `${credit} Kredi`;
    if (badgeImage) badgeImage.textContent = `${credit} Kredi`;

    if (btnText) btnText.textContent = `🎬 Video Oluştur (${credit} Kredi)`;
    if (btnImage) btnImage.textContent = `🎞 Video Oluştur (${credit} Kredi)`;
  }

  if (soundToggle) {
    soundToggle.addEventListener("change", syncVideoCreditUI);
  }
  syncVideoCreditUI();

  /* =========================================
     VIDEO – SEÇİLEN DOSYA CHIP
     ========================================= */
  const imageInput = document.getElementById("videoImageInput");
  const selectedWrap = document.getElementById("videoSelectedFile");
  const selectedName = document.getElementById("videoSelectedFileName");

  if (imageInput) {
    imageInput.addEventListener("change", () => {
      if (!imageInput.files || !imageInput.files[0]) {
        if (selectedWrap) selectedWrap.style.display = "none";
        return;
      }
      if (selectedName) selectedName.textContent = imageInput.files[0].name;
      if (selectedWrap) selectedWrap.style.display = "block";
    });
  }

  /* =========================================
     SAĞ PANEL – ÇIKTI EKLEME (EITA MANTIĞI)
     ========================================= */
  const rightEmpty = document.getElementById("rightEmptyState");
  const rightList = document.getElementById("rightOutputList");

  function ensureRightPanelReady() {
    return !!rightList;
  }

  function truncate(text, max = 60) {
    if (!text) return "";
    const t = String(text).trim();
    if (t.length <= max) return t;
    return t.slice(0, max - 1) + "…";
  }

  function addVideoOutputCard({ title, desc, resolution = "720p", creditUsed }) {
    if (!ensureRightPanelReady()) return;

    if (rightEmpty) rightEmpty.style.display = "none";

    const card = document.createElement("div");
    card.className = "output-card";

    card.innerHTML = `
      <div class="output-top">
        <div class="output-status">
          <span class="status-dot"></span>
          <span>Tamamlandı</span>
        </div>
        <div class="output-meta">${resolution} • ${creditUsed} kredi</div>
      </div>

      <div class="output-preview">
        <button class="output-play" type="button" aria-label="Oynat">▶</button>
      </div>

      <div class="output-title">${title}</div>
      <div class="output-desc">${desc}</div>

      <div class="output-actions">
        <button class="output-btn" type="button" data-act="download">İndir</button>
        <button class="output-btn" type="button" data-act="share">Paylaş</button>
        <button class="output-btn danger" type="button" data-act="delete">Sil</button>
      </div>
    `;

    const play = card.querySelector(".output-play");
    const download = card.querySelector('[data-act="download"]');
    const share = card.querySelector('[data-act="share"]');
    const del = card.querySelector('[data-act="delete"]');

    if (play) play.addEventListener("click", () => console.log("Play (placeholder)"));
    if (download) download.addEventListener("click", () => console.log("Download (placeholder)"));
    if (share) share.addEventListener("click", () => console.log("Share (placeholder)"));
    if (del) del.addEventListener("click", () => card.remove());

    // En üste ekle (en yeni en üstte)
    rightList.prepend(card);
  }

  /* =========================================
     VIDEO BUTONLARI – LOADING + SAĞ PANELE EKLE
     ========================================= */
  function attachVideoGenerate(btn, getPayload) {
    if (!btn) return;

    btn.addEventListener("click", () => {
      if (btn.classList.contains("is-loading")) return;

      const original = btn.textContent;
      btn.classList.add("is-loading");
      btn.textContent = "⏳ Oluşturuluyor...";

      setTimeout(() => {
        btn.classList.remove("is-loading");
        btn.textContent = original;

        const payload = getPayload();
        addVideoOutputCard(payload);

        console.log("AI Video isteği burada API'ye gidecek.", payload);
      }, 1400);
    });
  }

  attachVideoGenerate(btnText, () => {
    const credit = getVideoCredit();
    const prompt = document.getElementById("videoPrompt")?.value || "";
    return {
      title: truncate(prompt, 42) || "Yazıdan Video",
      desc: truncate(prompt, 90) || "Prompt boştu (örnek çıktı).",
      resolution: "720p",
      creditUsed: credit,
    };
  });

  attachVideoGenerate(btnImage, () => {
    const credit = getVideoCredit();
    const prompt = document.getElementById("videoImagePrompt")?.value || "";
    const fileName = imageInput?.files?.[0]?.name || "";
    const combined = [fileName ? `Dosya: ${fileName}` : "", prompt].filter(Boolean).join(" • ");

    return {
      title: truncate(fileName ? fileName : "Resimden Video", 42),
      desc: truncate(combined || "Resim seçilmedi (örnek çıktı).", 90),
      resolution: "720p",
      creditUsed: credit,
    };
  });
});
