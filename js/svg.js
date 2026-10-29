// Kleine Helfer, um die Figur als SVG-Text zu zeichnen.
// Alle Teile benutzen dasselbe Koordinatensystem: 400 breit, 1130 hoch, Mitte bei x = 200.

const r = (n) => Math.round(n * 10) / 10;

export const p = (d) => `<path d="${d}"/>`;

// Weiche Schattierung: Ein Verlauf (Ränder dunkler, Mitte heller) wird über jede Form gelegt.
// renderCharacter legt den Verlauf an und setzt hier seine id.
let shadeId = null;
export const setShade = (id) => { shadeId = id; };
export const shadeGradient = (id) =>
  `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0">` +
  `<stop offset="0" stop-color="#3a1630" stop-opacity="0.15"/><stop offset="0.3" stop-color="#3a1630" stop-opacity="0"/>` +
  `<stop offset="0.5" stop-color="#ffffff" stop-opacity="0.07"/><stop offset="0.7" stop-color="#3a1630" stop-opacity="0"/>` +
  `<stop offset="1" stop-color="#3a1630" stop-opacity="0.15"/></linearGradient>`;

// Form mit leichter Kontur: erst dick in der Linienfarbe, dann die Füllung darüber.
// So entsteht nur am äußeren Rand eine Linie, auch wenn sich Teilformen überlappen.
export function shape(inner, fill, line, width = 2.1) {
  return `<g fill="${line}" stroke="${line}" stroke-width="${width * 2}" stroke-linejoin="round">${inner}</g>` +
    `<g fill="${fill}">${inner}</g>` +
    (shadeId ? `<g fill="url(#${shadeId})">${inner}</g>` : '');
}

// Linie ohne Füllung (Falten, Strähnen, Nähte …)
export function stroke(d, color, width = 1.5, opacity = 1, extra = '') {
  return `<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"${opacity < 1 ? ` opacity="${opacity}"` : ''}${extra}/>`;
}

// Spiegeln an der Mittellinie: linke Hälfte zeichnen, rechte entsteht automatisch.
export const mirror = (s) => `<g transform="matrix(-1 0 0 1 400 0)">${s}</g>`;
export const both = (s) => s + mirror(s);

// Farben mischen
function rgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
export function mix(a, b, t) {
  const [r1, g1, b1] = rgb(a);
  const [r2, g2, b2] = rgb(b);
  const c = (x, y) => Math.round(x + (y - x) * t).toString(16).padStart(2, '0');
  return `#${c(r1, r2)}${c(g1, g2)}${c(b1, b2)}`;
}
export const darken = (c, t = 0.35, to = '#1e1219') => mix(c, to, t);
export const lighten = (c, t = 0.4) => mix(c, '#ffffff', t);

// Wellenlinie von (x0,y0) nach (x1,y1). Der Pfad muss schon bei (x0,y0) stehen.
// scallop = true: alle Bögen zur selben Seite (Locken-Rand), sonst abwechselnd.
export function wave(x0, y0, x1, y1, n, amp, scallop = false) {
  const dx = x1 - x0, dy = y1 - y0, len = Math.hypot(dx, dy);
  const nx = -dy / len, ny = dx / len;
  let s = '';
  for (let i = 1; i <= n; i++) {
    const tm = (i - 0.5) / n, t1 = i / n;
    const k = (scallop || i % 2) ? 2 * amp : -2 * amp;
    s += ` Q ${r(x0 + dx * tm + nx * k)} ${r(y0 + dy * tm + ny * k)} ${r(x0 + dx * t1)} ${r(y0 + dy * t1)}`;
  }
  return s;
}

// Bögen entlang einer Ellipse (Locken, Dutts, flauschige Ränder). Beginnt mit M.
export function cloud(cx, cy, rx, ry, a0, a1, n, bump) {
  const pt = (a, e = 0) => {
    const t = (a * Math.PI) / 180;
    return [r(cx + (rx + e) * Math.cos(t)), r(cy + (ry + e) * Math.sin(t))];
  };
  const [x, y] = pt(a0);
  let s = `M ${x} ${y}`;
  for (let i = 1; i <= n; i++) {
    const [qx, qy] = pt(a0 + ((a1 - a0) * (i - 0.5)) / n, bump * 2);
    const [ex, ey] = pt(a0 + ((a1 - a0) * i) / n);
    s += ` Q ${qx} ${qy} ${ex} ${ey}`;
  }
  return s;
}

export const circle = (cx, cy, rad) =>
  `M ${cx - rad} ${cy} a ${rad} ${rad} 0 1 0 ${rad * 2} 0 a ${rad} ${rad} 0 1 0 ${-rad * 2} 0`;
