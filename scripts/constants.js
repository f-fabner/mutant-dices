import { PALETTES, DEFAULT_PALETTE } from "./palettes.js";

export const MODULE_ID = "mutant-dices";
export const MODULE_TITLE = "Mutant Dices";
export const SYSTEM_ID = "mutant-year-zero";

/**
 * The three Mutant: Year Zero dice.
 * - denomination: the Foundry dice term used in formulas (e.g. "2db").
 * - dsnType: the Dice So Nice die type for that term.
 * Colors live in palettes.js.
 */
export const DICE = {
  base: { denomination: "b", dsnType: "db" },
  skill: { denomination: "s", dsnType: "ds" },
  gear: { denomination: "g", dsnType: "dg" }
};

/** Dice type keyed by Foundry dice term denomination ("b" -> "base"). */
export const TYPE_BY_DENOMINATION = Object.fromEntries(
  Object.entries(DICE).map(([type, die]) => [die.denomination, type])
);

/** The palette this user picked in the module settings (falls back to the default one). */
export function getPaletteId() {
  let id;
  try {
    id = game.settings.get(MODULE_ID, "palette");
  } catch {
    // Setting not registered yet.
  }
  return id in PALETTES ? id : DEFAULT_PALETTE;
}

export function getPalette() {
  return PALETTES[getPaletteId()];
}

/** Path to the SVG image of one face in the user's palette, used both in chat and by Dice So Nice. */
export function facePath(type, value) {
  return `modules/${MODULE_ID}/assets/dice/${getPaletteId()}/${type}-${value}.svg`;
}

/** Log helper prefixed with the module title. */
export function log(...args) {
  console.log(`${MODULE_TITLE} |`, ...args);
}
