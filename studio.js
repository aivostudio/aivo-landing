document.addEventListener("DOMContentLoaded", () => {
  /* ==== MOD SWITCH (BASİT / GELİŞMİŞ) ==== */
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

    // Görünürlük kontrolü
    advancedSections.forEach((el) => {
      if (mode === "basic") {
        el.classList.add("hidden");
      } else {
        el.classList.remove("hidden");
      }
    });

    basicSections.forEach((el) => {
      if (mode === "basic") {
        el.classList.remove("hidden");
      } else {
        el.classList.add("hidden");
      }
    });
  }

  modeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const mode = btn.getAttribute("data-mode-button");
      updateMode(mode);
    });
  });

  // İlk yüklemede gelişmiş açık
  updateMode("advanced");

  /* ==== PRICING MODAL / KREDİ AL ==== */
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
    pricingModal.addEventListener("click", (e) => {
      if (e.target === pricingModal || e.target.classList.contains("pricing-backdrop")) {
        closePricingModal();
      }
    });
  }

  /* ==== SAHTE KREDİ SAYACI (isteğe bağlı) ==== */
  // İleride backend’den gerçek kredi sayısını çekeceksin.
  // Şimdilik butonlara tıklanınca konsola log atıyoruz.
  const pricingButtons = document.querySelectorAll(".pricing-card .primary-btn");
  pricingButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log("Kredi paketi satın alma akışı burada başlatılacak.");
      // Buraya Stripe / iyzico entegrasyonunu koyacaksın.
    });
  });
});
