// AIVO STUDIO – STUDIO.JS (TEMİZ SÜRÜM)
document.addEventListener("DOMContentLoaded", () => {
  // ==========================
  // YARDIMCI FONKSİYONLAR
  // ==========================
  const $ = (sel, parent = document) => parent.querySelector(sel);
  const $$ = (sel, parent = document) => Array.from(parent.querySelectorAll(sel));

  // ==========================
  // SAYFA GEÇİŞLERİ (TOP NAV)
  // ==========================
  const pages = $$(".page");
  const topnavLinks = $$(".topnav-link");

  topnavLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const pageKey = link.dataset.pageLink;
      if (!pageKey) return;

      // Topnav aktiflik
      topnavLinks.forEach((lnk) => lnk.classList.remove("is-active"));
      link.classList.add("is-active");

      // Page göster/gizle
      pages.forEach((page) => {
        const key = page.dataset.page;
        page.classList.toggle("is-active", key === pageKey);
      });
    });
  });

  // Varsayılan: music sayfası açık kalsın
  const firstPage = $('.page[data-page="music"]');
  if (firstPage) firstPage.classList.add("is-active");

  // ==========================
  // SOL MENÜ – MÜZİK TABS
  // ==========================
  const musicTabs = $$("[data-music-tab]");
  const musicViews = $$("[data-music-view]");

  musicTabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.musicTab;

      musicTabs.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      musicViews.forEach((view) => {
        view.classList.toggle("is-active", view.dataset.musicView === target);
      });
    });
  });

  // Başlangıçta "geleneksel" açılsın
  const gelenekselTab = $('[data-music-tab="geleneksel"]');
  const gelenekselView = $('[data-music-view="geleneksel"]');
  if (gelenekselTab && gelenekselView) {
    gelenekselTab.classList.add("is-active");
    gelenekselView.classList.add("is-active");
  }

  // ==========================
  // ÇALIŞMA MODU (BASİT / GELİŞMİŞ)
  // ==========================
  const modeButtons = $$("[data-mode-button]");
  const body = document.body;
  const advancedSections = $$(".advanced-section");

  const applyMode = (mode) => {
    body.dataset.mode = mode;

    modeButtons.forEach((btn) => {
      const btnMode = btn.dataset.modeButton;
      btn.classList.toggle("is-active", btnMode === mode);
    });

    advancedSections.forEach((sec) => {
      const visibleIn = sec.dataset.visibleIn || "advanced";
      sec.style.display = visibleIn === mode ? "block" : "none";
    });
  };

  modeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const mode = btn.dataset.modeButton || "advanced";
      applyMode(mode);
    });
  });

  // Varsayılan: gelişmiş
  applyMode("advanced");

  // ==========================
  // KREDİ MODAL (PRICING)
  // ==========================
  const pricingModal = $("#pricingModal");
  const openPricingButtons = $$("[data-open-pricing], #creditsButton");
  const closePricingButton = $("#closePricing");

  if (pricingModal) {
    const openPricing = () => pricingModal.classList.add("is-visible");
    const closePricing = () => pricingModal.classList.remove("is-visible");

    openPricingButtons.forEach((btn) =>
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        openPricing();
      })
    );

    if (closePricingButton) {
      closePricingButton.addEventListener("click", (e) => {
        e.preventDefault();
        closePricing();
      });
    }

    const backdrop = $(".pricing-backdrop", pricingModal);
    if (backdrop) {
      backdrop.addEventListener("click", closePricing);
    }
  }

  // ==========================
  // SES KAYDI – DEĞİŞKENLER
  // ==========================
  const recordCard = $(".record-main-card");
  const recordToggleBtn = $("#recordToggleBtn");
  const recordTimerEl = $("#recordTimer");
  const recordingOverlay = $("#recordingOverlay");
  const overlayStopBtn = $("#overlayStopBtn");
  const overlayCancelBtn = $("#overlayCancelBtn");

  const resultCard = $("#recordResultCard");
  const resultTimeEl = $("#recordResultTime");
  const resultPlayBtn = $("#resultPlayBtn");
  const resultDownloadBtn = $("#resultDownloadBtn");
  const resultMusicBtn = $("#resultMusicBtn");
  const resultDeleteBtn = $("#resultDeleteBtn");

  const fileInput = $("#record-file-input");

  let mediaRecorder = null;
  let recordChunks = [];
  let recordTimer = null;
  let recordSeconds = 0;
  let recordedUrl = null;
  let audioPlayer = null;

  // ==========================
  // ZAMAN FORMAT
  // ==========================
  const formatTime = (totalSec) => {
    const m = String(Math.floor(totalSec / 60)).padStart(2, "0");
    const s = String(totalSec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  // ==========================
  // OVERLAY AÇ/KAPAT
  // ==========================
  const openOverlay = () => {
    if (recordingOverlay) {
      recordingOverlay.classList.add("is-visible");
    }
  };

  const closeOverlay = () => {
    if (recordingOverlay) {
      recordingOverlay.classList.remove("is-visible");
    }
  };

  // ==========================
  // SONUÇ KARTI
  // ==========================
  const showResultCard = (durationSec) => {
    if (!resultCard) return;

    if (resultTimeEl) {
      resultTimeEl.textContent = formatTime(durationSec);
    }
    resultCard.classList.add("is-visible");
  };

  const hideResultCard = () => {
    if (!resultCard) return;
    resultCard.classList.remove("is-visible");

    if (audioPlayer) {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
    }
    if (recordedUrl) {
      URL.revokeObjectURL(recordedUrl);
      recordedUrl = null;
    }
  };

  // ==========================
  // KAYIT ZAMANLAYICI
  // ==========================
  const startTimer = () => {
    recordSeconds = 0;
    if (recordTimerEl) recordTimerEl.textContent = "00:00";

    recordTimer = setInterval(() => {
      recordSeconds += 1;
      if (recordTimerEl) recordTimerEl.textContent = formatTime(recordSeconds);
    }, 1000);
  };

  const stopTimer = () => {
    if (recordTimer) {
      clearInterval(recordTimer);
      recordTimer = null;
    }
  };

  // ==========================
  // KAYIT BAŞLAT
  // ==========================
  const startRecording = async () => {
    if (!recordToggleBtn || !recordCard) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      recordChunks = [];
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) recordChunks.push(e.data);
      };
      mediaRecorder.onstop = () => {
        const blob = new Blob(recordChunks, { type: "audio/mp3" });
        recordedUrl = URL.createObjectURL(blob);
        audioPlayer = new Audio(recordedUrl);

        showResultCard(recordSeconds);
      };

      mediaRecorder.start();

      // UI
      recordCard.classList.add("is-recording");
      if (recordToggleBtn) {
        recordToggleBtn.textContent = "⏹ Kaydı Durdur";
      }
      startTimer();
      openOverlay();
    } catch (err) {
      console.error("Mikrofon hatası:", err);
      alert("Mikrofon izni alınamadı veya desteklenmiyor.");
    }
  };

  // ==========================
  // KAYIT DURDUR
  // ==========================
  const stopRecording = () => {
    if (!recordToggleBtn || !recordCard) return;

    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
    }
    stopTimer();
    recordCard.classList.remove("is-recording");
    closeOverlay();

    if (recordToggleBtn) {
      recordToggleBtn.textContent = "⏺ Kaydı Başlat";
    }
  };

  // ==========================
  // KAYIT BUTONU
  // ==========================
  if (recordToggleBtn) {
    recordToggleBtn.addEventListener("click", () => {
      if (mediaRecorder && mediaRecorder.state === "recording") {
        stopRecording();
      } else {
        startRecording();
      }
    });
  }

  // ==========================
  // OVERLAY BUTONLARI
  // ==========================
  if (overlayStopBtn) {
    overlayStopBtn.addEventListener("click", () => {
      stopRecording();
    });
  }

  if (overlayCancelBtn) {
    overlayCancelBtn.addEventListener("click", () => {
      // Kaydı tamamen iptal et
      stopRecording();
      hideResultCard();
    });
  }

  // ==========================
  // MP3 YÜKLEME (FILE INPUT)
  // ==========================
  if (fileInput) {
    fileInput.addEventListener("change", () => {
      const file = fileInput.files[0];
      if (!file) return;

      if (!file.type.startsWith("audio/")) {
        alert("Lütfen bir ses dosyası seçin (MP3).");
        return;
      }

      if (recordedUrl) {
        URL.revokeObjectURL(recordedUrl);
      }

      recordedUrl = URL.createObjectURL(file);
      audioPlayer = new Audio(recordedUrl);
      recordSeconds = Math.floor(file.duration || 5); // Bilinmiyorsa tahmini

      showResultCard(recordSeconds || 5);
    });
  }

  // ==========================
  // SONUÇ KARTI BUTONLARI
  // ==========================
  if (resultPlayBtn) {
    resultPlayBtn.addEventListener("click", () => {
      if (!audioPlayer) return;
      if (audioPlayer.paused) {
        audioPlayer.currentTime = 0;
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }
    });
  }

  if (resultDownloadBtn) {
    resultDownloadBtn.addEventListener("click", () => {
      if (!recordedUrl) return;

      const a = document.createElement("a");
      a.href = recordedUrl;
      a.download = "aivo-kayit.mp3";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }

  if (resultMusicBtn) {
    resultMusicBtn.addEventListener("click", () => {
      alert(
        "Bu kayıt ileride müzik üretiminde referans ses olarak kullanılacak (MVP'de sadece görsel)."
      );
    });
  }

  if (resultDeleteBtn) {
    resultDeleteBtn.addEventListener("click", () => {
      hideResultCard();
    });
  }
});
