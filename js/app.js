// Der Editor: Figur oben, Kategorien zum Wischen, Auswahl darunter.
import { renderCharacter, CATEGORIES, DEFAULT_CHARACTER } from './character.js';

const STORAGE_KEY = 'reallife.character.v1';

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved) return { ...DEFAULT_CHARACTER, ...saved };
  } catch { /* kein Speicher verfügbar: mit der Start-Person beginnen */ }
  return { ...DEFAULT_CHARACTER };
}

function save() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(character)); } catch { /* egal */ }
}

let character = load();
let active = CATEGORIES[0];

const $stage = document.getElementById('stage');
const $tabs = document.getElementById('tabs');
const $swatches = document.getElementById('swatches');
const $options = document.getElementById('options');

function renderStage(pop = false) {
  $stage.innerHTML = renderCharacter(character);
  if (pop) $stage.firstElementChild.classList.add('pop');
}

function renderTabs() {
  $tabs.innerHTML = CATEGORIES.map((c) =>
    `<button class="tab${c === active ? ' active' : ''}" data-tab="${c.id}">${c.name}</button>`).join('');
}

function renderPanel() {
  if (active.colors) {
    $swatches.hidden = false;
    $swatches.innerHTML = active.colors.map((col) =>
      `<button class="swatch${character[active.colorKey] === col.id ? ' active' : ''}" data-color="${col.id}" ` +
      `style="--c:${col.hex}" aria-label="${col.name}" title="${col.name}"></button>`).join('');
  } else {
    $swatches.hidden = true;
  }
  $options.innerHTML = active.options.map((o) => {
    const preview = renderCharacter({ ...character, [active.id]: o.id }, { viewBox: active.crop, label: o.name });
    return `<button class="option${character[active.id] === o.id ? ' active' : ''}" data-option="${o.id}">` +
      `<span class="thumb">${preview}</span><span class="name">${o.name}</span></button>`;
  }).join('');
}

$tabs.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-tab]');
  if (!btn) return;
  active = CATEGORIES.find((c) => c.id === btn.dataset.tab);
  renderTabs();
  renderPanel();
  $options.scrollTop = 0;
  btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
});

$options.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-option]');
  if (!btn || character[active.id] === btn.dataset.option) return;
  character[active.id] = btn.dataset.option;
  save();
  renderStage(true);
  $options.querySelectorAll('.option').forEach((b) => b.classList.toggle('active', b === btn));
});

$swatches.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-color]');
  if (!btn) return;
  character[active.colorKey] = btn.dataset.color;
  save();
  renderStage(true);
  const scroll = $options.scrollTop;
  renderPanel();
  $options.scrollTop = scroll;
});

// Kein Zoomen mit zwei Fingern (fühlt sich sonst nicht wie eine App an)
document.addEventListener('gesturestart', (e) => e.preventDefault());

renderStage();
renderTabs();
renderPanel();

if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
// Bittet Safari, die gespeicherten Daten nicht automatisch zu löschen
navigator.storage?.persist?.().catch(() => {});
