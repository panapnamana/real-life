// Kleidung: Oberteile, Unterteile, Schuhe. Kleidung hat feste Farben.
// Jedes Teil bekommt ctx (Hautfarbe usw.) und liefert SVG-Text.
// Oberteile haben zwei Teile: render (Oberkörper + linker Ärmel) und armR (Ärmel am
// gestützten Arm, wird über dem Arm gezeichnet).
import { p, shape, stroke, both, wave, cloud, darken, lighten } from './svg.js';

const fill = (color, inner, w) => shape(inner, color, darken(color, 0.35), w);
const lines = (color, list, w = 1.3, o = 0.6) => list.map((d) => stroke(d, darken(color, 0.35), w, o)).join('');

// Ärmel am locker hängenden Arm (links)
const L = {
  kurz: 'M 148 306 C 128 306 116 322 113 350 Q 128 360 144 356 Z',
  halb: 'M 148 304 C 124 304 110 324 107 356 L 103 440 Q 122 452 142 444 L 145 380 Z',
  lang: 'M 148 306 C 126 306 114 324 112 350 L 104 458 L 99 598 Q 116 608 133 598 L 141 460 L 146 372 Z',
  puff: 'M 146 334 C 122 330 108 350 110 376 C 112 398 130 406 148 398 Z',
};
// Ärmel am gestützten Arm (rechts)
const R = {
  kurz: 'M 252 306 C 272 306 284 322 288 350 Q 272 360 256 356 Z',
  halb: 'M 252 304 C 278 304 290 324 292 350 C 298 380 306 410 310 438 Q 292 452 272 444 C 266 422 260 398 256 376 Z',
  lang: 'M 252 306 C 274 306 286 324 288 348 C 294 382 306 414 310 444 C 312 460 306 474 296 480 C 284 496 272 516 262 536 Q 248 534 238 512 C 248 494 258 478 266 456 C 260 428 256 400 254 372 Z',
  puff: 'M 254 334 C 278 330 292 350 290 376 C 288 398 270 406 252 398 Z',
};
const CUFF_L = 'M 97 590 Q 116 600 135 590 L 134 606 Q 116 616 98 606 Z';

// Taillierter Oberkörper (Schulter bis Taille), unten offen für verschiedene Längen
const FITTED = 'M 142 312 C 154 304 176 302 188 294 Q 200 314 212 294 C 224 302 246 304 258 312 C 268 320 270 338 266 354 C 262 376 258 396 252 412 C 246 432 238 452 238 470';
const FITTED_BACK = 'C 162 452 154 432 148 412 C 142 396 138 376 134 354 C 130 338 132 320 142 312 Z';

// ---------- Oberteile ----------

export const TOPS = [
  {
    id: 'crop',
    name: 'Bauchfreies Top',
    render: () => {
      const c = '#f6b8cc';
      return fill(c,
        p('M 142 312 C 154 304 176 302 188 296 Q 200 324 212 296 C 224 302 246 304 258 312 C 268 320 270 338 266 354 C 262 376 258 396 252 412 C 250 420 248 428 246 436 Q 200 448 154 436 C 152 428 150 420 148 412 C 142 396 138 376 134 354 C 130 338 132 320 142 312 Z') + p(L.kurz)) +
        lines(c, ['M 154 428 Q 200 440 246 428']) +
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
        p('M 188 294 Q 200 308 212 294 C 230 302 252 304 264 314 C 274 330 274 356 270 378 L 270 470 C 272 520 274 556 272 576 Q 200 590 128 576 C 126 556 128 520 130 470 L 130 378 C 126 356 126 330 136 314 C 148 304 170 302 188 294 Z') + p(L.halb)) +
        lines(c, ['M 188 294 Q 200 308 212 294', 'M 146 520 Q 156 540 148 566', 'M 106 432 Q 124 442 142 436']) +
        fill('#f3a0bf', p('M 222 372 C 222 362 234 360 236 370 C 238 360 250 362 250 372 C 250 382 236 390 236 394 C 236 390 222 382 222 372 Z'), 1.5);
    },
    armR: () => fill('#fbfaf6', p(R.halb)) + lines('#fbfaf6', ['M 274 436 Q 290 442 306 432']),
  },
  {
    id: 'langarm',
    name: 'Enges Langarmshirt',
    render: () => {
      const c = '#2f2b36';
      return fill(c, p(`${FITTED} C 238 480 239 490 241 500 Q 200 510 159 500 C 161 490 162 480 162 470 ${FITTED_BACK}`) + p(L.lang)) +
        stroke('M 101 588 Q 116 595 133 588', '#4a4553', 1.3) +
        stroke('M 168 330 Q 200 346 232 330', '#5a5464', 1.6, 0.4);
    },
    armR: () => fill('#2f2b36', p(R.lang)) + stroke('M 242 508 Q 252 520 260 530', '#4a4553', 1.3),
  },
  {
    id: 'schulterfrei',
    name: 'Schulterfreies Top',
    render: () => {
      const c = '#cdb8ec';
      return fill(c,
        p('M 136 340 Q 200 358 264 340 C 266 348 266 352 265 358 C 262 378 258 396 252 412 C 246 432 238 452 238 470 C 240 488 242 502 244 516 Q 200 528 156 516 C 158 502 160 488 162 470 C 162 452 154 432 148 412 C 142 396 138 378 135 358 C 134 352 134 348 136 340 Z') + p(L.puff)) +
        stroke(`M 138 346 ${wave(138, 346, 262, 346, 10, 2.5, true)}`, darken(c, 0.35), 1.3, 0.6) +
        lines(c, ['M 114 388 Q 130 398 148 390', 'M 176 470 Q 180 494 176 514', 'M 224 470 Q 220 494 224 514']);
    },
    armR: () => fill('#cdb8ec', p(R.puff)) + lines('#cdb8ec', ['M 286 388 Q 270 398 252 390']),
  },
  {
    id: 'bluse',
    name: 'Bluse',
    render: () => {
      const c = '#fff5e8';
      const buttons = [336, 372, 408, 444, 480].map((y) => `<circle cx="200" cy="${y}" r="3.2" fill="${darken(c, 0.25)}"/>`).join('');
      return fill(c, p(`${FITTED.replace('Q 200 314 212 294', 'Q 200 300 212 294')} C 242 490 248 506 254 524 Q 200 538 146 524 C 152 506 158 490 162 470 ${FITTED_BACK}`) + p(L.lang)) +
        fill(c, p(CUFF_L), 2) +
        both(fill(c, p('M 188 290 L 172 314 L 196 326 L 200 304 Z'), 2)) +
        stroke('M 200 306 L 200 530', darken(c, 0.3), 1.3, 0.6) + buttons +
        stroke('M 110 456 Q 124 462 138 458', darken(c, 0.3), 1.2, 0.5);
    },
    armR: () => fill('#fff5e8', p(R.lang)) + stroke('M 240 510 Q 252 522 262 532', darken('#fff5e8', 0.3), 1.5),
  },
  {
    id: 'jogging',
    name: 'Joggingjacke über Top',
    render: () => {
      const c = '#b8e6d4';
      const dark = darken(c, 0.35);
      return fill('#f7b6cb', p('M 186 298 Q 200 312 214 298 L 222 452 Q 200 458 178 452 Z'), 2) +
        fill(c, p('M 172 302 Q 200 288 228 302 L 224 286 Q 200 274 176 286 Z'), 2) +
        both(fill(c, p('M 188 292 C 176 302 156 306 142 314 C 130 324 128 340 132 360 C 136 420 132 480 130 550 Q 156 558 184 552 C 186 470 188 380 190 300 Z')) +
          stroke('M 132 536 Q 156 543 184 538', dark, 1.3, 0.7) +
          stroke('M 190 302 C 188 380 186 470 184 550', dark, 2, 0.8) +
          stroke('M 156 500 L 174 498', dark, 1.6, 0.7)) +
        fill(c, p(L.lang)) + fill(c, p(CUFF_L), 2) +
        stroke('M 120 330 L 112 458 L 106 584', '#ffffff', 4, 0.9);
    },
    armR: () => fill('#b8e6d4', p(R.lang)) + stroke('M 280 330 C 288 370 298 410 302 444', '#ffffff', 4, 0.9),
  },
];

// ---------- Unterteile ----------

const WAIST = 'M 160 484 Q 200 490 240 484';

// Hosen werden als linke Hälfte gezeichnet und gespiegelt; die Hälften überlappen in der Mitte.
const pants = (c, half) => fill(c, both(p(half)));

export const BOTTOMS = [
  {
    id: 'minirock',
    name: 'Kurzer Faltenrock',
    render: () => {
      const c = '#f4a9c4';
      return fill(c, p('M 162 468 Q 200 474 238 468 L 242 484 C 260 530 276 590 282 636 Q 200 656 118 636 C 124 590 140 530 158 484 Z')) +
        lines(c, [WAIST, 'M 172 488 L 146 642', 'M 186 490 L 174 648', 'M 200 490 L 200 650', 'M 214 490 L 226 648', 'M 228 488 L 254 642']);
    },
  },
  {
    id: 'baggy',
    name: 'Baggy Hose',
    render: () => {
      const c = '#e6d6bb';
      return pants(c, 'M 203 471 L 162 468 C 148 500 136 530 132 560 C 124 700 118 900 116 1068 Q 152 1078 190 1068 L 196 660 Q 199 642 203 642 Z') +
        both(fill(c, p('M 130 720 L 160 716 L 162 792 L 132 796 Z'), 2) + lines(c, ['M 130 732 L 160 728', 'M 134 960 Q 148 980 166 972', 'M 124 1030 Q 142 1046 168 1040'])) +
        lines(c, [WAIST, 'M 200 490 L 200 600']);
    },
  },
  {
    id: 'flared',
    name: 'Flared Low-Waist-Jeans',
    render: () => {
      const c = '#7fa0d8';
      const seam = ' stroke-dasharray="3 3"';
      return pants(c, 'M 203 534 L 138 526 C 134 545 132 560 132 580 C 134 660 142 750 154 830 C 148 910 134 1000 126 1074 Q 162 1082 194 1072 C 196 990 196 910 196 840 C 196 760 196 700 198 660 L 203 660 Z') +
        lines(c, ['M 136 542 Q 200 556 264 542', 'M 200 552 L 200 640']) +
        both(lines(c, ['M 150 552 Q 160 576 140 586']) + stroke('M 144 600 C 148 700 156 790 156 830 C 154 910 144 1000 136 1066', '#e9b46a', 1.2, 0.8, seam));
    },
  },
  {
    id: 'shorts',
    name: 'Kurze Jeans-Shorts',
    render: () => {
      const c = '#93b3e2';
      let frays = '';
      for (let x = 134; x <= 190; x += 8) frays += `M ${x} ${656 + (x % 3)} L ${x + 1} ${664 + (x % 5)} `;
      return pants(c, 'M 203 471 L 162 468 C 148 500 136 530 134 560 C 132 592 130 622 128 652 Q 160 664 196 654 L 198 628 Q 200 624 203 624 Z') +
        lines(c, [WAIST, 'M 200 490 L 200 600']) +
        both(lines(c, ['M 166 496 Q 170 522 146 530']) + stroke(frays, '#ffffff', 1.4, 0.8));
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
      return pants(c, 'M 203 471 L 162 468 C 148 500 136 530 132 560 C 128 640 138 720 150 780 C 156 806 158 822 156 838 C 146 874 140 914 148 962 C 154 1002 162 1032 166 1054 Q 180 1060 194 1054 C 194 1010 196 970 196 940 C 196 900 197 870 198 838 C 198 780 198 720 198 660 L 203 660 Z') +
        lines(c, [WAIST, 'M 200 490 L 200 600']) +
        both(lines(c, ['M 166 496 Q 170 522 146 530']) + hole(177, 838, 12, 7)) +
        hole(166, 712, 9, 5) + hole(230, 930, 7, 4);
    },
  },
];

// ---------- Schuhe ----------

export const SHOES = [
  {
    id: 'sneaker',
    name: 'Turnschuhe',
    render: () => both(
      fill('#fdfdfb', p('M 164 1046 C 160 1074 160 1098 166 1110 Q 180 1118 196 1110 C 200 1098 200 1074 196 1046 Q 180 1052 164 1046 Z')) +
      fill('#e4e1ea', p('M 162 1098 Q 180 1104 198 1098 L 198 1112 Q 180 1120 162 1112 Z'), 1.6) +
      stroke('M 171 1058 L 189 1064 M 189 1058 L 171 1064 M 171 1070 L 189 1076 M 189 1070 L 171 1076', '#b9b3c4', 1.4) +
      stroke('M 163 1088 Q 169 1082 176 1090', '#f28fb3', 2.4)),
  },
  {
    id: 'heels',
    name: 'High Heels',
    render: () => both(
      fill('#f29bbb', p('M 171 1082 C 169 1098 173 1110 180 1117 C 185 1121 189 1116 191 1108 C 193 1098 193 1090 191 1082 Q 181 1089 171 1082 Z'), 2) +
      stroke('M 170 1064 Q 180 1070 190 1064', darken('#f29bbb', 0.3), 5) +
      stroke('M 170 1064 Q 180 1070 190 1064', '#f29bbb', 3)),
  },
  {
    id: 'uggs',
    name: 'Fell-Boots',
    render: () => both(
      fill('#f6a9c3', p('M 152 958 C 154 1010 156 1080 158 1104 Q 164 1120 180 1120 Q 200 1120 202 1104 C 204 1074 202 1010 200 958 Z')) +
      fill('#ffd3e2', p(`${cloud(177, 1012, 30, 58, 0, 360, 26, 2)} Z`), 1.6) +
      fill('#ffe6ef', p(`${cloud(176, 960, 32, 16, 180, 540, 12, 2.6)} Z`), 2)),
  },
  {
    id: 'moonboots',
    name: 'Moonboots',
    render: () => {
      const c = '#cbb8ee';
      return both(
        fill(c, p('M 148 940 C 144 990 144 1060 148 1100 Q 152 1122 178 1122 Q 204 1122 206 1100 C 210 1060 208 990 204 940 Q 176 932 148 940 Z')) +
        fill(darken(c, 0.15), p('M 145 1096 Q 177 1104 209 1096 L 208 1112 Q 177 1124 146 1112 Z'), 2) +
        lines(c, ['M 145 980 Q 177 988 207 980', 'M 144 1020 Q 177 1028 208 1020', 'M 144 1060 Q 177 1068 208 1060']) +
        stroke('M 171 950 L 183 962 L 171 974 L 183 986', lighten(c, 0.6), 2));
    },
  },
  {
    id: 'sandalen',
    name: 'Sandalen',
    render: () => {
      const c = '#c79a6e';
      return both(
        fill(lighten(c, 0.3), p('M 172 1108 Q 181 1118 192 1108 L 192 1114 Q 181 1124 172 1114 Z'), 1.6) +
        fill(c, p('M 168 1070 Q 180 1062 192 1070 L 193 1079 Q 180 1071 167 1079 Z'), 1.6) +
        fill(c, p('M 168 1088 Q 180 1080 193 1088 L 193 1096 Q 180 1088 168 1096 Z'), 1.6));
    },
  },
  {
    id: 'hausschuhe',
    name: 'Flauschige Hausschuhe',
    render: () => {
      const c = '#f8c9d8';
      return both(
        fill(c, p(`${cloud(180, 1094, 23, 19, 180, 360, 8, 2.2)} L 203 1114 Q 180 1120 157 1114 Z`)) +
        fill('#ffffff', p('M 172 1076 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0'), 1.6));
    },
  },
];
