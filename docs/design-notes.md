# Design notes

How Mutant Dices works, in my own words. These are my answers about the main parts of the code, translated from Portuguese to English and formatted.

## Hooks

A hook is a notice that Foundry sends out when something happens: the player loaded something, I'm going to create a message, I drew the message, I did something, Dice So Nice is ready. The module subscribes to these notices and runs a function for each one. That's why it doesn't need to change the system: it only reacts to these moments. It catches the hook and does what it has to do, which is to show things in a better way.

## Settings: world and client

Push for `/r` rolls changes what happens in the game: the card is created for the whole table. That's why the GM decides for everyone. The faces in chat are only visual, and each person sees their own screen, so each player chooses their own.

## Interface texts

To change the text of a button, you don't need to touch anything in the JavaScript. The texts are in the `lang` folder, in `en.json` or `pt-BR.json`. The code only keeps a key, like `"MUTANT_DICES.Roller.Roll"`, and Foundry looks up the text in the file for the user's language. That's how you put in texts without changing code or touching anything else.

## Restyling the system's roll card

When someone makes any roll straight from the character sheet, the system builds a card in chat with its own images. The module takes the system's original images, which are blank, and shows the rolled numbers and the assigned symbols instead: the biohazards, the radiation symbols and the numbers in circles. That improves how the roll looks in chat. Before, the chat showed blank dice; now it shows the numbers and the faces I wanted, so the player sees the whole picture.

## The `/r` command with Push

Foundry makes a normal roll. Then, right before the message is created in chat, in the `preCreateChatMessage` hook, the module checks three things: does the roll have only Mutant dice, is the setting turned on, and does the roll mode match the one selected in chat? If all of that matches, it cancels the normal message and sends the same roll to the system's function that builds the card with Push.

## Why the roll is reused

So the dice don't change. Foundry has already rolled the numbers, and if the module rolled again, the result would be different: the 3D dice would show up twice, with different numbers. So we have to reuse the roll to keep the dice, so the immersion isn't broken, and neither is the player's luck, because they're rolling specific dice.

## `/gmr` while the chat is public

The system's card always uses the roll mode selected under the chat. So with the chat set to public, if the module turned the `/gmr` into a card, the card would come out public, and the GM's secret roll would show up for everyone. That's why the module doesn't touch this case. It's the only exception, because the GM needs to control what the players see or not.

## The Roll button in the dice roller

When you click it, the pop-up reads the three numbers and limits each one between 0 and 20. It warns you if all of them are 0, and it uses the name you typed; if no name was typed, it writes "Mutant Roll". Then it calls the system's roller in the name of the selected token, with those dice. If the Mutant system isn't available, it makes a normal Foundry roll, already with the new faces. A wrong-system warning shows up when the world loads, because this module is specific to the Mutant: Year Zero system.

## `?dsn=.png` on the 3D dice faces

Dice So Nice only treats a face as an image if the path ends in PNG, JPEG, GIF or WebP. Since it was `.svg`, it drew the text of the path on the die, which was the "es/as" from the screenshot of the tests I was doing. This makes the path end in `.png`, and the server ignores everything after the question mark and keeps sending the SVG, so the faces come out right.

## Publishing a release

Every time I change something, I commit in VS Code and push, and it goes to GitHub. On GitHub, I open the Releases tab, click to create a new release, add the tag with the version and a description of what's being done, and mark it as the latest version. Every time I make a change and a new release, GMs can go into Foundry, click Update, and the update comes automatically.
