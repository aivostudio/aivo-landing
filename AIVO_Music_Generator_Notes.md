# AIVO Müzik Üretici – Teknik Notlar

Bu doküman, `studio.html` / `studio.js` arayüzünün nasıl çalıştığını özetler.

## Modlar

- Basit Mod
  - Kullanıcı yalnızca kısa bir açıklama ve vokal tipi seçer.
  - Tür, BPM, mood gibi alanlar otomatik önerilir (backend tarafında).
- Gelişmiş Mod
  - Tür, mood, BPM, karar sesi (key), vokal tipi, mix stili, Türk/modern enstrümanlar seçilebilir.
  - `KEY_OPTIONS` ile 24 major/minor nota dropdown'u oluşturulur.

## BPM Öneri Mantığı (Front-end)

`studio.js` içinde `updateBpmHint()` fonksiyonu, seçilen tür ve mood'a göre basit bir BPM aralığı önerir:

- Pop + Enerjik → 112–124
- Pop + Diğer mood'lar → 96–108
- Rock → 120–140
- Rap / Trap → 80–96
- EDM → 122–130
- Anadolu Pop → 96–112

Bu aralıkların ortalama değeri input alanına otomatik yazılır (eğer kullanıcı BPM girmediyse).

## Key (Karar Sesi) Dropdown'u

`KEY_OPTIONS`:

- `major`: C, C# / Db, D, ... B
- `minor`: Cm, C#m / Dbm, ... Bm

Bu değerler hem `music/keys/keys.json` içinde saklanır, hem de `studio.js` içinde kullanıma hazırdır.

Backend tarafında bu listeler doğrudan kullanılabilir.
