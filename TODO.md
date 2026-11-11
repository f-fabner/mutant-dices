# To-do

Ideas and planned features for future versions of Mutant Dices.

## 1. Choose the module's language in its settings (in progress: v1.1.0)

Let each user switch the module between English and Portuguese from the module's own page in **Game Settings**, without changing Foundry's language.

- Today the module follows Foundry's language (Configure Settings → Core → Language). Portuguese texts already exist in `lang/pt-BR.json`.
- A module-level override needs a client setting (Automatic / English / Português) and code that reads texts from the chosen language file instead of Foundry's.
- Later: a Portuguese version of the README and of the foundryvtt.com page.

## 2. Colorblind modes (in progress: v1.1.0)

A client setting so each player picks the palette that works for them. The colors apply to the chat faces, the dice roller and the 3D dice.

Starting proposal, to be checked against research on each type of color blindness:

| Mode | Base | Skill | Gear |
| --- | --- | --- | --- |
| Default | Yellow | Green | Black |
| Universal | Yellow | Blue | Black |
| Deuteranopia (red–green) | Yellow | Blue | Black |
| Tritanopia (blue–yellow) | Red | Green | Black |
| Achromatopsia (grayscale only) | White, black symbols | Gray, black symbols | Black, white symbols |

- Research each type (deuteranopia, protanopia, tritanopia, achromatopsia) and test the palettes with a color blindness simulator.
- Add a visual separator that doesn't depend on color, so each die type can be told apart even in grayscale (for example a different border or a small mark per type).
- Dice So Nice needs one colorset per mode.

## 3. Pick a skill and attribute in the dice roller

Let the player choose a skill (and its attribute) in the dice roller, so the base and skill dice come from their character sheet without opening it. They only add the gear dice by hand.

Example: the player just stole a car and doesn't have its stats. They pick **Drive**, the roller fills in their Agility and Drive dice, and they add 3 gear dice for the car.

- Read the attribute and skill values from the selected token's actor (or the user's character).
- Each skill already knows its attribute in the Mutant: Year Zero system (Drive → Agility).
- Keep the manual fields, so you can still roll any number of dice.
