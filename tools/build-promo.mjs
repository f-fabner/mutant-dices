/**
 * Builds the promo image that shows every dice palette side by side, for announcement posts.
 * Run `npm run build:faces` first: the image embeds the face SVGs from assets/dice/<palette>/.
 *
 * Writes docs/images/promo-color-options.svg (English) and promo-color-options-pt-BR.svg (Portuguese).
 * Discord and Reddit don't show SVG, so convert them to PNG before posting.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PALETTES } from "../scripts/palettes.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DICE_DIR = join(ROOT, "assets", "dice");
const DOCS_DIR = join(ROOT, "docs", "images");

const TEXTS = {
  en: {
    file: "promo-color-options.svg",
    subtitle: "Colorblind options",
    types: { base: "Base", skill: "Skill", gear: "Gear" },
    palettes: {
      default: ["Default"],
      universal: ["Universal", "Deuteranopia / Protanopia"],
      tritanopia: ["Tritanopia"],
      achromatopsia: ["Achromatopsia"]
    }
  },
  "pt-BR": {
    file: "promo-color-options-pt-BR.svg",
    subtitle: "Opções para daltônicos",
    types: { base: "Base", skill: "Perícia", gear: "Equipamento" },
    palettes: {
      default: ["Padrão"],
      universal: ["Universal", "Deuteranopia / Protanopia"],
      tritanopia: ["Tritanopia"],
      achromatopsia: ["Acromatopsia"]
    }
  }
};

// One face per die type. They avoid the biohazard face, whose mask id would repeat in one file.
const FACES = { base: 6, skill: 4, gear: 1 };

const WIDTH = 1200;
const HEIGHT = 675;
const TILE = 100;
const STEP_X = 150;
const STEP_Y = 116;
const DICE_X = 690;
const ROWS_Y = 190;
const FONT = "Arial, Helvetica, sans-serif";

function faceAt(paletteId, type, x, y) {
  const svg = readFileSync(join(DICE_DIR, paletteId, `${type}-${FACES[type]}.svg`), "utf8").trim();
  const inner = svg.replace('width="512" height="512"', `x="${x + 6}" y="${y + 6}" width="${TILE - 12}" height="${TILE - 12}"`);
  const body = PALETTES[paletteId][type].body;
  return `<rect x="${x}" y="${y}" width="${TILE}" height="${TILE}" rx="16" fill="${body}" stroke="#3a3a42" stroke-width="2"/>${inner}`;
}

function build(texts) {
  let out = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">`;
  out += `<rect width="${WIDTH}" height="${HEIGHT}" fill="#18181c"/>`;
  out += `<rect x="0" y="0" width="${WIDTH}" height="8" fill="#f2c200"/>`;
  out += `<text x="60" y="92" font-family="${FONT}" font-size="58" font-weight="bold" fill="#ffffff">Mutant Dices</text>`;
  out += `<text x="60" y="140" font-family="${FONT}" font-size="30" fill="#b8b8c0">${texts.subtitle}</text>`;

  Object.entries(texts.types).forEach(([type, label], col) => {
    const cx = DICE_X + col * STEP_X + TILE / 2;
    out += `<text x="${cx}" y="${ROWS_Y - 14}" text-anchor="middle" font-family="${FONT}" font-size="22" font-weight="bold" fill="#8a8a94">${label}</text>`;
  });

  Object.keys(PALETTES).forEach((paletteId, row) => {
    const y = ROWS_Y + row * STEP_Y;
    const [name, detail] = texts.palettes[paletteId];
    if (row > 0) out += `<line x1="60" x2="${WIDTH - 60}" y1="${y - 8}" y2="${y - 8}" stroke="#2c2c33" stroke-width="2"/>`;
    const nameY = detail ? y + TILE / 2 - 4 : y + TILE / 2 + 12;
    out += `<text x="60" y="${nameY}" font-family="${FONT}" font-size="34" font-weight="bold" fill="#ffffff">${name}</text>`;
    if (detail) out += `<text x="60" y="${nameY + 36}" font-family="${FONT}" font-size="24" fill="#b8b8c0">${detail}</text>`;
    Object.keys(FACES).forEach((type, col) => {
      out += faceAt(paletteId, type, DICE_X + col * STEP_X, y);
    });
  });

  return out + "</svg>\n";
}

for (const texts of Object.values(TEXTS)) {
  writeFileSync(join(DOCS_DIR, texts.file), build(texts));
}
console.log(`Wrote ${Object.keys(TEXTS).length} promo images to ${DOCS_DIR}`);
