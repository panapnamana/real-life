// Körper, Kopf und Gesicht der Grundfigur (von vorne, Modepuppen-Stil).
// Pose: linker Arm hängt locker, rechter Arm (vom Betrachter aus) ist in die Hüfte gestützt.
import { p, shape, stroke, mirror, both, darken, lighten } from './svg.js';

export const SKIN_TONES = [
  { id: 'hell', name: 'Hell', hex: '#f9dccb' },
  { id: 'sehr-hell', name: 'Sehr hell', hex: '#fdeee6' },
  { id: 'gebraeunt', name: 'Leicht gebräunt', hex: '#e2b08c' },
  { id: 'dunkelbraun', name: 'Dunkelbraun', hex: '#8d5a3f' },
];

export const EYE_COLORS = [
  { id: 'hellbraun', name: 'Hellbraun', hex: '#a06a44' },
  { id: 'dunkelbraun', name: 'Dunkelbraun', hex: '#4e2f22' },
  { id: 'hellblau', name: 'Hellblau', hex: '#7fb4e6' },
  { id: 'tuerkis', name: 'Türkis', hex: '#3fbfb5' },
  { id: 'lila', name: 'Lila', hex: '#9a76d6' },
  { id: 'rosa', name: 'Rosa', hex: '#ee8db4' },
];

export const skinColors = (hex) => ({ fill: hex, line: darken(hex, 0.36, '#8a3f3a'), shade: darken(hex, 0.12, '#c0605a') });

const NECK = 'M 190 246 L 190 300 L 210 300 L 210 246 Z';
const TORSO = 'M 190 292 C 180 304 162 306 152 314 C 144 322 142 336 146 352 C 150 372 152 388 154 400 C 158 425 166 450 168 470 C 166 490 152 520 146 552 C 144 575 150 598 170 610 Q 200 620 230 610 C 250 598 256 575 254 552 C 248 520 234 490 232 470 C 234 450 242 425 246 400 C 248 388 250 372 254 352 C 258 336 256 322 248 314 C 238 306 220 304 210 292 Z';
const ARM_L = 'M 154 310 C 138 310 130 326 128 348 C 126 380 124 420 122 456 C 120 500 116 560 114 600 C 110 620 110 646 120 656 C 130 662 140 652 138 632 L 135 600 C 138 560 142 500 144 458 C 146 430 150 400 152 372 Z';
export const ARM_R = 'M 246 310 C 264 310 274 326 276 348 C 282 382 294 414 298 444 C 300 458 294 468 286 474 C 276 490 264 512 254 530 C 250 540 242 550 232 550 C 224 548 224 538 230 530 L 242 508 C 252 492 262 476 270 452 C 262 424 256 398 252 372 Z';
const LEG = 'M 146 556 C 144 620 152 690 162 760 C 166 790 166 810 164 830 C 158 860 154 900 160 950 C 166 1000 172 1040 174 1060 L 191 1060 C 190 1020 194 980 196 940 C 198 900 196 860 194 830 C 196 790 200 720 200 620 Z';
const FOOT = 'M 172 1054 C 166 1074 166 1094 176 1104 L 190 1104 C 196 1094 196 1074 192 1054 Z';
const HEAD = 'M 126 158 C 126 90 165 62 200 62 C 235 62 274 90 274 158 C 274 196 266 222 248 242 C 232 258 214 270 200 270 C 186 270 168 258 152 242 C 134 222 126 196 126 158 Z';
const EAR = 'M 129 178 C 117 172 112 194 120 209 C 124 216 130 215 132 208 Z';

// Liefert zwei Teile: den Körper und den gestützten Arm, der über der Kleidung liegt
export function body(s) {
  const base = shape(p(NECK) + p(TORSO) + p(ARM_L) + both(p(LEG)) + both(p(FOOT)), s.fill, s.line) +
    `<path d="M 190 256 Q 200 280 210 256 L 210 270 Q 200 290 190 270 Z" fill="${s.shade}"/>` +
    both(stroke('M 180 320 Q 168 317 156 322', s.line, 1.3, 0.45)) +
    stroke('M 126 636 Q 129 648 124 655', s.line, 1.2, 0.6) +
    both(stroke('M 172 834 Q 180 840 188 834', s.line, 1.2, 0.35)) +
    stroke('M 199 520 Q 200 525 201 520', s.line, 1.4, 0.7);
  const armR = shape(p(ARM_R), s.fill, s.line) + stroke('M 234 536 Q 239 542 246 539', s.line, 1.2, 0.6);
  return { base, armR };
}

export function head(s) {
  return shape(p(HEAD) + both(p(EAR)), s.fill, s.line) +
    both(stroke('M 125 186 Q 121 196 126 204', s.line, 1.2, 0.6));
}

export function face(ctx) {
  const { skin, eye, brow, uid } = ctx;
  const ink = '#2a1d28';
  const irisLine = darken(eye, 0.5);
  const grad = `${uid}-iris`;
  const sclera = 'M 145 198 Q 150 179 168 177 Q 186 178 190 194 Q 185 211 167 212 Q 151 210 145 198 Z';
  const eyeShape =
    `<path d="M 141 190 Q 148 166 168 164 Q 190 165 195 186 Q 188 174 168 174 Q 148 176 141 190 Z" fill="#f49ab5" opacity="0.4"/>` +
    `<path d="${sclera}" fill="#fffdfb"/>` +
    `<g clip-path="url(#${uid}-eye)">` +
    `<ellipse cx="168" cy="196" rx="15" ry="18" fill="url(#${grad})" stroke="${irisLine}" stroke-width="1.6"/>` +
    `<ellipse cx="168" cy="205" rx="9.5" ry="6" fill="${lighten(eye, 0.55)}" opacity="0.6"/>` +
    `<ellipse cx="168" cy="197" rx="6" ry="8" fill="${darken(eye, 0.7)}"/>` +
    `<path d="M 150 176 L 186 176 L 186 186 Q 168 180 150 186 Z" fill="${irisLine}" opacity="0.35"/></g>` +
    // Wimpernkranz: außen dick, zur Nase hin spitz zulaufend
    `<path d="M 141 199 Q 145 172 168 170 Q 189 170 195 189 Q 187 177 168 175.5 Q 150 177 146 199 Z" fill="${ink}"/>` +
    stroke('M 143 194 L 133 188', ink, 2.4) +
    stroke('M 145 186 L 136 178', ink, 2) +
    stroke('M 151 179 L 145 170', ink, 1.7) +
    stroke('M 153 210 Q 167 214.5 182 209', darken(skin.line, 0.25), 1.3) +
    stroke('M 147 205 L 141 209', darken(skin.line, 0.25), 1.1) +
    stroke('M 150 165 Q 168 157 188 165', skin.line, 1.2, 0.55);
  // Glanzpunkte und Glitzerstern: beim rechten Auge gespiegelt eingetragen,
  // damit das Licht bei beiden Augen von derselben Seite kommt
  const sparkle = (big, small, star) =>
    `<g fill="#fff"><circle cx="${big}" cy="187" r="4.8"/><circle cx="${small}" cy="204" r="2"/>` +
    `<path d="M ${star} 186 L ${star + 1.2} 189 L ${star + 4} 190 L ${star + 1.2} 191 L ${star} 194 L ${star - 1.2} 191 L ${star - 4} 190 L ${star - 1.2} 189 Z"/></g>`;
  return `<defs><linearGradient id="${grad}" x1="0" y1="0" x2="0" y2="1">` +
    `<stop offset="0" stop-color="${darken(eye, 0.45)}"/><stop offset="1" stop-color="${lighten(eye, 0.35)}"/>` +
    `</linearGradient><clipPath id="${uid}-eye"><path d="${sclera}"/></clipPath></defs>` +
    eyeShape + sparkle(174, 162, 159) + mirror(eyeShape + sparkle(162, 174, 177)) +
    both(stroke('M 148 156 Q 165 145 187 152', brow, 2.4)) +
    both(`<ellipse cx="150" cy="227" rx="15" ry="7" fill="#ff8fa3" opacity="0.35"/>`) +
    stroke('M 201 226 Q 203.5 230 199.5 232', skin.line, 1.6) +
    `<path d="M 188 246 Q 194 241.5 200 244.5 Q 206 241.5 212 246 Q 206 249 200 249 Q 194 249 188 246 Z" fill="#df6f88"/>` +
    `<path d="M 189 247 Q 200 249.5 211 247 Q 208 256 200 257 Q 192 256 189 247 Z" fill="#f08ea3"/>` +
    stroke('M 188 246.5 Q 200 250 212 246.5', '#b8506a', 1.3) +
    `<ellipse cx="203.5" cy="252" rx="3" ry="1.4" fill="#fff" opacity="0.85"/>`;
}
