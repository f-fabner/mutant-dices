import { MODULE_ID } from "./constants.js";

/** Choices for the module's language setting. "auto" follows Foundry's language. */
export const LANGUAGES = ["auto", "en", "pt-BR"];

/**
 * "i18nInit" hook: if the user picked a language for this module, load that language file
 * and use its MUTANT_DICES texts instead of the ones from Foundry's language.
 * Only this module's texts change; the rest of Foundry keeps its own language.
 */
export async function applyModuleLanguage() {
  let code;
  try {
    code = game.settings.get(MODULE_ID, "language");
  } catch {
    return;
  }
  if (!code || code === "auto" || code === game.i18n.lang) return;

  try {
    const response = await fetch(`modules/${MODULE_ID}/lang/${code}.json`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const texts = await response.json();
    foundry.utils.mergeObject(game.i18n.translations, { MUTANT_DICES: texts.MUTANT_DICES });
  } catch (error) {
    console.error(`${MODULE_ID} | Could not load the "${code}" language file`, error);
  }
}
