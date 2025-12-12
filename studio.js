// =====================================================
// AIVO STUDIO – STUDIO.JS
// FULL CLEAN / STABLE / NO CONFLICT
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     GENEL YARDIMCI
     ===================================================== */
  const qs  = (s, p = document) => p.querySelector(s);
  const qsa = (s, p = document) => [...p.querySelectorAll(s)];

  /* =====================================================
     SAYFA GEÇİŞLERİ (MÜZİK / KAPAK)
     ===================================================== */
  const pages = qsa(".page");
  const pageLinks = qsa("[data-page-link]");

  function switchPage(target) {
    pages.forEach(p => {
      p.classList.toggle("is-active", p.dataset.page === target);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  pageLinks.forEach(link => {
    link.addEventListener("click", e => {
      const target = link.dataset.pageLink;
      if (!target) return;
      e.preventDefault();

      pageLinks.forEach(l => {
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

  /* =====================================================
     SOL MENÜ – MÜZİK VIEW GEÇİŞLERİ
     (Geleneksel / Ses Kaydı / AI Video)
     ===================================================== */
  const musicViews = qsa(".music-view");
  const musicTabs  = qsa(".sidebar-sublink[data-music-tab]");

  let recordController = null;

  function switchMusicView(key) {
    musicViews.forEach(v => {
      v.classList.toggle("is-active", v.dataset.musicView === key);
    });

    if (recordController && key !== "ses-kaydi") {
      recordController.forceStopAndReset();
    }
  }

  musicTabs.forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.musicTab;
      if (!key) return;

      musicTabs.forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      switchMusicView(key);
    });
  });

  switchMusicView("geleneksel");

  /* =====================================================
     BASİT / GELİŞMİŞ MOD
     ===================================================== */
  const body = document.body;
  const modeBtns = qsa("[data-mode-button]");
  const advancedEls = qsa("[data-visible-in='advanced']");
  const basicEls = qsa("[data-visible-in='basic']");

  function setMode(mode) {
    body.setAttribute("data-mode", mode);

    modeBtns.forEach(b => {
      b.classList.toggle("is-active", b.dataset.modeButton === mode);
    });

    advancedEls.forEach(el => {
      el.classList.toggle("hidden", mode === "basic");
    });

    basicEls.forEach(el => {
      el.classList.toggle("hidden", mode !== "basic");
    });
  }

  modeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      setMode(btn.dataset.modeButton);
    });
  });

  setMode("advanced");

  /* =====================================================
     KREDİ MODALI
     ===================================================== */
  const pricingModal = qs("#pricingModal");
  const creditsBtn = qs("#creditsButton");
  const closePricing = qs("#closePricing");
  const pricingLinks = qsa("[data-open-pricing]");

  function openPricing() {
    pricingModal?.classList.add("is-open");
  }
  function closePricingModal() {
    pricingModal?.classList.remove("is-open");
  }

  creditsBtn?.addEventListener("click", e => {
    e.preventDefault();
    openPricing();
  });

  pricingLinks.forEach(l => {
    l.addEventListener("click", e => {
      e.preventDefault();
      openPricing();
    });
  });

  closePricing?.addEventListener("click", closePricingModal);
  qs(".pricing-backdrop", pricingModal)?.addEventListener("click", closePricingModal);

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closePricingModal();
  });

  /* =====================================================
     MÜZİK ÜRET – LOADING
     ===================================================== */
  const musicBtn = qs("#musicGenerateBtn");
  musicBtn?.addEventListener("click", () => {
    if (musicBtn.classList.contains("is-loading")) return;
    const txt = musicBtn.textContent;
    musicBtn.classList.add("is-loading");
    musicBtn.textContent = "Üretiliyor...";
    setTimeout(() => {
      musicBtn.classList.remove("is-loading");
      musicBtn.textContent = txt;
      console.log("Müzik üretim API çağrısı burada.");
    }, 1200);
  });

  /* =====================================================
     KAPAK ÜRET – LOADING
     ===================================================== */
  const coverBtn = qs("#coverGenerateBtn");
  coverBtn?.addEventListener("click", () => {
    if (coverBtn.classList.contains("is-loading")) return;
    const txt = coverBtn.textContent;
    coverBtn.classList.add("is-loading");
    coverBtn.textContent = "Kapak üretiliyor...";
    setTimeout(() => {
      coverBtn.classList.remove("is-loading");
      coverBtn.textContent = txt;
      console.log("Kapak üretim API çağrısı burada.");
    }, 1400);
  });

  /* =====================================================
     SES KAYDI – GÖRSEL SİMÜLASYON
     ===================================================== */
  const sesView = qs('.music-view[data-music-view="ses-kaydi"]');

  if (sesView) {
    const circle = qs(".record-circle", sesView);
    const button = qs(".record-btn", sesView);
    const timerEl = qs(".record-timer", sesView);
    const title = qs(".record-main-title", sesView);
    const resultCard = qs("#recordResult", sesView);
    const resultTime = qs("#recordResultTime", sesView);

    let isRecording = false;
    let startTime = 0;
    let timerInt = null;
    let lastMs = 0;

    const format = ms => {
      const s = Math.floor(ms / 1000);
      return `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
    };

    function startTimer() {
      startTime = Date.now();
      timerEl.textContent = "00:00";
      timerInt = setInterval(() => {
        timerEl.textContent = format(Date.now() - startTime);
      }, 200);
    }

    function stopTimer() {
      clearInterval(timerInt);
      timerInt = null;
      lastMs = Date.now() - startTime;
    }

    function setUI(active) {
      isRecording = active;
      document.body.classList.toggle("is-recording", active);
      circle.classList.toggle("is-recording", active);

      title.textContent = active ? "Kayıt Devam Ediyor" : "Ses Kaydetmeye Başlayın";
      button.textContent = active ? "⏹ Kaydı Durdur" : "⏺ Kaydı Başlat";

      if (active) {
        resultCard.style.display = "none";
        startTimer();
      } else {
        stopTimer();
        if (lastMs >= 500) {
          resultTime.textContent = format(lastMs);
          resultCard.style.display = "flex";
        }
      }
    }

    function toggle() {
      setUI(!isRecording);
    }

    circle?.addEventListener("click", toggle);
    button?.addEventListener("click", e => {
      e.preventDefault();
      toggle();
    });

    recordController = {
      forceStopAndReset() {
        clearInterval(timerInt);
        document.body.classList.remove("is-recording");
        circle.classList.remove("is-recording");
        title.textContent = "Ses Kaydetmeye Başlayın";
        button.textContent = "⏺ Kaydı Başlat";
        timerEl.textContent = "00:00";
        resultCard.style.display = "none";
        isRecording = false;
      }
    };
  }

  /* =====================================================
     AI VIDEO ÜRET – TAB SİSTEMİ
     ===================================================== */
  const videoTabs = qsa(".video-tab");
  const videoViews = qsa(".video-view");

  function switchVideoTab(key) {
    videoTabs.forEach(t =>
      t.classList.toggle("is-active", t.dataset.aivideoTab === key)
    );
    videoViews.forEach(v =>
      v.classList.toggle("is-active", v.dataset.aivideoView === key)
    );
  }

  videoTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      switchVideoTab(tab.dataset.aivideoTab);
    });
  });

  switchVideoTab("text");

  /* =====================================================
     AI VIDEO – BUTTONLAR
     ===================================================== */
  qs("#videoGenerateTextBtn")?.addEventListener("click", () => {
    console.log("Text → Video üretim isteği (API burada).");
    alert("🎬 Video üretim isteği alındı (simülasyon).");
  });

  qs("#videoGenerateImageBtn")?.addEventListener("click", () => {
    console.log("Image → Video üretim isteği (API burada).");
    alert("🎬 Video üretim isteği alındı (simülasyon).");
  });

});
/* ======================================================
   AIVO – AI VIDEO (JS EK BLOK)  ✅ EN ALTA EKLE
   ====================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* =============================
     VIDEO TAB SWITCH (TEXT / IMAGE)
     ============================= */
  const videoTabs = document.querySelectorAll(".video-tab[data-video-tab]");
  const videoViews = document.querySelectorAll(".video-view[data-video-view]");
  const creditBadges = document.querySelectorAll(".badge-beta");

  function switchVideoTab(target) {
    videoTabs.forEach((tab) => {
      tab.classList.toggle("is-active", tab.dataset.videoTab === target);
    });

    videoViews.forEach((view) => {
      view.classList.toggle("is-active", view.dataset.videoView === target);
    });

    // Kredi etiketlerini garanti altına al
    creditBadges.forEach((badge) => {
      if (target === "text" && badge.textContent.includes("Kredi")) {
        if (badge.closest('[data-video-view="text"]')) badge.textContent = "15 Kredi";
      }
      if (target === "image" && badge.textContent.includes("Kredi")) {
        if (badge.closest('[data-video-view="image"]')) badge.textContent = "25 Kredi";
      }
    });
  }

  videoTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.videoTab;
      if (!target) return;
      switchVideoTab(target);
    });
  });

  /* =============================
     PROMPT KARAKTER SAYAÇLARI
     ============================= */
  function bindCounter(textareaId, counterId, max) {
    const textarea = document.getElementById(textareaId);
    const counter = document.getElementById(counterId);
    if (!textarea || !counter) return;

    const update = () => {
      const len = textarea.value.length;
      counter.textContent = `${len} / ${max}`;
    };

    textarea.addEventListener("input", update);
    update();
  }

  // Yazıdan video (1000)
  bindCounter("videoPrompt", "videoPromptCounter", 1000);

  // Resimden video – canlandırma promptu (500)
  bindCounter("videoImagePrompt", "videoImagePromptCounter", 500);

  /* =============================
     GENERATE BUTONLARI (UI LOADING)
     ============================= */
  const textBtn = document.getElementById("videoGenerateTextBtn");
  const imageBtn = document.getElementById("videoGenerateImageBtn");

  function attachLoading(btn, text) {
    if (!btn) return;
    btn.addEventListener("click", () => {
      if (btn.classList.contains("is-loading")) return;

      const original = btn.textContent;
      btn.classList.add("is-loading");
      btn.textContent = text;

      setTimeout(() => {
        btn.classList.remove("is-loading");
        btn.textContent = original;
        console.log("AI Video isteği API'ye gönderilecek.");
      }, 1400);
    });
  }

  attachLoading(textBtn, "🎬 Video Oluşturuluyor...");
  attachLoading(imageBtn, "🎞 Video Oluşturuluyor...");

  /* =============================
     IMAGE INPUT – GÖRSEL SEÇİM KONTROL
     ============================= */
  const imageInput = document.getElementById("videoImageInput");
  if (imageInput) {
    imageInput.addEventListener("change", () => {
      if (!imageInput.files || !imageInput.files[0]) return;
      console.log("Seçilen görsel:", imageInput.files[0].name);
    });
  }
});

