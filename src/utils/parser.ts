import { Generations } from '@pkmn/data';
import { Dex } from '@pkmn/dex';
import { Sets } from '@pkmn/sets';
import { Pokemon } from '@smogon/calc';

const DEFAULT_GEN = 9;

export interface ParsedSet {
	species?: string;
	item?: string;
	ability?: string;
	level?: number;
	nature?: string;
	baseStats?: Record<'hp' | 'atk' | 'def' | 'spa' | 'spd' | 'spe', number>;
	calcStats?: Partial<Record<'hp' | 'atk' | 'def' | 'spa' | 'spd' | 'spe', number>>;
	moves: string[];
}

export function parseShowdownSet(text: string): ParsedSet | null {
	const gens = new Generations(Dex);
	const gen = gens.get(DEFAULT_GEN);
	const set = Sets.importSet(text, gen as any);
	if (!set) throw new Error('Failed to parse set. Please check the format and try again.');

	if (!set.species) return null;

	const maxIVs = { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 };

	const pokemon = new Pokemon(gen, set.species, {
		ability: set.ability,
		item: set.item,
		nature: set.nature,
		evs: set.evs,
		ivs: maxIVs,
		level: 50,
		moves: set.moves,
	});

	const parsed: ParsedSet = {
		species: set.species,
		item: set.item,
		ability: set.ability,
		level: set.level || 50,
		nature: set.nature,
		moves: set.moves || [],
		baseStats: pokemon.species.baseStats,
		calcStats: pokemon.rawStats,
	};

	return parsed;
}
