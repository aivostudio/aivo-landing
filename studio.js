document.addEventListener("DOMContentLoaded", () => {
  const langButtons = document.querySelectorAll(".lang-btn");
  const i18nElements = document.querySelectorAll("[data-i18n]");
  const i18nPlaceholders = document.querySelectorAll("[data-i18n-placeholder]");
  const modeButtons = document.querySelectorAll(".mode-btn");
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

      mode_basic: "Basit",
      mode_advanced: "Gelişmiş",

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
      hint_audio_ref:
        "Suno / Eita gibi: Referans bir audio yükleyerek stile yön verebilirsin.",
      hint_beta:
        "AIVO şu anda kapalı beta aşamasında. Günlük 10 ücretsiz üretim.",

      btn_generate_music: "Müzik Üret",

      tip_1: "Açıklaman sade tut, net maksimum 200 karakter bırak.",
      tip_2: "Tür ve ruh halini uyumlu seç (örneğin: Pop + Enerjik).",
      tip_3: "Makam seçimi Türk müziği için önemli.",
      tip_4: "Enstrüman belirtmek, miks sonucunu iyileştirir.",

      right_title: "Son Üretilen Müzikler",
      right_empty:
        "Henüz müzik üretmedin. Soldaki formu doldurup “Müzik Üret” butonuna basarak başla.",

      credits_modal_title: "Kredi Paketleri",
      credits_modal_desc:
        "İhtiyacına göre bir paket seç. Kullanmadığın krediler bir sonraki aya devredilir.",
      credits_pack_small: "100 kredi • Hobi kullanımı",
      credits_pack_med: "500 kredi • Düzenli üretim",
      credits_pack_big: "1500 kredi • Profesyonel stüdyo",
      credits_modal_note:
        "Ödeme sağlayıcısı: Stripe / iyzico — tüm ödemeler 3D Secure ile korunur.",
      btn_select: "Seç",

      placeholder_song_title: "Örn: Kül Bahçesi, Midnight Drive...",
      placeholder_song_desc: "Şarkının genel havasını kısaca anlat...",
      placeholder_song_lyrics:
        "Şarkı sözlerinizi buraya yazın veya boş bırakın; AIVO enstrümantal üretir...",
      placeholder_tempo: "Örn: 105",
      placeholder_extra_notes:
        "Müzikte özellikle vurgulamak istediğin detayları yaz..."
    },

    /* İngilizce */
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

      mode_basic: "Basic",
      mode_advanced: "Advanced",

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
      hint_audio_ref:
        "Like Suno / Eita: upload a reference audio to guide the style.",
      hint_beta:
        "AIVO is currently in closed beta. 10 free generations per day.",

      btn_generate_music: "Generate Track",

      tip_1: "Keep your description short and clear, up to 200 characters.",
      tip_2: "Match genre and mood (e.g., Pop + Energetic).",
      tip_3: "Key / scale is important for Turkish music.",
      tip_4: "Specifying instruments improves the final mix.",

      right_title: "Recently Generated Tracks",
      right_empty:
        "You haven’t generated any music yet. Fill the form on the left and click “Generate Track”.",

      credits_modal_title: "Credit Packages",
      credits_modal_desc:
        "Pick a package that fits your workflow. Unused credits roll over to next month.",
      credits_pack_small: "100 credits • Hobby use",
      credits_pack_med: "500 credits • Regular use",
      credits_pack_big: "1500 credits • Studio level",
      credits_modal_note:
        "Payments via Stripe / iyzico — all payments are secured with 3D Secure.",
      btn_select: "Select",

      placeholder_song_title: "e.g. Ash Garden, Midnight Drive...",
      placeholder_song_desc: "Briefly describe the overall feeling of the song...",
      placeholder_song_lyrics:
        "Write your lyrics here or leave blank; AIVO will create an instrumental...",
      placeholder_tempo: "e.g. 105",
      placeholder_extra_notes:
        "Describe specific details you want to emphasize in the music..."
    },

    /* Almanca (kısa, temel metinler) */
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

      sidebar_desc:
        "Verwalte Musik- und Artwork-Generierung in einem Studio. AIVO kombiniert Rhythmus, Vocals, Stimmung und Cover.",
      sidebar_modes: "Modi",
      mode_music: "Music Studio",
      mode_artwork: "Artwork Studio",
      sidebar_presets: "Schnelle Presets",
      sidebar_presets_hint:
        "Genre, Tempo und Stimmung mit einem Klick füllen.",
      sidebar_tip_title: "Tipp",
      sidebar_tip_body:
        "Wähle zuerst Stimmung und Tempo. Mit Presets geht es schneller.",

      music_title: "Musik erzeugen",
      music_subtitle:
        "Wähle Rhythmus, Vocal, Stimmung und Tonart – AIVO baut den Track.",

      mode_basic: "Basic",
      mode_advanced: "Advanced",

      field_song_title: "Songtitel",
      field_song_desc: "Songbeschreibung",
      field_song_lyrics: "Songtext (optional)",
      field_genre: "Genre",
      field_tempo: "Tempo (BPM)",
      field_key: "Tonart",
      field_mix_style: "Mix-Stil",
      field_mood: "Stimmung",
      field_instruments_tr: "Traditionelle Instrumente",
      field_instruments_modern: "Moderne Instrumente",
      field_vocal_type: "Vocal-Typ (optional)",
      field_audio_ref: "Referenz-Audio (optional)",
      field_extra_notes: "Zusätzliche Hinweise / Prompt",

      option_select_genre: "Genre wählen",
      option_aivo_pop_default: "AIVO Pop Mix (Standard)",
      option_warm_analog: "Warmer Analog",
      option_club: "Club Mix",
      option_cinematic: "Cinematic",
      option_select_mood: "Wählen",
      mood_energetic: "Energisch",
      mood_sad: "Traurig",
      mood_romantic: "Romantisch",
      mood_chill: "Entspannt",
      mood_epic: "Episch",

      option_instrumental: "Instrumental",
      option_female_pop: "Weiblicher Pop-Vocal",
      option_male_pop: "Männlicher Pop-Vocal",
      option_choir: "Chor",

      hint_max_chars: "Maximal 200 Zeichen.",
      hint_tempo: "Empfohlene BPM: 90–120",
      hint_audio_ref:
        "Wie bei Suno / Eita: Referenz-Audio hochladen, um den Stil zu steuern.",
      hint_beta:
        "AIVO befindet sich derzeit in geschlossener Beta. 10 kostenlose Generierungen pro Tag.",

      btn_generate_music: "Track erzeugen",

      tip_1: "Beschreibe den Song kurz und klar, bis zu 200 Zeichen.",
      tip_2: "Genre und Stimmung sollten zusammenpassen.",
      tip_3: "Tonart ist für türkische Musik wichtig.",
      tip_4: "Instrument-Angaben verbessern den Mix.",

      right_title: "Zuletzt erzeugte Tracks",
      right_empty:
        "Noch keine Musik erzeugt. Fülle das Formular links aus und klicke „Track erzeugen“.",

      credits_modal_title: "Credit-Pakete",
      credits_modal_desc:
        "Wähle ein Paket, das zu deinem Workflow passt. Ungenutzte Credits werden übertragen.",
      credits_pack_small: "100 Credits • Hobby",
      credits_pack_med: "500 Credits • Regelmäßig",
      credits_pack_big: "1500 Credits • Studio",
      credits_modal_note:
        "Zahlungen über Stripe / iyzico — alle Zahlungen sind 3D-Secure-geschützt.",
      btn_select: "Auswählen",

      placeholder_song_title: "z.B. Aschegarten, Midnight Drive...",
      placeholder_song_desc:
        "Beschreibe kurz die Stimmung des Songs...",
      placeholder_song_lyrics:
        "Songtext hier eingeben oder leer lassen – AIVO erzeugt Instrumental...",
      placeholder_tempo: "z.B. 105",
      placeholder_extra_notes:
        "Beschreibe Details, die im Mix hervorgehoben werden sollen..."
    },

    /* Arapça – sağdan sola destek: sadece metin çevirisi */
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
      credits_buy: "شراء",

      btn_login: "تسجيل الدخول",
      btn_signup: "إنشاء حساب",

      sidebar_desc:
        "أدر إنشاء الموسيقى والأغلفة من لوحة واحدة. AIVO يجمع الإيقاع، الصوت، المزاج والغلاف.",
      sidebar_modes: "الأوضاع",
      mode_music: "استوديو الموسيقى",
      mode_artwork: "استوديو الأغلفة",
      sidebar_presets: "إعدادات سريعة",
      sidebar_presets_hint:
        "املأ النوع والإيقاع والمزاج بنقرة واحدة، ويمكنك التعديل لاحقًا.",
      sidebar_tip_title: "نصيحة",
      sidebar_tip_body:
        "اختر الشعور والإيقاع أولًا، واستخدم الإعدادات السريعة إن أردت.",

      music_title: "إنشاء موسيقى",
      music_subtitle:
        "اختر الإيقاع، الصوت، المزاج والمقام – وAIVO ينشئ المقطع.",

      mode_basic: "بسيط",
      mode_advanced: "متقدم",

      field_song_title: "عنوان الأغنية",
      field_song_desc: "وصف الأغنية",
      field_song_lyrics: "الكلمات (اختياري)",
      field_genre: "النوع",
      field_tempo: "السرعة (BPM)",
      field_key: "المقام",
      field_mix_style: "أسلوب الميكس",
      field_mood: "المزاج",
      field_instruments_tr: "آلات تقليدية",
      field_instruments_modern: "آلات حديثة",
      field_vocal_type: "نوع الصوت (اختياري)",
      field_audio_ref: "ملف صوتي مرجعي (اختياري)",
      field_extra_notes: "ملاحظات إضافية / برومبت",

      option_select_genre: "اختر النوع",
      option_aivo_pop_default: "AIVO Pop Mix (افتراضي)",
      option_warm_analog: "أنالوج دافئ",
      option_club: "كلَب ميكس",
      option_cinematic: "سينمائي",
      option_select_mood: "اختر",
      mood_energetic: "حماسي",
      mood_sad: "حزين",
      mood_romantic: "رومانسي",
      mood_chill: "هادئ",
      mood_epic: "ملحمي",

      option_instrumental: "موسيقى فقط",
      option_female_pop: "صوت نسائي بوب",
      option_male_pop: "صوت رجالي بوب",
      option_choir: "جوقة",

      hint_max_chars: "بحد أقصى 200 حرف.",
      hint_tempo: "السرعة المقترحة: 90–120 BPM.",
      hint_audio_ref:
        "مثل Suno / Eita: يمكنك رفع ملف صوتي مرجعي لتوجيه الأسلوب.",
      hint_beta:
        "AIVO حاليًا في مرحلة تجريبية مغلقة. 10 عمليات إنشاء مجانية يوميًا.",

      btn_generate_music: "إنشاء المقطع",

      tip_1: "اجعل الوصف قصيرًا وواضحًا (حتى 200 حرف).",
      tip_2: "اجعل النوع والمزاج متناسقين.",
      tip_3: "المقام مهم في الموسيقى التركية.",
      tip_4: "ذكر الآلات يساعد على تحسين الميكس.",

      right_title: "آخر المقاطع المُنشأة",
      right_empty:
        "لم تنشئ أي موسيقى بعد. املأ النموذج على اليسار واضغط «إنشاء المقطع».",

      credits_modal_title: "باقات الرصيد",
      credits_modal_desc:
        "اختر الباقة المناسبة لاستخدامك. يتم ترحيل الرصيد غير المستخدم للشهر التالي.",
      credits_pack_small: "100 رصيد • استخدام هواة",
      credits_pack_med: "500 رصيد • استخدام منتظم",
      credits_pack_big: "1500 رصيد • استوديو محترف",
      credits_modal_note:
        "الدفع عبر Stripe / iyzico – جميع المدفوعات محمية بـ 3D Secure.",
      btn_select: "اختيار",

      placeholder_song_title: "مثال: حديقة الرماد، Midnight Drive...",
      placeholder_song_desc: "صف شعور الأغنية بشكل مختصر...",
      placeholder_song_lyrics:
        "اكتب كلمات الأغنية هنا أو اتركها فارغة لإنشاء مقطع موسيقي فقط...",
      placeholder_tempo: "مثال: 105",
      placeholder_extra_notes:
        "اكتب التفاصيل التي تود التركيز عليها في الموسيقى..."
    },

    /* Japonca – özet çeviri */
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
      credits_buy: "購入",

      btn_login: "ログイン",
      btn_signup: "登録",

      sidebar_desc:
        "音楽とアートワークの生成を一つのスタジオで管理します。AIVO がリズム・ボーカル・ムード・カバーを組み合わせます。",
      sidebar_modes: "モード",
      mode_music: "Music Studio",
      mode_artwork: "Artwork Studio",
      sidebar_presets: "クイックプリセット",
      sidebar_presets_hint:
        "ジャンルとテンポ、ムードをワンタップで入力できます。",
      sidebar_tip_title: "ヒント",
      sidebar_tip_body:
        "まず曲の雰囲気とテンポを決めましょう。必要ならプリセットを使ってください。",

      music_title: "楽曲生成",
      music_subtitle:
        "リズム・ボーカル・ムード・キーを選ぶと、AIVO がトラックを作成します。",

      mode_basic: "ベーシック",
      mode_advanced: "アドバンス",

      field_song_title: "曲名",
      field_song_desc: "曲の説明",
      field_song_lyrics: "歌詞（任意）",
      field_genre: "ジャンル",
      field_tempo: "テンポ (BPM)",
      field_key: "キー",
      field_mix_style: "ミックススタイル",
      field_mood: "ムード",
      field_instruments_tr: "伝統楽器",
      field_instruments_modern: "モダン楽器",
      field_vocal_type: "ボーカルタイプ（任意）",
      field_audio_ref: "参考オーディオ（任意）",
      field_extra_notes: "追加ノート / プロンプト",

      option_select_genre: "ジャンルを選択",
      option_aivo_pop_default: "AIVO Pop Mix (デフォルト)",
      option_warm_analog: "ウォームアナログ",
      option_club: "クラブミックス",
      option_cinematic: "シネマティック",
      option_select_mood: "選択",
      mood_energetic: "エネルギッシュ",
      mood_sad: "切ない",
      mood_romantic: "ロマンチック",
      mood_chill: "チル",
      mood_epic: "エピック",

      option_instrumental: "インストゥルメンタル",
      option_female_pop: "女性ポップボーカル",
      option_male_pop: "男性ポップボーカル",
      option_choir: "クワイア",

      hint_max_chars: "最大 200 文字。",
      hint_tempo: "推奨 BPM: 90–120",
      hint_audio_ref:
        "Suno / Eita のように、参考オーディオでスタイルを指定できます。",
      hint_beta:
        "AIVO は現在クローズドベータ中です。1日10回まで無料。",

      btn_generate_music: "トラック生成",

      tip_1: "説明は短くシンプルに、200文字以内にしましょう。",
      tip_2: "ジャンルとムードを合わせて選択します。",
      tip_3: "キーはトルコ音楽では重要です。",
      tip_4: "使用する楽器を指定するとミックスが良くなります。",

      right_title: "最新の生成トラック",
      right_empty:
        "まだ楽曲を生成していません。左のフォームを入力して「トラック生成」を押してください。",

      credits_modal_title: "クレジットパック",
      credits_modal_desc:
        "ワークフローに合ったパックを選びましょう。未使用クレジットは翌月に繰り越されます。",
      credits_pack_small: "100 クレジット • ホビー",
      credits_pack_med: "500 クレジット • レギュラー",
      credits_pack_big: "1500 クレジット • スタジオ",
      credits_modal_note:
        "Stripe / iyzico による決済 — すべて 3D セキュアで保護されます。",
      btn_select: "選択",

      placeholder_song_title: "例：Ash Garden, Midnight Drive...",
      placeholder_song_desc: "曲全体の雰囲気を簡単に説明してください...",
      placeholder_song_lyrics:
        "ここに歌詞を書くか、空欄にするとインストのみを生成します...",
      placeholder_tempo: "例：105",
      placeholder_extra_notes:
        "音楽で特に強調したいポイントを入力してください..."
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

  /* MODE TOGGLE */

  modeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      modeButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const mode = btn.dataset.mode;
      if (mode === "basic") {
        musicPanel.classList.remove("mode-advanced");
        musicPanel.classList.add("mode-basic");
      } else {
        musicPanel.classList.remove("mode-basic");
        musicPanel.classList.add("mode-advanced");
      }
    });
  });

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

  /* MÜZİK ÜRET BUTONU DEMOSU */

  if (generateMusicBtn && generatedList) {
    generateMusicBtn.addEventListener("click", () => {
      const titleInput = document.getElementById("song-title");
      const title = titleInput && titleInput.value.trim();

      const itemTitle =
        title ||
        (translations[currentLang] &&
          translations[currentLang].music_title) ||
        "Yeni Üretim";

      generatedList.classList.remove("empty");
      generatedList.innerHTML = "";

      const item = document.createElement("div");
      item.className = "generated-item";
      item.innerHTML = `
        <strong>${itemTitle}</strong>
        <div style="font-size:12px; color:#9ca3af; margin-top:3px;">
          ${tempoInput.value || 0} BPM • ${genreSelect.value || "N/A"}
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
