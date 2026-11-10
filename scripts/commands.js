import { MODULE_ID, TYPE_BY_DENOMINATION } from "./constants.js";
import { rollMutantDice } from "./roller.js";

const COMMAND = /^\/(?:r|roll)\s+([^#]+?)\s*(?:#\s*(.*))?$/i;
const TERM = /^(\d*)d([bsg])$/i;

/**
 * Parse a "/r" or "/roll" chat command made only of MYZ dice.
 * "/r 3db + 2ds + 1dg # Sneak" -> { base: 3, skill: 2, gear: 1, flavor: "Sneak" }
 * @param {string} message
 * @returns {{base: number, skill: number, gear: number, flavor: string} | null}
 *   null if it isn't such a command (any other term, like "1d20" or "+2", returns null).
 */
export function parseMutantCommand(message) {
  const match = message.trim().match(COMMAND);
  if (!match) return null;
  const [, formula, flavor = ""] = match;

  const dice = { base: 0, skill: 0, gear: 0 };
  for (const part of formula.split("+")) {
    const term = part.trim().match(TERM);
    if (!term) return null;
    const count = term[1] === "" ? 1 : Number(term[1]);
    dice[TYPE_BY_DENOMINATION[term[2].toLowerCase()]] += count;
  }
  if (!dice.base && !dice.skill && !dice.gear) return null;
  return { ...dice, flavor: flavor.trim() };
}

/**
 * "chatMessage" hook: send "/r" rolls of MYZ dice to the system's roller, so they can be pushed.
 * Returning false stops Foundry from making its own roll.
 */
export function onChatMessage(_chatLog, message) {
  if (!game.settings.get(MODULE_ID, "pushableCommands")) return;
  if (!game.myz?.DiceRoller) return;
  const command = parseMutantCommand(message);
  if (!command) return;

  const { flavor, ...dice } = command;
  const rollName = flavor || game.i18n.localize("MUTANT_DICES.Roller.DefaultName");
  rollMutantDice({ rollName, ...dice });
  return false;
}
