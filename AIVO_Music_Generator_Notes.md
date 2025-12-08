# AIVO Studio – Müzik Üret (Atlas Notları)

Bu dosya, AIVO Müzik Üret ekranının hem Basit Mod hem de Gelişmiş Mod için temel notlarını içerir.

## 1. Modlar

- Basit Mod:
  - Az alan, az seçenek.
  - Açıklama + hızlı öneri + vokal.
  - Tempo, tür, mood, key, enstrümanlar AI tarafından otomatik seçilir.

- Gelişmiş Mod:
  - Tür, mood, tempo, key, makam, enstrüman seçimi gibi tüm parametreler kullanıcı tarafından kontrol edilebilir.
  - Profesyonel kullanıcılar ve ince ayar isteyenler içindir.

## 2. Gelişmiş Mod Özet (Müzikal Alanlar)

- Şarkı adı
- Açıklama
- Şarkı sözleri (opsiyonel)
- Tür (Genre)
- Mood
- Tempo (BPM)
- Karar sesi (Key) – 24'lü Major/Minor yapı
- Vokal türü (enstrümantal, erkek, kadın, çoklu, koro)
- Makam / dizi (Hicaz, Hüseyni, Rast vb.)
- Enstrüman seçimi (Türk + modern enstrümanlar)
- Ek prompt

## 3. Karar Sesi (Key) – 24'lü Tam Liste

Major (Maj):
- C
- C# / Db
- D
- D# / Eb
- E
- F
- F# / Gb
- G
- G# / Ab
- A
- A# / Bb
- B

Minor (Min):
- Cm
- C#m / Dbm
- Dm
- D#m / Ebm
- Em
- Fm
- F#m / Gbm
- Gm
- G#m / Abm
- Am
- A#m / Bbm
- Bm

Bu liste Suno/Eita gibi modern müzik üreticilerdeki standart tonalite setine karşılık gelir.

## 4. Key Dropdown UI Önerisi

Select içinde iki grup:

Major (Maj)
──────────
C
C# / Db
D
D# / Eb
E
F
F# / Gb
G
G# / Ab
A
A# / Bb
B

Minor (Min)
──────────
Cm
C#m / Dbm
Dm
D#m / Ebm
Em
Fm
F#m / Gbm
Gm
G#m / Abm
Am
A#m / Bbm
Bm

## 5. Basit Mod ve Gelişmiş Mod İlişkisi

- Basit Mod:
  - Kullanıcı sade arayüzle sadece "ne hissettiğini" anlatır.
  - Arka planda Gelişmiş Mod parametreleri AI tarafından set edilir.

- Gelişmiş Mod:
  - Basit Mod'da auto seçilen tüm parametreler, kullanıcıya açılır ve düzenlenebilir hale gelir.
