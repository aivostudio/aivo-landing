// studio.js

document.addEventListener("DOMContentLoaded", () => {
  /* ===================== SAYFA GEÇİŞLERİ (Müzik / Kapak) ===================== */

  const pages = document.querySelectorAll(".page");
  const topnavLinks = document.querySelectorAll(".topnav-link[data-page-link]");

  function showPage(name) {
    pages.forEach((page) => {
      const isTarget = page.dataset.page === name;
      page.classList.toggle("is-active", isTarget);
    });
  }

  // Üst menü tıklamaları: sadece tıklanan link aktif olsun
  topnavLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.getAttribute("data-page-link");
      if (!target) return;

      // Tüm üst linklerden is-active'i kaldır
      topnavLinks.forEach((l) => l.classList.remove("is-active"));
      // Sadece tıklananı aktif yap
      link.classList.add("is-active");

      // İlgili sayfayı göster (music / cover)
      showPage(target);
    });
  });

  // Başlangıç: music sayfasını göster (HTML'de zaten Anasayfa aktif)
  showPage("music");

  /* ===================== MÜZİK İÇİ SEKME GEÇİŞLERİ ===================== */

  const musicViews = document.querySelectorAll(".music-view");

  function showMusicView(viewName) {
    musicViews.forEach((view) => {
      const isTarget = view.dataset.musicView === viewName;
      view.classList.toggle("is-active", isTarget);
    });

    document.querySelectorAll("[data-music-tab]").forEach((btn) => {
      const target = btn.getAttribute("data-music-tab");
      btn.classList.toggle("is-active", target === viewName);
    });
  }

  document.querySelectorAll("[data-music-tab]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-music-tab");
      if (!target) return;
      showMusicView(target);
    });
  });

  // Başlangıç: Geleneksel
  showMusicView("geleneksel");

  /* ===================== ÇALIŞMA MODU (Basit / Gelişmiş) ===================== */

  const modeButtons = document.querySelectorAll(".mode-btn[data-mode-button]");
  const advancedSections = document.querySelectorAll(
    ".advanced-section[data-visible-in]"
  );
  const body = document.body;

  function setMode(mode) {
    body.setAttribute("data-mode", mode);

    modeButtons.forEach((btn) => {
      const btnMode = btn.getAttribute("data-mode-button");
      btn.classList.toggle("is-active", btnMode === mode);
    });

    advancedSections.forEach((section) => {
      const visibleIn = section.getAttribute("data-visible-in") || "";
      const shouldShow = visibleIn
        .split(",")
        .map((s) => s.trim())
        .includes(mode);
      section.style.display = shouldShow ? "" : "none";
    });
  }

  modeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const mode = btn.getAttribute("data-mode-button");
      if (!mode) return;
      setMode(mode);
    });
  });

  // Başlangıç modu: advanced
  setMode("advanced");

  /* ===================== KREDİ / PRICING MODAL ===================== */

  const pricingModal = document.getElementById("pricingModal");
  const pricingBackdrop = pricingModal?.querySelector(".pricing-backdrop");
  const closePricingBtn = document.getElementById("closePricing");

  function openPricing() {
    if (!pricingModal) return;
    pricingModal.classList.add("is-open");
  }

  function closePricing() {
    if (!pricingModal) return;
    pricingModal.classList.remove("is-open");
  }

  document.querySelectorAll("[data-open-pricing]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openPricing();
    });
  });

  if (closePricingBtn) closePricingBtn.addEventListener("click", closePricing);
  if (pricingBackdrop) pricingBackdrop.addEventListener("click", closePricing);

  /* ===================== SES KAYIT MODALI + UI AKIŞI ===================== */

  const recordBtn = document.getElementById("recordBtn");
  const recordingOverlay = document.getElementById("recordingOverlay");
  const modalStopBtn = document.getElementById("modalStopBtn");
  const modalCancelBtn = document.getElementById("modalCancelBtn");

  const recordingTimerEl = document.getElementById("recordingTimer");
  const recordingRemainingEl = document.getElementById("recordingRemaining");
  const recordingProgressBar = document.getElementById("recordingProgressBar");
  const recordMainTimerEl = document.getElementById("recordMainTimer");

  const recordMainTitleEl = document.getElementById("recordMainTitle");
  const recordMainDescEl = document.getElementById("recordMainDescription");

  const recordResultCard = document.getElementById("recordResultCard");
  const recordedDurationEl = document.getElementById("recordedDuration");

  const recordCircle = document.querySelector(".record-circle");

  const MAX_SECONDS = 120; // 2 dk
  let isRecording = false;
  let startTime = null;
  let recordInterval = null;

  function formatTime(sec) {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  }

  function openRecordingModal() {
    if (!recordingOverlay) return;
    recordingOverlay.classList.add("is-open");
  }

  function closeRecordingModal() {
    if (!recordingOverlay) return;
    recordingOverlay.classList.remove("is-open");
  }

  function startRecordingUI() {
    isRecording = true;
    startTime = Date.now();

    if (recordBtn) {
      recordBtn.textContent = "⏹ Kaydı Durdur";
      recordBtn.classList.add("recording");
    }

    if (recordMainTitleEl) recordMainTitleEl.textContent = "Kayıt Devam Ediyor.";
    if (recordMainDescEl)
      recordMainDescEl.textContent = "Kaydı durdurmak için butona tıklayın.";

    if (recordMainTimerEl) recordMainTimerEl.textContent = "00:00";
    if (recordingTimerEl) recordingTimerEl.textContent = "00:00";
    if (recordingRemainingEl)
      recordingRemainingEl.textContent = formatTime(MAX_SECONDS);
    if (recordingProgressBar) recordingProgressBar.style.width = "0%";

    openRecordingModal();

    // Buraya gerçek getUserMedia kaydını bağlayabilirsin:
    // startMicrophoneRecording();

    recordInterval = setInterval(() => {
      const diffMs = Date.now() - startTime;
      const diffSec = Math.floor(diffMs / 1000);
      const remaining = Math.max(0, MAX_SECONDS - diffSec);

      const tStr = formatTime(diffSec);
      if (recordMainTimerEl) recordMainTimerEl.textContent = tStr;
      if (recordingTimerEl) recordingTimerEl.textContent = tStr;
      if (recordingRemainingEl)
        recordingRemainingEl.textContent = formatTime(remaining);

      const percent = Math.min(100, (diffSec / MAX_SECONDS) * 100);
      if (recordingProgressBar) {
        recordingProgressBar.style.width = percent + "%";
      }

      if (diffSec >= MAX_SECONDS) {
        stopRecordingUI(true);
      }
    }, 250);
  }

  function stopRecordingUI(autoByLimit = false) {
    isRecording = false;

    if (recordBtn) {
      recordBtn.textContent = "⏺ Kaydı Başlat";
      recordBtn.classList.remove("recording");
    }

    if (recordMainTitleEl)
      recordMainTitleEl.textContent = "Ses Kaydetmeye Başlayın";
    if (recordMainDescEl)
      recordMainDescEl.textContent = "Butona tıklayarak kayıt modunu açın.";

    if (recordInterval) {
      clearInterval(recordInterval);
      recordInterval = null;
    }

    const diffSec = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
    const tStr = formatTime(diffSec);

    if (recordMainTimerEl) recordMainTimerEl.textContent = tStr;
    if (recordedDurationEl) recordedDurationEl.textContent = tStr;

    closeRecordingModal();

    // stopMicrophoneRecording();

    if (recordResultCard && !autoByLimit) {
      recordResultCard.classList.add("is-visible");
    }
  }

  function cancelRecordingUI() {
    isRecording = false;

    if (recordBtn) {
      recordBtn.textContent = "⏺ Kaydı Başlat";
      recordBtn.classList.remove("recording");
    }

    if (recordMainTitleEl)
      recordMainTitleEl.textContent = "Ses Kaydetmeye Başlayın";
    if (recordMainDescEl)
      recordMainDescEl.textContent = "Butona tıklayarak kayıt modunu açın.";

    if (recordInterval) {
      clearInterval(recordInterval);
      recordInterval = null;
    }

    closeRecordingModal();
    if (recordMainTimerEl) recordMainTimerEl.textContent = "00:00";

    // cancelMicrophoneRecording();
  }

  // Ana kayıt butonu
  if (recordBtn) {
    recordBtn.addEventListener("click", () => {
      if (!isRecording) {
        startRecordingUI();
      } else {
        stopRecordingUI(false);
      }
    });
  }

  // Yuvarlak kayıt dairesi de buton gibi çalışsın
  if (recordCircle && recordBtn) {
    recordCircle.style.cursor = "pointer";
    recordCircle.addEventListener("click", () => {
      recordBtn.click();
    });
  }

  // Modal içi butonlar
  if (modalStopBtn) {
    modalStopBtn.addEventListener("click", () => {
      if (isRecording) {
        stopRecordingUI(false);
      }
    });
  }

  if (modalCancelBtn) {
    modalCancelBtn.addEventListener("click", cancelRecordingUI);
  }
});
