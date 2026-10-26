// Kleidung: Oberteile, Unterteile, Schuhe. Kleidung hat feste Farben.
// Jedes Teil bekommt ctx (Hautfarbe usw.) und liefert SVG-Text.
import { p, shape, stroke, both, wave, cloud, darken, lighten } from './svg.js';

const fill = (color, inner, w) => shape(inner, color, darken(color, 0.35), w);
const lines = (color, list, w = 1.3, o = 0.6) => list.map((d) => stroke(d, darken(color, 0.35), w, o)).join('');

// Ärmel (linke Seite, werden gespiegelt)
const SLEEVE_LONG = 'M 152 304 C 132 304 120 322 118 350 L 110 470 L 102 612 Q 120 620 140 612 L 146 472 L 154 380 Z';
const SLEEVE_LOOSE = 'M 152 304 C 130 304 118 322 116 350 L 106 470 L 98 604 Q 120 614 142 604 L 146 472 L 154 380 Z';

// ---------- Oberteile ----------

export const TOPS = [
  {
    id: 'crop',
    name: 'Bauchfreies Top',
    render: () => {
      const c = '#f6b8cc';
      return fill(c,
        p('M 142 312 C 152 302 172 302 184 294 Q 200 324 216 294 C 228 302 248 302 258 312 C 266 322 266 340 260 362 C 256 390 252 418 250 440 Q 200 452 150 440 C 148 418 144 390 140 362 C 134 340 134 322 142 312 Z') +
        both(p('M 152 305 C 134 305 123 320 121 350 Q 136 358 150 354 Z'))) +
        lines(c, ['M 152 430 Q 200 442 248 430']) +
        fill('#ee8aae', p('M 200 318 L 190 312 L 190 324 Z') + p('M 200 318 L 210 312 L 210 324 Z'), 1.5);
    },
  },
  {
    id: 'tshirt',
    name: 'Lockeres T-Shirt',
    render: () => {
      const c = '#fbfaf6';
      return fill(c,
        p('M 186 292 Q 200 306 214 292 C 232 300 252 300 264 312 C 272 330 270 360 266 380 L 264 470 C 266 520 268 560 266 578 Q 200 590 134 578 C 132 560 134 520 136 470 L 134 380 C 130 360 128 330 136 312 C 148 300 168 300 186 292 Z') +
        both(p('M 152 304 C 128 304 116 324 112 356 L 104 470 Q 124 480 146 472 L 152 390 Z'))) +
        lines(c, ['M 186 292 Q 200 306 214 292', 'M 150 520 Q 160 540 152 566', 'M 248 500 Q 240 530 250 560', 'M 108 462 Q 125 470 144 464']) +
        lines(c, ['M 292 462 Q 275 470 256 464'], 1.3, 0.6) +
        fill('#f3a0bf', p('M 226 372 C 226 362 238 360 240 370 C 242 360 254 362 254 372 C 254 382 240 390 240 394 C 240 390 226 382 226 372 Z'), 1.5);
    },
  },
  {
    id: 'langarm',
    name: 'Enges Langarmshirt',
    render: () => {
      const c = '#2f2b36';
      return fill(c,
        p('M 186 292 Q 200 312 214 292 C 225 302 248 302 260 312 C 268 322 268 340 262 362 C 254 400 246 440 244 470 C 246 480 248 490 250 505 Q 200 515 150 505 C 152 490 154 480 156 470 C 154 440 146 400 138 362 C 132 340 132 322 140 312 C 152 302 175 302 186 292 Z') +
        both(p(SLEEVE_LONG))) +
        both(stroke('M 104 598 Q 121 604 141 598', '#4a4553', 1.3) + stroke('M 140 330 C 132 380 124 430 120 470', '#5a5464', 2, 0.5)) +
        stroke('M 168 330 Q 200 345 232 330', '#5a5464', 1.6, 0.4);
    },
  },
  {
    id: 'schulterfrei',
    name: 'Schulterfreies Top',
    render: () => {
      const c = '#cdb8ec';
      return fill(c,
        p('M 140 340 Q 200 355 260 340 C 262 350 262 356 260 362 C 254 400 250 430 248 470 C 250 490 252 505 254 520 Q 200 530 146 520 C 148 505 150 490 152 470 C 150 430 146 400 140 362 C 138 356 138 350 140 340 Z') +
        both(p('M 150 338 C 126 334 110 352 112 378 C 114 398 132 406 152 398 Z'))) +
        stroke(`M 142 346 ${wave(142, 346, 258, 346, 10, 2.5, true)}`, darken(c, 0.35), 1.3, 0.6) +
        lines(c, ['M 116 390 Q 132 398 150 392', 'M 284 390 Q 268 398 250 392', 'M 170 470 Q 176 495 170 518', 'M 230 470 Q 224 495 230 518']);
    },
  },
  {
    id: 'bluse',
    name: 'Bluse',
    render: () => {
      const c = '#fff5e8';
      const buttons = [340, 376, 412, 448, 484].map((y) => `<circle cx="200" cy="${y}" r="3.2" fill="${darken(c, 0.25)}"/>`).join('');
      return fill(c,
        p('M 186 292 Q 200 300 214 292 C 225 302 250 302 262 312 C 270 324 270 342 264 364 C 256 404 250 444 248 474 C 250 492 252 506 254 522 Q 200 532 146 522 C 148 506 150 492 152 474 C 150 444 144 404 136 364 C 130 342 130 324 138 312 C 150 302 175 302 186 292 Z') +
        both(p(SLEEVE_LOOSE))) +
        both(fill(c, p('M 99 594 Q 120 602 143 594 L 142 610 Q 120 620 100 610 Z'), 2)) +
        both(fill(c, p('M 186 290 L 170 314 L 196 326 L 200 304 Z'), 2)) +
        stroke('M 200 306 L 200 524', darken(c, 0.3), 1.3, 0.6) + buttons +
        both(stroke('M 116 470 Q 128 476 144 472', darken(c, 0.3), 1.2, 0.5));
    },
  },
  {
    id: 'jogging',
    name: 'Joggingjacke über Top',
    render: () => {
      const c = '#b8e6d4';
      const dark = darken(c, 0.35);
      return fill('#f7b6cb', p('M 184 296 Q 200 312 216 296 L 220 452 Q 200 458 180 452 Z'), 2) +
        fill(c, p('M 170 302 Q 200 288 230 302 L 226 286 Q 200 274 174 286 Z'), 2) +
        both(fill(c,
          p('M 186 292 C 175 302 152 302 142 312 C 132 322 130 340 136 362 C 140 420 136 480 134 548 Q 158 556 182 550 C 184 470 186 380 188 300 Z') +
          p(SLEEVE_LOOSE)) +
          fill(c, p('M 99 594 Q 120 602 143 594 L 142 612 Q 120 622 100 612 Z'), 2) +
          stroke('M 136 534 Q 158 541 182 536', dark, 1.3, 0.7) +
          stroke('M 188 302 C 186 380 184 470 182 548', dark, 2, 0.8) +
          stroke('M 127 330 L 116 470 L 108 590', '#ffffff', 4, 0.9) +
          stroke('M 160 500 L 176 498', dark, 1.6, 0.7));
    },
  },
];

// ---------- Unterteile ----------

const WAIST = 'M 154 486 Q 200 494 246 486';

export const BOTTOMS = [
  {
    id: 'minirock',
    name: 'Kurzer Faltenrock',
    render: () => {
      const c = '#a9c0ec';
      return fill(c, p('M 156 468 Q 200 476 244 468 L 248 486 C 262 540 272 600 278 642 Q 200 660 122 642 C 128 600 138 540 152 486 Z')) +
        lines(c, [WAIST, 'M 170 490 L 150 648', 'M 185 492 L 176 652', 'M 200 492 L 200 654', 'M 215 492 L 224 652', 'M 230 490 L 250 648']);
    },
  },
  {
    id: 'baggy',
    name: 'Baggy Hose',
    render: () => {
      const c = '#e6d6bb';
      return fill(c, p('M 156 468 Q 200 476 244 468 C 252 500 258 530 262 560 C 268 700 276 900 280 1066 Q 246 1076 210 1066 L 204 640 Q 200 620 196 640 L 190 1066 Q 154 1076 120 1066 C 124 900 132 700 138 560 C 142 530 148 500 156 468 Z')) +
        both(fill(c, p('M 134 720 L 164 716 L 166 790 L 136 794 Z'), 2) + lines(c, ['M 134 732 L 164 728', 'M 160 500 Q 166 528 148 540', 'M 140 960 Q 152 980 168 972', 'M 128 1030 Q 146 1046 170 1040'])) +
        lines(c, [WAIST, 'M 200 494 L 200 600']);
    },
  },
  {
    id: 'flared',
    name: 'Flared Low-Waist-Jeans',
    render: () => {
      const c = '#7fa0d8';
      const seam = ' stroke-dasharray="3 3"';
      return fill(c, p('M 148 528 Q 200 540 252 528 C 254 545 256 560 256 575 C 254 650 250 740 244 810 C 248 900 262 1000 270 1072 Q 236 1080 206 1070 C 204 980 204 900 204 820 C 204 740 202 680 200 640 C 198 680 196 740 196 820 C 196 900 196 980 194 1070 Q 164 1080 130 1072 C 138 1000 152 900 156 810 C 150 740 146 650 144 575 C 144 560 146 545 148 528 Z')) +
        lines(c, ['M 146 544 Q 200 556 254 544', 'M 200 552 L 200 628']) +
        both(lines(c, ['M 158 552 Q 166 574 148 584']) + stroke('M 152 600 C 154 700 160 800 158 820 C 162 900 150 1000 140 1064', '#e9b46a', 1.2, 0.8, seam));
    },
  },
  {
    id: 'shorts',
    name: 'Kurze Jeans-Shorts',
    render: () => {
      const c = '#93b3e2';
      let frays = '';
      for (let x = 142; x <= 190; x += 8) frays += `M ${x} ${648 + (x % 3)} L ${x + 1} ${656 + (x % 5)} `;
      return fill(c, p('M 156 468 Q 200 476 244 468 C 252 500 258 530 258 560 C 260 590 262 620 264 646 Q 236 656 206 648 L 202 618 Q 200 612 198 618 L 194 648 Q 164 656 136 646 C 138 620 140 590 142 560 C 142 530 148 500 156 468 Z')) +
        lines(c, [WAIST, 'M 200 494 L 200 600']) +
        both(lines(c, ['M 160 500 Q 166 524 148 532']) + stroke(frays, '#ffffff', 1.4, 0.8));
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
      return fill(c, p('M 156 468 Q 200 476 244 468 C 250 500 254 530 256 560 C 256 640 250 720 244 810 C 242 870 240 960 236 1050 Q 220 1058 206 1050 C 206 960 204 880 204 810 C 204 740 202 680 200 640 C 198 680 196 740 196 810 C 196 880 194 960 194 1050 Q 180 1058 164 1050 C 160 960 158 870 156 810 C 150 720 144 640 144 560 C 146 530 150 500 156 468 Z')) +
        lines(c, [WAIST, 'M 200 494 L 200 600']) +
        both(lines(c, ['M 160 500 Q 166 524 148 532']) + hole(177, 815, 12, 7)) +
        hole(170, 700, 8, 5) + hole(228, 920, 7, 4);
    },
  },
];

// ---------- Schuhe ----------

export const SHOES = [
  {
    id: 'sneaker',
    name: 'Turnschuhe',
    render: () => both(
      fill('#fdfdfb', p('M 160 1048 C 155 1074 154 1094 160 1106 Q 178 1112 198 1106 C 202 1094 200 1074 196 1048 Q 178 1054 160 1048 Z')) +
      fill('#e4e1ea', p('M 157 1094 Q 178 1100 200 1094 L 200 1106 Q 178 1113 157 1106 Z'), 1.6) +
      stroke('M 168 1060 L 188 1067 M 188 1060 L 168 1067 M 168 1072 L 188 1079 M 188 1072 L 168 1079', '#b9b3c4', 1.4) +
      stroke('M 158 1086 Q 164 1080 172 1088', '#f28fb3', 2.4)),
  },
  {
    id: 'heels',
    name: 'High Heels',
    render: () => both(
      fill('#f29bbb', p('M 164 1078 C 160 1092 164 1106 178 1110 L 184 1110 C 198 1106 200 1092 194 1078 Q 179 1086 164 1078 Z'), 2) +
      stroke('M 166 1062 Q 179 1068 192 1062', darken('#f29bbb', 0.3), 5) +
      stroke('M 166 1062 Q 179 1068 192 1062', '#f29bbb', 3)),
  },
  {
    id: 'uggs',
    name: 'Boots wie Uggs',
    render: () => both(
      fill('#d8b08a', p('M 158 958 C 156 1010 154 1080 156 1102 Q 162 1114 180 1114 Q 200 1114 202 1100 C 204 1070 200 1010 198 958 Z')) +
      stroke('M 178 984 L 178 1104', darken('#d8b08a', 0.25), 1.2, 0.6) +
      fill('#f7ecdc', p(`M 153 952 ${wave(153, 952, 203, 952, 5, -2.5, true)} L 205 974 ${wave(205, 974, 151, 974, 5, -2.5, true)} Z`), 2)),
  },
  {
    id: 'moonboots',
    name: 'Moonboots',
    render: () => {
      const c = '#cbb8ee';
      return both(
        fill(c, p('M 150 940 C 144 990 144 1060 148 1098 Q 152 1118 178 1118 Q 206 1118 208 1098 C 212 1060 212 990 206 940 Q 178 932 150 940 Z')) +
        fill(darken(c, 0.15), p('M 147 1094 Q 178 1102 209 1094 L 208 1110 Q 178 1120 148 1110 Z'), 2) +
        lines(c, ['M 147 980 Q 178 988 209 980', 'M 146 1020 Q 178 1028 210 1020', 'M 146 1060 Q 178 1068 210 1060']) +
        stroke('M 172 950 L 184 962 L 172 974 L 184 986', lighten(c, 0.6), 2));
    },
  },
  {
    id: 'sandalen',
    name: 'Sandalen',
    render: () => {
      const c = '#c79a6e';
      return both(
        fill(lighten(c, 0.3), p('M 160 1100 Q 178 1108 198 1100 L 198 1108 Q 178 1116 160 1108 Z'), 1.6) +
        fill(c, p('M 162 1068 Q 178 1060 196 1068 L 197 1077 Q 178 1069 161 1077 Z'), 1.6) +
        fill(c, p('M 161 1086 Q 178 1078 197 1086 L 197 1094 Q 178 1086 161 1094 Z'), 1.6));
    },
  },
  {
    id: 'hausschuhe',
    name: 'Flauschige Hausschuhe',
    render: () => {
      const c = '#f8c9d8';
      return both(
        fill(c, p(`${cloud(178, 1090, 26, 20, 180, 360, 8, 2.2)} L 204 1110 Q 178 1116 152 1110 Z`)) +
        fill('#ffffff', p('M 170 1072 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0'), 1.6));
    },
  },
];
