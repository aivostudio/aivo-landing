// Simple i18n system for AIVO landing

const translations = {
  tr: {
    "nav.logo": "AIVO",
    "nav.features": "Özellikler",
    "nav.how": "Nasıl Çalışır?",
    "nav.pricing": "Fiyatlandırma",

    "hero.badge": "Suno & Eita ile entegre AI video stüdyosu",
    "hero.title": "Sesini yaşayan videoya dönüştür",
    "hero.subtitle":
      "AIVO, Suno ve Eita çıktılarından saniyeler içinde dinamik müzik videoları, lyric videolar ve sosyal medya içerikleri üretmen için tasarlanmış akıllı bir orkestrasyon paneli.",
    "hero.primary_button": "Nasıl çalıştığını gör",
    "hero.secondary_button": "Erken erişim talep et",
    "hero.note":
      "Kod yok, render bekleme yok. Sadece müziğini yükle, geri kalanını AIVO halletsin.",
    "hero.preview_label": "Canlı Önizleme",
    "hero.preview_status": "Otomatik senkronize ediliyor…",
    "hero.waveform": "Kül Bahçesi · Harun Erkezen (Dalzal)",
    "hero.bullet_1": "Suno’dan gelen ses dosyasını yükle",
    "hero.bullet_2": "Eita / Runway için sahne sahne storyboard al",
    "hero.bullet_3": "TikTok, YouTube, Reels formatlarına tek tıkla uyarla",

    "features.title": "Tüm AI video sürecin tek panelde",
    "features.subtitle":
      "AIVO, müziğini farklı platformlara göre parçalara ayırır, otomatik sahne önerir, prompt’ları hazırlar ve hepsini senin yerine senkronize eder.",
    "features.card1_title": "Akıllı storyboard",
    "features.card1_body":
      "Şarkının BPM, enerji ve duygusuna göre sahne sahne storyboard ve prompt üret.",
    "features.card2_title": "Çoklu platform çıkış",
    "features.card2_body":
      "YouTube, TikTok, Reels ve Shorts için oran ve süreleri otomatik ayarla.",
    "features.card3_title": "Çok dilli arayüz",
    "features.card3_body":
      "Türkçe, Almanca, Arapça, İspanyolca ve Japonca arayüzle global kullanım.",

    "how.title": "3 adımda AI video",
    "how.step1_title": "Sesini içeri al",
    "how.step1_body": "Suno, DAW (Logic, Ableton vb.) veya master dosyanı yükle.",
    "how.step2_title": "Sahneleri seç",
    "how.step2_body":
      "AIVO’nun önerdiği sahneleri, geçişleri ve metinleri isteğine göre düzenle.",
    "how.step3_title": "Platforma göre çıktıyı al",
    "how.step3_body":
      "Seçtiğin AI video aracına (Eita, Runway vb.) özel prompt ve dosya paketini indir.",

    "pricing.title": "Erken erişime katıl",
    "pricing.subtitle":
      "AIVO şu anda kapalı beta aşamasında. İlk kullanıcılar için ömür boyu indirimli planlar açıyoruz.",
    "pricing.card1_title": "Producer",
    "pricing.card1_price": "Aylık 0₺ (beta)",
    "pricing.card1_feat1": "Ayda 10 video proje",
    "pricing.card1_feat2": "Suno & Eita için hazır prompt presetleri",
    "pricing.card1_feat3": "TR + EN arayüz",
    "pricing.popular": "En çok tercih edilen",
    "pricing.card2_title": "Label",
    "pricing.card2_price": "Aylık 0₺ (beta)",
    "pricing.card2_feat1": "Sınırsız proje",
    "pricing.card2_feat2": "Takım kullanımı",
    "pricing.card2_feat3": "TR + EN + DE + AR + ES + JA",

    "form.label": "Erken erişim için e-posta bırak:",
    "form.button": "Listeye katıl",
    "form.note": "Spam yok, söz. Sadece AIVO hazır olduğunda haber vereceğiz.",

    "footer.copy": "© 2025 AIVO · Harun Erkezen (Dalzal)",
    "footer.made": "Müziğini sevenler için tasarlandı."
  },

  en: {
    "nav.logo": "AIVO",
    "nav.features": "Features",
    "nav.how": "How it works",
    "nav.pricing": "Pricing",

    "hero.badge": "AI video studio integrated with Suno & Eita",
    "hero.title": "Turn your sound into living video",
    "hero.subtitle":
      "AIVO is an orchestration panel designed to turn your Suno and Eita outputs into dynamic music videos, lyric videos and social content in seconds.",
    "hero.primary_button": "See how it works",
    "hero.secondary_button": "Request early access",
    "hero.note":
      "No code, no render queue. Just upload your music and let AIVO handle the rest.",
    "hero.preview_label": "Live preview",
    "hero.preview_status": "Syncing automatically…",
    "hero.waveform": "Kül Bahçesi · Harun Erkezen (Dalzal)",
    "hero.bullet_1": "Upload the audio file coming from Suno",
    "hero.bullet_2": "Get shot-by-shot storyboards for Eita / Runway",
    "hero.bullet_3": "Adapt to TikTok, YouTube, Reels formats in one click",

    "features.title": "Your whole AI video flow in one panel",
    "features.subtitle":
      "AIVO slices your track for each platform, suggests scenes, prepares prompts and keeps everything in sync for you.",
    "features.card1_title": "Smart storyboard",
    "features.card1_body":
      "Generate scene-by-scene storyboards and prompts based on BPM, energy and emotion.",
    "features.card2_title": "Multi‑platform output",
    "features.card2_body":
      "Auto-adjust aspect ratios and durations for YouTube, TikTok, Reels and Shorts.",
    "features.card3_title": "Multilingual interface",
    "features.card3_body":
      "Use AIVO in Turkish, German, Arabic, Spanish and Japanese to reach global creators.",

    "how.title": "AI video in 3 steps",
    "how.step1_title": "Bring your audio in",
    "how.step1_body": "Upload from Suno, your DAW (Logic, Ableton etc.) or a master file.",
    "how.step2_title": "Pick your scenes",
    "how.step2_body":
      "Tweak AIVO’s suggested scenes, transitions and texts to match your style.",
    "how.step3_title": "Export for each platform",
    "how.step3_body":
      "Download prompt + asset bundles tailored to your favourite AI video tools.",

    "pricing.title": "Join the early access",
    "pricing.subtitle":
      "AIVO is currently in closed beta. Early users get lifetime discounted plans.",
    "pricing.card1_title": "Producer",
    "pricing.card1_price": "€0 / month (beta)",
    "pricing.card1_feat1": "10 video projects / month",
    "pricing.card1_feat2": "Ready‑made presets for Suno & Eita prompts",
    "pricing.card1_feat3": "TR + EN interface",
    "pricing.popular": "Most popular",
    "pricing.card2_title": "Label",
    "pricing.card2_price": "€0 / month (beta)",
    "pricing.card2_feat1": "Unlimited projects",
    "pricing.card2_feat2": "Team seats",
    "pricing.card2_feat3": "TR + EN + DE + AR + ES + JA",

    "form.label": "Leave your email for early access:",
    "form.button": "Join the waitlist",
    "form.note":
      "No spam, promise. We’ll only email you when AIVO is ready.",

    "footer.copy": "© 2025 AIVO · Harun Erkezen (Dalzal)",
    "footer.made": "Designed for people who love their music."
  },

  de: {
    "nav.logo": "AIVO",
    "nav.features": "Funktionen",
    "nav.how": "So funktioniert’s",
    "nav.pricing": "Preise",

    "hero.badge": "AI‑Videostudio mit Suno & Eita integriert",
    "hero.title": "Mach aus deinem Sound bewegtes Bild",
    "hero.subtitle":
      "AIVO verwandelt deine Suno‑ und Eita‑Outputs in Sekundenschnelle in dynamische Musikvideos, Lyric‑Videos und Social‑Clips.",
    "hero.primary_button": "Funktionsweise ansehen",
    "hero.secondary_button": "Frühzugang anfragen",
    "hero.note":
      "Kein Code, keine Render‑Warteschlange. Lade einfach deinen Track hoch – AIVO übernimmt den Rest.",
    "hero.preview_label": "Live‑Vorschau",
    "hero.preview_status": "Automatisch synchronisiert …",
    "hero.waveform": "Kül Bahçesi · Harun Erkezen (Dalzal)",
    "hero.bullet_1": "Audiofile aus Suno hochladen",
    "hero.bullet_2": "Shot‑für‑Shot‑Storyboard für Eita / Runway erhalten",
    "hero.bullet_3": "Mit einem Klick für TikTok, YouTube, Reels anpassen",

    "features.title": "Dein kompletter AI‑Video‑Flow in einem Panel",
    "features.subtitle":
      "AIVO zerlegt deinen Song für jede Plattform, schlägt Szenen vor, baut Prompts und hält alles für dich in Sync.",
    "features.card1_title": "Intelligentes Storyboard",
    "features.card1_body":
      "Erzeuge Szenen und Prompts basierend auf BPM, Energie und Emotion.",
    "features.card2_title": "Multi‑Plattform‑Export",
    "features.card2_body":
      "Seitenverhältnisse und Längen automatisch für YouTube, TikTok, Reels & Shorts anpassen.",
    "features.card3_title": "Mehrsprachige Oberfläche",
    "features.card3_body":
      "Türkisch, Deutsch, Arabisch, Spanisch und Japanisch für globale Creator.",

    "how.title": "AI‑Video in 3 Schritten",
    "how.step1_title": "Audio importieren",
    "how.step1_body": "Track aus Suno, deiner DAW oder als Master hochladen.",
    "how.step2_title": "Szenen wählen",
    "how.step2_body":
      "Von AIVO vorgeschlagene Szenen, Übergänge und Texte anpassen.",
    "how.step3_title": "Für Plattformen exportieren",
    "how.step3_body":
      "Bundles aus Prompts und Assets für deine bevorzugten AI‑Videotools herunterladen.",

    "pricing.title": "Werde Early‑Access‑User",
    "pricing.subtitle":
      "AIVO befindet sich in einer geschlossenen Beta. Frühe Nutzer erhalten dauerhaft reduzierte Pläne.",
    "pricing.card1_title": "Producer",
    "pricing.card1_price": "0 € / Monat (Beta)",
    "pricing.card1_feat1": "10 Videoprojekte pro Monat",
    "pricing.card1_feat2": "Prompt‑Presets für Suno & Eita",
    "pricing.card1_feat3": "TR + EN Interface",
    "pricing.popular": "Am beliebtesten",
    "pricing.card2_title": "Label",
    "pricing.card2_price": "0 € / Monat (Beta)",
    "pricing.card2_feat1": "Unbegrenzte Projekte",
    "pricing.card2_feat2": "Team‑Zugänge",
    "pricing.card2_feat3": "TR + EN + DE + AR + ES + JA",

    "form.label": "E‑Mail für Frühzugang hinterlassen:",
    "form.button": "Warteliste beitreten",
    "form.note":
      "Kein Spam. Wir melden uns nur, wenn AIVO live ist.",

    "footer.copy": "© 2025 AIVO · Harun Erkezen (Dalzal)",
    "footer.made": "Gemacht für Menschen, die ihre Musik lieben."
  },

  ar: {
    "nav.logo": "AIVO",
    "nav.features": "الميزات",
    "nav.how": "كيف يعمل",
    "nav.pricing": "الأسعار",

    "hero.badge": "استوديو فيديو بالذكاء الاصطناعي متكامل مع Suno و Eita",
    "hero.title": "حوّل صوتك إلى فيديو حي",
    "hero.subtitle":
      "AIVO لوحة تحكم ذكية لتحويل مخرجات Suno و Eita إلى فيديوهات موسيقية ديناميكية وفيديوهات كلمات ومحتوى سوشيال في ثوانٍ.",
    "hero.primary_button": "شاهد كيف يعمل",
    "hero.secondary_button": "اطلب الوصول المبكر",
    "hero.note":
      "لا كود، لا انتظار للرندر. ارفع موسيقاك ودع AIVO يتكفل بالباقي.",
    "hero.preview_label": "معاينة مباشرة",
    "hero.preview_status": "يتم المزامنة تلقائيًا…",
    "hero.waveform": "Kül Bahçesi · Harun Erkezen (Dalzal)",
    "hero.bullet_1": "ارفع ملف الصوت القادم من Suno",
    "hero.bullet_2": "احصل على ستوري بورد لقطة بلقطة لـ Eita / Runway",
    "hero.bullet_3": "تكيف تلقائي مع TikTok و YouTube و Reels بنقرة واحدة",

    "features.title": "كل سير عمل الفيديو بالذكاء الاصطناعي في لوحة واحدة",
    "features.subtitle":
      "AIVO يقسم أغنيتك حسب المنصات، يقترح المشاهد، يجهز الـ prompts ويحافظ على التزامن.",
    "features.card1_title": "ستوري بورد ذكي",
    "features.card1_body":
      "ينشئ مشاهد و prompts حسب الإيقاع والطاقة والمشاعر.",
    "features.card2_title": "مخارج متعددة المنصات",
    "features.card2_body":
      "يضبط أبعاد الفيديو والمدة تلقائيًا لـ YouTube و TikTok و Reels و Shorts.",
    "features.card3_title": "واجهة متعددة اللغات",
    "features.card3_body":
      "واجهة تركية وألمانية وعربية وإسبانية ويابانية لصنّاع المحتوى حول العالم.",

    "how.title": "فيديو بالذكاء الاصطناعي في 3 خطوات",
    "how.step1_title": "أدخل ملف الصوت",
    "how.step1_body": "ارفع الصوت من Suno أو من برنامج التوزيع أو ملف الماستر.",
    "how.step2_title": "اختر المشاهد",
    "how.step2_body":
      "عدّل المشاهد والانتقالات والنصوص المقترحة من AIVO كما تحب.",
    "how.step3_title": "صدّر لكل منصة",
    "how.step3_body":
      "حمّل حزم prompts والملفات الخاصة بأدوات الفيديو المفضلة لديك.",

    "pricing.title": "انضم للوصول المبكر",
    "pricing.subtitle":
      "AIVO الآن في مرحلة بيتا مغلقة. المستخدمون الأوائل يحصلون على خطط مخفّضة مدى الحياة.",
    "pricing.card1_title": "Producer",
    "pricing.card1_price": "0$ شهريًا (بيتا)",
    "pricing.card1_feat1": "10 مشاريع فيديو شهريًا",
    "pricing.card1_feat2": "قوالب جاهزة لـ Suno و Eita",
    "pricing.card1_feat3": "واجهة تركية + إنجليزية",
    "pricing.popular": "الأكثر اختيارًا",
    "pricing.card2_title": "Label",
    "pricing.card2_price": "0$ شهريًا (بيتا)",
    "pricing.card2_feat1": "مشاريع غير محدودة",
    "pricing.card2_feat2": "حسابات فريق",
    "pricing.card2_feat3": "TR + EN + DE + AR + ES + JA",

    "form.label": "اكتب بريدك للوصول المبكر:",
    "form.button": "انضم لقائمة الانتظار",
    "form.note":
      "لا رسائل مزعجة. سنراسلك فقط عندما يصبح AIVO جاهزًا.",

    "footer.copy": "© 2025 AIVO · Harun Erkezen (Dalzal)",
    "footer.made": "مصمم لعشّاق موسيقاهم."
  },

  es: {
    "nav.logo": "AIVO",
    "nav.features": "Funciones",
    "nav.how": "Cómo funciona",
    "nav.pricing": "Precios",

    "hero.badge": "Estudio de vídeo con IA integrado con Suno y Eita",
    "hero.title": "Convierte tu sonido en vídeo vivo",
    "hero.subtitle":
      "AIVO es un panel de orquestación pensado para transformar tus salidas de Suno y Eita en videoclips dinámicos, lyric videos y contenido social en segundos.",
    "hero.primary_button": "Ver cómo funciona",
    "hero.secondary_button": "Pedir acceso anticipado",
    "hero.note":
      "Sin código, sin colas de render. Solo sube tu música y deja que AIVO haga el resto.",
    "hero.preview_label": "Vista previa en vivo",
    "hero.preview_status": "Sincronizando automáticamente…",
    "hero.waveform": "Kül Bahçesi · Harun Erkezen (Dalzal)",
    "hero.bullet_1": "Sube el archivo de audio generado en Suno",
    "hero.bullet_2": "Obtén un storyboard plano por plano para Eita / Runway",
    "hero.bullet_3": "Adapta a formatos TikTok, YouTube y Reels con un clic",

    "features.title": "Todo tu flujo de vídeo con IA en un solo panel",
    "features.subtitle":
      "AIVO corta tu tema para cada plataforma, propone escenas, prepara prompts y mantiene todo sincronizado.",
    "features.card1_title": "Storyboard inteligente",
    "features.card1_body":
      "Genera escenas y prompts según BPM, energía y emoción.",
    "features.card2_title": "Salida multiplataforma",
    "features.card2_body":
      "Ajusta automáticamente relación de aspecto y duración para YouTube, TikTok, Reels y Shorts.",
    "features.card3_title": "Interfaz multilingüe",
    "features.card3_body":
      "Turco, alemán, árabe, español y japonés para creadores de todo el mundo.",

    "how.title": "Vídeo con IA en 3 pasos",
    "how.step1_title": "Importa tu audio",
    "how.step1_body":
      "Sube tu pista desde Suno, tu DAW o un archivo máster.",
    "how.step2_title": "Elige las escenas",
    "how.step2_body":
      "Ajusta las escenas, transiciones y textos sugeridos por AIVO.",
    "how.step3_title": "Exporta para cada plataforma",
    "how.step3_body":
      "Descarga paquetes de prompts y assets para tus herramientas de vídeo con IA favoritas.",

    "pricing.title": "Únete al acceso anticipado",
    "pricing.subtitle":
      "AIVO está en beta cerrada. Los primeros usuarios obtienen planes con descuento de por vida.",
    "pricing.card1_title": "Producer",
    "pricing.card1_price": "0 € / mes (beta)",
    "pricing.card1_feat1": "10 proyectos de vídeo al mes",
    "pricing.card1_feat2": "Presets de prompts para Suno y Eita",
    "pricing.card1_feat3": "Interfaz TR + EN",
    "pricing.popular": "Más popular",
    "pricing.card2_title": "Label",
    "pricing.card2_price": "0 € / mes (beta)",
    "pricing.card2_feat1": "Proyectos ilimitados",
    "pricing.card2_feat2": "Uso en equipo",
    "pricing.card2_feat3": "TR + EN + DE + AR + ES + JA",

    "form.label": "Deja tu correo para el acceso anticipado:",
    "form.button": "Unirme a la lista",
    "form.note":
      "Nada de spam. Solo te escribiremos cuando AIVO esté listo.",

    "footer.copy": "© 2025 AIVO · Harun Erkezen (Dalzal)",
    "footer.made": "Diseñado para gente que ama su música."
  },

  ja: {
    "nav.logo": "AIVO",
    "nav.features": "機能",
    "nav.how": "仕組み",
    "nav.pricing": "料金",

    "hero.badge": "Suno と Eita 連携の AI ビデオスタジオ",
    "hero.title": "サウンドを“生きた”映像に変える",
    "hero.subtitle":
      "AIVO は Suno や Eita のアウトプットから、数秒でダイナミックなミュージックビデオやリリックビデオ、SNS 用コンテンツを作るためのオーケストレーションパネルです。",
    "hero.primary_button": "仕組みを見る",
    "hero.secondary_button": "先行アクセスを申し込む",
    "hero.note":
      "コード不要・レンダリング待ちなし。トラックをアップロードするだけで、あとは AIVO に任せてください。",
    "hero.preview_label": "ライブプレビュー",
    "hero.preview_status": "自動で同期中…",
    "hero.waveform": "Kül Bahçesi · Harun Erkezen (Dalzal)",
    "hero.bullet_1": "Suno から書き出したオーディオをアップロード",
    "hero.bullet_2": "Eita / Runway 用のシーンごとのストーリーボードを取得",
    "hero.bullet_3": "TikTok / YouTube / Reels フォーマットにワンクリックで最適化",

    "features.title": "AI ビデオ制作フローを 1 つのパネルに",
    "features.subtitle":
      "AIVO は曲をプラットフォーム別に分割し、シーンを提案し、プロンプトを組み立て、すべてを同期状態に保ちます。",
    "features.card1_title": "スマート・ストーリーボード",
    "features.card1_body":
      "BPM・エネルギー・感情に基づきシーンとプロンプトを自動生成。",
    "features.card2_title": "マルチプラットフォーム出力",
    "features.card2_body":
      "YouTube / TikTok / Reels / Shorts 向けにアスペクト比と尺を自動調整。",
    "features.card3_title": "多言語インターフェース",
    "features.card3_body":
      "トルコ語・ドイツ語・アラビア語・スペイン語・日本語に対応し、世界中のクリエイターをサポート。",

    "how.title": "3 ステップで AI ビデオ",
    "how.step1_title": "オーディオを取り込む",
    "how.step1_body":
      "Suno、DAW（Logic・Ableton など）、マスター音源からアップロード。",
    "how.step2_title": "シーンを選ぶ",
    "how.step2_body":
      "AIVO が提案するシーン・トランジション・テキストを自分のスタイルに調整。",
    "how.step3_title": "各プラットフォーム向けに書き出す",
    "how.step3_body":
      "お気に入りの AI ビデオツール向けにプロンプト＋アセットのバンドルをダウンロード。",

    "pricing.title": "先行アクセスに参加",
    "pricing.subtitle":
      "AIVO は現在クローズドベータ中です。初期ユーザーには生涯割引プランを提供します。",
    "pricing.card1_title": "Producer",
    "pricing.card1_price": "月額 ¥0（ベータ）",
    "pricing.card1_feat1": "月 10 本のビデオプロジェクト",
    "pricing.card1_feat2": "Suno / Eita 用プロンプトプリセット",
    "pricing.card1_feat3": "TR + EN インターフェース",
    "pricing.popular": "一番人気",
    "pricing.card2_title": "Label",
    "pricing.card2_price": "月額 ¥0（ベータ）",
    "pricing.card2_feat1": "無制限プロジェクト",
    "pricing.card2_feat2": "チーム利用",
    "pricing.card2_feat3": "TR + EN + DE + AR + ES + JA",

    "form.label": "先行アクセス用のメールアドレス：",
    "form.button": "ウェイトリストに参加",
    "form.note":
      "スパムは送りません。AIVO が準備できたタイミングでだけご連絡します。",

    "footer.copy": "© 2025 AIVO · Harun Erkezen (Dalzal)",
    "footer.made": "音楽を愛する人のために設計しました。"
  }
};

function setLanguage(lang) {
  const root = document.documentElement;
  const isRTL = lang === "ar";

  root.lang = lang;
  root.dir = isRTL ? "rtl" : "ltr";

  const dict = translations[lang] || translations.tr;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const value = dict[key];
    if (!value) return;

    if (el.tagName.toLowerCase() === "input") {
      el.placeholder = value;
    } else {
      el.textContent = value;
    }
  });

  localStorage.setItem("aivo_lang", lang);
}

document.addEventListener("DOMContentLoaded", () => {
  const switcher = document.getElementById("languageSwitcher");
  const stored = localStorage.getItem("aivo_lang") || "tr";

  switcher.value = stored;
  setLanguage(stored);

  switcher.addEventListener("change", (e) => {
    setLanguage(e.target.value);
  });

  const form = document.querySelector(".waitlist-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Teşekkürler! (Demo form) / Thanks! (Demo form)");
    });
  }
});
