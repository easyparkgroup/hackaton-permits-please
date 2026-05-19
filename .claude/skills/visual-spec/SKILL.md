---
name: visual-spec
description: Permits Please v1 visual & aesthetic spec. Trigger PASSIVELY when UI, layout, color, typography, animation, transition, sound, asset style, HUD chrome, or world-art decisions are proposed or implemented. Silently check the proposal against the constraints below and flag conflicts (modern UI conventions, off-palette colors, modern web fonts, sounds beyond the allowed four, diegetic computer chrome, full car renders, sub-pixel motion, rulebook overlapping sign/permit). Stay silent otherwise. Do not lecture about aesthetics unprompted.
---

# Permits Please — v1 Visual & Aesthetic Spec

This is the canonical visual brief for Permits Please v1. When a frontend, UI, or art-direction choice is proposed, check it against the sections below. **If it conflicts, flag the conflict explicitly and cite the rule it violates, before discussing implementation.** Stay quiet otherwise — this is a passive check, not a workshop.

## Setting

San Francisco, early 2000s. The player is a parking enforcement officer walking a beat. The world is real — they approach parked cars on a real street. They are **NOT** sitting at a computer.

## Vibe in one sentence

The world is pixel-art 2003 SF. The HUD on top of that world looks like a Windows 98 / early Vista UI — beveled grey panels, chunky buttons, Tahoma text. **The aesthetic clash IS the style.**

## Reference points

- **World**: Habbo Hotel, Hypnospace Outlaw, Kentucky Route Zero pixel scenes — flat, limited palette, foggy SF tones.
- **HUD chrome**: Windows 98 / 2000 / early Vista. Beveled grey, gradient title bars, MS Sans Serif / Tahoma.
- **Permit / document layout and interaction**: Papers Please.

**What we are NOT making**: a fake desktop OS, a "terminal" interface, or anything that implies the player is using software in-fiction. The Win98 UI is the fourth wall — it is the game's frame, not a diegetic computer.

## Two-layer composition

- **World layer** (pixel art): sign pole, slice of dashboard with the permit visible, sidewalk/curb the officer is standing on. Foggy SF palette. No full car render — the dashboard slice is all the player sees.
- **HUD layer** (Win98 chrome): clock, verdict buttons, rulebook tab. Beveled grey, sits on top of the world, pixel-aligned.

These layers must feel intentionally different. **Do not blend them.**

## On-screen elements (per round)

```
+----------------------------------------------------------------+
|                                          [ Tue 10:47AM ] |  <- HUD clock, top-right
|                                                          |
|   [ PARKING SIGN POLE ]    [ PERMIT / PLACARD ]          |  <- Both diegetic
|   (pixel-art totem,        (pixel-art document           |
|    planted in the           on a car dashboard;          |
|    sidewalk)                we see only dash + permit)   |
|                                                          |
|                                       [ TICKET ] [ PASS ]|  <- HUD verdict buttons
| [ Rulebook ]                                             |  <- HUD rulebook tab
+----------------------------------------------------------------+
```

## The "approach a new car" transition

Between scenarios, play a short transition (~1 second) selling the officer walking up to a new vehicle. Two acceptable options (pick whichever is simpler):

1. **Sidescroll** — current scene slides left and off-screen; next scene slides in from the right. Sign and dashboard slice move together.
2. **Step forward** — brief footstep sound; screen fades through black for 200ms; new scene fades in. Cheaper to implement.

**Constraints**:
- Transition must NOT interrupt the HUD. Clock and rulebook persist; only the world layer changes.
- In-game clock advances by 2–5 minutes during each transition (see open-question #1 below).
- No transition longer than 1 second.

## The permit / placard

The ONLY thing representing the car. Pixel-art document on the dashboard of the unseen vehicle. Player sees:

- A slice of dashboard (steering wheel edge, maybe a coffee cup, maybe a parking ticket envelope for flavor).
- The permit itself, **clearly legible**, showing:
  - Permit type (e.g. "RESIDENT - AREA J", "DISABLED", "COMMERCIAL LOADING")
  - Expiration date
  - Issue date
  - Permit number
  - Sometimes: nothing (no permit on dash)

**Visual style**: cream paper (`#F4ECD8`), pixel font, SF municipal seal in the corner, slight wear / coffee-ring marks for character. Different permit types have different colors and shapes (a disabled placard hangs from a rearview mirror; a resident sticker is rectangular on the windshield).

## The parking sign pole

- Pixel-art metal post planted in the sidewalk.
- **1–4 stacked rectangular signs per pole** (see open-question #2 below).
- Each sign rendered as a sprite based on its rule data.
- Sign colors:
  - White (`#F8F8F8`) for restrictions
  - Red (`#C8201F`) for "no parking" type
  - Green (`#2E7D32`) for permits
- Pixel-font text. Example: `"NO PARKING / 8AM–10AM / TUES & THURS / STREET CLEANING"`
- Reads top-to-bottom in priority order (matches the [[rules-engine]] priority field).

## HUD clock (top-right)

- Win98-style inset panel, ~120×32px.
- Pixel font, displays day + time: `"Tue 10:47 AM"`.
- Always visible.
- Updates between scenarios.
- Subtle tick sound on transition (optional).

## Rulebook (bottom-left tab, opens to a small notebook)

- **Closed**: a small tab labeled `RULEBOOK`, Win98 button look, bottom-left corner.
- **Open**: pixel-art spiral-bound notebook, ~320×400px, occupies the bottom-left **quarter of the screen maximum**. **Must NOT cover the sign pole or the permit document.**
- Tabbed sections: `Signs` / `Permits` / `Times` / `Codes`.
- Pixel-font text on cream paper.
- Close via: corner click, X button, or pressing the rulebook tab again.
- **Exception to the "HUD is all Win98" rule**: the rulebook is styled like a real notebook because it is the officer's in-fiction notebook.

## Verdict buttons (bottom-right)

- Two chunky Win98-style buttons: `[ TICKET ]` and `[ PASS ]`.
- Beveled, with classic pressed-in state on click.
- `[ TICKET ]` opens a small Win98 dialog asking which violation code to apply (dropdown or radio list).
- Keyboard shortcuts: `T` to ticket, `P` to pass, `R` to toggle rulebook.

## Color palette — hard-cap at 14 colors total

**World layer**
- SF fog grey: `#B8BEC2`
- Sidewalk concrete: `#8B8B85`
- Dashboard plastic: `#2A2A2E`
- Permit cream: `#F4ECD8`
- Sign white: `#F8F8F8`
- Sign red: `#C8201F`
- Sign green: `#2E7D32`

**HUD layer (Win98)**
- Chrome grey: `#C0C0C0`
- Bevel light: `#FFFFFF`
- Bevel dark: `#808080`
- Title bar blue start: `#0A246A`
- Title bar blue end: `#A6CAF0`
- Button text black: `#000000`
- Warning red: `#B22222`

Any color outside this palette is a flag.

## Typography

- **HUD chrome** (buttons, clock, dialogs): Tahoma 11px OR MS Sans Serif 11px, **no anti-aliasing**. Webfont version OK (e.g. "W95FA").
- **World text** (signs, permits, rulebook): a pixel font — "Pixelated MS Sans Serif", "Px437 IBM VGA", or similar. Must remain legible at rendered size.
- **DO NOT use modern web fonts** (Inter, Roboto, system-ui, SF Pro). The font choice is half the vibe.

## Animation rules

- Everything moves on a pixel grid. **No sub-pixel motion, no smooth easing.**
- HUD elements appear/disappear instantly or with a 1–2 frame "stutter" open (Win98 windows did not fade).
- World layer can use 4–8 frame sprite animations for ambient touches (fog drift, pixel pigeon, fluttering permit edge).
- Transitions between cars: see "approach" section above.
- **No animation longer than 1 second.**

## Sound

Exactly four sounds allowed for v1:
1. Transition footstep
2. Button click
3. Clock tick
4. Ticket-issued chime

Anything else is a flag.

## What NOT to build for v1

- No full car renders, no driver characters, no street-level wide shots.
- No mouse cursor replacement / fake desktop / fake OS chrome wrapping the whole game.
- No sounds beyond the four listed above.
- No settings menu, no save/load, no accounts.
- No animations longer than 1 second.
- No modern UI conventions (rounded corners beyond 1px, drop shadows beyond 1px, blur, glassmorphism). **If it didn't exist in Windows 2000, don't ship it.**

## Inputs (schemas drive rendering)

- `schemas/sign.schema.json` — sign sprite rendering
- `schemas/vehicle.schema.json` — permit document rendering (the `permits` array determines what placard art appears on the dashboard)
- `schemas/scenario.schema.json` — whole scene
- `schemas/verdict.schema.json` — verdict button outputs

## The one-screenshot test

A single screenshot of v1 should make someone say: *"oh, that's a parking ticket game set in old San Francisco that looks like Windows 98."*

If they say *"is this a desktop simulator?"* or *"is this a modern indie game?"* — you've drifted.

## How to apply this spec (instructions to Claude)

When a UI, layout, color, font, animation, transition, sound, or art-style choice is proposed or implemented:

1. **Palette check.** Any color outside the 14-color list → flag.
2. **Font check.** Modern web fonts (Inter, Roboto, system-ui, SF Pro, etc.) → flag. Anti-aliased HUD chrome text → flag.
3. **Chrome check.** Modern UI conventions (rounded corners >1px, drop shadows >1px, blur, glassmorphism, fade animations on HUD) → flag.
4. **Layer check.** Anything that blurs the world/HUD distinction (HUD elements with pixel-art styling other than the rulebook; pixel-art world elements styled like Win98) → flag.
5. **Diegetic-computer check.** Anything suggesting the player is using a computer in-fiction (fake desktop, fake OS chrome wrapping the screen, terminal interface) → flag.
6. **Scope check.** Full car renders, driver characters, wide street shots, sounds beyond the four, animations >1s, settings menu, save/load → flag against "NOT for v1".
7. **Rulebook overlap check.** Rulebook layout that covers the sign pole or permit → flag.
8. **Otherwise stay silent.** Do not restate the spec unprompted. Do not lecture about aesthetics on every turn.

### Example flags

- *"Let's use `border-radius: 12px` on the buttons."* → Flag: modern UI convention. Win98 buttons are sharp-cornered, beveled.
- *"Set body font to Inter for readability."* → Flag: modern web font. Use Tahoma / MS Sans Serif for HUD and a pixel font for world text.
- *"Add a blurred backdrop behind the rulebook when it opens."* → Flag: blur / glassmorphism. Did not exist in Windows 2000.
- *"Render the car driving up from the bottom of the screen."* → Flag: no full car renders for v1; the car is represented only by the dashboard slice + permit.
- *"Use a fifth color, `#3B82F6`, for the rulebook tab."* → Flag: exceeds 14-color cap and is off-palette.
- *"The rulebook expands to fill 60% of the screen when open."* → Flag: must occupy ≤25% (bottom-left quarter max) and must not cover sign or permit.
- *"Add a `tooltip` sound when hovering verdict buttons."* → Flag: exceeds the four allowed sounds.

Do not proactively review visuals or restate the spec. This skill reacts; it does not initiate.

## Open questions / known conflicts

Flagged against the [[rules-engine]] and [[player-experience]] skills when this spec was written. Recorded here so the conflicts stay visible every load. **Resolve, don't ignore.**

1. **Continuous in-game clock vs. random day/time per round.**
   - Visual spec: "The in-game clock advances by 2-5 minutes during each transition (so a shift naturally progresses through the day)."
   - Rules-engine spec: "Each round is assigned a random day and time, visible to the player."
   - Conflict: continuous progression and per-round random draw are mutually exclusive.
   - Possible resolutions: (a) one random starting day/time per game, time advances continuously thereafter; (b) drop the "2-5 min advance" and accept teleports between rounds; (c) split into "campaign mode" (continuous) and "scenario mode" (random per round).

2. **Signs per pole (1–4) vs. signs per round (3–6).**
   - Visual spec: "1–4 stacked rectangular signs per pole."
   - Rules-engine spec: 5- and 6-sign rounds exist.
   - Conflict: either rounds with 5–6 signs need multiple poles (not stated in the visual spec) or one of the caps is wrong.
   - Possible resolutions: (a) allow up to 6 signs per pole; (b) introduce a second pole for 5–6 sign rounds and add layout rules; (c) lower the rules-engine cap to 4 signs per round.

3. **30-second round timer has no HUD element.**
   - Rules-engine spec: 30-second timer with sliding-scale scoring (100 at ≤5s → 10 at 30s → 0 after).
   - Visual spec: describes clock, rulebook tab, verdict buttons — no countdown.
   - Gap: the player cannot see how much time is left, which makes the scoring curve unobservable and risks the [[player-experience]] confusion anti-goal (player can't tell why their score dropped).
   - Possible resolutions: (a) numeric countdown next to the HUD clock; (b) a depleting Win98-style progress bar above the verdict buttons; (c) the world dims gradually as time runs out (diegetic but ambiguous — riskier for the confusion anti-goal).
