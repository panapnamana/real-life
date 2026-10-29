// Kleidung: Oberteile, Unterteile, Schuhe. Kleidung hat feste Farben.
// Jedes Teil bekommt ctx (Hautfarbe usw.) und liefert SVG-Text.
// Oberteile haben zwei Teile: render (Oberkörper + linker Ärmel) und armR (Ärmel am
// gestützten Arm, wird über dem Arm gezeichnet).
import { p, shape, stroke, both, wave, cloud, darken, lighten } from './svg.js';

const fill = (color, inner, w) => shape(inner, color, darken(color, 0.35), w);
const lines = (color, list, w = 1.3, o = 0.6) => list.map((d) => stroke(d, darken(color, 0.35), w, o)).join('');

// Ärmel am locker hängenden Arm (links)
const L = {
  kurz: 'M 156 310 C 138 310 128 324 126 350 Q 140 358 152 354 Z',
  halb: 'M 156 308 C 132 308 120 326 118 356 L 114 436 Q 132 446 150 438 L 152 380 Z',
  lang: 'M 156 310 C 136 310 126 326 124 350 L 118 458 L 110 602 Q 124 610 140 602 L 147 458 L 152 372 Z',
  puff: 'M 154 336 C 132 332 120 350 122 374 C 124 394 140 402 156 396 Z',
};
// Ärmel am gestützten Arm (rechts)
const R = {
  kurz: 'M 244 310 C 262 310 273 324 276 350 Q 262 358 250 354 Z',
  halb: 'M 244 308 C 268 308 280 326 282 350 C 287 380 296 410 300 438 Q 284 450 266 442 C 260 420 254 396 250 376 Z',
  lang: 'M 244 310 C 264 310 276 326 278 348 C 284 382 296 414 300 444 C 302 460 296 470 288 476 C 278 492 266 514 258 530 Q 246 528 240 506 C 250 490 260 474 268 452 C 260 424 254 398 250 372 Z',
  puff: 'M 246 336 C 268 332 282 350 282 376 C 280 396 264 404 248 396 Z',
};

// Taillierter Oberkörper (Schulter bis Taille), unten offen für verschiedene Längen
const FITTED = 'M 152 314 C 162 306 178 304 188 294 Q 200 314 212 294 C 222 304 238 306 248 314 C 256 322 258 336 254 352 C 250 372 248 388 246 400 C 242 425 234 450 232 470';
const FITTED_BACK = 'C 166 450 158 425 154 400 C 152 388 150 372 146 352 C 142 336 144 322 152 314 Z';

// ---------- Oberteile ----------

export const TOPS = [
  {
    id: 'crop',
    name: 'Bauchfreies Top',
    render: () => {
      const c = '#f6b8cc';
      return fill(c,
        p('M 152 314 C 162 306 178 304 188 296 Q 200 324 212 296 C 222 304 238 306 248 314 C 256 322 258 336 254 352 C 250 372 248 388 246 400 C 244 412 242 422 240 432 Q 200 442 160 432 C 158 422 156 412 154 400 C 152 388 150 372 146 352 C 142 336 144 322 152 314 Z') + p(L.kurz)) +
        lines(c, ['M 160 424 Q 200 434 240 424']) +
        fill('#ee8aae', p('M 200 318 L 190 312 L 190 324 Z') + p('M 200 318 L 210 312 L 210 324 Z'), 1.5);
    },
    armR: () => fill('#f6b8cc', p(R.kurz)),
  },
  {
    id: 'tshirt',
    name: 'Lockeres T-Shirt',
    render: () => {
      const c = '#fbfaf6';
      return fill(c,
        p('M 188 294 Q 200 308 212 294 C 228 302 246 304 256 314 C 266 330 266 356 262 376 L 262 470 C 264 520 266 556 264 574 Q 200 586 136 574 C 134 556 136 520 138 470 L 138 376 C 134 356 134 330 144 314 C 154 304 172 302 188 294 Z') + p(L.halb)) +
        lines(c, ['M 188 294 Q 200 308 212 294', 'M 152 520 Q 162 540 154 566', 'M 116 428 Q 132 436 150 430']) +
        fill('#f3a0bf', p('M 222 372 C 222 362 234 360 236 370 C 238 360 250 362 250 372 C 250 382 236 390 236 394 C 236 390 222 382 222 372 Z'), 1.5);
    },
    armR: () => fill('#fbfaf6', p(R.halb)) + lines('#fbfaf6', ['M 270 434 Q 284 440 298 432']),
  },
  {
    id: 'langarm',
    name: 'Enges Langarmshirt',
    render: () => {
      const c = '#2f2b36';
      return fill(c, p(`${FITTED} C 233 480 234 490 236 500 Q 200 508 164 500 C 166 490 167 480 168 470 ${FITTED_BACK}`) + p(L.lang)) +
        stroke('M 112 590 Q 125 596 140 590', '#4a4553', 1.3) +
        stroke('M 172 330 Q 200 344 228 330', '#5a5464', 1.6, 0.4);
    },
    armR: () => fill('#2f2b36', p(R.lang)) + stroke('M 244 504 Q 252 516 258 526', '#4a4553', 1.3),
  },
  {
    id: 'schulterfrei',
    name: 'Schulterfreies Top',
    render: () => {
      const c = '#cdb8ec';
      return fill(c,
        p('M 146 340 Q 200 356 254 340 C 256 348 256 352 254 358 C 250 376 248 390 246 400 C 242 425 234 450 232 470 C 234 488 236 502 238 516 Q 200 526 162 516 C 164 502 166 488 168 470 C 166 450 158 425 154 400 C 152 390 150 376 146 358 C 144 352 144 348 146 340 Z') + p(L.puff)) +
        stroke(`M 148 346 ${wave(148, 346, 252, 346, 9, 2.5, true)}`, darken(c, 0.35), 1.3, 0.6) +
        lines(c, ['M 126 388 Q 140 396 156 390', 'M 178 470 Q 182 494 178 514', 'M 222 470 Q 218 494 222 514']);
    },
    armR: () => fill('#cdb8ec', p(R.puff)) + lines('#cdb8ec', ['M 278 388 Q 264 396 248 390']),
  },
  {
    id: 'bluse',
    name: 'Bluse',
    render: () => {
      const c = '#fff5e8';
      const buttons = [336, 372, 408, 444, 480].map((y) => `<circle cx="200" cy="${y}" r="3.2" fill="${darken(c, 0.25)}"/>`).join('');
      return fill(c,
        p('M 188 292 Q 200 300 212 292 C 224 304 240 306 250 314 C 258 324 260 338 256 354 C 252 374 250 390 248 402 C 244 426 236 450 234 470 C 238 490 244 506 250 524 Q 200 536 150 524 C 156 506 162 490 166 470 C 164 450 156 426 152 402 C 150 390 148 374 144 354 C 140 338 142 324 150 314 C 160 306 176 304 188 292 Z') + p(L.lang)) +
        fill(c, p('M 108 594 Q 124 602 142 594 L 141 610 Q 124 618 109 610 Z'), 2) +
        both(fill(c, p('M 188 290 L 172 314 L 196 326 L 200 304 Z'), 2)) +
        stroke('M 200 306 L 200 528', darken(c, 0.3), 1.3, 0.6) + buttons +
        stroke('M 122 456 Q 134 462 146 458', darken(c, 0.3), 1.2, 0.5);
    },
    armR: () => fill('#fff5e8', p(R.lang)) + stroke('M 242 506 Q 252 516 258 528', darken('#fff5e8', 0.3), 1.5),
  },
  {
    id: 'jogging',
    name: 'Joggingjacke über Top',
    render: () => {
      const c = '#b8e6d4';
      const dark = darken(c, 0.35);
      return fill('#f7b6cb', p('M 186 298 Q 200 312 214 298 L 220 452 Q 200 458 180 452 Z'), 2) +
        fill(c, p('M 172 302 Q 200 288 228 302 L 224 286 Q 200 274 176 286 Z'), 2) +
        both(fill(c, p('M 188 292 C 178 302 160 306 150 314 C 140 324 138 340 142 360 C 146 420 142 480 140 548 Q 162 556 184 550 C 186 470 188 380 190 300 Z')) +
          stroke('M 142 534 Q 162 541 184 536', dark, 1.3, 0.7) +
          stroke('M 190 302 C 188 380 186 470 184 548', dark, 2, 0.8) +
          stroke('M 162 500 L 178 498', dark, 1.6, 0.7)) +
        fill(c, p(L.lang)) +
        fill(c, p('M 108 594 Q 124 602 142 594 L 141 612 Q 124 620 109 612 Z'), 2) +
        stroke('M 130 330 L 122 458 L 116 586', '#ffffff', 4, 0.9);
    },
    armR: () => fill('#b8e6d4', p(R.lang)) + stroke('M 270 330 C 278 370 288 410 292 444', '#ffffff', 4, 0.9),
  },
];

// ---------- Unterteile ----------

const WAIST = 'M 166 484 Q 200 490 234 484';

export const BOTTOMS = [
  {
    id: 'minirock',
    name: 'Kurzer Faltenrock',
    render: () => {
      const c = '#f4a9c4';
      return fill(c, p('M 168 468 Q 200 474 232 468 L 236 484 C 252 530 266 590 272 634 Q 200 652 128 634 C 134 590 148 530 164 484 Z')) +
        lines(c, [WAIST, 'M 176 488 L 154 640', 'M 188 490 L 178 646', 'M 200 490 L 200 648', 'M 212 490 L 222 646', 'M 224 488 L 246 640']);
    },
  },
  {
    id: 'baggy',
    name: 'Baggy Hose',
    render: () => {
      const c = '#e6d6bb';
      return fill(c, p('M 168 468 Q 200 474 232 468 C 244 500 254 530 258 560 C 266 700 274 900 278 1066 Q 246 1076 210 1066 L 204 650 Q 200 630 196 650 L 190 1066 Q 154 1076 122 1066 C 126 900 134 700 142 560 C 146 530 156 500 168 468 Z')) +
        both(fill(c, p('M 138 720 L 166 716 L 168 790 L 140 794 Z'), 2) + lines(c, ['M 138 732 L 166 728', 'M 140 960 Q 152 980 168 972', 'M 130 1030 Q 146 1046 170 1040'])) +
        lines(c, [WAIST, 'M 200 490 L 200 600']);
    },
  },
  {
    id: 'flared',
    name: 'Flared Low-Waist-Jeans',
    render: () => {
      const c = '#7fa0d8';
      const seam = ' stroke-dasharray="3 3"';
      return fill(c, p('M 150 526 Q 200 538 250 526 C 254 545 256 560 256 578 C 254 650 248 740 240 820 C 246 900 262 1000 270 1072 Q 236 1080 206 1070 C 204 980 204 900 204 830 C 204 740 202 690 200 650 C 198 690 196 740 196 830 C 196 900 196 980 194 1070 Q 164 1080 130 1072 C 138 1000 154 900 160 820 C 152 740 146 650 144 578 C 144 560 146 545 150 526 Z')) +
        lines(c, ['M 148 542 Q 200 554 252 542', 'M 200 552 L 200 630']) +
        both(lines(c, ['M 160 552 Q 168 574 150 584']) + stroke('M 154 600 C 156 700 162 790 160 820 C 162 900 150 1000 140 1064', '#e9b46a', 1.2, 0.8, seam));
    },
  },
  {
    id: 'shorts',
    name: 'Kurze Jeans-Shorts',
    render: () => {
      const c = '#93b3e2';
      let frays = '';
      for (let x = 144; x <= 190; x += 8) frays += `M ${x} ${650 + (x % 3)} L ${x + 1} ${658 + (x % 5)} `;
      return fill(c, p('M 168 468 Q 200 474 232 468 C 244 500 254 530 256 560 C 258 590 260 620 262 648 Q 236 658 206 650 L 202 622 Q 200 616 198 622 L 194 650 Q 164 658 138 648 C 140 620 142 590 144 560 C 146 530 156 500 168 468 Z')) +
        lines(c, [WAIST, 'M 200 490 L 200 600']) +
        both(lines(c, ['M 168 496 Q 172 520 152 528']) + stroke(frays, '#ffffff', 1.4, 0.8));
    },
  },
  {
    id: 'ripped',
    name: 'Jeans mit Löchern',
    render: (ctx) => {
      const c = '#a9c4ea';
      const hole = (cx, cy, rx, ry) =>
        `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${ctx.skin.fill}" stroke="${darken(c, 0.3)}" stroke-width="1.2"/>` +
        stroke(`M ${cx - rx + 3} ${cy - 2} L ${cx + rx - 3} ${cy - 2} M ${cx - rx + 4} ${cy + 3} L ${cx + rx - 4} ${cy + 3}`, '#ffffff', 1.4);
      return fill(c, p('M 168 468 Q 200 474 232 468 C 244 500 254 530 256 560 C 258 640 248 720 240 790 C 236 812 236 826 238 840 C 246 880 250 920 242 960 C 236 1000 232 1030 230 1052 Q 218 1058 206 1052 C 206 1000 204 950 204 900 C 204 860 203 840 203 830 C 204 760 202 700 200 650 C 198 700 196 760 197 830 C 197 840 196 860 196 900 C 196 950 194 1000 194 1052 Q 182 1058 170 1052 C 168 1030 164 1000 158 960 C 150 920 154 880 162 840 C 164 826 164 812 160 790 C 152 720 142 640 144 560 C 146 530 156 500 168 468 Z')) +
        lines(c, [WAIST, 'M 200 490 L 200 600']) +
        both(lines(c, ['M 168 496 Q 172 520 152 528']) + hole(180, 832, 11, 7)) +
        hole(172, 710, 8, 5) + hole(226, 930, 7, 4);
    },
  },
];

// ---------- Schuhe ----------

export const SHOES = [
  {
    id: 'sneaker',
    name: 'Turnschuhe',
    render: () => both(
      fill('#fdfdfb', p('M 168 1048 C 163 1074 162 1094 167 1106 Q 182 1112 199 1106 C 203 1094 201 1074 196 1048 Q 182 1054 168 1048 Z')) +
      fill('#e4e1ea', p('M 165 1094 Q 182 1100 201 1094 L 201 1106 Q 182 1113 165 1106 Z'), 1.6) +
      stroke('M 174 1060 L 192 1066 M 192 1060 L 174 1066 M 174 1072 L 192 1078 M 192 1072 L 174 1078', '#b9b3c4', 1.4) +
      stroke('M 166 1086 Q 172 1080 179 1088', '#f28fb3', 2.4)),
  },
  {
    id: 'heels',
    name: 'High Heels',
    render: () => both(
      fill('#f29bbb', p('M 172 1078 C 168 1092 171 1106 182 1110 L 186 1110 C 197 1106 199 1092 194 1078 Q 183 1086 172 1078 Z'), 2) +
      stroke('M 173 1062 Q 183 1068 193 1062', darken('#f29bbb', 0.3), 5) +
      stroke('M 173 1062 Q 183 1068 193 1062', '#f29bbb', 3)),
  },
  {
    id: 'uggs',
    name: 'Boots wie Uggs',
    render: () => both(
      fill('#d8b08a', p('M 156 958 C 158 1010 160 1080 162 1102 Q 168 1114 182 1114 Q 200 1114 202 1100 C 204 1070 202 1010 200 958 Z')) +
      stroke('M 180 984 L 181 1104', darken('#d8b08a', 0.25), 1.2, 0.6) +
      fill('#f7ecdc', p(`${cloud(178, 962, 28, 14, 180, 540, 12, 2.4)} Z`), 2)),
  },
  {
    id: 'moonboots',
    name: 'Moonboots',
    render: () => {
      const c = '#cbb8ee';
      return both(
        fill(c, p('M 152 940 C 148 990 148 1060 152 1098 Q 156 1118 180 1118 Q 206 1118 208 1098 C 212 1060 210 990 206 940 Q 180 932 152 940 Z')) +
        fill(darken(c, 0.15), p('M 149 1094 Q 180 1102 210 1094 L 209 1110 Q 180 1120 150 1110 Z'), 2) +
        lines(c, ['M 149 980 Q 180 988 209 980', 'M 148 1020 Q 180 1028 210 1020', 'M 148 1060 Q 180 1068 210 1060']) +
        stroke('M 174 950 L 186 962 L 174 974 L 186 986', lighten(c, 0.6), 2));
    },
  },
  {
    id: 'sandalen',
    name: 'Sandalen',
    render: () => {
      const c = '#c79a6e';
      return both(
        fill(lighten(c, 0.3), p('M 168 1100 Q 183 1108 198 1100 L 198 1108 Q 183 1116 168 1108 Z'), 1.6) +
        fill(c, p('M 170 1068 Q 183 1060 196 1068 L 197 1077 Q 183 1069 169 1077 Z'), 1.6) +
        fill(c, p('M 169 1086 Q 183 1078 197 1086 L 197 1094 Q 183 1086 169 1094 Z'), 1.6));
    },
  },
  {
    id: 'hausschuhe',
    name: 'Flauschige Hausschuhe',
    render: () => {
      const c = '#f8c9d8';
      return both(
        fill(c, p(`${cloud(184, 1090, 23, 19, 180, 360, 8, 2.2)} L 207 1110 Q 184 1116 161 1110 Z`)) +
        fill('#ffffff', p('M 176 1072 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0'), 1.6));
    },
  },
];
