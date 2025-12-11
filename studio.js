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

      // Tüm linklerden is-active'i kaldır (kredi linkleri hariç)
      pageLinks.forEach((l) => {
        if (!l.hasAttribute("data-open-pricing")) {
          l.classList.remove("is-active");
        }
      });

      // Tıklanan link aktif
      if (!link.hasAttribute("data-open-pricing")) {
        link.classList.add("is-active");
      }

      switchPage(target);
    });
  });

  /* =========================================
     SOL MENÜ – MÜZİK ALT SEKME GEÇİŞLERİ
     (Geleneksel / Ses Kaydı / Vokale Göre)
     ========================================= */
  const musicViews = document.querySelectorAll(".music-view");
  const musicTabButtons = document.querySelectorAll(
    ".sidebar-sublink[data-music-tab]"
  );

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

        // Sol menü aktif buton
        musicTabButtons.forEach((b) => {
          b.classList.toggle("is-active", b === btn);
        });

        // Orta panel görünümü
        switchMusicView(target);
      });
    });

    // Varsayılan: geleneksel
    switchMusicView("geleneksel");
  }

  /* =========================================
     ÇALIŞMA MODU (BASİT / GELİŞMİŞ)
     ========================================= */
  const body = document.body;
  const modeButtons = document.querySelectorAll("[data-mode-button]");
  const advancedSections = document.querySelectorAll(
    "[data-visible-in='advanced']"
  );
  const basicSections = document.querySelectorAll("[data-visible-in='basic']");

  function updateMode(mode) {
    body.setAttribute("data-mode", mode);

    modeButtons.forEach((btn) => {
      const btnMode = btn.getAttribute("data-mode-button");
      btn.classList.toggle("is-active", btnMode === mode);
    });

    // Gelişmiş alanları göster/gizle
    advancedSections.forEach((el) => {
      if (mode === "basic") el.classList.add("hidden");
      else el.classList.remove("hidden");
    });

    // Basic alanlar (varsa) için
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

  // Varsayılan: Gelişmiş Mod
  updateMode("advanced");

  /* =========================================
     KREDİ MODALI (PRICING)
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
    if (backdrop) {
      backdrop.addEventListener("click", closePricingModal);
    }

    // ESC ile kapatma
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
     SES KAYDI – GÖRSEL KAYIT + MODAL + SONUÇ
     ========================================= */
  const sesView = document.querySelector('.music-view[data-music-view="ses-kaydi"]');
  if (sesView) {
    const mainCard = sesView.querySelector(".record-main-card");
    const circle = sesView.querySelector(".record-circle");
    const button = sesView.querySelector(".record-btn");
    const title = sesView.querySelector(".record-main-title");
    const timerEl = sesView.querySelector(".record-timer");
    const bodyEl = document.body;

    // Yeni elemanlar
    const sessionPanel = sesView.querySelector(".record-session-panel");
    const sessionTimerEl = sesView.querySelector("#recordSessionTimer");
    const sessionStopBtn = sesView.querySelector("[data-session-stop]");
    const sessionCancelBtn = sesView.querySelector("[data-session-cancel]");
    const resultCard = sesView.querySelector(".record-result-card");
    const resultDurationEl = sesView.querySelector("#record-result-duration");

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
      startTime = Date.now();
      if (timerEl) timerEl.textContent = "00:00";
      if (sessionTimerEl) sessionTimerEl.textContent = "00:00";

      timerInterval = setInterval(() => {
        const diff = Date.now() - startTime;
        const formatted = formatTime(diff);
        if (timerEl) timerEl.textContent = formatted;
        if (sessionTimerEl) sessionTimerEl.textContent = formatted;
      }, 200);
    }

    function stopTimer() {
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
      if (startTime) {
        lastDurationMs = Date.now() - startTime;
      }
    }

    function toggleRecordingVisual() {
      isRecording = !isRecording;

      if (circle) {
        circle.classList.toggle("is-recording", isRecording);
      }
      if (mainCard) {
        mainCard.classList.toggle("is-recording", isRecording);
      }
      if (title) {
        title.textContent = isRecording
          ? "Kayıt Devam Ediyor"
          : "Ses Kaydetmeye Başlayın";
      }
      if (button) {
        button.textContent = isRecording
          ? "⏹ Kaydı Durdur"
          : "⏺ Kaydı Başlat";
      }

      // body class → waveform animasyonu için
      if (isRecording) {
        bodyEl.classList.add("is-recording");

        // Modal aç
        if (sessionPanel) {
          sessionPanel.classList.add("is-open");
        }
        // Eski sonucu gizle
        if (resultCard) {
          resultCard.classList.remove("is-visible");
        }

        startTimer();
      } else {
        bodyEl.classList.remove("is-recording");
        stopTimer();

        // Modal kapat
        if (sessionPanel) {
          sessionPanel.classList.remove("is-open");
        }

        // Süreyi sonuç kartına yaz
        if (resultCard) {
          resultCard.classList.add("is-visible");
        }
        if (resultDurationEl && lastDurationMs > 0) {
          resultDurationEl.textContent = formatTime(lastDurationMs);
        }
      }
    }

    // Çembere tıklayınca
    if (circle) {
      circle.style.cursor = "pointer";
      circle.addEventListener("click", toggleRecordingVisual);
    }

    // Ana butona tıklayınca
    if (button) {
      button.addEventListener("click", toggleRecordingVisual);
    }

    // Modal içindeki "Kaydı Durdur"
    if (sessionStopBtn) {
      sessionStopBtn.addEventListener("click", toggleRecordingVisual);
    }

    // Modal içindeki "İptal" – kaydı sonlandır, sonucu gösterme
    if (sessionCancelBtn) {
      sessionCancelBtn.addEventListener("click", () => {
        if (isRecording) {
          toggleRecordingVisual();
        }
        if (resultCard) {
          resultCard.classList.remove("is-visible");
        }
      });
    }
  }

});
