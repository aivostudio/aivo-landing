
const navLinks = document.querySelectorAll(".nav-link");
const sideTabs = document.querySelectorAll(".side-tab");
const views = document.querySelectorAll(".view");
const modeBtns = document.querySelectorAll(".mode-btn");
const presetChips = document.querySelectorAll(".preset-chip");
const bpmInput = document.getElementById("bpm");
const moodSelect = document.getElementById("mood");
const genreSelect = document.getElementById("genre");
const bpmHint = document.getElementById("bpmHint");
const createTrackBtn = document.getElementById("createTrack");
const trackGrid = document.getElementById("trackGrid");

function activateView(viewName) {
  navLinks.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.view === viewName);
  });

  sideTabs.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.view === viewName);
  });

  views.forEach((v) => {
    if (v.classList.contains(`view-${viewName}`)) {
      v.classList.add("active");
    } else {
      v.classList.remove("active");
    }
  });
}

navLinks.forEach((btn) => {
  btn.addEventListener("click", () => activateView(btn.dataset.view));
});

sideTabs.forEach((btn) => {
  btn.addEventListener("click", () => activateView(btn.dataset.view));
});

// mode (şimdilik sadece görsel)
modeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    modeBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// Presetler
const presetConfigs = {
  gulsentype: {
    genre: "Türkçe Pop",
    mood: "Enerjik",
    bpm: 118,
  },
  hadise: {
    genre: "Türkçe Pop",
    mood: "Enerjik",
    bpm: 122,
  },
  deep: {
    genre: "EDM",
    mood: "Melankolik",
    bpm: 124,
  },
  anadolu: {
    genre: "Anadolu",
    mood: "Duygusal",
    bpm: 100,
  },
  slowed: {
    genre: "Pop",
    mood: "Melankolik",
    bpm: 90,
  },
};

presetChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const key = chip.dataset.preset;
    const cfg = presetConfigs[key];
    if (!cfg) return;
    genreSelect.value = cfg.genre;
    moodSelect.value = cfg.mood;
    bpmInput.value = cfg.bpm;
    updateBpmHint();
  });
});

// BPM öneri güncelleme (basit logic)
function updateBpmHint() {
  const genre = genreSelect.value;
  const mood = moodSelect.value;

  let range = "112–116";
  if (genre === "EDM" || genre === "Trap") range = "120–128";
  if (genre === "Balad" || mood === "Duygusal" || mood === "Melankolik")
    range = "80–96";
  if (genre === "Anadolu") range = "96–110";

  bpmHint.textContent = "Önerilen BPM: " + range;
}

genreSelect.addEventListener("change", updateBpmHint);
moodSelect.addEventListener("change", updateBpmHint);

// Sahte track oluşturma (UI için)
let trackCount = 0;

function createFakeTrackCard() {
  trackCount += 1;
  const title = document.getElementById("title").value || "İsimsiz Parça " + trackCount;
  const duration = Math.floor(150 + Math.random() * 90); // saniye
  const min = Math.floor(duration / 60);
  const sec = String(duration % 60).padStart(2, "0");

  const card = document.createElement("div");
  card.className = "track-card";
  card.innerHTML = `
    <div class="track-cover">AIVO</div>
    <div class="track-meta">
      <strong>${title}</strong>
      <small>${min}:${sec} • ${genreSelect.value} / ${moodSelect.value}</small>
    </div>
    <div class="track-actions">
      <button>Dinle</button>
      <button>İndir</button>
      <button>Projeye Ekle</button>
    </div>
  `;
  return card;
}

createTrackBtn.addEventListener("click", () => {
  const empty = trackGrid.querySelector(".empty-state");
  if (empty) empty.remove();

  const card = createFakeTrackCard();
  trackGrid.prepend(card);
});

// ilk açılış
activateView("music");
updateBpmHint();
