import { MODULE_ID, SYSTEM_ID } from "./constants.js";
import { getMutantPool } from "./chat.js";

/**
 * "preCreateChatMessage" hook: turn plain rolls made only of MYZ dice (e.g. "/r 3db + 2ds + 1dg")
 * into the system's roll card, so they can be pushed.
 *
 * The roll that was already made is reused, so the dice don't change and Dice So Nice
 * shows them once. Returning false cancels the plain message.
 *
 * Rolls whose privacy differs from the roll mode selected in chat (e.g. "/gmr" while the
 * chat is set to public) are left alone, because the system's card always uses that roll mode.
 */
export function onPreCreateChatMessage(message, _data, _options, userId) {
  if (userId !== game.user.id) return;
  if (!game.settings.get(MODULE_ID, "pushableCommands")) return;
  const roller = game.myz?.DiceRoller;
  if (!roller?.SendToChat || !roller.ParseResults) return;
  if (message.flags?.[SYSTEM_ID]) return;
  if (!matchesSelectedRollMode(message)) return;

  const rolls = message.rolls ?? [];
  if (rolls.length !== 1) return;
  const roll = rolls[0];
  const pool = getMutantPool(roll);
  if (!pool) return;

  sendSystemCard(roller, roll, pool, message).catch((error) => {
    console.error(`${MODULE_ID} | Could not send the roll card`, error);
    ui.notifications.error(game.i18n.localize("MUTANT_DICES.Errors.RollCard"));
  });
  return false;
}

function matchesSelectedRollMode(message) {
  const mode = game.settings.get("core", "rollMode");
  const expectsWhisper = ["gmroll", "blindroll", "selfroll"].includes(mode);
  if (Boolean(message.whisper?.length) !== expectsWhisper) return false;
  return Boolean(message.blind) === (mode === "blindroll");
}

async function sendSystemCard(roller, roll, pool, message) {
  const count = (type) => pool.filter((d) => d.type === type).length;
  const base = count("base");
  const skill = count("skill");
  const gear = count("gear");

  const dicePool = await roller.ParseResults(roll, skill);
  if (roller.SortPool) dicePool.sort(roller.SortPool);

  const actor = ChatMessage.getSpeakerActor(message.speaker);
  const rollName = message.flavor?.trim() || game.i18n.localize("MUTANT_DICES.Roller.DefaultName");

  await roller.SendToChat({
    _roll: roll,
    rollName,
    dicePool,
    base,
    skill,
    gear,
    actor,
    actorUuid: actor?.uuid ?? ""
  });
}
