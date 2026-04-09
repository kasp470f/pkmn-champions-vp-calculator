import { Generation, Generations, PokemonSet } from '@pkmn/data';
import { Dex } from '@pkmn/dex';
import { Sets, Team, Teams } from '@pkmn/sets';
import { Pokemon } from '@smogon/calc';

const DEFAULT_GEN = 9;

export interface ParsedSet {
	species?: string;
	item?: string;
	ability?: string;
	level?: number;
	nature?: string;
	baseStats?: Record<'hp' | 'atk' | 'def' | 'spa' | 'spd' | 'spe', number>;
	evs?: Partial<Record<'hp' | 'atk' | 'def' | 'spa' | 'spd' | 'spe', number>>;
	calcStats?: Partial<Record<'hp' | 'atk' | 'def' | 'spa' | 'spd' | 'spe', number>>;
	moves: string[];
}

export function parseShowdownTeam(text: string): ParsedSet[] {
	const gens = new Generations(Dex);
	const gen = gens.get(DEFAULT_GEN);
	const teamImport = Team.fromString(text, gen as any);
	if (!teamImport) throw new Error('Failed to parse team. Please check the format and try again.');

	return teamImport.team.map((set) => {
		const parsedSet = parseShowdownSet(set, gen);
		if (!parsedSet) throw new Error('Failed to parse set. Please check the format and try again.');
		console.log('Parsed set:', parsedSet);
		return parsedSet;
	});
}

export function parseShowdownSet(
	set: Partial<PokemonSet<string>>,
	gen: Generation
): ParsedSet | null {
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
		evs: set.evs,
		calcStats: pokemon.rawStats,
	};

	return parsed;
}
