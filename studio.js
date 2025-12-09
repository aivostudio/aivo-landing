// ---------- SAYFA GEÇİŞİ ----------
const pageLinks = document.querySelectorAll(".js-page-link");
const pages = document.querySelectorAll(".page");
const sidebarItems = document.querySelectorAll(".sidebar .nav-item");
const topTabs = document.querySelectorAll(".top-tab");

function activatePage(pageName) {
  pages.forEach((p) => {
    p.classList.toggle("is-active", p.dataset.page === pageName);
  });

  sidebarItems.forEach((item) => {
    const target = item.dataset.target;
    item.classList.toggle("is-active", target === pageName);
  });

  topTabs.forEach((tab) => {
    const target = tab.dataset.target;
    tab.classList.toggle("is-active", target === pageName);
  });
}

pageLinks.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.target;
    if (!target) return;
    activatePage(target);
  });
});

const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    alert("Çıkış akışı backend geldiğinde bağlanacak.");
  });
}

// ---------- BASİT / GELİŞMİŞ MOD ----------
const modeToggle = document.getElementById("modeToggle");
const modeButtons = modeToggle ? modeToggle.querySelectorAll(".mode-btn") : [];
const modeHighlight = modeToggle ? modeToggle.querySelector(".mode-highlight") : null;
const basicSections = document.querySelectorAll(".js-basic-section");
const advancedSections = document.querySelectorAll(".js-advanced-section");

let currentMode = "basic";

function updateModeUI() {
  basicSections.forEach((el) => {
    el.style.display = currentMode === "basic" ? "flex" : "none";
  });
  advancedSections.forEach((el) => {
    el.style.display = currentMode === "advanced" ? "flex" : "none";
  });

  if (modeHighlight) {
    modeHighlight.style.transform =
      currentMode === "basic" ? "translateX(0%)" : "translateX(100%)";
  }
}

modeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const mode = btn.dataset.mode;
    if (!mode || mode === currentMode) return;
    currentMode = mode;

    modeButtons.forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");

    updateModeUI();
  });
});

// ilk yükleme
updateModeUI();

// ---------- AÇIKLAMA KARAKTER SAYACI ----------
const descInput = document.querySelector('textarea[name="description"]');
const descCounter = document.getElementById("descCounter");

if (descInput && descCounter) {
  const updateCounter = () => {
    descCounter.textContent = descInput.value.length;
  };
  descInput.addEventListener("input", updateCounter);
  updateCounter();
}

// ---------- AUDIO UPLOAD ----------
const audioInput = document.getElementById("audioInput");
const audioDrop = document.getElementById("audioDrop");
const audioFileName = document.getElementById("audioFileName");

if (audioDrop && audioInput) {
  const setFileName = () => {
    if (audioInput.files && audioInput.files[0]) {
      audioFileName.textContent = `Seçilen dosya: ${audioInput.files[0].name}`;
    } else {
      audioFileName.textContent = "";
    }
  };

  audioDrop.addEventListener("click", () => audioInput.click());
  audioInput.addEventListener("change", setFileName);
}

// ---------- PRESET BUTONLARI ----------
const presetButtons = document.querySelectorAll(".preset-chip");

presetButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const preset = btn.dataset.preset;
    const genreSelect = document.querySelector('select[name="genre"]');
    const moodSelect = document.querySelector('select[name="mood"]');
    const bpmInput = document.querySelector('input[name="bpm"]');

    if (!genreSelect || !moodSelect || !bpmInput) return;

    switch (preset) {
      case "tr-pop":
        genreSelect.value = "tr-pop";
        moodSelect.value = "enerjik";
        bpmInput.value = 110;
        break;
      case "enerjik":
        genreSelect.value = "trap";
        moodSelect.value = "enerjik";
        bpmInput.value = 130;
        break;
      case "deep":
        genreSelect.value = "deep-house";
        moodSelect.value = "sakin";
        bpmInput.value = 122;
        break;
      case "anadolu":
        genreSelect.value = "anadolu-pop";
        moodSelect.value = "huzunlu";
        bpmInput.value = 100;
        break;
      case "lofi":
        genreSelect.value = "lofi";
        moodSelect.value = "lofi";
        bpmInput.value = 80;
        break;
      case "reverb":
        moodSelect.value = "epik";
        bpmInput.value = 90;
        break;
    }

    // otomatik gelişmiş moda al
    currentMode = "advanced";
    modeButtons.forEach((b) =>
      b.classList.toggle("is-active", b.dataset.mode === "advanced")
    );
    updateModeUI();
  });
});

// ---------- SON ÜRETİLENLER (FAKE) ----------
const musicForm = document.getElementById("musicForm");
const recentList = document.getElementById("recentList");
const recentEmpty = document.getElementById("recentEmpty");
const recentMeta = document.getElementById("recentMeta");

let recentTracks = [];

function renderRecent() {
  if (!recentList || !recentEmpty || !recentMeta) return;

  if (recentTracks.length === 0) {
    recentEmpty.style.display = "flex";
    recentList.style.display = "none";
    recentMeta.textContent = "Toplam 0 müzik";
    return;
  }

  recentEmpty.style.display = "none";
  recentList.style.display = "flex";
  recentList.innerHTML = "";

  recentTracks.slice(0, 5).forEach((t) => {
    const li = document.createElement("li");
    li.className = "recent-item";

    li.innerHTML = `
      <div class="recent-main">
        <span class="recent-title">${t.title}</span>
        <span class="recent-sub">${t.genre} • ${t.mood} • ${t.time}</span>
      </div>
      <div class="recent-actions">
        <button class="play-btn" type="button">▶</button>
        <span class="recent-sub">${t.length}</span>
      </div>
    `;
    recentList.appendChild(li);
  });

  recentMeta.textContent = `Toplam ${recentTracks.length} müzik`;
}

if (musicForm) {
  musicForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(musicForm);
    const title = (formData.get("title") || "Yeni AIVO Track").toString();
    const genre = (formData.get("genre") || "Türkçe Pop").toString();
    const mood = (formData.get("mood") || "Mood").toString();

    const now = new Date();
    const track = {
      title,
      genre,
      mood,
      time: now.toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      length: "02:48",
    };

    recentTracks.unshift(track);
    renderRecent();

    alert(
      "MVP modunda: Form submit edildi. Backend bağlandığında burada AI müzik üretim API çağrısı yapılacak."
    );
  });
}

renderRecent();

// ---------- KREDİ MODAL ----------
const creditModal = document.getElementById("creditModal");
const openCreditModalBtn = document.getElementById("openCreditModal");
const closeCreditModalBtn = document.getElementById("closeCreditModal");

function openModal() {
  if (creditModal) creditModal.classList.add("is-open");
}
function closeModal() {
  if (creditModal) creditModal.classList.remove("is-open");
}

if (openCreditModalBtn) {
  openCreditModalBtn.addEventListener("click", openModal);
}
if (closeCreditModalBtn) {
  closeCreditModalBtn.addEventListener("click", closeModal);
}
if (creditModal) {
  creditModal.addEventListener("click", (e) => {
    if (e.target === creditModal) closeModal();
  });
}
