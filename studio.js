// Basit / Gelişmiş mod geçişi
const modeToggle = document.getElementById("modeToggle");
const modeButtons = modeToggle.querySelectorAll(".mode-btn");
const modeHighlight = modeToggle.querySelector(".mode-highlight");

let currentMode = "basic";

modeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const mode = btn.dataset.mode;
    if (mode === currentMode) return;

    currentMode = mode;
    modeButtons.forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");

    // Highlight konumu
    if (mode === "basic") {
      modeHighlight.style.transform = "translateX(0%)";
    } else {
      modeHighlight.style.transform = "translateX(100%)";
    }

    // Form alanlarını göster/gizle
    document.querySelectorAll(".basic-only").forEach((el) => {
      el.style.display = mode === "basic" ? "flex" : "none";
    });
    document.querySelectorAll(".advanced-only").forEach((el) => {
      el.style.display = mode === "advanced" ? "flex" : "none";
    });
  });
});

// İlk yüklemede basic görünür, advanced alanlar açık kalsın istersen burayı değiştir
document.querySelectorAll(".advanced-only").forEach((el) => {
  el.style.display = "none";
});

// Top sekmeler + sidebar itemleri ile sayfa geçişi
const pages = document.querySelectorAll(".page");
const topTabs = document.querySelectorAll(".top-tab");
const navItems = document.querySelectorAll(".nav-item");

function activatePage(pageName) {
  pages.forEach((p) => {
    p.classList.toggle("is-active", p.dataset.page === pageName);
  });

  topTabs.forEach((t) => {
    t.classList.toggle("is-active", t.dataset.page === pageName);
  });

  navItems.forEach((n) => {
    n.classList.toggle("is-active", n.dataset.page === pageName);
  });
}

topTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    activatePage(tab.dataset.page);
  });
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    const page = item.dataset.page;
    if (page === "logout") {
      // MVP: sadece alert
      alert("Çıkış akışı backend geldiğinde bağlanacak.");
      return;
    }
    activatePage(page);
  });
});

// Açıklama karakter sayacı
const descInput = document.querySelector('textarea[name="description"]');
const descCounter = document.getElementById("descCounter");

if (descInput && descCounter) {
  const updateCounter = () => {
    descCounter.textContent = descInput.value.length;
  };
  descInput.addEventListener("input", updateCounter);
  updateCounter();
}

// Audio upload alanı
const audioInput = document.getElementById("audioInput");
const audioDrop = document.getElementById("audioDrop");
const audioFileName = document.getElementById("audioFileName");

if (audioDrop && audioInput) {
  audioDrop.addEventListener("click", () => audioInput.click());
  audioInput.addEventListener("change", () => {
    if (audioInput.files && audioInput.files[0]) {
      audioFileName.textContent = `Seçilen dosya: ${audioInput.files[0].name}`;
    } else {
      audioFileName.textContent = "";
    }
  });
}

// Dummy "Son Üretilen Müzikler" — form submit olunca listeye ekliyoruz
const musicForm = document.getElementById("musicForm");
const recentList = document.getElementById("recentList");
const recentEmpty = document.getElementById("recentEmpty");
const recentMeta = document.getElementById("recentMeta");

let recentTracks = [];

function renderRecent() {
  if (!recentList || !recentEmpty) return;

  if (recentTracks.length === 0) {
    recentEmpty.style.display = "flex";
    recentList.style.display = "none";
    recentMeta.textContent = "Toplam 0 müzik";
    return;
  }

  recentEmpty.style.display = "none";
  recentList.style.display = "flex";

  recentList.innerHTML = "";
  recentTracks.slice(0, 5).forEach((track) => {
    const li = document.createElement("li");
    li.className = "recent-item";

    li.innerHTML = `
      <div class="recent-main">
        <span class="recent-title">${track.title || "İsimsiz Parça"}</span>
        <span class="recent-sub">${track.genre || "Tür belirtilmedi"} • ${
      track.mood || "Mood"
    } • ${track.time}</span>
      </div>
      <div class="recent-actions">
        <button class="play-btn">▶</button>
        <span class="recent-sub">${track.length}</span>
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
    const title = formData.get("title");
    const genre = formData.get("genre");
    const mood = formData.get("mood");

    // Gerçek backend geldiğinde burada API çağrısı yapacaksın
    // Şimdilik sadece dummy track ekleyelim
    const now = new Date();
    const track = {
      title: title || "Yeni AIVO Track",
      genre: genre || "Türkçe Pop",
      mood: mood || "Enerjik",
      time: now.toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      length: "02:48",
    };

    recentTracks.unshift(track);
    renderRecent();

    alert("MVP modunda: Form submit edildi. Backend geldiğinde AI müzik üretimine bağlanacak.");
  });
}

// Başlangıçta çiz
renderRecent();
