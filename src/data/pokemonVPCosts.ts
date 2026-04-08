// VP pricing guidelines (from user):
// Moves: ~250 VP (total for 4 moves)
// Nature: ~500 VP
// Ability: ~500 VP
// Stat Points: ~50 VP max per Stat (per-stat cap)

export const VP = {
	movePer: 250,
	nature: 500,
	ability: 500,
	statMaxPerStat: 160,
};

export function vpForStatSP(sp: number) {
	const capped = Math.max(0, Math.min(32, sp));
	const cost = (capped * VP.statMaxPerStat) / 32;
	return Math.round(cost);
}
