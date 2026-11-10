import { DICE, MODULE_ID, facePath } from "./constants.js";

const MAX_DICE = 20;
const i18n = (key) => game.i18n.localize(`MUTANT_DICES.${key}`);

/**
 * Open the dice roller: pick how many base, skill and gear dice to roll.
 * The roll goes through the system's own roller, so the chat card has the Push button.
 */
export function openRoller() {
  const rows = Object.keys(DICE).map((type) => `
    <div class="mutant-dices-roller-row">
      <img class="mutant-dices-face ${type}" src="${facePath(type, 6)}" alt="">
      <label for="${MODULE_ID}-${type}">${i18n(`Dice.${type}`)}</label>
      <button type="button" class="stepper" data-target="${type}" data-step="-1" aria-label="-1"><i class="fa-solid fa-minus"></i></button>
      <input id="${MODULE_ID}-${type}" type="number" name="${type}" value="0" min="0" max="${MAX_DICE}" step="1">
      <button type="button" class="stepper" data-target="${type}" data-step="1" aria-label="+1"><i class="fa-solid fa-plus"></i></button>
    </div>`).join("");

  const content = `
    <div class="mutant-dices-roller">
      <div class="form-group">
        <label for="${MODULE_ID}-name">${i18n("Roller.RollName")}</label>
        <input id="${MODULE_ID}-name" type="text" name="rollName" placeholder="${i18n("Roller.DefaultName")}">
      </div>
      ${rows}
    </div>`;

  const dialog = new foundry.applications.api.DialogV2({
    window: { title: i18n("Roller.Title"), icon: "fa-solid fa-dice" },
    classes: ["mutant-dices-roller-dialog"],
    content,
    buttons: [{
      action: "roll",
      label: i18n("Roller.Roll"),
      icon: "fa-solid fa-dice",
      default: true,
      callback: (_event, button) => roll(button.form.elements)
    }]
  });
  // One delegated listener on the dialog element, added once it exists.
  dialog.render({ force: true }).then(() => attachSteppers(dialog.element));
}

function attachSteppers(root) {
  root.addEventListener("click", (event) => {
    const button = event.target.closest(".mutant-dices-roller .stepper");
    if (!button) return;
    event.preventDefault();
    const input = root.querySelector(`input[name="${button.dataset.target}"]`);
    const next = (Number(input.value) || 0) + Number(button.dataset.step);
    input.value = Math.clamp(next, 0, MAX_DICE);
  });
}

async function roll(fields) {
  const count = (name) => Math.clamp(Math.floor(Number(fields[name].value) || 0), 0, MAX_DICE);
  const dice = { base: count("base"), skill: count("skill"), gear: count("gear") };
  if (!dice.base && !dice.skill && !dice.gear) {
    ui.notifications.warn(i18n("Roller.NoDice"));
    return;
  }
  const rollName = fields.rollName.value.trim() || i18n("Roller.DefaultName");
  return rollMutantDice({ rollName, ...dice });
}

/**
 * Roll MYZ dice through the system's roller, so the chat card has the Push button.
 * Speaks as the selected token's actor (or the user's character), like a normal roll.
 * @param {{rollName: string, base: number, skill: number, gear: number}} options
 */
export async function rollMutantDice({ rollName, base = 0, skill = 0, gear = 0 }) {
  const dice = { base, skill, gear };
  const systemRoller = game.myz?.DiceRoller;
  if (systemRoller) {
    const actor = ChatMessage.getSpeakerActor(ChatMessage.getSpeaker());
    return systemRoller.Roll({ rollName, ...dice, actor, actorUuid: actor?.uuid ?? "" });
  }

  // Fallback if the system roller isn't available: a plain roll, still shown with the module's faces.
  const formula = Object.entries(dice)
    .filter(([, n]) => n > 0)
    .map(([type, n]) => `${n}d${DICE[type].denomination}`)
    .join(" + ");
  return new Roll(formula).toMessage({ flavor: rollName });
}
