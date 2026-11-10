# Mutant Dices

Clearer dice for the [Mutant: Year Zero](https://foundryvtt.com/packages/mutant-year-zero) system on [Foundry VTT](https://foundryvtt.com/).

> **Work in progress.** This module is still being developed and hasn't been fully tested yet. Expect bugs and changes.

## Features

- **3D dice:** new faces for the base (yellow), skill (green) and gear (black) dice in [Dice So Nice](https://foundryvtt.com/packages/dice-so-nice). Numbers 2–5 in a circle, radiation with a small 6, biohazard (base) or explosion (gear) with a small 1. Pick "Mutant Dices" or the system's dice in the Dice So Nice settings.
- **Chat:** the system's roll card uses the same faces, and plain rolls like `/r 5db + 2ds + 1dg` show small dice with the count of successes, trauma and gear damage instead of one big image and a meaningless total.
- **Dice roller:** a dice button in the Token controls and under the chat input opens a dialog to roll any number of base, skill and gear dice. The roll uses the system's roll card, so it can be pushed. Macros can call `game.modules.get("mutant-dices").api.openRoller()`.

## Installation

In Foundry, go to **Add-on Modules → Install Module** and paste the manifest URL:

```
https://github.com/f-fabner/mutant-dices/releases/latest/download/module.json
```

## Development

To test locally, create a symbolic link from this folder to `Data/modules/mutant-dices` inside your Foundry user data folder.

The dice faces are generated from `tools/build-dice-faces.mjs`. After changing it, run:

```
npm install
npm run build:faces
```

## Structure

| Path | Contents |
| --- | --- |
| `module.json` | Module manifest |
| `scripts/` | JavaScript code (ES modules) |
| `styles/` | CSS |
| `lang/` | Localization files |
| `templates/` | Handlebars templates |
| `assets/dice/` | Dice faces (SVG for chat, PNG for Dice So Nice) |
| `tools/` | Development scripts (not shipped) |

## Releases

Create a `vX.Y.Z` tag and publish a GitHub Release. The workflow in `.github/workflows/release.yml` builds `module.zip` and `module.json` with the correct version and URLs.
