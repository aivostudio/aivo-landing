// ======================================================
// AIVO STUDIO – STUDIO.JS (FULL / STABLE)
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

  /* ======================================================
     PAGE SWITCH (music / video / cover)
  ====================================================== */
  const pages = document.querySelectorAll(".page");
  const pageLinks = document.querySelectorAll("[data-page-link]");

  function switchPage(target) {
    pages.forEach(p => {
      p.classList.toggle("is-active", p.dataset.page === target);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  pageLinks.forEach(link => {
    link.addEventListener("click", e => {
      const target = link.getAttribute("data-page-link");
      if (!target) return;
      e.preventDefault();

      pageLinks.forEach(l => l.classList.remove("is-active"));
      link.classList.add("is-active");

      switchPage(target);
    });
  });

  /* ======================================================
     VIDEO TABS (Text → Video / Image → Video)
  ====================================================== */
  const videoTabs = document.querySelectorAll("[data-video-tab]");
  const videoViews = document.querySelectorAll("[data-video-view]");

  function switchVideoTab(target) {
    videoTabs.forEach(tab => {
      tab.classList.toggle(
        "is-active",
        tab.getAttribute("data-video-tab") === target
      );
    });

    videoViews.forEach(view => {
      view.classList.toggle(
        "is-active",
        view.getAttribute("data-video-view") === target
      );
    });
  }

  if (videoTabs.length && videoViews.length) {
    videoTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        const target = tab.getAttribute("data-video-tab");
        if (target) switchVideoTab(target);
      });
    });

    // default
    switchVideoTab("text");
  }

  /* ======================================================
     BASIC / ADVANCED MODE (future ready)
  ====================================================== */
  const body = document.body;
  const modeButtons = document.querySelectorAll("[data-mode-button]");
  const advancedOnly = document.querySelectorAll("[data-visible-in='advanced']");
  const basicOnly = document.querySelectorAll("[data-visible-in='basic']");

  function updateMode(mode) {
    body.setAttribute("data-mode", mode);

    modeButtons.forEach(btn => {
      btn.classList.toggle(
        "is-active",
        btn.getAttribute("data-mode-button") === mode
      );
    });

    advancedOnly.forEach(el => {
      el.style.display = mode === "basic" ? "none" : "";
    });

    basicOnly.forEach(el => {
      el.style.display = mode === "basic" ? "" : "none";
    });
  }

  modeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const mode = btn.getAttribute("data-mode-button");
      if (mode) updateMode(mode);
    });
  });

  updateMode("advanced");

  /* ======================================================
     PRICING MODAL
  ====================================================== */
  const pricingModal = document.getElementById("pricingModal");
  const creditsButton = document.getElementById("creditsButton");
  const pricingLinks = document.querySelectorAll("[data-open-pricing]");
  const closePricing = document.getElementById("closePricing");

  function openPricing() {
    if (pricingModal) pricingModal.classList.add("is-open");
  }

  function closePricingModal() {
    if (pricingModal) pricingModal.classList.remove("is-open");
  }

  if (creditsButton) {
    creditsButton.addEventListener("click", e => {
      e.preventDefault();
      openPricing();
    });
  }

  pricingLinks.forEach(l => {
    l.addEventListener("click", e => {
      e.preventDefault();
      openPricing();
    });
  });

  if (closePricing) {
    closePricing.addEventListener("click", e => {
      e.preventDefault();
      closePricingModal();
    });
  }

  if (pricingModal) {
    const backdrop = pricingModal.querySelector(".pricing-backdrop");
    if (backdrop) backdrop.addEventListener("click", closePricingModal);

    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && pricingModal.classList.contains("is-open")) {
        closePricingModal();
      }
    });
  }

  /* ======================================================
     VIDEO GENERATE BUTTON (UI ONLY)
  ====================================================== */
  const videoButtons = document.querySelectorAll(".big-video-btn");

  videoButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("is-loading")) return;

      const originalText = btn.textContent;
      btn.classList.add("is-loading");
      btn.textContent = "⏳ Video Oluşturuluyor...";

      setTimeout(() => {
        btn.classList.remove("is-loading");
        btn.textContent = originalText;
        console.log("Video üretim isteği (API burada bağlanacak)");
      }, 1600);
    });
  });

});
