# Pokemon Champions VP Calculator

Small React app for estimating VP cost from a Pokemon Showdown export.

The app parses a pasted set, derives its calculated stats, and breaks the result into move, nature, ability, and per-stat VP costs. The results panel also lets you mark pieces as already owned so you can see the remaining VP total.

## What it does

- Parses a Pokemon Showdown set export
- Extracts species, ability, nature, and moves
- Calculates raw stats from the imported set
- Reverse-solves per-stat SP values
- Converts SP into VP using the current pricing table
- Lets you subtract owned moves, nature, ability, or stats from the total

## Current VP rules

The current implementation uses these values:

- Move: `250 VP` per move
- Nature: `500 VP`
- Ability: `500 VP`
- Stat cost: up to `160 VP` per stat
- SP to VP conversion: SP is capped at `32`, then scaled linearly to `160 VP`

## Usage

1. Copy a Pokemon Showdown export.
2. Paste it into the textarea.
3. Click `Parse Set`.
4. View the calculated VP breakdown in the results panel.
5. Review the calculated VP breakdown.
6. Tick entries you already own to see the remaining VP total.

Example input:

```text
Pikachu @ Light Ball
Ability: Static
Tera Type: Electric
EVs: 252 Atk / 4 SpD / 252 Spe
Jolly Nature
- Volt Tackle
- Fake Out
- Knock Off
- Protect
```