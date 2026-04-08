import { getNatureMults } from '../data/champtionsNatures';
import { StatKey, statKeys } from '../data/statKey';
import { VP, vpForStatSP } from '../data/pokemonVPCosts';
import { ParsedSet } from './parser';
import itemsVpCost from '../data/itemsVpCost';

export interface SolvedVP {
	moveCost: number;
	natureCost: number;
	abilityCost: number;
	itemCost?: number;
	statCosts: Partial<Record<StatKey, number>>;
	statSpCost?: Partial<Record<StatKey, number>>;
}

function solveForBaseStat(baseStat: number, level: number): number {
	return Math.floor(((baseStat * 2 + 31) * level) / 100);
}

function solveForSP(
	statKey: StatKey,
	baseStat: number,
	calcStat: number,
	level: number,
	natureMult: number
): number {
	if (statKey === 'hp') {
		return calcStat - solveForBaseStat(baseStat, level) - level - 10;
	}
	return Math.floor(calcStat / natureMult) - solveForBaseStat(baseStat, level) - 5;
}

export function solveForVP(parsedSet: ParsedSet) {
	if (!parsedSet.baseStats || !parsedSet.calcStats) {
		throw new Error('Base stats and calculated stats are required to solve for VP.');
	}

	const natureMults = getNatureMults(parsedSet.nature);
	const statSpCost: Partial<Record<StatKey, number>> = {};

	for (const statKey of statKeys) {
		const baseStat = parsedSet.baseStats[statKey];
		const calcStat = parsedSet.calcStats[statKey];
		if (baseStat !== undefined && calcStat !== undefined) {
			const sp = solveForSP(
				statKey,
				baseStat,
				calcStat,
				parsedSet.level || 50,
				natureMults[statKey]
			);

			statSpCost[statKey] = sp < 0 ? 0 : sp;
		}
	}

	const moveCost = VP.movePer * parsedSet.moves.length;
	const natureCost = VP.nature;
	const abilityCost = parsedSet.ability ? VP.ability : 0;
	const itemCost = parsedSet.item ? itemsVpCost.find((item) => item.name.toLowerCase() === parsedSet.item!.toLowerCase())?.vpCost : 0;
	const statCosts = Object.fromEntries(
		Object.entries(statSpCost).map(([key, value]) => [key, value ? vpForStatSP(value) : 0])
	) as Partial<Record<StatKey, number>>;

	return {
		moveCost,
		natureCost,
		abilityCost,
		itemCost,
		statCosts,
		statSpCost,
	};
}
