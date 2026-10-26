// Körper, Kopf und Gesicht der Grundfigur (von vorne).
import { p, shape, stroke, mirror, both, darken, lighten } from './svg.js';

export const SKIN_TONES = [
  { id: 'hell', name: 'Hell', hex: '#f8dccb' },
  { id: 'sehr-hell', name: 'Sehr hell', hex: '#fdeee6' },
  { id: 'gebraeunt', name: 'Leicht gebräunt', hex: '#e2b08c' },
  { id: 'dunkelbraun', name: 'Dunkelbraun', hex: '#8d5a3f' },
];

export const EYE_COLORS = [
  { id: 'hellbraun', name: 'Hellbraun', hex: '#9a6440' },
  { id: 'dunkelbraun', name: 'Dunkelbraun', hex: '#4e2f22' },
  { id: 'hellblau', name: 'Hellblau', hex: '#7fb4e6' },
  { id: 'tuerkis', name: 'Türkis', hex: '#3fbfb5' },
  { id: 'lila', name: 'Lila', hex: '#9a76d6' },
  { id: 'rosa', name: 'Rosa', hex: '#ee8db4' },
];

export const skinColors = (hex) => ({ fill: hex, line: darken(hex, 0.38, '#8a3f3a'), shade: darken(hex, 0.12, '#c0605a') });

const NECK = 'M 186 246 L 186 300 L 214 300 L 214 246 Z';
const TORSO = 'M 186 292 C 175 302 152 302 142 312 C 134 322 134 340 140 360 C 148 400 156 440 158 470 C 154 500 146 530 146 560 C 150 590 175 610 200 612 C 225 610 250 590 254 560 C 254 530 246 500 242 470 C 244 440 252 400 260 360 C 266 340 266 322 258 312 C 248 302 225 302 214 292 Z';
const ARM = 'M 152 306 C 134 306 124 322 122 350 L 114 470 L 106 610 C 102 630 104 654 116 664 C 128 670 138 658 136 638 L 134 610 L 142 472 L 152 380 Z';
const LEG = 'M 148 555 C 144 620 150 700 158 800 C 160 850 158 920 162 990 C 164 1030 166 1050 168 1062 L 192 1062 C 194 1040 194 1010 194 980 C 196 920 198 860 196 810 C 198 740 200 670 200 600 Z';
const FOOT = 'M 166 1054 C 160 1076 158 1096 170 1104 L 194 1104 C 200 1096 198 1074 192 1054 Z';
const HEAD = 'M 125 160 C 125 90 165 62 200 62 C 235 62 275 90 275 160 C 275 200 262 228 240 248 C 225 262 212 270 200 270 C 188 270 175 262 160 248 C 138 228 125 200 125 160 Z';
const EAR = 'M 128 178 C 116 172 111 194 119 209 C 123 216 129 215 131 208 Z';

export function body(s) {
  return shape(p(NECK) + p(TORSO) + both(p(ARM)) + both(p(LEG)) + both(p(FOOT)), s.fill, s.line) +
    `<path d="M 186 256 Q 200 280 214 256 L 214 270 Q 200 290 186 270 Z" fill="${s.shade}"/>` +
    both(stroke('M 176 318 Q 162 315 150 320', s.line, 1.3, 0.45)) +
    both(stroke('M 124 642 Q 127 654 122 661', s.line, 1.2, 0.6)) +
    stroke('M 199 518 Q 200 523 201 518', s.line, 1.4, 0.7);
}

export function head(s) {
  return shape(p(HEAD) + both(p(EAR)), s.fill, s.line) +
    both(stroke('M 124 186 Q 120 196 125 204', s.line, 1.2, 0.6));
}

export function face(ctx) {
  const { skin, eye, brow, uid } = ctx;
  const ink = '#2a1d28';
  const irisLine = darken(eye, 0.45);
  const grad = `${uid}-iris`;
  const eyeShape =
    `<path d="M 146 194 Q 152 176 170 175 Q 184 176 188 188 Q 184 206 166 208 Q 152 206 146 194 Z" fill="#fffdfb"/>` +
    `<ellipse cx="169" cy="193" rx="12" ry="15" fill="url(#${grad})" stroke="${irisLine}" stroke-width="1.2"/>` +
    `<ellipse cx="169" cy="195" rx="5.5" ry="7.5" fill="${darken(eye, 0.65)}"/>` +
    `<path d="M 157 186 Q 169 177 181 186 L 181 181 Q 169 172 157 181 Z" fill="${irisLine}" opacity="0.35"/>` +
    stroke('M 143 192 Q 150 172 170 171 Q 186 172 191 186', ink, 4.5) +
    stroke('M 144 191 L 136 185', ink, 3) +
    stroke('M 148 183 L 141 177', ink, 2) +
    stroke('M 155 206 Q 166 210 180 205', darken(skin.line, 0.2), 1.4) +
    stroke('M 151 170 Q 168 162 186 170', skin.line, 1.2, 0.7);
  // Lichtpunkte: beim rechten Auge gespiegelt eingetragen, damit das Licht von derselben Seite kommt
  const shine = (x1, x2) => `<g fill="#fff"><circle cx="${x1}" cy="186" r="4"/><circle cx="${x2}" cy="200" r="1.8"/></g>`;
  const bigger = (s) => `<g transform="translate(164 192) scale(1.15) translate(-169 -192)">${s}</g>`;
  return `<defs><linearGradient id="${grad}" x1="0" y1="0" x2="0" y2="1">` +
    `<stop offset="0" stop-color="${darken(eye, 0.35)}"/><stop offset="1" stop-color="${lighten(eye, 0.3)}"/>` +
    `</linearGradient></defs>` +
    bigger(eyeShape + shine(173, 164)) + mirror(bigger(eyeShape + shine(165, 174))) +
    both(stroke('M 149 158 Q 166 150 184 155', brow, 2.8)) +
    both(`<ellipse cx="149" cy="223" rx="13" ry="6" fill="#ff8fa3" opacity="0.28"/>`) +
    stroke('M 200 223 Q 203 227.5 199 229.5', skin.line, 1.6) +
    stroke('M 191 244 Q 200 249.5 209 244', '#c0646f', 2.2) +
    stroke('M 196 251 Q 200 252.5 204 251', '#e3a3a8', 1.5);
}
