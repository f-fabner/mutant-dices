# Mutant Dices

Mutant Dices is a module I developed to make my life easier, so I don't have to swap the images used inside Foundry by hand. I wanted a way to simply change them, and to keep them updated whenever there's a system or Foundry update, so the dice are easier to read on screen.

## Why I made it

The character sheet has no option for specific rolls with specific equipment, other than the ones already built in. Sometimes I needed my players to make certain rolls, so they used `/r` to roll skill, attribute and gear dice. The result showed up on screen all out of shape, all wrong, and without the option to push. So I had to keep telling my players to reroll.

I needed to improve this: a way for my players to understand which dice they are rolling, which dice were pushed, and an easier way to push. So I felt the need to build something I could simply update, that would follow me across different versions. I know this won't come from any official material, because no company is interested in making this kind of thing. But since I want to make life easier for me and my players, I decided to build this module.

## The dice faces

Nothing fancy. I looked at some official versions for inspiration. Each face is a circle with a number in the middle, because I like that style of dice, and a symbol: the universal radiation symbol, the biohazard symbol or an explosion symbol, just so you can tell what it means. Nothing was taken from any source and nothing was copied: they are simple, plain, flat images, only inspired by the original dice.

The faces only resemble the physical Mutant dice so you know that the 6 is the 6 and the 1 is the 1: the 1 with the explosion or the biohazard, and the 6 with radiation. It's just inspired by Mutant's own material, nothing more.

## Dice So Nice

Full compatibility with Dice So Nice. My players don't like playing without Dice So Nice, so I needed the dice rolling on screen, for that feeling and immersion, with the faces showing for the players.

## Chat

Before, there was no control in chat and no option to push dice, and the dice showed up blank: you could only see the 1s and the 6s. In the end, that's what matters, but for my players and for new players it was confusing, because they were rolling blank dice and didn't know what number they rolled. Even if the system doesn't care much about it, for readability it was, besides ugly, kind of useless. I wanted a way for people to see and understand what they are rolling.

## Push

When you roll from the character sheet, you have the option to push. But not every roll the GM asks for comes from the sheet. Sometimes you need to make specific rolls the GM asked for, and it would be good for those rolls to have the Push button too. That way you can make a separate roll the GM asked for, unrelated to the sheet, without having to reroll and pick dice manually.

## Dice roller pop-up

Right next to the roll modes (roll only for the GM, private roll for yourself, roll for everyone), there's a button you click to open a pop-up, where you type the dice you need. Not everyone has the skill for, or prefers, commands and `/r` in chat. Some people are much more visual: it has to be tangible, something you click and press, a window that pops up in front of you, where you type the dice you need. And it needs the images, so you can say: I want this many attribute dice, the yellow ones; this many black dice, the gear dice; this many skill dice, the green ones. With this pop-up, it's much easier for the player to see what they are doing.

## The `/r` command

Some of my players are more used to typing in chat, using commands or programming. `/r 3db + 2ds + 1dg` is for people who like typing and don't need the visuals. They already know that `3db` means 3 base dice.

The `#` is there to label the roll. Sometimes I say: make a Shoot roll, but you're using your opponent's weapon. I don't have time to add the opponent's weapon to the character's sheet and so on, so I need something quick and indirect. The player says: I have 4 in the attribute, so I put 4 base dice. I have 2 in Shoot, so I put 2 skill dice. How many does the weapon give, GM? I say it gives 2 gear dice. They add the 2 gear dice and roll. And they need the Push button there too, in case they want to push that roll.

## Requirements

- Foundry, hosted online or on your own computer, version 13 or 14. Those are the versions I've used; I currently use version 14.
- The base Mutant: Year Zero system, distributed through Foundry itself.
- Optional: Dice So Nice, to get the 3D dice on screen and increase your immersion.

The idea of the module is to improve readability. If you don't like it and prefer the vanilla look that comes with the system, just disable and uninstall the module, no problem. It comes fully set up: it only changes the interface, and there's nothing for you to configure.

## Disclaimer

This module is not official. I'm not being paid for it and I have no interest in being paid. This module is completely free. I made it entirely to improve the experience of my table and my players, because I run active Mutant: Year Zero tables; we're actually playing Mutant: Year Zero Ad Astra. I have no connection with Free League, I didn't use any of their material, and I'm basing everything on what is freely available. All rights belong to them. I'm not charging anything and I don't expect anything in return. I'm just trying to make my life easier and improve how the game looks.

## Bugs and suggestions

To report any bug, just use the [Issues page on GitHub](https://github.com/f-fabner/mutant-dices/issues) or send me a message directly on my GitHub. For any suggestion, bug or report, use GitHub to suggest or report bugs so I can fix them. After all, I use this module myself. I'm not making it with any intention of selling it, or for the purpose of other people using it: I'm making it for me, because I use it constantly at my Mutant tables. So if anyone finds a problem I haven't found, just report it on GitHub.

## Thanks

I just want to thank my table, who motivated me to make this module. After many sessions, we felt we needed a better way to read the dice, especially for new players, some of whom are only now learning how the system works. That need gave me the drive and the creativity to build the module. I had help from Claude along the way, while following Foundry's rules. I understand the result and know what's going on in the code: the idea came from knowing how it works and how I wanted it to look.
