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
      basicForm.classList.remove("hidden");
      advancedForm.classList.add("hidden");
    } else {
      advBtn.classList.add("active");
      basicBtn.classList.remove("active");
      advancedForm.classList.remove("hidden");
      basicForm.classList.add("hidden");
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

  // Başlangıç modu
  setMode("advanced");

  // KEY OPTIONS – 24 nota (Major + Minor)
  const KEY_OPTIONS = {
    major: [
      "C", "C# / Db", "D", "D# / Eb", "E", "F",
      "F# / Gb", "G", "G# / Ab", "A", "A# / Bb", "B"
    ],
    minor: [
      "Cm", "C#m / Dbm", "Dm", "D#m / Ebm", "Em", "Fm",
      "F#m / Gbm", "Gm", "G#m / Abm", "Am", "A#m / Bbm", "Bm"
    ]
  };

  const keySelect = document.getElementById("key-select");
  if (keySelect) {
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

  // Basit form – öneri chipleri
  const suggestionContainer = document.getElementById("basic-suggestions");
  if (suggestionContainer) {
    suggestionContainer.addEventListener("click", function (e) {
      const target = e.target;
      if (target instanceof HTMLElement && target.classList.contains("chip")) {
        // Tek seçim: aktif olanı değiştir
        Array.from(suggestionContainer.querySelectorAll(".chip")).forEach((chip) =>
          chip.classList.remove("active")
        );
        target.classList.add("active");
      }
    });
  }

  // Basit mod submit – çoook basit demo
  const basicSubmit = document.getElementById("basic-submit");
  if (basicSubmit) {
    basicSubmit.addEventListener("click", function () {
      const title = document.getElementById("basic-title")?.value || "";
      const desc = document.getElementById("basic-description")?.value || "";
      const activeChip = suggestionContainer?.querySelector(".chip.active");
      const suggestion = activeChip ? activeChip.textContent : null;
      let vocal = "instrumental";
      const radios = document.querySelectorAll('input[name="basic-vocal"]');
      radios.forEach((r) => {
        if (r.checked) vocal = r.value;
      });
      console.log("BASIT MOD PAYLOAD", { title, desc, suggestion, vocal });
      alert("Basit mod verileri konsola yazıldı (demo). Gerçek üretim için backend'e bağlanacak.");
    });
  }

  // BPM öneri mantığı (basit)
  const genreSelect = document.getElementById("genre-select");
  const moodSelect = document.getElementById("adv-mood");
  const bpmInput = document.getElementById("bpm-input");
  const bpmHint = document.getElementById("bpm-hint");

  function updateBpmHint() {
    if (!genreSelect || !moodSelect || !bpmHint) return;
    const genre = genreSelect.value;
    const mood = moodSelect.value;
    let range = "—";
    if (!genre) {
      range = "100–120";
    } else if (genre === "pop") {
      range = mood === "enerjik" ? "112–124" : "96–108";
    } else if (genre === "rock") {
      range = "120–140";
    } else if (genre === "rap") {
      range = "80–96";
    } else if (genre === "edm") {
      range = "122–130";
    } else if (genre === "anadolu") {
      range = "96–112";
    }
    bpmHint.textContent = "Önerilen BPM: " + range;
    if (!bpmInput.value) {
      const parts = range.split("–");
      if (parts.length === 2) {
        const avg = Math.round((Number(parts[0]) + Number(parts[1])) / 2);
        if (!Number.isNaN(avg)) bpmInput.value = String(avg);
      }
    }
  }

  if (genreSelect && moodSelect) {
    genreSelect.addEventListener("change", updateBpmHint);
    moodSelect.addEventListener("change", updateBpmHint);
    updateBpmHint();
  }

  const advancedSubmit = document.getElementById("advanced-submit");
  if (advancedSubmit) {
    advancedSubmit.addEventListener("click", function () {
      const key = /** @type {HTMLSelectElement} */ (document.getElementById("key-select"))?.value || "C";
      console.log("GELİŞMİŞ MOD - Seçilen Key:", key);
      alert("Gelişmiş mod verileri konsola yazıldı (demo). Gerçek üretim için backend'e bağlanacak.");
    });
  }
});
