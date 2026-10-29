// Setzt die Figur aus allen Ebenen zusammen.
import { body, head, face, skinColors, SKIN_TONES, EYE_COLORS } from './body.js';
import { HAIR, HAIR_COLORS, hairColors } from './hair.js';
import { TOPS, BOTTOMS, SHOES } from './clothes.js';
import { darken, setShade, shadeGradient } from './svg.js';

export const DEFAULT_CHARACTER = {
  hair: 'lockig-huefte',
  hairColor: 'hellbraun',
  top: 'crop',
  bottom: 'minirock',
  shoes: 'uggs',
  skin: 'hell',
  eyes: 'hellbraun',
};

// Ausschnitte für die Vorschaubilder: x y Breite Höhe
export const CATEGORIES = [
  { id: 'hair', name: 'Haare', options: HAIR, colors: HAIR_COLORS, colorKey: 'hairColor', crop: '0 -20 400 900' },
  { id: 'top', name: 'Oberteil', options: TOPS, crop: '80 270 240 370' },
  { id: 'bottom', name: 'Unterteil', options: BOTTOMS, crop: '60 450 280 650' },
  { id: 'shoes', name: 'Schuhe', options: SHOES, crop: '110 920 180 210' },
];

const pick = (list, id) => list.find((x) => x.id === id) || list[0];

// Großer, niedlicher Kopf: Kopf und Haare werden um das Kinn herum vergrößert
const bigHead = (s) => `<g transform="translate(200 268) scale(1.14) translate(-200 -268)">${s}</g>`;

let counter = 0;

export function renderCharacter(ch, { viewBox = '0 0 400 1130', label = 'Dein Charakter' } = {}) {
  const uid = `c${++counter}`;
  const skin = skinColors(pick(SKIN_TONES, ch.skin).hex);
  const hair = hairColors(pick(HAIR_COLORS, ch.hairColor).hex);
  const style = pick(HAIR, ch.hair);
  const top = pick(TOPS, ch.top);
  const ctx = { uid, skin, eye: pick(EYE_COLORS, ch.eyes).hex, brow: darken(hair.fill, 0.3) };

  setShade(`${uid}-shade`);
  const fig = body(skin);
  const svg = `<svg viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}" preserveAspectRatio="xMidYMid meet">` +
    `<defs>${shadeGradient(`${uid}-shade`)}</defs>` +
    `<ellipse cx="200" cy="1116" rx="80" ry="12" fill="#6b4a7a" opacity="0.12"/>` +
    bigHead(style.back(hair)) +
    fig.base +
    pick(SHOES, ch.shoes).render(ctx) +
    pick(BOTTOMS, ch.bottom).render(ctx) +
    top.render(ctx) +
    fig.armR +
    (top.armR ? top.armR(ctx) : '') +
    bigHead(head(skin) + face(ctx) + style.front(hair)) +
    `</svg>`;
  setShade(null);
  return svg;
}
