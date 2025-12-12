// AIVO STUDIO – STUDIO.JS (FULL CLEAN VERSION)

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
        if (!l.hasAttribute("data-open-pricing")) {
          l.classList.remove("is-active");
        }
      });

      if (!link.hasAttribute("data-open-pricing")) {
        link.classList.add("is-active");
      }

      switchPage(target);
    });
  });

  /* =========================================
     SOL MENÜ – MÜZİK ALT SEKME GEÇİŞLERİ
     ========================================= */
  const musicViews = document.querySelectorAll(".music-view");
  const musicTabButtons = document.querySelectorAll(".sidebar-sublink[data-music-tab]");

  function switchMusicView(targetKey) {
    musicViews.forEach((view) => {
      const key = view.getAttribute("data-music-view");
      view.classList.toggle("is-active", key === targetKey);
    });
  }

  if (musicViews.length && musicTabButtons.length) {
    musicTabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-music-tab");
        if (!target) return;

        musicTabButtons.forEach((b) => {
          b.classList.toggle("is-active", b === btn);
        });

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
      const btnMode = btn.getAttribute("data-mode-button");
      btn.classList.toggle("is-active", btnMode === mode);
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
    const bodyEl = document.body;

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
    }

    function showResultCard() {
      if (!resultCard || !resultTimeEl) return;
      if (lastDurationMs < 500) return;
      resultTimeEl.textContent = formatTime(lastDurationMs);
      resultCard.classList.add("is-visible");
    }

    function hideResultCardWhileRecording() {
      if (!resultCard) return;
      resultCard.classList.remove("is-visible");
    }

    function toggleRecordingVisual() {
      isRecording = !isRecording;

      if (circle) circle.classList.toggle("is-recording", isRecording);
      if (mainCard) mainCard.classList.toggle("is-recording", isRecording);

      if (title) {
        title.textContent = isRecording ? "Kayıt Devam Ediyor" : "Ses Kaydetmeye Başlayın";
      }
      if (button) {
        button.textContent = isRecording ? "⏹ Kaydı Durdur" : "⏺ Kaydı Başlat";
      }

      if (isRecording) {
        bodyEl.classList.add("is-recording");
        hideResultCardWhileRecording();
        startTimer();
      } else {
        bodyEl.classList.remove("is-recording");
        stopTimer();
        showResultCard();
      }
    }

    if (circle) {
      circle.style.cursor = "pointer";
      circle.addEventListener("click", toggleRecordingVisual);
    }
    if (button) button.addEventListener("click", toggleRecordingVisual);

    if (playBtn) playBtn.addEventListener("click", () => console.log("Kayıtlı sesi çal (audio player eklenecek)."));
    if (downloadBtn) downloadBtn.addEventListener("click", () => console.log("Kayıtlı sesi indir (download logic eklenecek)."));
    if (toMusicBtn) toMusicBtn.addEventListener("click", () => console.log("Kayıtlı sesi Müzik Üret formuna gönder (ileride)."));

    if (deleteBtn) {
      deleteBtn.addEventListener("click", () => {
        console.log("Kaydı sil (ileride).");
        if (resultCard) resultCard.classList.remove("is-visible");
      });
    }
  }
});
