// AIVO Studio front-end demo logic
document.addEventListener("DOMContentLoaded", function () {
  // Mode toggle (Basit / Gelişmiş)
  const basicBtn = document.getElementById("mode-basic-btn");
  const advBtn = document.getElementById("mode-advanced-btn");
  const musicForm = document.getElementById("music-form");

  function setMode(mode) {
    if (!basicBtn || !advBtn || !musicForm) return;
    if (mode === "basic") {
      basicBtn.classList.add("active");
      advBtn.classList.remove("active");
      musicForm.dataset.mode = "basic";
    } else {
      advBtn.classList.add("active");
      basicBtn.classList.remove("active");
      musicForm.dataset.mode = "advanced";
    }
  }

  if (basicBtn && advBtn) {
    basicBtn.addEventListener("click", function () { setMode("basic"); });
    advBtn.addEventListener("click", function () { setMode("advanced"); });
  }
  setMode("advanced"); // varsayılan

  // Key options (24 nota)
  const KEY_OPTIONS = {
    major: [
      "C","C# / Db","D","D# / Eb","E","F","F# / Gb","G","G# / Ab","A","A# / Bb","B"
    ],
    minor: [
      "Cm","C#m / Dbm","Dm","D#m / Ebm","Em","Fm","F#m / Gbm","Gm","G#m / Abm","Am","A#m / Bbm","Bm"
    ]
  };

  const keySelect = document.getElementById("key-select");
  if (keySelect) {
    keySelect.innerHTML = "";
    const majorGroup = document.createElement("optgroup");
    majorGroup.label = "Major (Maj)";
    KEY_OPTIONS.major.forEach(k => {
      const opt = document.createElement("option");
      opt.value = k;
      opt.textContent = k;
      majorGroup.appendChild(opt);
    });
    const minorGroup = document.createElement("optgroup");
    minorGroup.label = "Minor (Min)";
    KEY_OPTIONS.minor.forEach(k => {
      const opt = document.createElement("option");
      opt.value = k;
      opt.textContent = k;
      minorGroup.appendChild(opt);
    });
    keySelect.appendChild(majorGroup);
    keySelect.appendChild(minorGroup);
    keySelect.value = "C";
  }

  // BPM suggestion based on genre + mood
  const genreSelect = document.getElementById("genre");
  const moodSelect = document.getElementById("song-mood");
  const bpmInput = document.getElementById("bpm");
  const bpmRangeText = document.getElementById("bpm-range-text");

  function getBpmSuggestion(genre, mood) {
    // basit tablo
    let min = 90, max = 120;
    if (genre === "pop" && mood === "enerjik") { min = 110; max = 126; }
    else if (genre === "pop" && mood === "duygusal") { min = 80; max = 100; }
    else if (genre === "deep-house") { min = 118; max = 126; }
    else if (genre === "trap") { min = 130; max = 150; }
    else if (genre === "lofi") { min = 70; max = 86; }
    else if (genre === "arabesk") { min = 80; max = 110; }
    return { min, max, mid: Math.round((min + max) / 2) };
  }

  function updateBpmHint() {
    if (!bpmInput || !bpmRangeText) return;
    const genre = genreSelect ? genreSelect.value : "";
    const mood = moodSelect ? moodSelect.value : "";
    const { min, max, mid } = getBpmSuggestion(genre, mood);
    bpmRangeText.textContent = `Önerilen BPM: ${min}–${max}`;
    if (!bpmInput.dataset.userTouched) {
      bpmInput.value = String(mid);
    }
  }

  if (bpmInput) {
    bpmInput.addEventListener("input", () => {
      bpmInput.dataset.userTouched = "1";
    });
  }
  if (genreSelect) genreSelect.addEventListener("change", updateBpmHint);
  if (moodSelect) moodSelect.addEventListener("change", updateBpmHint);
  updateBpmHint();

  // Hızlı preset chipleri
  const chips = document.querySelectorAll(".chip");
  if (chips.length) {
    chips.forEach(chip => {
      chip.addEventListener("click", () => {
        const genre = chip.dataset.genre;
        const mood = chip.dataset.mood;
        if (genreSelect && genre) genreSelect.value = genre;
        if (moodSelect && mood) moodSelect.value = mood;
        updateBpmHint();
      });
    });
  }

  // Main view switching (Müzik / Kapak / Üretimlerim)
  const tabButtons = document.querySelectorAll("[data-main-view]");
  const panels = document.querySelectorAll("[data-main-panel]");

  function setMainView(view) {
    tabButtons.forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-main-view") === view);
    });
    panels.forEach(panel => {
      panel.classList.toggle("active", panel.getAttribute("data-main-panel") === view);
    });
  }

  if (tabButtons.length && panels.length) {
    tabButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const view = btn.getAttribute("data-main-view");
        if (view) setMainView(view);
      });
    });
  }
  setMainView("music");

  // Dil seçimi (şimdilik demo)
  const langSelect = document.getElementById("lang-select");
  if (langSelect) {
    langSelect.addEventListener("change", () => {
      console.log("Seçilen dil:", langSelect.value);
    });
  }

  // Form submit - demo payload
  const musicSubmit = document.getElementById("music-submit");
  const coverSubmit = document.getElementById("cover-submit");
  const recentList = document.getElementById("recent-list");

  function collectFormData(form) {
    const data = {};
    const formData = new FormData(form);
    for (const [key, value] of formData.entries()) {
      if (data[key]) {
        if (Array.isArray(data[key])) data[key].push(value);
        else data[key] = [data[key], value];
      } else {
        data[key] = value;
      }
    }
    return data;
  }

  function addRecentItem(title, meta) {
    if (!recentList) return;
    recentList.classList.remove("empty");
    const empty = recentList.querySelector(".empty-state");
    if (empty) empty.remove();

    const item = document.createElement("div");
    item.className = "recent-item";
    const h = document.createElement("div");
    h.className = "recent-item-title";
    h.textContent = title || "İsimsiz Üretim";
    const m = document.createElement("div");
    m.className = "recent-item-meta";
    m.textContent = meta;
    item.appendChild(h);
    item.appendChild(m);
    recentList.prepend(item);
  }

  if (musicForm && musicSubmit) {
    musicForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const payload = collectFormData(musicForm);
      console.log("MUSIC PAYLOAD", payload);
      const bpm = payload.bpm || "—";
      const key = payload.key || "—";
      addRecentItem(payload.title || "Yeni Şarkı", `BPM ${bpm} • Key ${key}`);
      alert("Demo: Müzik formu verileri konsola yazıldı. Gerçek üretim için backend bağlı değil.");
    });
  }

  const coverForm = document.getElementById("cover-form");
  if (coverForm && coverSubmit) {
    coverForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const payload = collectFormData(coverForm);
      console.log("COVER PAYLOAD", payload);
      addRecentItem(payload.title || "Yeni Kapak", `Kapak stili: ${payload.style || "—"}`);
      alert("Demo: Kapak formu verileri konsola yazıldı. Görsel üretim için backend bağlı değil.");
    });
  }
});
