import { DICE, MODULE_ID, SYSTEM_ID, TYPE_BY_DENOMINATION, facePath } from "./constants.js";

const TYPE_ORDER = Object.keys(DICE);
const SYSTEM_FACE = /dice-(base|skill|gear)(-penalty)?-([1-6])\.png$/;

/**
 * "renderChatMessageHTML" hook.
 * - Swaps the dice images on the system's roll card for the module's faces.
 * - Replaces Foundry's default display of plain rolls made only of MYZ dice (e.g. "/r 5db + 2ds").
 * @param {ChatMessage} message
 * @param {HTMLElement} html
 */
export function onRenderChatMessage(message, html) {
  if (!game.settings.get(MODULE_ID, "restyleChat")) return;
  if (message.flags?.[SYSTEM_ID]) restyleSystemCard(html);
  else if (message.isRoll && message.isContentVisible) restylePlainRolls(message, html);
}

/* -------------------------------------------- */
/*  System roll card                            */
/* -------------------------------------------- */

function restyleSystemCard(html) {
  for (const img of html.querySelectorAll(".myz.chat-item .dices-result .dice img")) {
    const match = img.getAttribute("src")?.match(SYSTEM_FACE);
    if (!match) continue;
    const [, type, penalty, value] = match;
    img.setAttribute("src", facePath(type, value));
    img.classList.add("mutant-dices-face", type);
    if (penalty) img.classList.add("penalty");
  }
}

/* -------------------------------------------- */
/*  Plain rolls ("/r 3db + 2ds + 1dg")          */
/* -------------------------------------------- */

function restylePlainRolls(message, html) {
  const rolls = message.rolls ?? [];
  const elements = html.querySelectorAll(".dice-roll");
  if (!rolls.length || rolls.length !== elements.length) return;

  rolls.forEach((roll, i) => {
    const pool = getMutantPool(roll);
    if (pool) elements[i].replaceWith(renderPool(pool));
  });
}

/**
 * The dice of a roll made only of MYZ dice, or null if the roll has anything else in it.
 * @param {Roll} roll
 * @returns {{type: string, value: number}[] | null}
 */
function getMutantPool(roll) {
  const pool = [];
  for (const term of roll.terms) {
    if (term instanceof foundry.dice.terms.OperatorTerm && term.operator === "+") continue;
    const type = TYPE_BY_DENOMINATION[term.constructor.DENOMINATION];
    if (!type || !(term instanceof foundry.dice.terms.Die)) return null;
    for (const result of term.results) {
      if (result.active !== false) pool.push({ type, value: result.result });
    }
  }
  if (!pool.length) return null;
  return pool.sort(sortDice);
}

/** By die type (base, skill, gear), then 6s first, 1s last. */
function sortDice(a, b) {
  const byType = TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type);
  if (byType) return byType;
  const weight = (v) => (v === 6 ? 7 : v);
  return weight(b.value) - weight(a.value);
}

function countResults(pool) {
  return {
    successes: pool.filter((d) => d.value === 6).length,
    trauma: pool.filter((d) => d.type === "base" && d.value === 1).length,
    gearDamage: pool.filter((d) => d.type === "gear" && d.value === 1).length,
    hasBase: pool.some((d) => d.type === "base"),
    hasGear: pool.some((d) => d.type === "gear")
  };
}

function renderPool(pool) {
  const i18n = (key) => game.i18n.localize(`MUTANT_DICES.${key}`);
  const counts = countResults(pool);

  const faces = pool.map(({ type, value }) => {
    const label = `${i18n(`Dice.${type}`)} ${value}`;
    return `<img class="mutant-dices-face ${type}" src="${facePath(type, value)}" alt="${label}" title="${label}">`;
  }).join("");

  const summary = [
    `<span title="${i18n("Results.Successes")}">${counts.successes}<i class="myz-radioactive"></i></span>`,
    counts.hasBase ? `<span title="${i18n("Results.Trauma")}">${counts.trauma}<i class="myz-biohazard"></i></span>` : "",
    counts.hasGear ? `<span title="${i18n("Results.GearDamage")}">${counts.gearDamage}<i class="myz-explosion"></i></span>` : ""
  ].filter(Boolean).join('<span class="separator">|</span>');

  const element = document.createElement("div");
  element.className = "mutant-dices-roll";
  element.innerHTML = `<div class="mutant-dices-faces">${faces}</div><div class="mutant-dices-summary">${summary}</div>`;
  return element;
}
