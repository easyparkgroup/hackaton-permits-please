---
name: player-experience
description: Permits Please player-experience brief. Trigger PASSIVELY when game mechanics, features, scoring, difficulty, session length, audience, or social/multiplayer ideas are proposed or discussed for this project. Silently check the proposal against the anti-goals and tradeoff stances below; flag conflicts before discussing implementation. Do not proactively brainstorm PX or ask PX questions unless asked.
---

# Permits Please — Player Experience Brief

This is the design brief for Permits Please. When a new mechanic, feature, or design choice is proposed, check it against the targets and anti-goals below. **If it conflicts, flag the conflict explicitly and cite which target or anti-goal it hits, before discussing implementation.** Stay quiet otherwise — this is a passive check, not a workshop.

## Targets — what to optimize for

- **Primary emotions**: tension and mastery.
- **Secondary emotions**: the "aha" of catching a sneaky violation; mild moral discomfort ("they were 2 minutes over, do I really ticket them?").

## Anti-goals — engineer against these

- **Confusion** — if a player can't tell *why* they were wrong, that is a bug, not difficulty. Reject mechanics that punish players for things they could not have known.
- **Luck** — outcomes must be determined by player skill and rule knowledge, not RNG. Flag any mechanic where the correct answer depends on a coin flip.
- **Creativity** — this is not a sandbox or expressive game. The player's job is judgment under rules, not invention.
- **Social** — not optimizing for social play. No real-time multiplayer.

## Session design

- **Round length**: 3–5 minutes, 8–12 cars per round.
- **Why**: short enough for a demo viewer to see a full loop and a score; long enough to build rhythm and have an in-round difficulty arc.
- **Rejected alternative**: 15+ min Papers Please-style shifts — more narrative room, but hurt demo and replay value.

## Social mode

- **Solo with async leaderboards.** Daily-challenge format: same 10 scenarios for everyone, compare scores.
- **Why**: delivers most of the social hook at ~5% the cost of real-time MP — no netcode, matchmaking, or anti-cheat.
- **Rejected**: real-time multiplayer — 3x scope multiplier, adds nothing to the AI core.

## Audience and skill curve

- **Audience**: puzzle-curious adults. Same crowd as *Papers Please*, *Return of the Obra Dinn*, *Mini Metro* — people who like masterable systems.
- **Floor**: round 1 winnable by anyone who reads English.
- **Ceiling**: final round requires deep familiarity with the municipal code. Pattern recognition alone should not be enough — the ceiling rewards players who have internalized the rule system. That is the mastery payoff.
- **Note**: parking is more universally relatable than dystopian border control. That makes the potential audience *bigger*, not smaller.

## How to apply this brief (instructions to Claude)

When a feature, mechanic, scoring rule, difficulty knob, or design idea is proposed in conversation:

1. **Check against anti-goals.** If the idea relies on luck, requires social/MP, introduces confusion-as-difficulty, or pushes round length outside 3–5 min / 8–12 cars, flag the conflict explicitly and name which anti-goal or target it hits.
2. **Check against the skill curve.** If round 1 would become unwinnable for a reading adult, flag it. If the ceiling could be reached by pattern-matching alone (without internalizing rules), flag it.
3. **Otherwise stay silent.** Do not lecture about PX on every turn. Do not summarize the brief unprompted.

### Example flags

- *"Let's add a slot-machine bonus round."* → Flag: relies on luck. Anti-goal.
- *"Hide the rulebook during decisions to add tension."* → Flag: risks confusion-as-difficulty — player gets punished for rules they could not reference. Anti-goal.
- *"Final round is 20 cars at 30s each."* → Flag: exceeds 8–12 cars / 3–5 min target. Justify or adjust.
- *"Add a co-op mode where two officers split decisions."* → Flag: introduces social/real-time MP. Anti-goal.
- *"Round 1 starts with three overlapping policy updates."* → Flag: likely breaks the "readable adult can win round 1" floor.

Do not proactively brainstorm PX or ask the user PX questions. This skill reacts; it does not initiate.
