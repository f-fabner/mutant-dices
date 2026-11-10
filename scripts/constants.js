export const MODULE_ID = "mutant-dices";
export const MODULE_TITLE = "Mutant Dices";
export const SYSTEM_ID = "mutant-year-zero";

/**
 * The three Mutant: Year Zero dice.
 * - denomination: the Foundry dice term used in formulas (e.g. "2db").
 * - dsnType: the Dice So Nice die type for that term.
 * - body / ink: die color and symbol color (keep in sync with tools/build-dice-faces.mjs).
 */
export const DICE = {
  base: { denomination: "b", dsnType: "db", body: "#f2c200", ink: "#111111" },
  skill: { denomination: "s", dsnType: "ds", body: "#1f8f3a", ink: "#ffffff" },
  gear: { denomination: "g", dsnType: "dg", body: "#1c1c1c", ink: "#ffffff" }
};

/** Dice type keyed by Foundry dice term denomination ("b" -> "base"). */
export const TYPE_BY_DENOMINATION = Object.fromEntries(
  Object.entries(DICE).map(([type, die]) => [die.denomination, type])
);

/** Path to the image of one face. Chat uses SVG, Dice So Nice uses PNG. */
export function facePath(type, value, ext = "svg") {
  return `modules/${MODULE_ID}/assets/dice/${type}-${value}.${ext}`;
}

/** Log helper prefixed with the module title. */
export function log(...args) {
  console.log(`${MODULE_TITLE} |`, ...args);
}
