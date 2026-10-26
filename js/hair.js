// Frisuren. Jede Frisur hat einen hinteren Teil (hinter dem Körper)
// und einen vorderen Teil (Pony und Strähnen vor dem Gesicht).
import { p, shape, stroke, both, wave, cloud, circle, darken, lighten } from './svg.js';

export const HAIR_COLORS = [
  { id: 'dunkelbraun', name: 'Dunkelbraun', hex: '#4b3226' },
  { id: 'hellbraun', name: 'Hellbraun', hex: '#a8714a' },
  { id: 'schwarz', name: 'Schwarz glänzend', hex: '#2a2633' },
  { id: 'strohblond', name: 'Strohblond', hex: '#e2bf6a' },
  { id: 'weissblond', name: 'Weißblond', hex: '#f3e9d2' },
  { id: 'rosa', name: 'Rosa', hex: '#f0a6c1' },
  { id: 'dunkelrot', name: 'Dunkelrot', hex: '#862b3a' },
];

export const hairColors = (hex) => ({ fill: hex, line: darken(hex, 0.42), light: lighten(hex, 0.5), dark: darken(hex, 0.2) });

const PINK = '#f28fb3';

// Oberkopf: beginnt links bei (112,190), endet rechts bei (288,190)
const TOP = 'C 104 90 150 40 200 40 C 250 40 296 90 288 190';
const CAP = `M 112 190 ${TOP} Z`;

// Ponys (vorderer Teil über der Stirn)
const BANGS = {
  spitz: `M 112 190 ${TOP} L 284 178 Q 280 150 268 128 Q 268 150 262 166 Q 256 140 244 120 Q 242 146 232 160 Q 226 134 214 116 Q 212 140 202 156 Q 196 132 184 118 Q 180 144 170 160 Q 162 136 150 124 Q 150 148 140 166 Q 132 144 132 128 Q 122 150 116 178 Z`,
  gerade: `M 112 190 ${TOP} L 284 176 Q 280 150 270 142 Q 236 152 200 150 Q 164 152 130 142 Q 120 150 116 176 Z`,
  seitlich: `M 112 190 ${TOP} L 284 176 Q 282 140 266 116 Q 238 98 204 104 Q 166 114 142 146 Q 130 162 122 188 Z`,
  mittelscheitel: `M 112 190 ${TOP} L 284 180 Q 278 124 238 98 Q 214 86 200 70 Q 186 86 162 98 Q 122 124 116 180 Z`,
  locken: `M 112 190 ${TOP} L 284 172 L 278 128 ${wave(278, 128, 122, 128, 7, -6, true)} L 116 172 Z`,
  gegelt: `M 112 190 ${TOP} L 284 172 C 280 120 252 86 200 84 C 148 86 120 120 116 172 Z`,
};

const BANG_LINES = {
  spitz: ['M 200 60 Q 212 90 218 108', 'M 172 66 Q 168 100 162 112', 'M 236 72 Q 246 96 246 112'],
  gerade: ['M 170 70 Q 166 110 168 148', 'M 230 70 Q 236 110 234 148', 'M 200 60 L 200 146'],
  seitlich: ['M 250 70 Q 220 80 190 110', 'M 226 64 Q 196 76 166 118'],
  mittelscheitel: ['M 186 84 Q 160 96 140 130', 'M 214 84 Q 240 96 260 130'],
  locken: [],
  gegelt: ['M 160 90 Q 176 62 206 50', 'M 200 86 Q 222 60 250 60', 'M 240 92 Q 262 78 276 102'],
};

// Seitliche Strähnen (linke Seite, wird gespiegelt)
const SIDES = {
  lang: 'M 114 150 C 106 230 112 310 122 392 L 132 376 L 140 396 C 146 320 146 232 142 150 Z',
  kurz: 'M 114 150 C 108 200 112 240 120 280 L 128 268 L 136 282 C 140 240 142 200 140 150 Z',
  wellig: `M 114 150 ${wave(114, 150, 120, 400, 6, 5)} L 132 386 L 142 406 ${wave(142, 406, 142, 150, 6, 5)} Z`,
  bob: 'M 114 140 C 106 200 108 250 116 292 Q 132 298 146 288 C 140 250 138 200 140 140 Z',
  locke: `M 116 150 ${wave(116, 150, 120, 268, 4, 4)} L 130 260 L 140 274 ${wave(140, 274, 142, 150, 4, 4)} Z`,
};

const shine = (h) =>
  stroke('M 140 96 Q 160 70 190 64', h.light, 5, 0.55) + stroke('M 214 62 Q 240 64 258 80', h.light, 4, 0.45);

function front(h, bangs, side, extra = '') {
  return (side ? shape(both(p(SIDES[side])), h.fill, h.line) : '') +
    shape(p(BANGS[bangs]), h.fill, h.line) +
    BANG_LINES[bangs].map((d) => stroke(d, h.line, 1.3, 0.55)).join('') +
    shine(h) + extra;
}

// Dünne, gewellte Haarsträhne (z. B. beim Dutt)
const strand = (d, h) => stroke(d, h.line, 6.5) + stroke(d, h.fill, 3.2);

const tie = (cx, cy) => shape(p(`M ${cx - 14} ${cy} Q ${cx} ${cy - 12} ${cx + 14} ${cy - 2} Q ${cx + 16} ${cy + 8} ${cx + 1} ${cy + 11} Q ${cx - 14} ${cy + 10} ${cx - 14} ${cy} Z`), PINK, darken(PINK, 0.3), 2);

export const HAIR = [
  {
    id: 'lang-glatt',
    name: 'Lang & glatt',
    back: (h) =>
      shape(p(`M 112 190 ${TOP} C 292 330 298 560 304 792 L 290 806 L 278 792 L 264 808 L 250 792 L 236 806 L 164 806 L 150 792 L 136 808 L 122 792 L 110 806 L 96 792 C 102 560 108 330 112 190 Z`), h.fill, h.line) +
      both(stroke('M 120 300 C 116 450 112 600 108 780', h.line, 1.3, 0.5)),
    front: (h) => front(h, 'spitz', 'lang'),
  },
  {
    id: 'lockig-huefte',
    name: 'Hüftlang lockig',
    back: (h) =>
      shape(p(`M 112 190 ${TOP} ${wave(288, 190, 312, 570, 8, 7)} ${wave(312, 570, 88, 570, 9, -9, true)} ${wave(88, 570, 112, 190, 8, 7)} Z`), h.fill, h.line) +
      both(stroke('M 106 300 q 10 20 0 40 q -10 20 0 40 q 10 20 0 40', h.line, 1.3, 0.5) +
        stroke('M 104 440 q 10 20 0 40 q -10 20 0 40', h.line, 1.3, 0.5)),
    front: (h) => front(h, 'mittelscheitel', 'wellig'),
  },
  {
    id: 'half-up',
    name: 'Half up, half down',
    back: (h) =>
      shape(p(circle(200, 30, 24)), h.fill, h.line) +
      shape(p(`M 112 190 ${TOP} C 292 330 300 480 302 600 L 288 612 L 274 598 L 260 612 L 140 612 L 126 598 L 112 612 L 98 600 C 100 480 108 330 112 190 Z`), h.fill, h.line) +
      both(stroke('M 118 300 C 114 420 110 520 108 590', h.line, 1.3, 0.5)) +
      stroke('M 182 46 Q 200 54 218 46', darken(PINK, 0.3), 9) + stroke('M 182 46 Q 200 54 218 46', PINK, 6),
    front: (h) => front(h, 'spitz', 'lang'),
  },
  {
    id: 'zopf',
    name: 'Hoher Zopf',
    back: (h) =>
      shape(p('M 210 46 C 262 14 314 52 312 150 C 310 240 322 340 300 450 Q 292 420 282 404 C 286 330 284 240 272 180 C 262 120 244 74 210 58 Z') + p(CAP), h.fill, h.line) +
      stroke('M 298 150 C 300 240 306 330 296 420', h.line, 1.3, 0.5),
    front: (h) => front(h, 'seitlich', null,
      strand('M 124 160 q -6 30 2 70', h) + strand('M 276 160 q 6 30 -2 70', h) + tie(204, 42)),
  },
  {
    id: 'bob',
    name: 'Bob mit Pony',
    back: (h) =>
      shape(p(`M 112 190 ${TOP} C 290 230 296 262 304 292 Q 280 302 256 294 L 144 294 Q 120 302 96 292 C 104 262 110 230 112 190 Z`), h.fill, h.line),
    front: (h) => front(h, 'gerade', 'bob'),
  },
  {
    id: 'dutt',
    name: 'Geflochtener Dutt',
    back: (h) => {
      // Zopfmuster: kleine schräge Bögen rund um den Dutt
      let braid = '';
      for (let i = 0; i < 9; i++) {
        const a = Math.PI * (1.05 + i * 0.1);
        const x = 200 + 30 * Math.cos(a), y = 28 + 30 * Math.sin(a);
        braid += stroke(`M ${x - 7} ${y + 4} Q ${x} ${y - 6} ${x + 7} ${y + 4}`, h.line, 1.4, 0.7);
      }
      return shape(p(circle(200, 28, 40)), h.fill, h.line) + braid +
        stroke('M 176 22 Q 200 6 224 22', h.light, 4, 0.5) +
        shape(p(CAP), h.fill, h.line);
    },
    front: (h) => front(h, 'seitlich', null,
      strand('M 128 166 q -6 30 0 56 q 4 14 -2 24', h) + strand('M 272 166 q 6 30 0 56 q -4 14 2 24', h)),
  },
  {
    id: 'kurz-lockig',
    name: 'Kurz lockig',
    back: (h) => shape(p(`${cloud(200, 166, 100, 118, 140, 400, 13, 7)} Z`), h.fill, h.line),
    front: (h) => front(h, 'locken', 'locke'),
  },
  {
    id: 'gegelt',
    name: 'Kurz, nach hinten gegelt',
    back: (h) => shape(p(`M 112 196 ${TOP.replace('288 190', '288 196')} Z`), h.fill, h.line),
    front: (h) => front(h, 'gegelt', null),
  },
];
