import React, { useState } from "react";

const QUICK_SUGGESTIONS = [
  "Arabesk",
  "Halk müziği",
  "Türk pop",
  "Özgün müzik",
  "Ankara oyun havası",
  "Enerjik elektronik",
  "Akustik gitar",
  "Jazz piano",
  "Chill lofi",
  "Melankolik synth",
  "Slowed + Reverb",
  "Film müziği",
] as const;

type QuickSuggestion = (typeof QUICK_SUGGESTIONS)[number];

type VocalType = "instrumental" | "male" | "female";

interface BasicMusicFormValues {
  title: string;
  description: string;
  suggestion: QuickSuggestion | null;
  vocal: VocalType;
}

const SUGGESTION_PRESETS: Record<
  QuickSuggestion,
  { genre: string; mood: string; instruments: string[] }
> = {
  Arabesk: { genre: "Arabesk", mood: "Duygusal", instruments: ["Gitar", "Strings"] },
  "Halk müziği": { genre: "Halk Müziği", mood: "Duygusal", instruments: ["Bağlama", "Ney"] },
  "Türk pop": { genre: "Pop", mood: "Enerjik", instruments: ["Piano", "Gitar"] },
  "Özgün müzik": { genre: "Özgün", mood: "Duygusal", instruments: ["Bağlama", "Piano"] },
  "Ankara oyun havası": {
    genre: "Oyun Havası",
    mood: "Enerjik",
    instruments: ["Zurna", "Darbuka"],
  },
  "Enerjik elektronik": { genre: "EDM", mood: "Enerjik", instruments: ["Synth", "Drums"] },
  "Akustik gitar": { genre: "Akustik", mood: "Sakin", instruments: ["Akustik Gitar"] },
  "Jazz piano": { genre: "Jazz", mood: "Sakin", instruments: ["Piano", "Contrabass"] },
  "Chill lofi": { genre: "Lofi", mood: "Sakin", instruments: ["Piano", "Pad"] },
  "Melankolik synth": {
    genre: "Synthwave",
    mood: "Melankolik",
    instruments: ["Synth", "Pad"],
  },
  "Slowed + Reverb": {
    genre: "Slowed",
    mood: "Melankolik",
    instruments: ["Piano", "Strings"],
  },
  "Film müziği": {
    genre: "Cinematic",
    mood: "Epik",
    instruments: ["Strings", "Brass", "Piano"],
  },
};

interface AivoBasicMusicFormProps {
  onSubmit?: (payload: any) => void;
}

export const AivoBasicMusicForm: React.FC<AivoBasicMusicFormProps> = ({ onSubmit }) => {
  const [values, setValues] = useState<BasicMusicFormValues>({
    title: "",
    description: "",
    suggestion: null,
    vocal: "instrumental",
  });

  const descriptionLimit = 200;

  const handleChange =
    (field: keyof BasicMusicFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      let v = e.target.value;
      if (field === "description" && v.length > descriptionLimit) {
        v = v.slice(0, descriptionLimit);
      }
      setValues((prev) => ({ ...prev, [field]: v }));
    };

  const handleSuggestionClick = (s: QuickSuggestion) => {
    setValues((prev) => ({
      ...prev,
      suggestion: prev.suggestion === s ? null : s,
    }));
  };

  const handleVocalChange = (v: VocalType) => {
    setValues((prev) => ({ ...prev, vocal: v }));
  };

  const handleSubmit = () => {
    const { title, description, suggestion, vocal } = values;

    const finalTitle = title.trim() || null;
    const preset = suggestion ? SUGGESTION_PRESETS[suggestion] : null;

    const payload = {
      title: finalTitle,
      description: description.trim(),
      vocal,
      autoParams: {
        ...(preset
          ? {
              genre: preset.genre,
              mood: preset.mood,
              instruments: preset.instruments,
            }
          : {}),
        mode: "basic",
      },
    };

    onSubmit?.(payload);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Şarkı Adı */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Şarkı Adı (opsiyonel)</label>
        <input
          type="text"
          value={values.title}
          onChange={handleChange("title")}
          placeholder="Örnek: Can Dostum, Aşkın Melodisi…"
          className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none"
        />
      </div>

      {/* Açıklama */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Müzik Açıklaması</label>
          <span className="text-xs opacity-60">
            {values.description.length}/{descriptionLimit}
          </span>
        </div>
        <textarea
          value={values.description}
          onChange={handleChange("description")}
          rows={3}
          placeholder="Örneğin: Hüzünlü ama enerjik, gece araba sürerken dinlenecek bir şarkı…"
          className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none resize-none"
        />
        <p className="text-xs opacity-60">
          Açıklamayı kısa ve net yaz; AIVO geri kalan müzik ayarlarını otomatik seçecek.
        </p>
      </div>

      {/* Hızlı Öneriler */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Hızlı Öneriler</label>
        <div className="flex flex-wrap gap-2">
          {QUICK_SUGGESTIONS.map((s) => {
            const active = values.suggestion === s;
            return (
              <button
                key={s}
                type="button"
                onClick={() => handleSuggestionClick(s)}
                className={`px-3 py-1 rounded-full text-xs border ${
                  active
                    ? "border-white bg-white/10"
                    : "border-white/10 bg-white/5 opacity-80"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* Vokal Türü */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Vokal</label>
        <div className="flex flex-wrap gap-4 text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={values.vocal === "instrumental"}
              onChange={() => handleVocalChange("instrumental")}
            />
            <span>Enstrümantal müzik</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={values.vocal === "male"}
              onChange={() => handleVocalChange("male")}
            />
            <span>Erkek vokal</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={values.vocal === "female"}
              onChange={() => handleVocalChange("female")}
            />
            <span>Kadın vokal</span>
          </label>
        </div>
      </div>

      {/* Aksiyon Butonu */}
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full rounded-xl px-4 py-3 text-sm font-semibold
                     bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg shadow-purple-500/30"
        >
          🎵 Müzik Üret
        </button>
        <p className="text-xs opacity-60 text-center">
          AIVO, açıklamana göre tempo, tür ve ruh halini otomatik seçecek.
        </p>
      </div>
    </div>
  );
};
