---
name: rules-engine
description: Permits Please rules-engine spec. Trigger PASSIVELY when game rules, sign types, sign hierarchy, scoring, timing, round structure, or correct-answer resolution are proposed, modified, or referenced. Check the proposal against the canonical rules below and flag inconsistencies (e.g., a new sign that has no place in the hierarchy, a scoring change that breaks the sliding scale, a round structure that violates uniqueness or count constraints). Stay silent otherwise. Do not proactively review rules or restate the spec unprompted.
---

# Permits Please — Rules Engine Spec

This is the canonical rules-engine spec for Permits Please. When a rule, sign, scoring value, timing constant, or round-structure change is proposed, check it against the sections below. **If it conflicts, flag the conflict explicitly and cite the rule it violates, before discussing implementation.** Stay quiet otherwise — this is a passive check, not a workshop.

## Game structure

- **10 rounds per game.** Fully randomized and fresh on each replay.
- **Round sign-count distribution** (order randomized across the 10 rounds):
  - 3 rounds with 3 signs
  - 3 rounds with 4 signs
  - 2 rounds with 5 signs
  - 2 rounds with 6 signs
- **Each round is assigned a random day and time**, visible to the player.

## Gameplay

- Player sees the round's parking signs and must decide: **issue a ticket** or **don't**.
- 3–6 signs per round (per the distribution above). Some may be **distractors** — present in the scene but not relevant to the correct decision.
- **No two signs of the same type appear in the same round.**
- **30-second timer per round.** After 30 seconds the round auto-advances and scores 0.

## Scoring

- **Correct answer within 5 seconds**: 100 points.
- **Correct answer between 5 and 30 seconds**: sliding scale from 100 down to 10 points.
- **Correct answer after 30 seconds** (i.e., never — see auto-advance): 0 points.
- **Incorrect answer**: 0 points.
- **No minimum ticket / no-ticket ratio** across rounds. The mix is whatever the random scenario draw produces.

## Sign hierarchy

Highest precedence first. The correct answer is determined by applying the **highest-precedence sign present** for the round's assigned day and time:

1. No parking during events
2. Paid parking during events
3. Permit parking
4. Specialty parking (ADA, loading zones, etc.)
5. Regular no parking
6. Paid parking
7. Free parking

Lower-precedence signs are ignored when a higher-precedence sign applies for the current day/time.

## Correct-answer resolution

- Compute against the round's **assigned day and time**, not real-world clock time.
- Walk the hierarchy top-down; first applicable sign decides ticket vs. no-ticket.
- If no sign applies (e.g., all signs are time-restricted and none cover the round's day/time), the location is treated as free parking → no ticket.

## End screen

- Show **final score**.
- Show **number of incorrect rounds**.
- **No tiered rating system** (no stars, letter grades, ranks).

## How to apply this spec (instructions to Claude)

When a feature, rule change, sign type, scoring value, timer, or round-structure idea is proposed:

1. **Check structural constraints.** Sign-count distribution, no-duplicate-types-per-round, 10 rounds per game, 30-second timer. If a proposal breaks them, flag it.
2. **Check the hierarchy.** A new sign type must be placed somewhere in the precedence list — flag if a proposal adds a sign without specifying its slot, or duplicates an existing slot.
3. **Check the scoring curve.** Sliding-scale endpoints are 100 (≤5s) and 10 (at 30s). Flag changes that break monotonicity, change the endpoints, or split into tiers.
4. **Check correct-answer logic.** Day/time-based resolution against the round's assigned (not real-world) time. Flag proposals that introduce ambiguity, multiple "correct" answers, or RNG into resolution.
5. **Otherwise stay silent.** Do not restate the spec unprompted. Do not lecture about rule consistency on every turn.

### Example flags

- *"Add a 'school zone' sign."* → Flag: needs a slot in the hierarchy. Above or below specialty parking? Same restrictions or stricter?
- *"Two 'no parking' signs in one round to reinforce the rule."* → Flag: violates no-duplicate-types-per-round.
- *"Change the timer to 60 seconds."* → Flag: breaks the 30-second timer constant; sliding-scale endpoints would need redefinition.
- *"Award 50 points for a wrong answer if the player was close."* → Flag: incorrect answer is defined as 0. "Close" introduces ambiguity into correct-answer resolution.
- *"Some rounds have 8 signs."* → Flag: exceeds the 3–6 signs-per-round range and the sign-count distribution.

Do not proactively review rules or restate the spec. This skill reacts; it does not initiate.

## Open questions / known conflicts

These items were flagged against the [[player-experience]] brief at the time this spec was written. They are recorded here so the conflicts stay visible every time the skill loads. **Resolve, don't ignore.**

1. **Random round order vs. round-1 floor.**
   - Rules spec: round order and sign counts are "fully randomized."
   - PX brief: "Round 1 winnable by anyone who reads English."
   - Conflict: a fully random draw can put a 6-sign event-day scenario at round 1, breaking the floor.
   - Possible resolutions: bias early rounds toward 3-sign / non-event days; or weaken the floor claim.

2. **No wrong-answer feedback vs. confusion anti-goal.**
   - Rules spec: incorrect answer = 0 points; nothing specified about explaining *why*.
   - PX brief: "If a player can't tell why they were wrong, that's a bug, not difficulty."
   - Conflict: without post-round explanation, the player learns nothing from mistakes, which is the confusion anti-goal.
   - Possible resolutions: end-of-round (or end-of-game) reveal showing which sign decided each round.

3. **Per-play randomization vs. daily-challenge leaderboards.**
   - Rules spec: "Fully randomized and fresh on each replay."
   - PX brief: "Same 10 scenarios for everyone, compare scores."
   - Conflict: scores are incomparable if every player gets a different draw.
   - Possible resolutions: seeded "daily" mode (same 10 scenarios for everyone that day) alongside freshly-randomized casual mode.

4. **Terminology — "rounds" vs. "cars."**
   - Rules spec uses "round" for a single decision; PX brief uses "car" for the same thing.
   - Not a behavioral conflict, but pick one term and apply it consistently across docs, UI, and code.
