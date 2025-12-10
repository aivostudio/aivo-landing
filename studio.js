document.addEventListener("DOMContentLoaded", () => {
  /* ======================================
     SAYFA (Müzik / Kapak) GEÇİŞLERİ
     ====================================== */
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

      // "Kredi Al" linkleri hariç diğerlerinden is-active'i kaldır
      pageLinks.forEach((l) => {
        if (!l.hasAttribute("data-open-pricing")) {
          l.classList.remove("is-active");
        }
      });

      if (!link.hasAttribute("data-open-pricing")) {
        link.classList.add("is-active");
      }

      e.preventDefault();
      switchPage(target);
    });
  });

  /* ======================================
     SOL MENÜ: MÜZİK ÜRET ALT MENÜ AÇ/KAPA
     ====================================== */
  const submenuToggles = document.querySelectorAll("[data-submenu-toggle]");

  submenuToggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-submenu-toggle");
      const submenu = document.querySelector(`[data-submenu="${key}"]`);
      if (!submenu) return;

      submenu.classList.toggle("is-open");
      btn.classList.toggle("is-open");
    });
  });

  /* ======================================
     MOD SWITCH (BASİT / GELİŞMİŞ)
     ====================================== */
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
      updateMode(mode);
    });
  });

  // Varsayılan: Gelişmiş mod
  updateMode("advanced");

  /* ======================================
     PRICING MODAL / KREDİ AL
     ====================================== */
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
    creditsButton.addEventListener("click", openPricing);
  }

  openPricingLinks.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      openPricing();
    });
  });

  if (closePricing) {
    closePricing.addEventListener("click", closePricingModal);
  }

  if (pricingModal) {
    const backdrop = pricingModal.querySelector(".pricing-backdrop");
    if (backdrop) backdrop.addEventListener("click", closePricingModal);
  }

  /* ======================================
     MÜZİK ÜRET BUTONU (UI FEEDBACK)
     ====================================== */
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

  /* ======================================
     KAPAK ÜRET BUTONU (UI FEEDBACK)
     ====================================== */
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

  /* ======================================
     MÜZİK ALT SEKME GEÇİŞLERİ
     (GELENEKSEL / SES KAYDI / VOKALE GÖRE)
     ====================================== */
  const musicViews = document.querySelectorAll(".music-view");
  const musicTabButtons = document.querySelectorAll(".sidebar-sublink[data-music-tab]");

  if (musicViews.length && musicTabButtons.length) {
    musicTabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-music-tab");
        if (!target) return;

        musicTabButtons.forEach((b) => {
          b.classList.toggle("is-active", b === btn);
        });

        musicViews.forEach((view) => {
          const viewKey = view.getAttribute("data-music-view");
          view.classList.toggle("is-active", viewKey === target);
        });
      });
    });
  }

  /* ======================================
     SES KAYDI – STATE MAKİNESİ
     idle → recording → finished
     ====================================== */
  const recordView = document.querySelector('.music-view[data-music-view="ses-kaydi"]');
  if (recordView) {
    const recordMainCard = recordView.querySelector(".record-main-card");
    const recordCircle = document.getElementById("recordCircle");
    const recordBtn = document.getElementById("recordToggleBtn");
    const recordTimer = document.getElementById("recordTimer");
    const recordStatusPill = document.getElementById("recordStatusPill");

    const recordOverlay = document.getElementById("recordOverlay");
    const overlayTimer = document.getElementById("overlayTimer");
    const overlayRemaining = document.getElementById("overlayRemaining");
    const overlayStopBtn = document.getElementById("overlayStopBtn");
    const overlayCancelBtn = document.getElementById("overlayCancelBtn");

    const recordResultCard = document.getElementById("recordResultCard");
    const recordResultDuration = document.getElementById("recordResultDuration");

    const playBtn = document.querySelector("[data-record-action='play']");
    const downloadBtn = document.querySelector("[data-record-action='download']");
    const toMusicBtn = document.querySelector("[data-record-action='to-music']");
    const deleteBtn = document.querySelector("[data-record-action='delete']");

    let recordState = "idle"; // "idle" | "recording" | "finished"
    let timerInterval = null;
    let elapsedSec = 0;
    const MAX_SECONDS = 120;

    function formatTime(sec) {
      const m = String(Math.floor(sec / 60)).padStart(2, "0");
      const s = String(sec % 60).padStart(2, "0");
      return `${m}:${s}`;
    }

    function syncTimers() {
      if (recordTimer) recordTimer.textContent = formatTime(elapsedSec);
      if (overlayTimer) overlayTimer.textContent = formatTime(elapsedSec);

      const remaining = Math.max(0, MAX_SECONDS - elapsedSec);
      if (overlayRemaining) overlayRemaining.textContent = formatTime(remaining);
    }

    function startTimer() {
      stopTimer();
      elapsedSec = 0;
      syncTimers();

      timerInterval = setInterval(() => {
        elapsedSec++;
        if (elapsedSec >= MAX_SECONDS) {
          elapsedSec = MAX_SECONDS;
          syncTimers();
          stopTimer();
          setRecordState("finished");
          return;
        }
        syncTimers();
      }, 1000);
    }

    function stopTimer() {
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
    }

    function setRecordState(nextState) {
      recordState = nextState;

      if (recordMainCard) {
        recordMainCard.dataset.recordState = nextState;
      }

      // Body + daire rengi
      body.classList.toggle("is-recording", nextState === "recording");
      if (recordCircle) {
        recordCircle.classList.toggle("is-recording", nextState === "recording");
      }

      if (nextState === "idle") {
        stopTimer();
        elapsedSec = 0;
        syncTimers();

        if (recordBtn) recordBtn.textContent = "⏺ Kaydı Başlat";
        if (recordStatusPill) recordStatusPill.textContent = "Hazır";

        if (recordOverlay) recordOverlay.classList.remove("is-open");
        if (recordResultCard) recordResultCard.classList.add("is-hidden");
      } else if (nextState === "recording") {
        if (recordBtn) recordBtn.textContent = "⏹ Kaydı Durdur";
        if (recordStatusPill) recordStatusPill.textContent = "Kayıt yapılıyor";

        if (recordOverlay) recordOverlay.classList.add("is-open");
        if (recordResultCard) recordResultCard.classList.add("is-hidden");

        startTimer();

        // Burada gerçek mikrofon başlatma kodun ileride eklenecek:
        // TODO: getUserMedia + MediaRecorder
      } else if (nextState === "finished") {
        stopTimer();
        if (recordBtn) recordBtn.textContent = "⏺ Yeniden Kaydet";
        if (recordStatusPill) recordStatusPill.textContent = "Kayıt tamamlandı";

        if (recordOverlay) recordOverlay.classList.remove("is-open");
        body.classList.remove("is-recording");

        if (recordResultCard) recordResultCard.classList.remove("is-hidden");
        if (recordResultDuration && recordTimer) {
          recordResultDuration.textContent = recordTimer.textContent;
        }

        // Burada kaydedilen ses blob'unu state'e alabilirsin
      }
    }

    function handleRecordToggle() {
      if (recordState === "idle") {
        setRecordState("recording");
      } else if (recordState === "recording") {
        setRecordState("finished");
      } else if (recordState === "finished") {
        // Yeniden kayda başla
        setRecordState("recording");
      }
    }

    if (recordCircle) {
      recordCircle.style.cursor = "pointer";
      recordCircle.addEventListener("click", handleRecordToggle);
    }

    if (recordBtn) {
      recordBtn.addEventListener("click", handleRecordToggle);
    }

    if (overlayStopBtn) {
      overlayStopBtn.addEventListener("click", () => {
        if (recordState === "recording") {
          setRecordState("finished");
        }
      });
    }

    if (overlayCancelBtn) {
      overlayCancelBtn.addEventListener("click", () => {
        setRecordState("idle");
      });
    }

    // İlk yükleniş
    syncTimers();
    setRecordState("idle");

    /* Sonuç kartındaki aksiyon butonları – şimdilik sadece görsel feedback + log */
    function pulseAction(btn) {
      if (!btn) return;
      btn.classList.remove("is-pressed");
      // reflow
      void btn.offsetWidth;
      btn.classList.add("is-pressed");
      setTimeout(() => btn.classList.remove("is-pressed"), 160);
    }

    if (playBtn) {
      playBtn.addEventListener("click", () => {
        pulseAction(playBtn);
        console.log("Play tıklandı – burada audio element ile çalacaksın.");
      });
    }

    if (downloadBtn) {
      downloadBtn.addEventListener("click", () => {
        pulseAction(downloadBtn);
        console.log("Download tıklandı – blob indirilebilir.");
      });
    }

    if (toMusicBtn) {
      toMusicBtn.addEventListener("click", () => {
        pulseAction(toMusicBtn);
        console.log("Müzik Üret'e gönder – ileride formu doldurmaya bağlanabilir.");
      });
    }

    if (deleteBtn) {
      deleteBtn.addEventListener("click", () => {
        pulseAction(deleteBtn);
        console.log("Kayıt sil tıklandı – state temizlenebilir.");
        setRecordState("idle");
      });
    }
  }
});
