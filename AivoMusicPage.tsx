import React, { useState } from "react";
import { AivoBasicMusicForm } from "./AivoBasicMusicForm";
import { AivoAdvancedMusicForm } from "./AivoAdvancedMusicForm";

type Mode = "basic" | "advanced";

export const AivoMusicPage: React.FC = () => {
  const [mode, setMode] = useState<Mode>("basic");

  const handleSubmit = (payload: any) => {
    console.log("AIVO MUSIC PAYLOAD:", payload);
    // burada backend API çağrısı yapılacak
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Üst başlık + mod toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Müzik Üret</h1>
          <p className="text-sm opacity-70">
            Ritim, ruh hali, mood ve makam seç — AIVO şarkıyı oluştursun.
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <button
            type="button"
            onClick={() => setMode("basic")}
            className={`px-3 py-1 rounded-full border ${
              mode === "basic"
                ? "bg-white/10 border-white"
                : "bg-transparent border-white/20 opacity-70"
            }`}
          >
            Basit Mod
          </button>
          <button
            type="button"
            onClick={() => setMode("advanced")}
            className={`px-3 py-1 rounded-full border ${
              mode === "advanced"
                ? "bg-white/10 border-white"
                : "bg-transparent border-white/20 opacity-70"
            }`}
          >
            Gelişmiş Mod
          </button>
        </div>
      </div>

      {/* Mod'a göre form */}
      {mode === "basic" ? (
        <AivoBasicMusicForm onSubmit={handleSubmit} />
      ) : (
        <AivoAdvancedMusicForm onSubmit={handleSubmit} />
      )}
    </div>
  );
};
