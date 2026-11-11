/**
 * Color palettes for the dice. Each player picks one in the module settings.
 *
 * - body: die color. ink: color of the ring, numbers and symbols.
 * - markers: when true, each die type also gets its own ring style
 *   (base: solid, skill: double, gear: dashed), so the dice can be told apart without color.
 *
 * Plain module with no Foundry globals: it is also imported by tools/build-dice-faces.mjs,
 * which generates one set of faces per palette in assets/dice/<palette>/.
 *
 * Colorblind palettes use colors from the Okabe-Ito palette, designed to stay distinct
 * for the common types of color blindness.
 */
export const PALETTES = {
  default: {
    markers: false,
    base: { body: "#f2c200", ink: "#111111" },
    skill: { body: "#1f8f3a", ink: "#ffffff" },
    gear: { body: "#1c1c1c", ink: "#ffffff" }
  },
  // Also the palette for deuteranopia and protanopia (red-green), the most common types.
  universal: {
    markers: true,
    base: { body: "#f0e442", ink: "#111111" },
    skill: { body: "#0072b2", ink: "#ffffff" },
    gear: { body: "#1c1c1c", ink: "#ffffff" }
  },
  tritanopia: {
    markers: true,
    base: { body: "#d55e00", ink: "#111111" },
    skill: { body: "#009e73", ink: "#111111" },
    gear: { body: "#1c1c1c", ink: "#ffffff" }
  },
  achromatopsia: {
    markers: true,
    base: { body: "#f5f5f5", ink: "#111111" },
    skill: { body: "#8c8c8c", ink: "#111111" },
    gear: { body: "#1c1c1c", ink: "#ffffff" }
  }
};

export const DEFAULT_PALETTE = "default";
