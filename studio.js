// AIVO STUDIO – STUDIO.JS (FULL CLEAN + STABLE + OUTPUT SCOPES + VIDEO CARDS)

document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
     SAYFA GEÇİŞLERİ (MÜZİK / KAPAK)
     ========================================= */
  const pages = document.querySelectorAll(".page");
  const pageLinks = document.querySelectorAll("[data-page-link]");

  function switchPage(target) {
    pages.forEach((p) => p.classList.toggle("is-active", p.dataset.page === target));
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

  // Outputs: video vs music scope
  const videoOutputsScope = document.getElementById("videoOutputsScope");
  const musicOutputsScope = document.getElementById("musicOutputsScope");

  let recordController = null;

  function setOutputScope(scope) {
    if (videoOutputsScope) videoOutputsScope.classList.toggle("is-active", scope === "video");
    if (musicOutputsScope) musicOutputsScope.classList.toggle("is-active", scope === "music");
  }

  function switchMusicView(targetKey) {
    musicViews.forEach((view) => {
      const key = view.getAttribute("data-music-view");
      view.classList.toggle("is-active", key === targetKey);
    });

    // Ses kaydı dışına çıkınca reset
    if (recordController && targetKey !== "ses-kaydi") recordController.forceStopAndReset();

    // Sağ panelde: Geleneksel => müzik, AI Video => video, Ses kaydı => müzik (istersen none yapabiliriz)
    if (targetKey === "ai-video") setOutputScope("video");
    else setOutputScope("music");
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
      if (e.key === "Escape" && pricingModal.classList.contains("is-open")) closePricingModal();
    });
  }

  /* =========================================
     OUTPUT LIST HELPERS (Video / Music)
     ========================================= */
  const videoList = document.getElementById("videoOutputList");
  const videoEmpty = document.getElementById("videoEmpty");

  const musicList = document.getElementById("musicOutputList");
  const musicEmpty = document.getElementById("musicEmpty");

  function setEmptyVisible(emptyEl, visible) {
    if (!emptyEl) return;
    emptyEl.style.display = visible ? "block" : "none";
  }

  function createBtn(label, onClick) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "top-btn ghost";
    b.textContent = label;
    b.style.borderRadius = "12px";
    b.style.padding = "10px 12px";
    b.style.fontSize = "13px";
    b.addEventListener("click", onClick);
    return b;
  }

  /* =========================================
     VIDEO PLAYER MODAL
     ========================================= */
  const playerModal = document.getElementById("playerModal");
  const playerBackdrop = document.getElementById("playerBackdrop");
  const closePlayer = document.getElementById("closePlayer");
  const playerTitle = document.getElementById("playerTitle");
  const playerMeta = document.getElementById("playerMeta");
  const playerVideo = document.getElementById("playerVideo");

  function openPlayer({ title, meta, src }) {
    if (!playerModal) return;
    if (playerTitle) playerTitle.textContent = title || "Video";
    if (playerMeta) playerMeta.textContent = meta || "Önizleme";

    // Placeholder: gerçek video url API’den gelecek
    if (playerVideo) {
      playerVideo.pause();
      playerVideo.removeAttribute("src");
      if (src) playerVideo.src = src;
      playerVideo.load();
    }

    playerModal.classList.add("is-open");
  }

  function closePlayerModal() {
    if (!playerModal) return;
    playerModal.classList.remove("is-open");
    if (playerVideo) {
      playerVideo.pause();
    }
  }

  if (playerBackdrop) playerBackdrop.addEventListener("click", closePlayerModal);
  if (closePlayer) closePlayer.addEventListener("click", closePlayerModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && playerModal && playerModal.classList.contains("is-open")) {
      closePlayerModal();
    }
  });

  /* =========================================
     VIDEO CARD (küçük/kare + play + butonlar)
     ========================================= */
  function addVideoCard({
    title,
    kind, // "Yazıdan Video" / "Resimden Video"
    resolution,
    durationSec,
    ratio,
    credits,
    hasAudio,
  }) {
    if (!videoList) return;

    setEmptyVisible(videoEmpty, false);

    const card = document.createElement("div");
    card.className = "card";
    card.style.padding = "14px";
    card.style.borderRadius = "18px";

    // header row
    const head = document.createElement("div");
    head.style.display = "flex";
    head.style.alignItems = "center";
    head.style.justifyContent = "space-between";
    head.style.gap = "10px";
    head.style.marginBottom = "10px";

    const left = document.createElement("div");
    left.style.display = "flex";
    left.style.alignItems = "center";
    left.style.gap = "8px";

    const dot = document.createElement("div");
    dot.style.width = "8px";
    dot.style.height = "8px";
    dot.style.borderRadius = "50%";
    dot.style.background = "rgba(85, 239, 196, 0.95)";

    const status = document.createElement("div");
    status.textContent = "Tamamlandı";
    status.style.fontSize = "12px";
    status.style.color = "rgba(245,245,255,0.9)";
    status.style.opacity = "0.9";

    left.appendChild(dot);
    left.appendChild(status);

    const meta = document.createElement("div");
    meta.style.fontSize = "12px";
    meta.style.color = "rgba(154,164,215,0.95)";
    meta.textContent = `${resolution} • ${durationSec}s • ${credits} kredi${hasAudio ? " • ses" : ""}`;

    head.appendChild(left);
    head.appendChild(meta);

    // square thumbnail
    const thumbWrap = document.createElement("div");
    thumbWrap.style.position = "relative";
    thumbWrap.style.width = "100%";
    thumbWrap.style.maxWidth = "320px";
    thumbWrap.style.aspectRatio = "1 / 1"; // kare görünüm
    thumbWrap.style.margin = "0 auto";
    thumbWrap.style.borderRadius = "16px";
    thumbWrap.style.overflow = "hidden";
    thumbWrap.style.border = "1px solid rgba(255,255,255,0.08)";
    thumbWrap.style.background =
      "radial-gradient(circle at top left, rgba(108,92,231,0.35), transparent 55%), rgba(0,0,0,0.35)";

    const play = document.createElement("button");
    play.type = "button";
    play.textContent = "▶";
    play.style.position = "absolute";
    play.style.left = "50%";
    play.style.top = "50%";
    play.style.transform = "translate(-50%,-50%)";
    play.style.width = "58px";
    play.style.height = "58px";
    play.style.borderRadius = "50%";
    play.style.border = "none";
    play.style.cursor = "pointer";
    play.style.fontSize = "18px";
    play.style.color = "#fff";
    play.style.background = "rgba(0,0,0,0.45)";
    play.style.boxShadow = "0 18px 40px rgba(0,0,0,0.6)";

    play.addEventListener("click", () => {
      openPlayer({
        title: title,
        meta: `${kind} • ${resolution} • ${durationSec}s • ${ratio}`,
        src: "", // API’den gerçek video url
      });
    });

    thumbWrap.appendChild(play);

    // title block
    const titleEl = document.createElement("div");
    titleEl.style.marginTop = "12px";
    titleEl.style.fontSize = "14px";
    titleEl.style.fontWeight = "600";
    titleEl.style.color = "rgba(245,245,255,0.95)";
    titleEl.textContent = title;

    const subEl = document.createElement("div");
    subEl.style.marginTop = "4px";
    subEl.style.fontSize = "12px";
    subEl.style.color = "rgba(154,164,215,0.95)";
    subEl.textContent = `${kind} • ${ratio}`;

    // actions row
    const actions = document.createElement("div");
    actions.style.display = "grid";
    actions.style.gridTemplateColumns = "1fr 1fr 1fr 46px";
    actions.style.gap = "10px";
    actions.style.marginTop = "12px";

    const btnDownload = createBtn("İndir", () => console.log("Download (placeholder)"));
    const btnWatch = createBtn("İzle", () => {
      openPlayer({
        title: title,
        meta: `${kind} • ${resolution} • ${durationSec}s • ${ratio}`,
        src: "",
      });
    });
    const btnBig = createBtn("Büyüt", () => {
      openPlayer({
        title: title,
        meta: `${kind} • ${resolution} • ${durationSec}s • ${ratio}`,
        src: "",
      });
    });

    const btnDel = document.createElement("button");
    btnDel.type = "button";
    btnDel.textContent = "🗑";
    btnDel.className = "top-btn ghost";
    btnDel.style.borderRadius = "12px";
    btnDel.style.width = "46px";
    btnDel.style.padding = "10px 0";
    btnDel.addEventListener("click", () => {
      card.remove();
      if (videoList.querySelectorAll(".card").length === 0) setEmptyVisible(videoEmpty, true);
    });

    actions.appendChild(btnDownload);
    actions.appendChild(btnWatch);
    actions.appendChild(btnBig);
    actions.appendChild(btnDel);

    card.appendChild(head);
    card.appendChild(thumbWrap);
    card.appendChild(titleEl);
    card.appendChild(subEl);
    card.appendChild(actions);

    videoList.prepend(card);
  }

  function addMusicCard({ title }) {
    if (!musicList) return;

    setEmptyVisible(musicEmpty, false);

    const card = document.createElement("div");
    card.className = "card";
    card.style.padding = "14px";
    card.style.borderRadius = "18px";

    const t = document.createElement("div");
    t.style.fontSize = "14px";
    t.style.fontWeight = "600";
    t.textContent = title || "Yeni Müzik";

    const a = document.createElement("div");
    a.style.marginTop = "10px";
    a.style.display = "flex";
    a.style.gap = "10px";

    a.appendChild(createBtn("İndir", () => console.log("Music download placeholder")));
    a.appendChild(createBtn("Dinle", () => console.log("Music play placeholder")));

    card.appendChild(t);
    card.appendChild(a);

    musicList.prepend(card);
  }

  /* =========================================
     MÜZİK ÜRET BUTONU – UI LOADING + OUTPUT
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

        // örnek çıktı
        addMusicCard({ title: "🎵 Üretilen Müzik (örnek)" });
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
    const timerEl = sesView.querySelector("#recordTimer");

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
     AI VIDEO – TAB + COUNTER + CREDIT LOGIC
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

    const update = () => (counter.textContent = `${textarea.value.length} / ${max}`);
    textarea.addEventListener("input", update);
    update();
  }

  bindCounter("videoPrompt", "videoPromptCounter", 1000);
  bindCounter("videoImagePrompt", "videoImagePromptCounter", 500);

  // Credits: base 15 + audio +3
  const audioToggle = document.getElementById("audioToggle");
  const videoCreditBadge = document.getElementById("videoCreditBadge");
  const videoImageCreditBadge = document.getElementById("videoImageCreditBadge");
  const audioPricingText = document.getElementById("audioPricingText");

  const btnText = document.getElementById("videoGenerateTextBtn");
  const btnImage = document.getElementById("videoGenerateImageBtn");

  const videoDuration = document.getElementById("videoDuration");
  const videoResolution = document.getElementById("videoResolution");
  const videoRatio = document.getElementById("videoRatio");

  function currentVideoCredits() {
    const base = 15;
    const extra = audioToggle && audioToggle.checked ? 3 : 0;
    return base + extra;
  }

  function refreshVideoCreditsUI() {
    const c = currentVideoCredits();
    if (videoCreditBadge) videoCreditBadge.textContent = `${c} Kredi`;
    if (videoImageCreditBadge) videoImageCreditBadge.textContent = `${c} Kredi`;

    if (btnText) btnText.textContent = `🎬 Video Oluştur (${c} Kredi)`;
    if (btnImage) btnImage.textContent = `🎞 Video Oluştur (${c} Kredi)`;

    if (audioPricingText) {
      audioPricingText.textContent = `Baz ücret: 15 kredi • Ses açıkken +3 kredi (Şu an: ${c} kredi)`;
    }
  }

  if (audioToggle) {
    audioToggle.addEventListener("change", refreshVideoCreditsUI);
  }
  refreshVideoCreditsUI();

  function attachVideoCreate(btn, kindLabel) {
    if (!btn) return;

    btn.addEventListener("click", () => {
      if (btn.classList.contains("is-loading")) return;

      const original = btn.textContent;
      btn.classList.add("is-loading");
      btn.textContent = "Oluşturuluyor...";

      const durationSec = videoDuration ? Number(videoDuration.value) : 8;
      const resolution = videoResolution ? videoResolution.value : "720p";
      const ratio = videoRatio ? videoRatio.value : "16:9";
      const credits = currentVideoCredits();
      const hasAudio = !!(audioToggle && audioToggle.checked);

      setTimeout(() => {
        btn.classList.remove("is-loading");
        btn.textContent = original;

        const title =
          kindLabel === "Yazıdan Video"
            ? "Yazıdan Video (örnek)"
            : "Resimden Video (örnek)";

        addVideoCard({
          title,
          kind: kindLabel,
          resolution,
          durationSec,
          ratio,
          credits,
          hasAudio,
        });

        // AI video sekmesindeyken sağ panel mutlaka video kalsın
        setOutputScope("video");

        console.log("AI Video isteği burada API'ye gidecek.");
      }, 1200);
    });
  }

  attachVideoCreate(btnText, "Yazıdan Video");
  attachVideoCreate(btnImage, "Resimden Video");

  const imageInput = document.getElementById("videoImageInput");
  if (imageInput) {
    imageInput.addEventListener("change", () => {
      if (!imageInput.files || !imageInput.files[0]) return;
      console.log("Seçilen görsel:", imageInput.files[0].name);
    });
  }
});
