import { StatKey, statKeys } from '../data/statKey';
import { ParsedSet } from './parser';
import { SolvedVP } from './solver';

export interface OwnedState {
	ability: boolean;
	nature: boolean;
	item: boolean;
	moves: Record<number, boolean>;
	stats: Partial<Record<StatKey, boolean>>;
}

export interface AdjustedCosts {
	abilityCost: number;
	natureCost: number;
	itemCost: number;
	moveCost: number;
	moveUnitCost: number;
	statCost: number;
	totalCost: number;
	rawTotalCost: number;
}

export function createOwnedState(): OwnedState {
	return {
		ability: false,
		nature: false,
		item: false,
		moves: {},
		stats: {},
	};
}

export function getAdjustedCosts(
	parsed: ParsedSet,
	solved: SolvedVP,
	owned: OwnedState
): AdjustedCosts {
	const moveUnitCost = parsed.moves.length ? solved.moveCost / parsed.moves.length : 0;
	const abilityCost = owned.ability ? 0 : solved.abilityCost;
	const natureCost = owned.nature ? 0 : solved.natureCost;
	const itemCost = owned.item ? 0 : solved.itemCost || 0;
	const moveCost = parsed.moves.reduce(
		(total, _move, index) => total + (owned.moves[index] ? 0 : moveUnitCost),
		0
	);
	const statCost = statKeys.reduce(
		(total, statKey) => total + (owned.stats[statKey] ? 0 : solved.statCosts?.[statKey] || 0),
		0
	);
	const totalCost = abilityCost + natureCost + itemCost + moveCost + statCost;
	const rawTotalCost =
		solved.abilityCost +
		solved.natureCost +
		(solved.itemCost || 0) +
		solved.moveCost +
		statKeys.reduce((total, statKey) => total + (solved.statCosts?.[statKey] || 0), 0);

	return {
		abilityCost,
		natureCost,
		itemCost,
		moveCost,
		moveUnitCost,
		statCost,
		totalCost,
		rawTotalCost,
	};
}
