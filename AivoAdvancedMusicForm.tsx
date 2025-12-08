import React from "react";
import { KEY_OPTIONS } from "../../music/keys/keys";

interface AdvancedFormProps {
  onSubmit?: (payload: any) => void;
}

export const AivoAdvancedMusicForm: React.FC<AdvancedFormProps> = ({ onSubmit }) => {
  const [keyValue, setKeyValue] = React.useState<string>("C");

  const handleSubmit = () => {
    const payload = {
      mode: "advanced",
      key: keyValue,
      // diğer alanlar burada toplanacak
    };
    onSubmit?.(payload);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Buraya senin mevcut gelişmiş form alanların entegre edilebilir */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Karar Sesi (Key)</label>
        <select
          value={keyValue}
          onChange={(e) => setKeyValue(e.target.value)}
          className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none"
        >
          <optgroup label="Major (Maj)">
            {KEY_OPTIONS.major.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </optgroup>
          <optgroup label="Minor (Min)">
            {KEY_OPTIONS.minor.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        className="w-full rounded-xl px-4 py-3 text-sm font-semibold
                   bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg shadow-purple-500/30"
      >
        🎵 Gelişmiş Müzik Üret
      </button>
    </div>
  );
};
