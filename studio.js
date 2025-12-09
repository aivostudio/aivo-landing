document.addEventListener("DOMContentLoaded", () => {
  const basicBtn = document.getElementById("mode-basic-btn");
  const advBtn = document.getElementById("mode-advanced-btn");
  const basicForm = document.getElementById("basic-form");
  const advForm = document.getElementById("advanced-form");
  const generateBtn = document.getElementById("generate-btn");

  /* ==== 1. KEY LISTESİ (24 nota) ==== */
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

  /* ==== 2. BPM ÖNERİSİ – çok basit mantık ==== */
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

  if (basicGenre) {
    basicGenre.addEventListener("change", () =>
      updateBpmHint("basic-genre", "basic-bpm-hint")
    );
  }
  if (advGenre) {
    advGenre.addEventListener("change", () =>
      updateBpmHint("adv-genre", "adv-bpm-hint")
    );
  }

  /* ==== 3. Hızlı presetler (sol & form içi) ==== */
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

  /* ==== 4. Basit / Gelişmiş modu ==== */

  function setMode(mode) {
    if (!basicBtn || !advBtn || !basicForm || !advForm) return;
    if (mode === "basic") {
      basicBtn.classList.add("active");
      advBtn.classList.remove("active");
      basicForm.classList.remove("hidden");
      advForm.classList.add("hidden");
    } else {
      advBtn.classList.add("active");
      basicBtn.classList.remove("active");
      advForm.classList.remove("hidden");
      basicForm.classList.add("hidden");
    }
  }

  if (basicBtn) {
    basicBtn.addEventListener("click", () => setMode("basic"));
  }
  if (advBtn) {
    advBtn.addEventListener("click", () => setMode("advanced"));
  }

  setMode("advanced"); // girişte gelişmiş açık olsun

  /* ==== 5. Sadece demo için – veriyi console.log ==== */

  if (generateBtn) {
    generateBtn.addEventListener("click", (e) => {
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
        alert("Basit mod verileri konsola yazıldı (demo). Gerçek üretim için backend'e bağlanacak.");
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
        alert("Gelişmiş mod verileri konsola yazıldı (demo). Gerçek üretim için backend'e bağlanacak.");
      }
    });
  }
});
