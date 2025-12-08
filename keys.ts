export const KEY_OPTIONS = {
  major: [
    "C",
    "C# / Db",
    "D",
    "D# / Eb",
    "E",
    "F",
    "F# / Gb",
    "G",
    "G# / Ab",
    "A",
    "A# / Bb",
    "B",
  ],
  minor: [
    "Cm",
    "C#m / Dbm",
    "Dm",
    "D#m / Ebm",
    "Em",
    "Fm",
    "F#m / Gbm",
    "Gm",
    "G#m / Abm",
    "Am",
    "A#m / Bbm",
    "Bm",
  ],
} as const;

export type MajorKey = (typeof KEY_OPTIONS.major)[number];
export type MinorKey = (typeof KEY_OPTIONS.minor)[number];
