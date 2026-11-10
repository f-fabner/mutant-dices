import { MODULE_ID } from "./constants.js";

/** Register all module settings. Called on the "init" hook. */
export function registerSettings() {
  game.settings.register(MODULE_ID, "restyleChat", {
    name: "MUTANT_DICES.Settings.RestyleChat.Name",
    hint: "MUTANT_DICES.Settings.RestyleChat.Hint",
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
    requiresReload: true
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
