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

const NECK = 'M 189 246 L 189 300 L 211 300 L 211 246 Z';
const TORSO = 'M 188 290 C 176 302 154 304 142 312 C 132 320 130 338 134 354 C 138 376 142 396 148 412 C 154 432 162 452 162 470 C 160 492 140 520 134 548 C 130 572 138 600 162 614 Q 200 628 238 614 C 262 600 270 572 266 548 C 260 520 240 492 238 470 C 238 452 246 432 252 412 C 258 396 262 376 266 354 C 270 338 268 320 258 312 C 246 304 224 302 212 290 Z';
const ARM_L = 'M 146 308 C 128 308 118 324 116 350 C 112 390 110 420 108 456 C 106 500 104 550 104 596 C 100 618 102 646 114 656 C 126 662 136 650 132 628 L 128 596 C 130 552 134 506 138 460 C 140 432 142 400 142 372 Z';
export const ARM_R = 'M 254 308 C 274 308 284 324 286 348 C 292 380 304 412 308 444 C 310 460 304 472 294 478 C 282 494 270 514 260 534 C 256 546 246 556 234 556 C 224 554 222 542 230 532 L 240 514 C 250 496 260 480 268 456 C 262 428 260 400 258 372 Z';
const LEG = 'M 134 552 C 130 620 140 700 152 770 C 158 800 160 816 158 834 C 150 870 146 910 152 960 C 158 1010 166 1044 170 1062 L 190 1062 C 190 1030 192 990 194 950 C 196 910 196 870 194 836 C 198 790 202 720 202 640 L 200 620 Z';
const FOOT = 'M 170 1056 C 166 1076 170 1100 180 1112 C 184 1116 188 1112 190 1104 C 194 1084 194 1068 190 1056 Z';
const HEAD = 'M 126 158 C 126 90 165 62 200 62 C 235 62 274 90 274 158 C 274 196 266 222 248 242 C 232 258 214 270 200 270 C 186 270 168 258 152 242 C 134 222 126 196 126 158 Z';
const EAR = 'M 129 178 C 117 172 112 194 120 209 C 124 216 130 215 132 208 Z';

// Liefert zwei Teile: den Körper und den gestützten Arm, der über der Kleidung liegt
export function body(s) {
  const blush = (cx, cy, rx, ry) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#f07f97" opacity="0.22"/>`;
  const base = shape(p(NECK) + p(TORSO) + p(ARM_L) + both(p(LEG)) + both(p(FOOT)), s.fill, s.line) +
    `<path d="M 189 256 Q 200 280 211 256 L 211 270 Q 200 290 189 270 Z" fill="${s.shade}"/>` +
    both(stroke('M 182 320 Q 166 316 152 322', s.line, 1.3, 0.45)) +
    both(blush(144, 322, 12, 8) + blush(177, 836, 14, 9)) +
    blush(122, 458, 9, 12) + blush(118, 646, 9, 8) +
    stroke('M 118 640 Q 121 650 117 656', s.line, 1.2, 0.6) +
    both(stroke('M 168 840 Q 177 846 186 840', s.line, 1.2, 0.35)) +
    stroke('M 199 520 Q 200 525 201 520', s.line, 1.4, 0.7) +
    stroke('M 200 600 L 200 624', s.line, 1.2, 0.4);
  const armR = shape(p(ARM_R), s.fill, s.line) + blush(298, 456, 9, 12) + blush(240, 544, 9, 7) +
    stroke('M 232 540 Q 238 547 246 544', s.line, 1.2, 0.6);
  return { base, armR };
}

export function head(s) {
  return shape(p(HEAD) + both(p(EAR)), s.fill, s.line) +
    both(stroke('M 125 186 Q 121 196 126 204', s.line, 1.2, 0.6));
}

export function face(ctx) {
  const { skin, eye, brow, uid } = ctx;
  const ink = '#24161f';
  const irisLine = darken(eye, 0.5);
  const grad = `${uid}-iris`;
  const lid = `${uid}-lid`;
  // Mandelförmiges, leicht schräges Puppenauge (linkes Auge, das rechte wird gespiegelt)
  const sclera = 'M 142 189 Q 152 177 171 177 Q 188 178 194 193 Q 185 205 167 205 Q 150 204 142 189 Z';
  const eyeShape =
    `<path d="M 138 188 Q 146 160 170 159 Q 194 160 198 186 Q 190 171 170 171 Q 150 172 138 188 Z" fill="url(#${lid})"/>` +
    `<path d="${sclera}" fill="#fffdfb"/>` +
    `<g clip-path="url(#${uid}-eye)">` +
    `<ellipse cx="169" cy="192" rx="15.5" ry="16.5" fill="url(#${grad})" stroke="${irisLine}" stroke-width="1.6"/>` +
    `<ellipse cx="169" cy="199" rx="9.5" ry="5.5" fill="${lighten(eye, 0.6)}" opacity="0.55"/>` +
    `<ellipse cx="169" cy="192" rx="6" ry="8" fill="${darken(eye, 0.72)}"/>` +
    `<path d="M 148 174 L 192 174 L 192 186 Q 170 179 148 186 Z" fill="${irisLine}" opacity="0.4"/></g>` +
    // Lidstrich mit kleinem Flügel nach außen
    `<path d="M 133 183 Q 141 176 147 178 Q 156 170 170 169.5 Q 190 170 196 190 Q 187 177 170 175.5 Q 153 177 145 192 Q 142 186 133 183 Z" fill="${ink}"/>` +
    stroke('M 140 182 L 129 176', ink, 2.2) +
    stroke('M 146 177 L 137 167', ink, 2) +
    stroke('M 153 173 L 147 162', ink, 1.8) +
    stroke('M 161 171 L 158 160', ink, 1.5) +
    stroke('M 150 203.5 Q 166 209 184 203.5', darken(skin.line, 0.3), 1.4) +
    stroke('M 146 200 L 141 204 M 152 205 L 149 209', darken(skin.line, 0.3), 1.1) +
    stroke('M 146 163 Q 169 153 192 163', skin.line, 1.2, 0.5);
  // Glanzpunkte und Glitzerstern: beim rechten Auge gespiegelt eingetragen,
  // damit das Licht bei beiden Augen von derselben Seite kommt
  const sparkle = (big, small, star) =>
    `<g fill="#fff"><circle cx="${big}" cy="186" r="5"/><circle cx="${small}" cy="199" r="2"/>` +
    `<path d="M ${star} 185 L ${star + 1.2} 188 L ${star + 4} 189 L ${star + 1.2} 190 L ${star} 193 L ${star - 1.2} 190 L ${star - 4} 189 L ${star - 1.2} 188 Z"/></g>`;
  return `<defs><linearGradient id="${grad}" x1="0" y1="0" x2="0" y2="1">` +
    `<stop offset="0" stop-color="${darken(eye, 0.5)}"/><stop offset="1" stop-color="${lighten(eye, 0.4)}"/></linearGradient>` +
    `<linearGradient id="${lid}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ee7fa2" stop-opacity="0.75"/>` +
    `<stop offset="1" stop-color="#f7b3c8" stop-opacity="0"/></linearGradient>` +
    `<clipPath id="${uid}-eye"><path d="${sclera}"/></clipPath></defs>` +
    eyeShape + sparkle(175, 162, 159) + mirror(eyeShape + sparkle(163, 176, 179)) +
    both(`<path d="M 146 152 Q 166 139 189 147 Q 167 144 146 155 Z" fill="${brow}"/>`) +
    both(`<ellipse cx="148" cy="226" rx="17" ry="8" fill="#ff7f99" opacity="0.32"/>`) +
    stroke('M 202 222 Q 205 230 199 233', skin.line, 1.5) +
    `<ellipse cx="201" cy="229" rx="1.6" ry="1.1" fill="#fff" opacity="0.8"/>` +
    `<path d="M 185 246 Q 192 239.5 200 243 Q 208 239.5 215 246 Q 208 250.5 200 250.5 Q 192 250.5 185 246 Z" fill="#d2546f"/>` +
    `<path d="M 186 247 Q 200 251 214 247 Q 211 260 200 261 Q 189 260 186 247 Z" fill="#e8798f"/>` +
    stroke('M 185 246.5 Q 200 251.5 215 246.5', '#a83d58', 1.4) +
    `<ellipse cx="204" cy="254" rx="4" ry="1.8" fill="#fff" opacity="0.85"/>` +
    `<ellipse cx="195" cy="243.5" rx="2.4" ry="1" fill="#fff" opacity="0.5"/>`;
}
