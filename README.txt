AIVO Studio - Müzik Üret UI (Basit + Gelişmiş Mod)

Bu paket, Basit/Gelişmiş mod geçişi ve eksiksiz nota listesi ile çalışan
örnek bir Müzik Üret sayfası içerir.

Klasör yapısı:

- music/keys/keys.ts       -> Major/Minor 24 notalık KEY_OPTIONS
- music/keys/keys.json     -> Aynı verinin JSON hali
- music/keys/keys_notes.txt-> İnsan okunabilir liste
- src/components/AivoBasicMusicForm.tsx
- src/components/AivoAdvancedMusicForm.tsx
- src/components/AivoMusicPage.tsx      -> Mod state'ini yöneten ana sayfa

Projene entegrasyon için:

1) Bu klasörü kendi proje köküne kopyala.
2) music/keys/keys.ts dosya yolunu import path'lerine göre düzenle.
3) AivoMusicPage'i istediğin route altında render et:

   Örneğin Next.js:
   - app/aivo/music/page.tsx içinde:

      import { AivoMusicPage } from "@/src/components/AivoMusicPage";

      export default function Page() {
        return <AivoMusicPage />;
      }

4) Advanced form'un içindeki alanları, kendi mevcut Gelişmiş form alanlarınla birleştirebilirsin.
