# Feedback Loops — Permits Please

## Goal

Players need to understand cause and effect. Every APPROVE or DENY decision should have visible consequences so players feel the weight of their choices — not just going through the motions.

### Design principles (from player experience spec)

- **Optimize for:** tension + mastery. The "aha" of catching a sneaky violation.
- **Engineer against:** confusion. If a player can't tell why they were wrong, that's a bug, not difficulty.
- **Session length:** 3-5 minute rounds, 8-12 cars. Feedback must fit this tempo.
- **Skill curve:** Round 1 winnable by anyone. Final rounds reward internalized rule knowledge.

---

## In-Round Feedback (during the 3-5 minute shift)

These happen instantly but never break flow -- no popups, no blocking text. At 8-12 cars per round, every second counts.

- **Stamp animation** -- Big satisfying APPROVED (green) or DENIED (red) stamp lands on the permit. This is the moment of commitment -- make it feel weighty.
- **Permit slides away** -- Next vehicle pulls up. No pause to explain if they were right or wrong. The player lives with uncertainty until end-of-round.
- **HUD updates silently** -- Score and strike counters are always visible but update without fanfare. The player might notice their score didn't go up, but won't know the details until the report card.

**Why withhold instant right/wrong:** It preserves tension (the primary emotion to optimize for). The player starts second-guessing themselves mid-round -- "wait, was that Zone A or B?" -- which is the Papers Please feeling. And since rounds are only 3-5 minutes, the uncertainty never lasts long enough to become frustrating.

### Subtle in-round cues (non-blocking)

- Correct streak -- stamp animation gets snappier, slightly more confident
- Multiple mistakes -- ambient music shifts tone (more tense)
- Supervisor radios in if strikes pile up: "Getting complaints. Tighten up." -- ambient, not a popup

These cues build tension without causing confusion. The player feels something is off but has to keep going.

---

## End-of-Round Report Card

This is where **mastery** happens. After each 3-5 minute round:

### Summary Stats

| Metric | What it shows |
|---|---|
| Vehicles processed | X / 8-12 |
| Correct decisions | count |
| Missed violations | count (approved something invalid) |
| False denials | count (denied a valid permit) |
| Accuracy | percentage |
| Round rating | 1 to 5 stars |
| Leaderboard rank | your score vs. async daily challenge |

### Mistake Breakdown -- the anti-confusion layer

**This is critical.** Confusion is the emotion to actively engineer against. Every single mistake must be explainable in one glance.

For each mistake, show:

- The permit the player saw (visual snapshot)
- The specific field that was wrong (**highlighted in red**)
- The rule it violated (pulled from the rulebook)
- What the correct call was

Example:

Vehicle #7 -- You stamped APPROVED
Permit showed Zone A. Rulebook required Zone B for commercial vehicles on this block.
Correct decision: DENIED

The player should never leave a report card thinking "I still don't get why that was wrong." If they do, it's a design bug.

### Round-specific messaging

Since onboarding introduces one rule per day, the report card focuses feedback on the current round's new rule:

- **Round 1 (expiry only):** "You let through 1 expired permit. Always check the date against today's date."
- **Round 2 (zones added):** "2 zone mismatches missed. The new zone rules tripped you up -- they'll still apply tomorrow."
- **Round 3 (plates added):** "License plate on Vehicle #4 didn't match the permit. Cross-reference plate numbers."
- **Round 5+ (edge cases):** "That was a forged sticker -- the font weight was off. They'll get trickier."

### "Aha" moments

The report card is where the secondary emotion -- the "aha" of catching a sneaky violation -- gets reinforced. Call out the hard catches:

- "Vehicle #3 had a permit expiring today. You caught it. Nice."
- "That commercial plate in a residential zone -- only 23% of players caught that one." (using async leaderboard data)

This rewards mastery and gives the player a reason to replay.

---

## Async Leaderboard Integration

Same 10 scenarios for everyone in a daily challenge. The report card ties directly into this:

- **Your score vs. today's average** -- immediate social comparison without multiplayer overhead
- **Accuracy percentile** -- "You were more accurate than 71% of officers today"
- **Hardest catch of the day** -- "Only 12% caught the altered expiry on Vehicle #9" -- this drives the "aha" feeling and encourages replays
- **Streak tracker** -- consecutive days played, consecutive perfect rounds

This delivers the social hook at ~5% of multiplayer cost, exactly as specced.

---

## Across-Round Consequences

Decisions carry forward to build the mastery arc:

### Difficulty scaling tied to performance
- **High accuracy** -- Game introduces harder permit types faster (forged permits, edge cases). The reward for mastery is more challenge.
- **Low accuracy on a specific rule** -- Game generates more scenarios testing that rule. Targeted practice, not random repetition.
- **Consistently good** -- Supervisor trusts you more, but hands you the ambiguous cases

### Stakes that build (matching the skill curve)
- **Early rounds:** Mistakes are free lessons. Low pressure. Winnable by anyone who reads English.
- **Mid rounds:** Strikes matter. 5 strikes = round ends early.
- **Late rounds:** Require deep familiarity with the rule system. Pattern recognition alone isn't enough -- you need to have internalized the municipal code. This is the mastery payoff.

### Supervisor pressure
- Declining accuracy across rounds -- "The department's watching your numbers."
- Too many false denials -- Residents start annoyed: "I swear if you reject me again..."
- This is the **mild moral discomfort** the spec calls for -- not luck, not punishment, just weight

---

## Making Decisions Meaningful

### 1. Uncertainty during, clarity after
Don't tell the player if they're right during the round. Let them sit with their decisions. The end-of-round reveal is the payoff. But the reveal must be **crystal clear** -- confusion is a bug.

### 2. Ambiguity on purpose (tension, not confusion)
Some permits should be borderline -- a date that's today, a zone that borders two areas, a plate one digit off. The player has to interpret, not just pattern match. But the report card must always explain why the correct answer was correct. Ambiguity creates tension in the moment; the explanation creates mastery after.

### 3. Rule changes between rounds
New policy updates in the rulebook at the start of each round. Highlighted with a "NEW" tag. Players who auto-pilot will fail. This is what separates the skill ceiling from the floor.

### 4. Moral weight (secondary emotion)
A vehicle with a note: "Please, I'm just picking up my kid" -- permit is 2 minutes expired. Correct action is DENY. The end-of-round card might note: "Vehicle #12 was towed after your denial." The game doesn't judge. The player does.

---

## Implementation Priority (hackathon)

Build in this order:

1. **Stamp animation (APPROVED / DENIED)** -- the core action needs to feel good
2. **Silent HUD (score + strikes, always visible)** -- tension without interruption
3. **End-of-round report card with mistake breakdown** -- mastery + anti-confusion
4. **Highlighted fields showing exactly what was wrong** -- confusion is a bug
5. **Async leaderboard (daily challenge score comparison)** -- social hook, minimal cost
6. **Moral weight moments + supervisor dialogue** -- stretch goal, emotional depth

Items 1-4 are the core feedback loop. 5 adds replayability. 6 makes it memorable.
