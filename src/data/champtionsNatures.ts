import { StatKey } from './statKey';

export function getNatureMults(nature?: string) {
	const neutral = { hp: 1, atk: 1, def: 1, spa: 1, spd: 1, spe: 1 };
	if (!nature) return neutral;
	const map: Record<string, { inc?: StatKey; dec?: StatKey }> = {
		Lonely: { inc: 'atk', dec: 'def' },
		Brave: { inc: 'atk', dec: 'spe' },
		Adamant: { inc: 'atk', dec: 'spa' },
		Naughty: { inc: 'atk', dec: 'spd' },
		Bold: { inc: 'def', dec: 'atk' },
		Relaxed: { inc: 'def', dec: 'spe' },
		Impish: { inc: 'def', dec: 'spa' },
		Lax: { inc: 'def', dec: 'spd' },
		Timid: { inc: 'spe', dec: 'atk' },
		Hasty: { inc: 'spe', dec: 'def' },
		Jolly: { inc: 'spe', dec: 'spa' },
		Naive: { inc: 'spe', dec: 'spd' },
		Modest: { inc: 'spa', dec: 'atk' },
		Mild: { inc: 'spa', dec: 'def' },
		Quiet: { inc: 'spa', dec: 'spe' },
		Rash: { inc: 'spa', dec: 'spd' },
		Calm: { inc: 'spd', dec: 'atk' },
		Gentle: { inc: 'spd', dec: 'def' },
		Sassy: { inc: 'spd', dec: 'spe' },
		Careful: { inc: 'spd', dec: 'spa' },
		Hardy: {},
		Docile: {},
		Serious: {},
		Bashful: {},
		Quirky: {},
	};
	const clean = nature.replace(/Nature/i, '').trim();
	const def = { ...neutral };
	const eff = map[clean];
	if (!eff) return neutral;
	if (eff.inc) (def as any)[eff.inc] = 1.1;
	if (eff.dec) (def as any)[eff.dec] = 0.9;
	return def;
}
