document.addEventListener("DOMContentLoaded", () => {
  const langButtons = document.querySelectorAll(".lang-btn");
  const i18nElements = document.querySelectorAll("[data-i18n]");
  const i18nPlaceholders = document.querySelectorAll("[data-i18n-placeholder]");
  const modeChips = document.querySelectorAll(".mode-chip");
  const musicPanel = document.getElementById("music-panel");
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

  /* BASİT I18N SİSTEMİ */

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
        "Müzikte özellikle vurgulamak istediğin detayları yaz..."
    },

    /* İngilizce (kısaltılmış) */
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

      sidebar_desc:
        "Manage music and artwork generation in a single studio. AIVO blends rhythm, vocals, mood and artwork for you.",
      sidebar_modes: "Modes",
      mode_music: "Music Studio",
      mode_artwork: "Artwork Studio",
      sidebar_presets: "Quick Presets",
      sidebar_presets_hint:
        "Fill genre, tempo & mood with one tap. You can tweak afterwards.",
      sidebar_tip_title: "Tip",
      sidebar_tip_body:
        "Choose the feeling and tempo first. Use presets if you like; AIVO fills the rest for you.",

      music_title: "Create Music",
      music_subtitle:
        "Pick rhythm, vocal, mood and key — AIVO builds the track.",

      mode_basic: "Basic Mode",
      mode_basic_sub: "Fast setup for quick ideas",
      mode_advanced: "Advanced Mode",
      mode_advanced_sub: "Full control with instruments & reference audio",

      field_song_title: "Song Title",
      field_song_desc: "Song Description",
      field_song_lyrics: "Lyrics (optional)",
      field_genre: "Genre",
      field_tempo: "Tempo (BPM)",
      field_key: "Key",
      field_mix_style: "Mix Style",
      field_mood: "Mood",
      field_instruments_tr: "Traditional Instruments",
      field_instruments_modern: "Modern Instruments",
      field_vocal_type: "Vocal Type (optional)",
      field_audio_ref: "Reference Audio (optional)",
      field_extra_notes: "Extra Notes / Prompt",

      option_select_genre: "Select a genre",
      option_aivo_pop_default: "AIVO Pop Mix (default)",
      option_warm_analog: "Warm Analog",
      option_club: "Club Mix",
      option_cinematic: "Cinematic",
      option_select_mood: "Select",
      mood_energetic: "Energetic",
      mood_sad: "Sad",
      mood_romantic: "Romantic",
      mood_chill: "Chill",
      mood_epic: "Epic",

      option_instrumental: "Instrumental",
      option_female_pop: "Female Pop Vocal",
      option_male_pop: "Male Pop Vocal",
      option_choir: "Choir",

      hint_max_chars: "Maximum 200 characters.",
      hint_tempo: "Suggested BPM: 90–120",
      audio_drop_label:
        "Choose file or drag & drop (vocal or reference song)",
      hint_audio_ref:
        "Like Suno / Eita: upload your own vocal or a track so AIVO can infer style, tempo and harmony.",
      hint_beta:
        "AIVO is currently in closed beta. 10 free generations per day.",

      btn_generate_music: "Generate Track",

      tip_1: "Keep your description short and clear (up to 200 characters).",
      tip_2: "Match genre and mood (e.g. Pop + Energetic).",
      tip_3: "Key / scale is important for Turkish music.",
      tip_4: "Specifying instruments improves the mix.",

      right_title: "Recently Generated Tracks",
      right_empty:
        "You haven’t generated any music yet.\nFill the form on the left and click “Generate Track”.",

      credits_modal_title: "Credit Packages",
      credits_modal_desc:
        "Pick a package that fits your workflow. Unused credits roll over to next month.",
      credits_pack_small: "100 credits • Hobby use",
      credits_pack_med: "500 credits • Regular use",
      credits_pack_big: "1500 credits • Studio level",
      credits_modal_note:
        "Payments via Stripe / iyzico — all payments are secured with 3D Secure.",
      badge_best: "Most Popular",
      btn_select: "Choose this plan",

      placeholder_song_title: "e.g. Ash Garden, Midnight Drive...",
      placeholder_song_desc: "Briefly describe the overall feeling of the song...",
      placeholder_song_lyrics:
        "Write your lyrics here or leave blank; AIVO will create an instrumental...",
      placeholder_tempo: "e.g. 105",
      placeholder_extra_notes:
        "Describe specific details you want to emphasize in the music..."
    },

    /* Diğer diller (de, ar, ja) önceki mantığıyla kısaltılmış bırakıldı – istersen sonra genişletiriz */
    de: {
      nav_home: "Startseite",
      nav_dashboard: "Dashboard",
      nav_generated: "Meine Werke",
      nav_music: "Musik erzeugen",
      nav_credits: "Credits kaufen",
      nav_billing: "Abrechnung",
      nav_profile: "Profil",
      nav_settings: "Einstellungen",
      nav_logout: "Abmelden",
      credits_label: "Credits:",
      credits_buy: "Kaufen",
      btn_login: "Anmelden",
      btn_signup: "Registrieren",
      right_title: "Zuletzt erzeugte Tracks"
    },
    ar: {
      nav_home: "الرئيسية",
      nav_dashboard: "لوحة التحكم",
      nav_generated: "إنتاجاتي",
      nav_music: "إنشاء موسيقى",
      nav_credits: "شراء رصيد",
      nav_billing: "الفواتير",
      nav_profile: "الملف الشخصي",
      nav_settings: "الإعدادات",
      nav_logout: "تسجيل الخروج",
      credits_label: "الرصيد:",
      credits_buy: "شراء"
    },
    ja: {
      nav_home: "ホーム",
      nav_dashboard: "ダッシュボード",
      nav_generated: "作成物",
      nav_music: "楽曲生成",
      nav_credits: "クレジット購入",
      nav_billing: "請求",
      nav_profile: "プロフィール",
      nav_settings: "設定",
      nav_logout: "ログアウト",
      credits_label: "クレジット:",
      credits_buy: "購入"
    }
  };

  let currentLang = "tr";

  function applyTranslations(lang) {
    const dict = translations[lang] || translations.tr;

    i18nElements.forEach((el) => {
      const key = el.dataset.i18n;
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    i18nPlaceholders.forEach((el) => {
      const key = el.dataset.i18nPlaceholder;
      if (dict[key]) {
        el.placeholder = dict[key];
      }
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

  /* BAŞLANGIÇTA TÜRKÇE UYGULA */
  applyTranslations(currentLang);

  /* MOD GEÇİŞİ – GERÇEKTEN FARKLI FORM */

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

  /* Varsayılan: Basit mod */
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

  /* AUDIO UPLOAD */

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

  /* MÜZİK ÜRET BUTONU DEMO – LİSTEYE EKLE */

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

  /* NAV "KREDİ AL" TIKLAYINCA MODAL AÇILSIN */

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
