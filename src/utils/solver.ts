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

function solveForStatSP(evs: number): number {
	return Math.floor((evs + 4) / 8);
}

export function solveForVP(parsedSet: ParsedSet) {
	if (!parsedSet.baseStats || !parsedSet.calcStats) {
		throw new Error('Base stats and calculated stats are required to solve for VP.');
	}

	const statSpCost: Partial<Record<StatKey, number>> = {};
	for (const statKey of statKeys) {
		const evs = parsedSet.evs?.[statKey] || 0;
		statSpCost[statKey] = solveForStatSP(evs);
	}

	const moveCost = VP.movePer * parsedSet.moves.length;
	const natureCost = VP.nature;
	const abilityCost = parsedSet.ability ? VP.ability : 0;
	const itemCost = parsedSet.item
		? itemsVpCost.find((item) => item.name.toLowerCase() === parsedSet.item!.toLowerCase())
				?.vpCost ?? 0
		: 0;
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
