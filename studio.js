document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  const basicBtn = document.getElementById("mode-basic-btn");
  const advBtn = document.getElementById("mode-advanced-btn");
  const basicForm = document.getElementById("basic-form");
  const advForm = document.getElementById("advanced-form");
  const generateBtn = document.getElementById("generate-btn");

  const musicPanel = document.getElementById("music-panel");
  const coverPanel = document.getElementById("cover-panel");
  const pricingSection = document.getElementById("pricing-section");

  /* ========= 0. ÜST NAV – Müzik / Kapak / Üretimlerim ========= */

  const navPills = document.querySelectorAll(".nav-pill");

  function showSection(target) {
    if (!musicPanel || !coverPanel) return;

    if (target === "music") {
      musicPanel.classList.remove("hidden-card");
      coverPanel.classList.add("hidden-card");
      body.classList.remove("panel-cover");
      body.classList.add("panel-music");
    } else if (target === "cover") {
      coverPanel.classList.remove("hidden-card");
      musicPanel.classList.add("hidden-card");
      body.classList.remove("panel-music");
      body.classList.add("panel-cover");
    } else if (target === "projects") {
      alert("Üretimlerim sayfası yakında eklenecek.");
    }
  }

  navPills.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target;

      navPills.forEach((b) => b.classList.remove("nav-pill-active"));
      btn.classList.add("nav-pill-active");

      showSection(target);
    });
  });

  // Sol menüden “Müzik Üret” tıklanınca üstteki tabı da tetikle
  document
    .querySelectorAll('.side-menu-item[data-target="music"]')
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        navPills.forEach((pill) => {
          if (pill.dataset.target === "music") pill.click();
        });
      });
    });

  // “Kredi Al” → fiyat tablosuna kaydır
  document
    .querySelectorAll('[data-open="pricing"]')
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        if (pricingSection) {
          pricingSection.scrollIntoView({ behavior: "smooth" });
        }
      });
    });

  /* ========= 1. KARAR SESİ LİSTESİ (24 nota) ========= */

  const KEY_OPTIONS = {
    major: [
      "C",
      "C# / Db",
      "D",
      "D# / Eb",
      "E",
      "F",
      "F# / Gb",
      "G",
      "G# / Ab",
      "A",
      "A# / Bb",
      "B"
    ],
    minor: [
      "Cm",
      "C#m / Dbm",
      "Dm",
      "D#m / Ebm",
      "Em",
      "Fm",
      "F#m / Gbm",
      "Gm",
      "G#m / Abm",
      "Am",
      "A#m / Bbm",
      "Bm"
    ]
  };

  function fillKeySelect(selectEl) {
    if (!selectEl) return;
    selectEl.innerHTML = "";

    const groupMaj = document.createElement("optgroup");
    groupMaj.label = "Majör (Maj)";
    KEY_OPTIONS.major.forEach((k) => {
      const opt = document.createElement("option");
      opt.value = k;
      opt.textContent = k;
      groupMaj.appendChild(opt);
    });

    const groupMin = document.createElement("optgroup");
    groupMin.label = "Minör (Min)";
    KEY_OPTIONS.minor.forEach((k) => {
      const opt = document.createElement("option");
      opt.value = k;
      opt.textContent = k;
      groupMin.appendChild(opt);
    });

    selectEl.appendChild(groupMaj);
    selectEl.appendChild(groupMin);
    selectEl.value = "C";
  }

  fillKeySelect(document.getElementById("basic-key"));
  fillKeySelect(document.getElementById("adv-key"));

  /* ========= 2. BPM ÖNERİLERİ ========= */

  const genreBpm = {
    pop: "90–120",
    trap: "130–150",
    deep: "118–124",
    rock: "100–140",
    anadolu: "90–110",
    slow: "60–80"
  };

  function updateBpmHint(selectId, hintId) {
    const select = document.getElementById(selectId);
    const hint = document.getElementById(hintId);
    if (!select || !hint) return;

    const value = select.value;
    const range = genreBpm[value];
    hint.textContent = range
      ? `Önerilen BPM: ${range}`
      : "Önerilen BPM: 90–120";
  }

  const basicGenre = document.getElementById("basic-genre");
  const advGenre = document.getElementById("adv-genre");

  basicGenre?.addEventListener("change", () =>
    updateBpmHint("basic-genre", "basic-bpm-hint")
  );
  advGenre?.addEventListener("change", () =>
    updateBpmHint("adv-genre", "adv-bpm-hint")
  );

  /* ========= 3. HIZLI PRESETLER ========= */

  function applyPreset(genre, mood) {
    if (basicGenre && genre) {
      basicGenre.value = genre;
      updateBpmHint("basic-genre", "basic-bpm-hint");
    }
    const moodSelect = document.getElementById("basic-mood");
    if (moodSelect && mood) {
      moodSelect.value = mood;
    }
  }

  document.querySelectorAll(".preset-chip").forEach((btn) => {
    btn.addEventListener("click", () => {
      const genre = btn.getAttribute("data-genre");
      const mood = btn.getAttribute("data-mood");
      applyPreset(genre, mood);
    });
  });

  document.querySelectorAll(".chip[data-genre]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const genre = btn.getAttribute("data-genre");
      applyPreset(genre, null);
    });
  });

  /* ========= 4. BASİT / GELİŞMİŞ MOD GEÇİŞİ + RENK EFEKTİ ========= */

  function setMode(mode) {
    if (!basicBtn || !advBtn || !basicForm || !advForm) return;

    if (mode === "basic") {
      basicBtn.classList.add("active");
      advBtn.classList.remove("active");
      basicForm.classList.remove("hidden");
      advForm.classList.add("hidden");
      body.classList.add("mode-basic");
      body.classList.remove("mode-advanced");
    } else {
      advBtn.classList.add("active");
      basicBtn.classList.remove("active");
      advForm.classList.remove("hidden");
      basicForm.classList.add("hidden");
      body.classList.add("mode-advanced");
      body.classList.remove("mode-basic");
    }
  }

  basicBtn?.addEventListener("click", () => setMode("basic"));
  advBtn?.addEventListener("click", () => setMode("advanced"));

  // Varsayılan: Gelişmiş açık
  setMode("advanced");
  body.classList.add("panel-music");

  /* ========= 5. DEMO – PAYLOAD LOG ========= */

  generateBtn?.addEventListener("click", (e) => {
    e.preventDefault();

    const isBasicVisible = !basicForm.classList.contains("hidden");

    if (isBasicVisible) {
      const payload = {
        mode: "basic",
        title: document.getElementById("basic-title")?.value || "",
        mood: document.getElementById("basic-mood")?.value || "",
        desc: document.getElementById("basic-desc")?.value || "",
        genre: document.getElementById("basic-genre")?.value || "",
        bpm: document.getElementById("basic-bpm")?.value || "",
        key: document.getElementById("basic-key")?.value || "C"
      };
      console.log("BASIT MOD PAYLOAD", payload);
      alert(
        "Basit mod verileri konsola yazıldı (demo). Gerçek üretim için backend'e bağlanacak."
      );
    } else {
      const payload = {
        mode: "advanced",
        title: document.getElementById("adv-title")?.value || "",
        mood: document.getElementById("adv-mood")?.value || "",
        desc: document.getElementById("adv-desc")?.value || "",
        lyrics: document.getElementById("adv-lyrics")?.value || "",
        genre: document.getElementById("adv-genre")?.value || "",
        bpm: document.getElementById("adv-bpm")?.value || "",
        key: document.getElementById("adv-key")?.value || "C",
        mixStyle: document.getElementById("adv-mix-style")?.value || "",
        vocal: document.getElementById("adv-vocal")?.value || ""
      };
      console.log("GELISMIS MOD PAYLOAD", payload);
      alert(
        "Gelişmiş mod verileri konsola yazıldı (demo). Gerçek üretim için backend'e bağlanacak."
      );
    }
  });
});
