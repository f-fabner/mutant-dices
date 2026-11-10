/**
 * Generates the dice face images used by the module.
 *
 * Every face is a transparent SVG with only the "ink" (ring, number, symbol),
 * so the same file works on top of a Dice So Nice colorset and on top of a
 * CSS-colored tile in the chat.
 *
 * It also writes docs/images/dice-faces.svg, the overview shown in the README.
 *
 * Usage: npm run build:faces
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "assets", "dice");

export const DICE = {
  base: { label: "Base", body: "#f2c200", ink: "#111111" },
  skill: { label: "Skill", body: "#1f8f3a", ink: "#ffffff" },
  gear: { label: "Gear", body: "#1c1c1c", ink: "#ffffff" }
};

/* ------------------------------------------------------------------ */
/*  Digits drawn as strokes so they don't depend on installed fonts    */
/*  Each digit lives in a 20 x 32 box.                                 */
/* ------------------------------------------------------------------ */

const DIGITS = {
  1: "M5 7.5 L11.5 2 V30",
  2: "M3 9 C3 4.5 6.5 2 10.5 2 C14.8 2 18 4.6 18 8.8 C18 14 12.5 18 3 30 H18.5",
  3: "M3 5.5 C5 3 7.8 2 10.5 2 C14.6 2 17.6 4.6 17.6 8.4 C17.6 12.4 14.6 15 10 15 C15 15 18.2 17.8 18.2 22.4 C18.2 27 14.6 30 10.4 30 C7.2 30 4.6 29 2.8 26.8",
  4: "M14 30 V2 L2 21.5 H19",
  5: "M17 2 H5.2 L4 14.2 C6 12.7 8.1 12 10.6 12 C15.2 12 18.2 15.3 18.2 20.8 C18.2 26.6 14.6 30 10.2 30 C7 30 4.5 29 2.8 26.8",
  6: "M16.2 4.2 C14.6 2.7 12.6 2 10.6 2 C5.6 2 3 7.6 3 16 C3 25 5.6 30 10.6 30 C15.2 30 18.2 26.8 18.2 22 C18.2 17 15.2 14 10.8 14 C7.2 14 4.2 16 3 19.2"
};

/** A digit centered at (cx, cy) with the given height and stroke width. */
function digit(n, cx, cy, height, strokeWidth, ink) {
  const s = height / 32;
  const tx = cx - 10.5 * s;
  const ty = cy - 16 * s;
  return `<path d="${DIGITS[n]}" transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${s.toFixed(4)})" fill="none" stroke="${ink}" stroke-width="${(strokeWidth / s).toFixed(2)}" stroke-linecap="round" stroke-linejoin="round"/>`;
}

/* ------------------------------------------------------------------ */
/*  Symbols (viewBox 0 0 100 100, centered at 50,50)                   */
/* ------------------------------------------------------------------ */

const C = 50;
const rad = (deg) => (deg * Math.PI) / 180;
const pt = (r, deg) => [C + r * Math.cos(rad(deg)), C + r * Math.sin(rad(deg))].map((v) => v.toFixed(2)).join(" ");

/** Annular sector between radii r1 and r2, from angle a1 to a2 (degrees). */
function sector(r1, r2, a1, a2) {
  return `M ${pt(r1, a1)} L ${pt(r2, a1)} A ${r2} ${r2} 0 0 1 ${pt(r2, a2)} L ${pt(r1, a2)} A ${r1} ${r1} 0 0 0 ${pt(r1, a1)} Z`;
}

/** Radiation trefoil: blades at top, lower-right and lower-left; gap at the bottom for the small "6". */
function radiation(ink) {
  const blades = [-90, 30, 150].map((a) => sector(10.5, 29, a - 30, a + 30)).join(" ");
  return `<path d="${blades}" fill="${ink}"/><circle cx="${C}" cy="${C}" r="6.5" fill="${ink}"/>`;
}

/** Biohazard: three crescents plus a broken inner ring. */
function biohazard(ink, id) {
  const angles = [-90, 30, 150];
  const outer = angles.map((a) => { const [x, y] = pt(11, a).split(" "); return `<circle cx="${x}" cy="${y}" r="15" fill="white"/>`; }).join("");
  const inner = angles.map((a) => { const [x, y] = pt(16.5, a).split(" "); return `<circle cx="${x}" cy="${y}" r="10.5" fill="black"/>`; }).join("");
  const gaps = angles.map((a) => `<path d="M ${pt(0, a)} L ${pt(7, a)}" stroke="black" stroke-width="1.6"/>`).join("");
  return `<defs><mask id="${id}"><rect width="100" height="100" fill="black"/>${outer}<circle cx="${C}" cy="${C}" r="11.5" fill="none" stroke="white" stroke-width="3"/>${inner}<circle cx="${C}" cy="${C}" r="3" fill="black"/>${gaps}</mask></defs><rect width="100" height="100" fill="${ink}" mask="url(#${id})"/>`;
}

/** Explosion burst: jagged flames pointing up, flat-ish base above the small "1". */
function explosion(ink) {
  const pts = [
    [24, 63], [30, 48], [22, 42], [35, 40], [33, 22], [43, 36], [48, 15], [54, 33],
    [65, 18], [62, 37], [77, 32], [68, 46], [78, 52], [70, 56], [76, 63], [62, 59],
    [56, 66], [50, 58], [43, 66], [38, 58]
  ];
  return `<polygon points="${pts.map((p) => p.join(",")).join(" ")}" fill="${ink}" stroke="${ink}" stroke-width="1.5" stroke-linejoin="round"/>`;
}

/* ------------------------------------------------------------------ */
/*  Faces                                                              */
/* ------------------------------------------------------------------ */

const RING = (ink) => `<circle cx="${C}" cy="${C}" r="41" fill="none" stroke="${ink}" stroke-width="5"/>`;
const SMALL = (n, ink) => digit(n, C, 76, 13, 2.6, ink);

export function face(type, value) {
  const { ink } = DICE[type];
  const id = `bio-${type}-${value}`;
  let content;
  if (value === 6) content = radiation(ink) + SMALL(6, ink);
  else if (value === 1 && type === "base") content = biohazard(ink, id) + SMALL(1, ink);
  else if (value === 1 && type === "gear") content = explosion(ink) + SMALL(1, ink);
  else content = digit(value, C, C, 46, 7, ink);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="256" height="256">${RING(ink)}${content}</svg>\n`;
}

mkdirSync(OUT_DIR, { recursive: true });
for (const type of Object.keys(DICE)) {
  for (let v = 1; v <= 6; v++) writeFileSync(join(OUT_DIR, `${type}-${v}.svg`), face(type, v));
}
console.log(`Wrote ${Object.keys(DICE).length * 6} faces to ${OUT_DIR}`);

/* ------------------------------------------------------------------ */
/*  README overview: one row per die, faces 1 to 6                     */
/* ------------------------------------------------------------------ */

const TILE = 110;
const GAP = 16;
const LABEL_WIDTH = 90;
const types = Object.keys(DICE);
const width = LABEL_WIDTH + 6 * TILE + 5 * GAP + 2 * GAP;
const height = types.length * TILE + (types.length + 1) * GAP;
let sheet = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">`;
types.forEach((type, row) => {
  const y = GAP + row * (TILE + GAP);
  sheet += `<text x="${GAP}" y="${y + TILE / 2 + 7}" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#888888">${DICE[type].label}</text>`;
  for (let v = 1; v <= 6; v++) {
    const x = GAP + LABEL_WIDTH + (v - 1) * (TILE + GAP);
    const inner = face(type, v).trim().replace('width="256" height="256"', `x="${x + 6}" y="${y + 6}" width="${TILE - 12}" height="${TILE - 12}"`);
    sheet += `<rect x="${x}" y="${y}" width="${TILE}" height="${TILE}" rx="18" fill="${DICE[type].body}"/>${inner}`;
  }
});
sheet += "</svg>\n";
const DOCS_DIR = join(ROOT, "docs", "images");
mkdirSync(DOCS_DIR, { recursive: true });
writeFileSync(join(DOCS_DIR, "dice-faces.svg"), sheet);
console.log(`Wrote ${join(DOCS_DIR, "dice-faces.svg")}`);
