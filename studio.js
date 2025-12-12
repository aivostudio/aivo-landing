// AIVO STUDIO – STUDIO.JS (FULL CLEAN + STABLE + VIDEO OUTPUT RIGHT COLUMN)

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
     AI VIDEO – TAB + COUNTER + COST + OUTPUT LIST
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

  // COST
  const BASE_COST = 15;
  const AUDIO_EXTRA = 3;

  const audioToggle = document.getElementById("videoAudioToggle");
  const costBadges = document.querySelectorAll("[data-video-cost-badge]");
  const hintEl = document.getElementById("videoCostHint");

  function getCurrentVideoCost() {
    const audioOn = !!audioToggle?.checked;
    return audioOn ? BASE_COST + AUDIO_EXTRA : BASE_COST;
  }

  function updateVideoCostUI() {
    const cost = getCurrentVideoCost();
    costBadges.forEach((b) => (b.textContent = `${cost} Kredi`));

    const tBtn = document.getElementById("videoGenerateTextBtn");
    const iBtn = document.getElementById("videoGenerateImageBtn");
    if (tBtn) tBtn.textContent = `🎬 Video Oluştur (${cost} Kredi)`;
    if (iBtn) iBtn.textContent = `🎞 Video Oluştur (${cost} Kredi)`;

    if (hintEl) hintEl.textContent = `Baz ücret: ${BASE_COST} kredi • Ses açıkken +${AUDIO_EXTRA} kredi`;
  }

  if (audioToggle) {
    audioToggle.addEventListener("change", updateVideoCostUI);
  }
  updateVideoCostUI();

  // OUTPUT LIST (RIGHT PANEL)
  const rightEmptyState = document.getElementById("rightEmptyState");
  const rightOutputList = document.getElementById("rightOutputList");

  function setRightEmptyVisible(visible) {
    if (!rightEmptyState) return;
    rightEmptyState.style.display = visible ? "block" : "none";
  }

  // MODAL (BÜYÜT)
  function ensureModal() {
    let modal = document.getElementById("videoModal");
    if (modal) return modal;

    modal = document.createElement("div");
    modal.id = "videoModal";
    modal.style.cssText = `
      position:fixed; inset:0; display:none; align-items:center; justify-content:center;
      z-index:99999;
    `;
    modal.innerHTML = `
      <div class="vm-backdrop" style="position:absolute; inset:0; background:rgba(0,0,0,.75); backdrop-filter: blur(10px);"></div>
      <div class="vm-dialog" style="position:relative; width:min(900px,92vw); background:rgba(12,15,40,.96);
        border:1px solid rgba(255,255,255,.10); border-radius:22px; box-shadow:0 35px 90px rgba(0,0,0,.85);
        overflow:hidden;">
        <div style="display:flex; align-items:center; justify-content:space-between; padding:14px 16px; border-bottom:1px solid rgba(255,255,255,.08);">
          <div style="font-weight:700;">Video Önizleme</div>
          <button id="vmClose" type="button" style="width:38px; height:38px; border-radius:50%;
            border:none; cursor:pointer; background:rgba(255,255,255,.10); color:#fff; font-size:18px;">✕</button>
        </div>
        <div style="padding:16px;">
          <div id="vmTitle" style="font-weight:700; margin-bottom:8px;"></div>
          <div id="vmDesc" style="opacity:.75; font-size:13px; margin-bottom:14px;"></div>
          <div style="aspect-ratio:16/9; border-radius:16px; background:rgba(255,255,255,.06);
            display:flex; align-items:center; justify-content:center;">
            <div style="opacity:.75;">(Gerçek video gelince buraya video tag bağlanacak)</div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector(".vm-backdrop").addEventListener("click", () => (modal.style.display = "none"));
    modal.querySelector("#vmClose").addEventListener("click", () => (modal.style.display = "none"));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") modal.style.display = "none";
    });

    return modal;
  }

  function openVideoModal(title, desc) {
    const modal = ensureModal();
    modal.querySelector("#vmTitle").textContent = title || "Video";
    modal.querySelector("#vmDesc").textContent = desc || "";
    modal.style.display = "flex";
  }

  function createOutputCard({ title, desc, meta }) {
    const card = document.createElement("div");
    card.className = "output-card";
    card.style.cssText = `
      border-radius:18px;
      border:1px solid rgba(255,255,255,0.06);
      background: rgba(5,7,30,0.92);
      overflow:hidden;
      margin-top:12px;
    `;

    card.innerHTML = `
      <div style="display:flex; align-items:center; justify-content:space-between; padding:12px 12px 10px;">
        <div style="display:flex; align-items:center; gap:10px;">
          <span style="width:9px; height:9px; border-radius:50%; background:#2ecc71; box-shadow:0 0 12px rgba(46,204,113,.6);"></span>
          <strong style="font-size:13px;">Tamamlandı</strong>
        </div>
        <div style="font-size:11px; opacity:.7;">${meta || ""}</div>
      </div>

      <div class="output-preview" style="
        aspect-ratio:1/1;
        background: radial-gradient(circle at top left, rgba(108,92,231,.28), transparent 60%),
                    radial-gradient(circle at bottom right, rgba(253,121,168,.22), transparent 65%),
                    rgba(0,0,0,.35);
        display:flex; align-items:center; justify-content:center;
      ">
        <button class="output-play" type="button" style="
          width:56px; height:56px; border-radius:50%;
          border:none; cursor:pointer;
          background: rgba(255,255,255,.10);
          color:#fff; font-size:20px;
          box-shadow: 0 18px 55px rgba(0,0,0,.65);
        ">▶</button>
      </div>

      <div style="padding:10px 12px 12px;">
        <div style="font-weight:700; font-size:12px; margin-bottom:6px; line-height:1.25;">
          ${title || "Video"}
        </div>
        <div style="font-size:12px; opacity:.75; line-height:1.35; margin-bottom:10px;">
          ${desc || ""}
        </div>

        <div class="output-actions" style="
          display:grid;
          grid-template-columns: 1fr 1fr 1fr 44px;
          gap:10px;
          align-items:center;
        ">
          <button class="output-btn dl" type="button" style="
            border:none; cursor:pointer; border-radius:12px; padding:10px 10px;
            background: rgba(116,185,255,.18); color:#fff; font-weight:700; font-size:12px;
          ">İndir</button>

          <button class="output-btn watch" type="button" style="
            border:none; cursor:pointer; border-radius:12px; padding:10px 10px;
            background: rgba(108,92,231,.20); color:#fff; font-weight:700; font-size:12px;
          ">İzle</button>

          <button class="output-btn expand" type="button" style="
            border:none; cursor:pointer; border-radius:12px; padding:10px 10px;
            background: rgba(253,121,168,.18); color:#fff; font-weight:700; font-size:12px;
          ">Büyüt</button>

          <button class="output-btn del" type="button" style="
            width:44px; height:44px;
            border:none; cursor:pointer; border-radius:12px;
            background: rgba(255,118,117,.18); color:#fff; font-weight:900;
          ">🗑</button>
        </div>
      </div>
    `;

    // EVENTS
    card.querySelector(".output-play")?.addEventListener("click", () => openVideoModal(title, desc));
    card.querySelector(".output-btn.watch")?.addEventListener("click", () => openVideoModal(title, desc));
    card.querySelector(".output-btn.expand")?.addEventListener("click", () => openVideoModal(title, desc));

    card.querySelector(".output-btn.dl")?.addEventListener("click", () => {
      console.log("İndir (placeholder) – gerçek video URL gelince indirilecek.");
    });

    card.querySelector(".output-btn.del")?.addEventListener("click", () => {
      card.remove();
      if (rightOutputList && rightOutputList.children.length === 0) setRightEmptyVisible(true);
    });

    return card;
  }

  function addVideoToRightList({ title, desc, meta }) {
    if (!rightOutputList) return;
    setRightEmptyVisible(false);

    const card = createOutputCard({ title, desc, meta });
    rightOutputList.prepend(card);
  }

  function attachVideoGenerate(btnId, getTitleDescFn) {
    const btn = document.getElementById(btnId);
    if (!btn) return;

    btn.addEventListener("click", () => {
      if (btn.classList.contains("is-loading")) return;

      const cost = getCurrentVideoCost();
      const { title, desc } = getTitleDescFn();

      const original = btn.textContent;
      btn.classList.add("is-loading");
      btn.textContent = "Video Oluşturuluyor...";

      setTimeout(() => {
        btn.classList.remove("is-loading");
        btn.textContent = original;

        // ✅ OUTPUT (placeholder)
        addVideoToRightList({
          title: title || "Yeni Video",
          desc: desc || "—",
          meta: `1080p • ${cost} kredi`,
        });

        console.log("AI Video isteği burada API'ye gidecek.");
      }, 900);
    });
  }

  attachVideoGenerate("videoGenerateTextBtn", () => {
    const t = document.getElementById("videoPrompt");
    const val = (t?.value || "").trim();
    return {
      title: val ? val.slice(0, 52) : "Yazıdan Video",
      desc: val ? val.slice(0, 120) : "Prompt girilmedi.",
    };
  });

  attachVideoGenerate("videoGenerateImageBtn", () => {
    const t = document.getElementById("videoImagePrompt");
    const val = (t?.value || "").trim();
    const img = document.getElementById("videoImageInput");
    const imgName = img?.files?.[0]?.name ? `(${img.files[0].name})` : "(resim seçilmedi)";
    return {
      title: `Resimden Video ${imgName}`,
      desc: val ? val.slice(0, 120) : "Opsiyonel prompt yok.",
    };
  });

  const imageInput = document.getElementById("videoImageInput");
  if (imageInput) {
    imageInput.addEventListener("change", () => {
      if (!imageInput.files || !imageInput.files[0]) return;
      console.log("Seçilen görsel:", imageInput.files[0].name);
    });
  }

  // initial empty state
  if (rightOutputList && rightOutputList.children.length === 0) setRightEmptyVisible(true);
});
