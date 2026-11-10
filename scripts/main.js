import { MODULE_ID, SYSTEM_ID, log } from "./constants.js";
import { registerSettings } from "./settings.js";
import { registerDiceSoNice } from "./dice-so-nice.js";
import { onRenderChatMessage } from "./chat.js";
import { onChatMessage } from "./commands.js";
import { openRoller } from "./roller.js";

Hooks.once("init", () => {
  log("Initializing");
  registerSettings();
  game.modules.get(MODULE_ID).api = { openRoller };
});

Hooks.once("ready", () => {
  if (game.system.id !== SYSTEM_ID) {
    ui.notifications.warn(game.i18n.localize("MUTANT_DICES.WrongSystem"));
  }
  if (game.settings.get(MODULE_ID, "debug")) log("Debug mode enabled");
  addChatButton();
});

Hooks.once("diceSoNiceReady", registerDiceSoNice);
Hooks.on("renderChatMessageHTML", onRenderChatMessage);
Hooks.on("chatMessage", onChatMessage);

/* -------------------------------------------- */
/*  Roller buttons                              */
/* -------------------------------------------- */

// Button in the Token controls on the left of the canvas.
Hooks.on("getSceneControlButtons", (controls) => {
  const tools = controls.tokens?.tools;
  if (!tools) return;
  tools[MODULE_ID] = {
    name: MODULE_ID,
    title: "MUTANT_DICES.Roller.Title",
    icon: "fa-solid fa-dice",
    order: Object.keys(tools).length,
    button: true,
    visible: true,
    onChange: () => openRoller()
  };
});

// Button next to the roll mode buttons, under the chat input.
Hooks.on("renderChatLog", () => addChatButton());
Hooks.on("renderChatInput", () => addChatButton());

function addChatButton() {
  const controls = document.querySelector("#chat-controls");
  if (!controls || controls.querySelector(`.${MODULE_ID}-open`)) return;
  const button = document.createElement("button");
  button.type = "button";
  button.className = `ui-control icon fa-solid fa-dice ${MODULE_ID}-open`;
  button.dataset.tooltip = game.i18n.localize("MUTANT_DICES.Roller.Title");
  button.setAttribute("aria-label", button.dataset.tooltip);
  button.addEventListener("click", openRoller);
  controls.prepend(button);
}
