import { DICE, MODULE_ID, MODULE_TITLE, facePath, getPalette } from "./constants.js";

/**
 * Register the Mutant Dices faces with Dice So Nice, in this user's palette.
 * Added as a separate dice system marked "preferred", so it is picked by default
 * but players can still switch back to the system's own dice in the Dice So Nice settings.
 * Runs once per page load, so changing the palette needs a reload.
 * @param {object} dice3d  The Dice So Nice API passed to the "diceSoNiceReady" hook.
 */
export function registerDiceSoNice(dice3d) {
  dice3d.addSystem({ id: MODULE_ID, name: MODULE_TITLE }, "preferred");
  const palette = getPalette();

  for (const [type, die] of Object.entries(DICE)) {
    const { body, ink } = palette[type];
    const colorset = `${MODULE_ID}-${type}`;
    dice3d.addColorset({
      name: colorset,
      description: `${MODULE_TITLE} ${type}`,
      category: MODULE_TITLE,
      foreground: ink,
      background: body,
      outline: body,
      edge: body,
      texture: "none",
      material: "plastic"
    });

    dice3d.addDicePreset({
      type: die.dsnType,
      // Dice So Nice only treats a label as an image when the path ends in .png/.jpg/.gif/.webp;
      // anything else is drawn as text. The query string makes the SVG path end in ".png"
      // without changing the file that is served, and the browser draws the SVG normally.
      labels: [1, 2, 3, 4, 5, 6].map((value) => `${facePath(type, value)}?dsn=.png`),
      colorset,
      system: MODULE_ID
    });
  }
}
