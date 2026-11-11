import { MODULE_ID } from "./constants.js";
import { PALETTES, DEFAULT_PALETTE } from "./palettes.js";
import { LANGUAGES } from "./language.js";

/** Register all module settings. Called on the "init" hook. */
export function registerSettings() {
  game.settings.register(MODULE_ID, "palette", {
    name: "MUTANT_DICES.Settings.Palette.Name",
    hint: "MUTANT_DICES.Settings.Palette.Hint",
    scope: "client",
    config: true,
    type: String,
    choices: Object.fromEntries(Object.keys(PALETTES).map((id) => [id, `MUTANT_DICES.Palettes.${id}`])),
    default: DEFAULT_PALETTE,
    requiresReload: true
  });

  game.settings.register(MODULE_ID, "language", {
    name: "MUTANT_DICES.Settings.Language.Name",
    hint: "MUTANT_DICES.Settings.Language.Hint",
    scope: "client",
    config: true,
    type: String,
    choices: Object.fromEntries(LANGUAGES.map((code) => [code, `MUTANT_DICES.Languages.${code}`])),
    default: "auto",
    requiresReload: true
  });

  game.settings.register(MODULE_ID, "restyleChat", {
    name: "MUTANT_DICES.Settings.RestyleChat.Name",
    hint: "MUTANT_DICES.Settings.RestyleChat.Hint",
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
    requiresReload: true
  });

  game.settings.register(MODULE_ID, "pushableCommands", {
    name: "MUTANT_DICES.Settings.PushableCommands.Name",
    hint: "MUTANT_DICES.Settings.PushableCommands.Hint",
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });

  game.settings.register(MODULE_ID, "debug", {
    name: "MUTANT_DICES.Settings.Debug.Name",
    hint: "MUTANT_DICES.Settings.Debug.Hint",
    scope: "client",
    config: true,
    type: Boolean,
    default: false
  });
}
