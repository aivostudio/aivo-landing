document.addEventListener("DOMContentLoaded", function () {
  // Mod toggle
  const basicBtn = document.getElementById("mode-basic-btn");
  const advBtn = document.getElementById("mode-advanced-btn");
  const basicForm = document.getElementById("basic-form");
  const advancedForm = document.getElementById("advanced-form");

  function setMode(mode) {
    if (!basicBtn || !advBtn || !basicForm || !advancedForm) return;

    if (mode === "basic") {
      basicBtn.classList.add("active");
      advBtn.classList.remove("active");
      basicForm.style.display = "block";
      advancedForm.style.display = "none";
    } else {
      advBtn.classList.add("active");
      basicBtn.classList.remove("active");
      advancedForm.style.display = "block";
      basicForm.style.display = "none";
    }
  }

  if (basicBtn && advBtn) {
    basicBtn.addEventListener("click", function () {
      setMode("basic");
    });
    advBtn.addEventListener("click", function () {
      setMode("advanced");
    });
  }

  // Başlangıç modu: Basit
  setMode("basic");

  // KEY OPTIONS - 24 nota (Major + Minor)
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
      "B",
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
      "Bm",
    ],
  };

  // Karar Sesi dropdown'unu doldur
  const keySelect = document.getElementById("key-select");
  if (keySelect) {
    // Önce içini temizle
    keySelect.innerHTML = "";

    const majorGroup = document.createElement("optgroup");
    majorGroup.label = "Major (Maj)";
    KEY_OPTIONS.major.forEach((k) => {
      const opt = document.createElement("option");
      opt.value = k;
      opt.textContent = k;
      majorGroup.appendChild(opt);
    });

    const minorGroup = document.createElement("optgroup");
    minorGroup.label = "Minor (Min)";
    KEY_OPTIONS.minor.forEach((k) => {
      const opt = document.createElement("option");
      opt.value = k;
      opt.textContent = k;
      minorGroup.appendChild(opt);
    });

    keySelect.appendChild(majorGroup);
    keySelect.appendChild(minorGroup);

    keySelect.value = "C";
  }

  // Basit form - öneri chip'leri seçilebilir hale getir
  const suggestionContainer = document.getElementById("basic-suggestions");
  if (suggestionContainer) {
    suggestionContainer.addEventListener("click", function (e) {
      const target = e.target;
      if (target instanceof HTMLElement && target.classList.contains("chip")) {
        // Tek seçim: önce diğerlerinden active'i kaldır
        Array.from(suggestionContainer.querySelectorAll(".chip")).forEach((chip) =>
          chip.classList.remove("active")
        );
        target.classList.add("active");
      }
    });
  }

  // Basit ve gelişmiş submit butonları sadece konsola log atıyor (şimdilik)
  const basicSubmit = document.getElementById("basic-submit");
  if (basicSubmit) {
    basicSubmit.addEventListener("click", function () {
      const title = /** @type {HTMLInputElement} */ (document.getElementById("basic-title"))?.value || "";
      const desc = /** @type {HTMLTextAreaElement} */ (document.getElementById("basic-description"))?.value || "";
      let suggestion = null;
      if (suggestionContainer) {
        const activeChip = suggestionContainer.querySelector(".chip.active");
        suggestion = activeChip ? activeChip.textContent : null;
      }
      let vocal = "instrumental";
      const radios = document.querySelectorAll('input[name="basic-vocal"]');
      radios.forEach((r) => {
        const input = /** @type {HTMLInputElement} */ (r);
        if (input.checked) vocal = input.value;
      });

      console.log("BASIT MOD PAYLOAD", { title, desc, suggestion, vocal });
      alert("Basit mod verileri konsola yazıldı (demo). Gerçek üretim için backend'e bağlanacak.");
    });
  }

  const advancedSubmit = document.getElementById("advanced-submit");
  if (advancedSubmit) {
    advancedSubmit.addEventListener("click", function () {
      const key =
        /** @type {HTMLSelectElement} */ (document.getElementById("key-select"))?.value || "C";
      console.log("GELISMIŞ MOD - Seçilen Key:", key);
      alert("Gelişmiş mod verileri konsola yazıldı (demo). Gerçek üretim için backend'e bağlanacak.");
    });
  }
});
