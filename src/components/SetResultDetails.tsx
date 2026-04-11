import React from 'react';
import styled from 'styled-components';
import { statKeys, StatKey } from '../data/statKey';
import { ParsedSet } from '../utils/parser';
import { SolvedVP } from '../utils/solver';
import { AdjustedCosts, OwnedState } from '../utils/resultOwnership';
import SelectableCostCard from './SelectableCostCard';

const Block = styled.section`
	display: grid;
	gap: 14px;
`;

const InfoGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 12px;

	@media (max-width: 640px) {
		grid-template-columns: 1fr;
	}
`;

const InfoCard = styled.div`
	padding: 14px 16px;
	border-radius: var(--radius-m);
	background: rgba(255, 255, 255, 0.76);
	border: 1px solid rgba(17, 32, 51, 0.08);
`;

const Key = styled.div`
	font-size: 11px;
	font-weight: 800;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	color: var(--muted);
	margin-bottom: 6px;
`;

const Value = styled.div`
	color: var(--text);
	font-weight: 700;
	line-height: 1.45;
`;

const Moves = styled.div`
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 10px;

	@media (max-width: 640px) {
		grid-template-columns: 1fr;
	}
`;

const StatGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 10px;

	@media (max-width: 640px) {
		grid-template-columns: 1fr;
	}
`;

const StatValues = styled.div`
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 10px;
`;

const StatMetric = styled.div`
	padding: 4px 12px;
	border-radius: 8px;
	background: var(--surface-alt);
`;

const StatMetricLabel = styled.div`
	font-size: 10px;
	font-weight: 800;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	color: var(--muted);
`;

const StatMetricValue = styled.div`
	font-size: 18px;
	font-weight: 800;
	color: var(--text);
`;

interface SetResultDetailsProps {
	parsed: ParsedSet;
	solved: SolvedVP;
	owned: OwnedState;
	adjusted: AdjustedCosts;
	onAbilityChange: (checked: boolean) => void;
	onNatureChange: (checked: boolean) => void;
	onItemChange: (checked: boolean) => void;
	onMoveChange: (index: number, checked: boolean) => void;
	onStatChange: (statKey: StatKey, checked: boolean) => void;
}

export default function SetResultDetails({
	parsed,
	solved,
	owned,
	adjusted,
	onAbilityChange,
	onNatureChange,
	onItemChange,
	onMoveChange,
	onStatChange,
}: SetResultDetailsProps) {
	return (
		<>
			<Block>
				<InfoGrid>
					<InfoCard>
						<Key>Species</Key>
						<Value>{parsed.species || '-'}</Value>
					</InfoCard>
					<SelectableCostCard
						label="Item"
						title={parsed.item || '-'}
						checked={owned.item}
						onChange={onItemChange}
						cost={adjusted.itemCost}
						hidden={!parsed.item || (solved.itemCost ?? 0) === 0}
					/>
					<SelectableCostCard
						label="Ability"
						title={parsed.ability || '-'}
						checked={owned.ability}
						onChange={onAbilityChange}
						cost={adjusted.abilityCost}
						hidden={!parsed.ability}
					/>
					<SelectableCostCard
						label="Nature"
						title={parsed.nature || '-'}
						checked={owned.nature}
						onChange={onNatureChange}
						cost={adjusted.natureCost}
					/>
				</InfoGrid>
				{parsed.moves.length ? (
					<>
						<Key>Moves</Key>
						<Moves>
							{parsed.moves.map((move, index) => (
								<SelectableCostCard
									key={`${move}-${index}`}
									label={`Move ${index + 1}`}
									title={move}
									checked={Boolean(owned.moves[index])}
									onChange={(checked) => onMoveChange(index, checked)}
									cost={owned.moves[index] ? 0 : adjusted.moveUnitCost}
									noWrapTitle
								/>
							))}
						</Moves>
					</>
				) : null}
			</Block>

			<Block>
				<Key>Stat Costs</Key>
				<StatGrid>
					{statKeys.map((statKey) => (
						<SelectableCostCard
							key={statKey}
							label={`${statKey.toUpperCase()}: ${parsed.calcStats?.[statKey] ?? 0}`}
							checked={Boolean(owned.stats[statKey])}
							onChange={(checked) => onStatChange(statKey, checked)}
							cost={owned.stats[statKey] ? 0 : solved.statCosts?.[statKey] ?? 0}
							hidden={(solved.statCosts?.[statKey] ?? 0) === 0}
						>
							<StatValues>
								<StatMetric>
									<StatMetricLabel>SP</StatMetricLabel>
									<StatMetricValue>{solved.statSpCost?.[statKey] ?? 0}</StatMetricValue>
								</StatMetric>
								<StatMetric>
									<StatMetricLabel>VP</StatMetricLabel>
									<StatMetricValue>{solved.statCosts?.[statKey] ?? 0}</StatMetricValue>
								</StatMetric>
							</StatValues>
						</SelectableCostCard>
					))}
				</StatGrid>
			</Block>
		</>
	);
}
