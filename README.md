# Permits Please

A 2D parking permit inspection game inspired by *Papers, Please*.

## Concept

You are a parking permit officer. Vehicles pull up one by one and it's your job to verify their permits. Cross-reference the details — zone, expiration date, vehicle type, plate number — against the regulations, spot discrepancies, and decide: **approve or deny**.

Miss too many violations and you get a warning. Let legitimate vehicles through and residents will complain. Every shift gets harder.

## Gameplay Loop

1. A vehicle approaches your booth with a displayed permit
2. You receive the current rulebook and any active policy updates for the day
3. Inspect the permit details against the rules
4. Stamp **APPROVED** or **DENIED**
5. Earn points for correct decisions, lose them for mistakes
6. Survive the shift

## Planned Features

- Multiple permit types (residential, commercial, visitor, handicapped)
- Time pressure per shift
- Rule changes between days (new zones, expired sticker formats, etc.)
- Story elements — residents who argue, supervisors who pressure you
- Escalating difficulty with forged or altered permits
- Scoring and end-of-day report card

## Onboarding

**Goal:** a new player understands the loop within 5 minutes, without reading a manual.

**Approach — teach by playing, one new rule per day:**

- **Day 1 — Expiry only.** Supervisor delivers one line ("Check the expiry date — reject anything past today"), then 3–5 permits scroll through. Today's date is highlighted. Stamp APPROVED or DENIED.
- **Day 2 — Add zones.** New line of supervisor dialogue introduces zone matching. Previous rule still applies.
- **Day 3 — Add license plate matching.**
- **Day 4 — Add vehicle type restrictions.**
- **Day 5+ — Edge cases:** handicap permits, visitor passes, forged stickers.

**First-turn experience:**

1. "Day 1, Monday" title card → booth view
2. Supervisor line (one sentence, no walls of text)
3. First permit arrives — relevant field highlighted on both the permit and the rulebook
4. Big satisfying stamp animation + sound on decision
5. End-of-day report card lists any mistakes — that's the only correction; no mid-shift interruptions

**Design rules:**

- Rulebook always one click/key away — never hidden
- Visual cues over text: color highlight mismatched fields, green/red on stamps
- No tutorial popups that block input
- Mistakes are revealed end-of-day, not in the moment (preserves flow)

## Tech Stack

> TBD — to be decided during the hackathon

## Team

> Add your team members here

## Getting Started

> Setup instructions will be added as development progresses

## Inspiration

Inspired by [Papers, Please](https://papersplea.se/) by Lucas Pope — a dystopian document thriller where you play an immigration officer in a fictional totalitarian state. *Permits Please* brings that same tension and moral weight to the world of parking enforcement.
