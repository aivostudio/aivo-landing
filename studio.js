document.addEventListener("DOMContentLoaded", () => {
  const langButtons = document.querySelectorAll(".lang-btn");
  const i18nElements = document.querySelectorAll("[data-i18n]");
  const i18nPlaceholders = document.querySelectorAll("[data-i18n-placeholder]");
  const modeChips = document.querySelectorAll(".mode-chip");
  const musicPanel = document.getElementById("music-panel");
  const artworkPanel = document.getElementById("artwork-panel");
  const studioModePills = document.querySelectorAll(".pill[data-mode]");
  const presetButtons = document.querySelectorAll(".preset-btn");
  const tempoInput = document.getElementById("tempo");
  const genreSelect = document.getElementById("genre");
  const moodSelect = document.getElementById("mood");
  const audioInput = document.getElementById("audio-ref");
  const audioPreview = document.getElementById("audio-preview");
  const audioFileName = document.getElementById("audio-file-name");
  const audioPlayer = document.getElementById("audio-player");
  const generateMusicBtn = document.getElementById("generate-music-btn");
  const generatedList = document.getElementById("generated-list");
  const creditsModal = document.getElementById("credits-modal");
  const buyCreditsBtn = document.getElementById("buy-credits-btn");
  const closeCreditsModalBtn = document.getElementById("close-credits-modal");
  const navItems = document.querySelectorAll(".nav-item");

  const artFileInput = document.getElementById("art-file");
  const artPreview = document.getElementById("art-preview");
  const artPreviewImg = document.getElementById("art-preview-img");
  const artFileName = document.getElementById("art-file-name");
  const artStylePills = document.querySelectorAll(".tag-pill");
  const generateArtBtn = document.getElementById("generate-art-btn");
  const creditCountEl = document.getElementById("credit-count");

  /* BASİT I18N */

  const translations = {
    tr: {
      nav_home: "Anasayfa",
      nav_dashboard: "Dashboard",
      nav_generated: "Ürettiklerim",
      nav_music: "Müzik Üret",
      nav_credits: "Kredi Al",
      nav_billing: "Faturalarım",
      nav_profile: "Profil",
      nav_settings: "Ayarlar",
      nav_logout: "Çıkış Yap",

      credits_label: "Kredin:",
      credits_buy: "Kredi Al",

      btn_login: "Giriş Yap",
      btn_signup: "Kayıt Ol",

      sidebar_desc:
        "Müzik ve kapak üretimini tek panelde yönet. Ritim, vokal, mood ve kapak tasarımını AIVO senin için birleştirir.",
      sidebar_modes: "Modlar",
      mode_music: "Music Studio",
      mode_artwork: "Artwork Studio",
      sidebar_presets: "Hızlı Presetler",
      sidebar_presets_hint:
        "Tek tıkla tür, tempo ve mood dolsun. Üzerinde sonra oynayabilirsin.",
      sidebar_tip_title: "İpucu",
      sidebar_tip_body:
        "Önce şarkının duygusunu ve temposunu seç. Gerekirse presetleri kullan; AIVO diğer alanları senin için doldurur.",

      music_title: "Müzik Üret",
      music_subtitle:
        "Ritim, vokal, mood ve makam seç — AIVO şarkıyı oluştursun.",

      mode_basic: "Basit Mod",
      mode_basic_sub: "Hızlı üretim için temel ayarlar",
      mode_advanced: "Gelişmiş Mod",
      mode_advanced_sub: "Enstrüman, referans ses ve detaylı kontrol",

      field_song_title: "Şarkı Adı",
      field_song_desc: "Şarkı Açıklaması",
      field_song_lyrics: "Şarkı Sözleri (isteğe bağlı)",
      field_genre: "Tür (Genre)",
      field_tempo: "Tempo (BPM)",
      field_key: "Karar Sesi (Key)",
      field_mix_style: "Mix Stili",
      field_mood: "Ruh Hali (Mood)",
      field_instruments_tr: "Türk Enstrümanları",
      field_instruments_modern: "Modern Enstrümanlar",
      field_vocal_type: "Vokal Türü (isteğe bağlı)",
      field_audio_ref: "Referans Ses (opsiyonel)",
      field_extra_notes: "Ek Açıklama / Prompt",

      option_select_genre: "Tür Seçin",
      option_aivo_pop_default: "AIVO Pop Mix (varsayılan)",
      option_warm_analog: "Sıcak Analog",
      option_club: "Club Mix",
      option_cinematic: "Cinematic",
      option_select_mood: "Seç",
      mood_energetic: "Enerjik",
      mood_sad: "Hüzünlü",
      mood_romantic: "Romantik",
      mood_chill: "Sakin",
      mood_epic: "Epik",

      option_instrumental: "Enstrümantal",
      option_female_pop: "Kadın Pop Vokal",
      option_male_pop: "Erkek Pop Vokal",
      option_choir: "Koro",

      hint_max_chars: "Maksimum 200 karakter.",
      hint_tempo: "Önerilen BPM: 90–120",
      audio_drop_label:
        "Dosya seç veya sürükleyip bırak (vokal veya referans şarkı)",
      hint_audio_ref:
        "Suno / Eita gibi: Kendi vokalini veya sevdiğin bir parçayı yükleyip AIVO’nun stil, tempo ve armoniyi buradan çıkarmasını sağlayabilirsin.",
      hint_beta:
        "AIVO şu anda kapalı beta aşamasında. Günlük 10 ücretsiz üretim.",

      btn_generate_music: "Müzik Üret",

      tip_1: "Açıklaman sade tut, net maksimum 200 karakter bırak.",
      tip_2: "Tür ve ruh halini uyumlu seç (örneğin: Pop + Enerjik).",
      tip_3: "Makam seçimi Türk müziği için önemli.",
      tip_4: "Enstrüman belirtmek, miks sonucunu iyileştirir.",

      right_title: "Son Üretilen Müzikler",
      right_empty:
        "Henüz müzik üretmedin.\nSoldaki formu doldurup “Müzik Üret” butonuna basarak başla.",

      credits_modal_title: "Kredi Paketleri",
      credits_modal_desc:
        "Üretim hacmine göre bir paket seç. Kullanmadığın krediler bir sonraki aya devredilir.",
      credits_pack_small: "100 kredi • Hobi kullanımı",
      credits_pack_med: "500 kredi • Düzenli üretim",
      credits_pack_big: "1500 kredi • Profesyonel stüdyo",
      credits_modal_note:
        "Ödeme sağlayıcısı: Stripe / iyzico — tüm ödemeler 3D Secure ile korunur.",
      badge_best: "En Çok Tercih Edilen",
      btn_select: "Bu Paketi Seç",

      placeholder_song_title: "Örn: Kül Bahçesi, Midnight Drive...",
      placeholder_song_desc: "Şarkının genel havasını kısaca anlat...",
      placeholder_song_lyrics:
        "Şarkı sözlerinizi buraya yazın veya boş bırakın; AIVO enstrümantal üretir...",
      placeholder_tempo: "Örn: 105",
      placeholder_extra_notes:
        "Müzikte özellikle vurgulamak istediğin detayları yaz...",

      /* Artwork */
      art_title: "Kapak / Artwork Üret",
      art_subtitle:
        "Şarkın için modern ve profesyonel bir kapak tasarla; Spotify, Apple Music veya YouTube formatında çıktılar al.",
      art_upload_title: "Referans Görsel veya Fotoğraf (opsiyonel)",
      art_upload_desc:
        "İstersen mevcut bir fotoğraf veya kapak yükleyebilirsin; AIVO renk paleti ve kompozisyonu buradan çıkarsın.",
      art_drop_main: "Görsel seç veya sürükleyip bırak",
      art_drop_sub: "PNG, JPG, minimum 1024×1024",
      art_field_title: "Proje / Şarkı Adı",
      art_field_platform: "Platform",
      art_field_style: "Stil & Renk Dünyası",
      art_field_prompt: "Kapak Açıklaması / Prompt",
      art_btn_generate: "Kapak Üret",
      art_hint:
        "Kapaklar yüksek çözünürlükte üretilir ve tüm platformlarda kullanılabilir."
    },

    /* İngilizce kısaltılmış */
    en: {
      nav_home: "Home",
      nav_dashboard: "Dashboard",
      nav_generated: "My Creations",
      nav_music: "Create Music",
      nav_credits: "Buy Credits",
      nav_billing: "Billing",
      nav_profile: "Profile",
      nav_settings: "Settings",
      nav_logout: "Log out",

      credits_label: "Credits:",
      credits_buy: "Buy",

      btn_login: "Log in",
      btn_signup: "Sign up",

      music_title: "Create Music",
      music_subtitle:
        "Pick rhythm, vocal, mood and key — AIVO builds the track.",
      btn_generate_music: "Generate Track",
      right_title: "Recently Generated Tracks",
      right_empty:
        "You haven’t generated any music yet.\nFill the form on the left and click “Generate Track”.",

      art_title: "Generate Cover Artwork",
      art_subtitle:
        "Design a modern cover for your track in Spotify, Apple Music or YouTube formats.",
      art_upload_title: "Reference image or photo (optional)",
      art_upload_desc:
        "Upload an existing cover or photo so AIVO can pick colors and composition.",
      art_drop_main: "Choose image or drag & drop",
      art_drop_sub: "PNG, JPG, at least 1024×1024",
      art_field_title: "Project / Track Title",
      art_field_platform: "Platform",
      art_field_style: "Style & Color",
      art_field_prompt: "Cover description / prompt",
      art_btn_generate: "Generate Cover",
      art_hint:
        "Covers are rendered in high resolution for all major platforms."
    },

    de: { credits_label: "Credits:", credits_buy: "Kaufen" },
    ar: { credits_label: "الرصيد:", credits_buy: "شراء" },
    ja: { credits_label: "クレジット:", credits_buy: "購入" }
  };

  let currentLang = "tr";

  function applyTranslations(lang) {
    const dict = translations[lang] || translations.tr;

    i18nElements.forEach((el) => {
      const key = el.dataset.i18n;
      if (dict[key]) el.textContent = dict[key];
    });

    i18nPlaceholders.forEach((el) => {
      const key = el.dataset.i18nPlaceholder;
      if (dict[key]) el.placeholder = dict[key];
    });

    document.documentElement.lang = lang;
  }

  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      currentLang = lang;
      langButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      applyTranslations(lang);
    });
  });

  applyTranslations(currentLang);

  /* STUDIO MOD – MÜZİK / ARTWORK */

  function setStudioMode(mode) {
    studioModePills.forEach((p) => p.classList.remove("active"));
    const activePill = Array.from(studioModePills).find(
      (p) => p.dataset.mode === mode
    );
    if (activePill) activePill.classList.add("active");

    if (mode === "music") {
      musicPanel.classList.remove("hidden");
      artworkPanel.classList.add("hidden");
    } else {
      artworkPanel.classList.remove("hidden");
      musicPanel.classList.add("hidden");
    }
  }

  studioModePills.forEach((pill) => {
    pill.addEventListener("click", () => {
      const mode = pill.dataset.mode;
      setStudioMode(mode);
    });
  });

  setStudioMode("music");

  /* BASİT / GELİŞMİŞ MOD */

  const advancedGroups = document.querySelectorAll(".advanced-only");

  function setMode(mode) {
    if (mode === "basic") {
      musicPanel.classList.add("mode-basic");
      musicPanel.classList.remove("mode-advanced");
      advancedGroups.forEach((el) => el.classList.add("hidden"));
    } else {
      musicPanel.classList.remove("mode-basic");
      musicPanel.classList.add("mode-advanced");
      advancedGroups.forEach((el) => el.classList.remove("hidden"));
    }

    modeChips.forEach((c) => c.classList.remove("active"));
    const activeChip = Array.from(modeChips).find(
      (c) => c.dataset.mode === mode
    );
    if (activeChip) activeChip.classList.add("active");
  }

  modeChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const mode = chip.dataset.mode;
      setMode(mode);
    });
  });

  setMode("basic");

  /* PRESETLER */

  const presetConfig = {
    tr_pop: { genre: "tr_pop", tempo: 105, mood: "energetic" },
    anadolu_pop: { genre: "anadolu_pop", tempo: 95, mood: "romantic" },
    deep_house: { genre: "deep_house", tempo: 122, mood: "chill" },
    lofi: { genre: "lofi", tempo: 85, mood: "chill" },
    trap: { genre: "trap", tempo: 140, mood: "energetic" }
  };

  presetButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.preset;
      const preset = presetConfig[key];
      if (!preset) return;
      if (genreSelect) genreSelect.value = preset.genre;
      if (tempoInput) tempoInput.value = preset.tempo;
      if (moodSelect) moodSelect.value = preset.mood;
      btn.classList.add("active");
      setTimeout(() => btn.classList.remove("active"), 250);
    });
  });

  /* AUDIO UPLOAD (MÜZİK) */

  if (audioInput) {
    audioInput.addEventListener("change", () => {
      const file = audioInput.files && audioInput.files[0];
      if (!file) {
        audioPreview.classList.add("hidden");
        audioPlayer.src = "";
        return;
      }
      audioFileName.textContent = file.name;
      const url = URL.createObjectURL(file);
      audioPlayer.src = url;
      audioPreview.classList.remove("hidden");
    });
  }

  /* MÜZİK ÜRET BUTONU DEMO */

  if (generateMusicBtn && generatedList) {
    generateMusicBtn.addEventListener("click", () => {
      const titleInput = document.getElementById("song-title");
      const title = titleInput && titleInput.value.trim();
      const tempoVal = tempoInput && tempoInput.value;
      const genreVal = genreSelect && genreSelect.value;

      const dict = translations[currentLang] || translations.tr;
      const fallbackTitle =
        (dict && dict.music_title) || "Yeni Üretim";

      const itemTitle = title || fallbackTitle;

      generatedList.classList.remove("empty");
      generatedList.innerHTML = "";

      const item = document.createElement("div");
      item.className = "generated-item";
      item.innerHTML = `
        <strong>${itemTitle}</strong>
        <div style="font-size:13px; color:#9ca3af; margin-top:4px;">
          ${tempoVal || "?"} BPM • ${genreVal || "N/A"}
        </div>
      `;
      generatedList.appendChild(item);
    });
  }

  /* ARTWORK – GÖRSEL YÜKLEME */

  if (artFileInput) {
    artFileInput.addEventListener("change", () => {
      const file = artFileInput.files && artFileInput.files[0];
      if (!file) {
        artPreview.classList.add("hidden");
        artPreviewImg.src = "";
        return;
      }
      artFileName.textContent = file.name;
      const url = URL.createObjectURL(file);
      artPreviewImg.src = url;
      artPreview.classList.remove("hidden");
    });
  }

  /* ARTWORK – STİL PİLL’LERİ */

  artStylePills.forEach((pill) => {
    pill.addEventListener("click", () => {
      artStylePills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
    });
  });

  /* ARTWORK ÜRET DEMO (SADECE KREDİ AZALT + ALERT) */

  if (generateArtBtn) {
    generateArtBtn.addEventListener("click", () => {
      const currentCredits = parseInt(creditCountEl.textContent || "0", 10);
      if (currentCredits <= 0) {
        alert("Yeterli kredin yok. Lütfen kredi satın al.");
        return;
      }
      const newCredits = Math.max(currentCredits - 2, 0);
      creditCountEl.textContent = String(newCredits);
      alert("Kapak üretim isteği gönderildi (demo). Gerçek API entegrasyonunda burada görselin linki dönecek.");
    });
  }

  /* KREDİ MODALI */

  function openCreditsModal() {
    creditsModal.classList.remove("hidden");
  }

  function closeCreditsModal() {
    creditsModal.classList.add("hidden");
  }

  if (buyCreditsBtn) {
    buyCreditsBtn.addEventListener("click", openCreditsModal);
  }

  if (closeCreditsModalBtn) {
    closeCreditsModalBtn.addEventListener("click", closeCreditsModal);
  }

  if (creditsModal) {
    const backdrop = creditsModal.querySelector(".modal-backdrop");
    backdrop.addEventListener("click", closeCreditsModal);
  }

  /* NAV – KREDİ AL TIKLANINCA MODAL */

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navItems.forEach((n) => n.classList.remove("active"));
      item.classList.add("active");
      const nav = item.dataset.nav;
      if (nav === "credits") {
        openCreditsModal();
      }
    });
  });
});
