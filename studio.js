document.addEventListener("DOMContentLoaded", () => {
  /* ==== SAYFA (Müzik / Kapak) GEÇİŞLERİ ==== */
  const pages = document.querySelectorAll(".page");
  const pageLinks = document.querySelectorAll("[data-page-link]");

  function switchPage(target) {
    pages.forEach((p) => {
      p.classList.toggle("is-active", p.dataset.page === target);
    });

    // Sadece sayfayı değiştiriyoruz, aktif butonları burada yönetmiyoruz
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  pageLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = link.getAttribute("data-page-link");
      if (!target) return;
      e.preventDefault();

      // 1) Tüm linklerden is-active'i kaldır (Kredi linkleri hariç)
      pageLinks.forEach((l) => {
        if (!l.hasAttribute("data-open-pricing")) {
          l.classList.remove("is-active");
        }
      });

      // 2) Sadece tıklanan linki aktif yap
      if (!link.hasAttribute("data-open-pricing")) {
        link.classList.add("is-active");
      }

      // 3) Sayfayı değiştir
      switchPage(target);
    });
  });

  /* ==== SOL MENÜ: MÜZİK ÜRET ALT MENÜ AÇ/KAPA ==== */
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

  /* ==== MOD SWITCH (BASİT / GELİŞMİŞ) ==== */
  const body = document.body;
  const modeButtons = document.querySelectorAll("[data-mode-button]");
  const advancedSections = document.querySelectorAll(
    "[data-visible-in='advanced']"
  );
  const basicSections = document.querySelectorAll(
    "[data-visible-in='basic']"
  );

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

  // Varsayılan: Gelişmiş Mod
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
    const backdrop = pricingModal.querySelector(".pricing-backdrop");
    if (backdrop) backdrop.addEventListener("click", closePricingModal);
  }

  /* ==== MÜZİK ÜRET BUTONU (UI FEEDBACK) ==== */
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

  /* ==== KAPAK ÜRET BUTONU (UI FEEDBACK) ==== */
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
});
// ==== MÜZİK ALT SEKME GEÇİŞLERİ (GELENEKSEL / SES KAYDI / VOKALE GÖRE) ====
window.addEventListener("DOMContentLoaded", () => {
  const musicViews = document.querySelectorAll(".music-view");
  const musicTabButtons = document.querySelectorAll(".sidebar-sublink[data-music-tab]");

  if (!musicViews.length || !musicTabButtons.length) return;

  musicTabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-music-tab");

      // Sol menüde seçili olan alt butonu güncelle
      musicTabButtons.forEach((b) => {
        b.classList.toggle("is-active", b === btn);
      });

      // Orta panelde doğru görünümü aç / kapat
      musicViews.forEach((view) => {
        const viewKey = view.getAttribute("data-music-view");
        view.classList.toggle("is-active", viewKey === target);
      });
    });
  });
});
// === SES KAYDI – KAYIT BUTONU ANİMASYONU ===
(function () {
  const recordBtn = document.querySelector('.record-btn');
  const recordCircle = document.querySelector('.record-circle');

  if (!recordBtn || !recordCircle) return;

  let isRecording = false;

  recordBtn.addEventListener('click', () => {
    isRecording = !isRecording;

    recordCircle.classList.toggle('is-recording', isRecording);
    recordBtn.textContent = isRecording ? '⏹ Kaydı Durdur' : '⏺ Kaydı Başlat';
  });
})();
// ======================================
// SES KAYDI – DAİREYE TIKLAYINCA KAYIT EFFECT
// ======================================

(function () {
  const recordCircle = document.querySelector(
    '.music-view[data-music-view="ses-kaydi"] .record-circle'
  );
  const recordButton = document.querySelector(
    '.music-view[data-music-view="ses-kaydi"] .record-btn'
  );
  const recordTitle = document.querySelector(
    '.music-view[data-music-view="ses-kaydi"] .record-main-title'
  );

  let isRecording = false;

  function toggleRecordingVisual() {
    if (!recordCircle) return;

    isRecording = !isRecording;
    recordCircle.classList.toggle('is-recording', isRecording);

    // Başlık metni
    if (recordTitle) {
      recordTitle.textContent = isRecording
        ? 'Kayıt Devam Ediyor'
        : 'Ses Kaydetmeye Başlayın';
    }

    // Buton metni (istersen)
    if (recordButton) {
      recordButton.textContent = isRecording
        ? '⏹ Kaydı Durdur'
        : '⏺ Kaydı Başlat';
    }
  }

  if (recordCircle) {
    recordCircle.style.cursor = 'pointer';
    recordCircle.addEventListener('click', toggleRecordingVisual);
  }

  if (recordButton) {
    recordButton.addEventListener('click', toggleRecordingVisual);
  }
})();


