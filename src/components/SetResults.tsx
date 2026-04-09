import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ParsedSet } from '../utils/parser';
import { SolvedVP } from '../utils/solver';
import { statKeys, StatKey } from '../data/statKey';
import SelectableCostCard from './SelectableCostCard';

const Panel = styled.div`
	padding: clamp(18px, 3vw, 28px);
	border-radius: var(--radius-xl);
	background: linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(244, 249, 255, 0.84));
	border: 1px solid var(--border);
	box-shadow: var(--shadow-md);
	text-align: left;
`;

const EmptyPanel = styled(Panel)`
	display: grid;
	gap: 8px;
	min-height: 220px;
	align-content: center;
`;

const EmptyEyebrow = styled.div`
	font-size: 12px;
	font-weight: 800;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	color: var(--accent-strong);
`;

const EmptyTitle = styled.div`
	font-size: 22px;
	font-weight: 800;
	letter-spacing: -0.03em;
	color: var(--text);
`;

const EmptyText = styled.p`
	margin: 0;
	font-size: 14px;
	line-height: 1.6;
	color: var(--muted);
`;

const Block = styled.section`
	display: grid;
	gap: 14px;

	& + & {
		margin-top: 18px;
		padding-top: 18px;
		border-top: 1px solid rgba(17, 32, 51, 0.08);
	}
`;

const BlockTitle = styled.div`
	font-size: 12px;
	font-weight: 800;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	color: var(--accent-strong);
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
	border-radius: var(--radius-md);
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

const SummaryGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 12px;

	@media (max-width: 640px) {
		grid-template-columns: 1fr;
	}
`;

const SummaryCard = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
	padding: 16px 18px;
	border-radius: var(--radius-md);
	background: rgba(255, 255, 255, 0.82);
	border: 1px solid rgba(17, 32, 51, 0.08);
`;

const SummaryLabel = styled.div`
	font-size: 11px;
	font-weight: 800;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	color: var(--muted);
`;

const SummaryValue = styled.div`
	font-size: 28px;
	font-weight: 800;
	letter-spacing: -0.04em;
	color: var(--text);
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
	padding: 6px 12px;
	border-radius: 12px;
	background: var(--surface-alt);
`;

const StatMetricLabel = styled.div`
	font-size: 10px;
	font-weight: 800;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	color: var(--muted);
	margin-bottom: 4px;
`;

const StatMetricValue = styled.div`
	font-size: 18px;
	font-weight: 800;
	color: var(--text);
`;

export default function SetResults({
	parsed,
	solved,
}: {
	parsed: ParsedSet | null;
	solved: SolvedVP | null;
}) {
	const [ownedAbility, setOwnedAbility] = useState(false);
	const [ownedNature, setOwnedNature] = useState(false);
	const [ownedItem, setOwnedItem] = useState(false);
	const [ownedMoves, setOwnedMoves] = useState<Record<number, boolean>>({});
	const [ownedStats, setOwnedStats] = useState<Partial<Record<StatKey, boolean>>>({});

	useEffect(() => {
		setOwnedAbility(false);
		setOwnedNature(false);
		setOwnedItem(false);
		setOwnedMoves({});
		setOwnedStats({});
	}, [parsed, solved]);

	if (!parsed) {
		return (
			<EmptyPanel>
				<EmptyEyebrow>Waiting</EmptyEyebrow>
				<EmptyTitle>No parsed set yet</EmptyTitle>
				<EmptyText>
					Paste a Showdown export and parse it to see the set details and VP cost.
				</EmptyText>
			</EmptyPanel>
		);
	}

	const moveUnitCost = solved && parsed.moves.length ? solved.moveCost / parsed.moves.length : 0;
	const adjustedAbilityCost = solved ? (ownedAbility ? 0 : solved.abilityCost) : 0;
	const adjustedNatureCost = solved ? (ownedNature ? 0 : solved.natureCost) : 0;
	const adjustedItemCost = solved ? (ownedItem ? 0 : solved.itemCost || 0) : 0;
	const adjustedMoveCost = solved
		? parsed.moves.reduce(
				(total, _move, index) => total + (ownedMoves[index] ? 0 : moveUnitCost),
				0
		  )
		: 0;
	const adjustedStatCost = solved
		? statKeys.reduce(
				(total, statKey) => total + (ownedStats[statKey] ? 0 : solved.statCosts?.[statKey] || 0),
				0
		  )
		: 0;
	const adjustedTotal =
		adjustedMoveCost +
		adjustedNatureCost +
		adjustedAbilityCost +
		adjustedItemCost +
		adjustedStatCost;

	return (
		<Panel>
			<Block>
				<BlockTitle>Parsed Set</BlockTitle>
				<InfoGrid>
					<InfoCard>
						<Key>Species</Key>
						<Value>{parsed.species || '-'}</Value>
					</InfoCard>
					{solved ? (
						<SelectableCostCard
							label="Item"
							title={parsed.item || '-'}
							checked={ownedItem}
							onChange={setOwnedItem}
							cost={adjustedItemCost}
							disabled={!parsed.item || (solved.itemCost ?? 0) === 0}
						/>
					) : (
						<InfoCard>
							<Key>Item</Key>
							<Value>{parsed.item || '-'}</Value>
						</InfoCard>
					)}
					{solved ? (
						<SelectableCostCard
							label="Ability"
							title={parsed.ability || '-'}
							checked={ownedAbility}
							onChange={setOwnedAbility}
							cost={adjustedAbilityCost}
							disabled={!parsed.ability}
						/>
					) : (
						<InfoCard>
							<Key>Ability</Key>
							<Value>{parsed.ability || '-'}</Value>
						</InfoCard>
					)}
					{solved ? (
						<SelectableCostCard
							label="Nature"
							title={parsed.nature || '-'}
							checked={ownedNature}
							onChange={setOwnedNature}
							cost={adjustedNatureCost}
						/>
					) : (
						<InfoCard>
							<Key>Nature</Key>
							<Value>{parsed.nature || '-'}</Value>
						</InfoCard>
					)}
				</InfoGrid>
				{parsed.moves?.length ? (
					<>
						<Key>Moves</Key>
						<Moves>
							{parsed.moves?.length ? (
								parsed.moves.map((move, index) =>
									solved ? (
										<SelectableCostCard
											key={`${move}-${index}`}
											label={`Move ${index + 1}`}
											title={move}
											checked={Boolean(ownedMoves[index])}
											onChange={(checked) => {
												setOwnedMoves((current) => ({ ...current, [index]: checked }));
											}}
											cost={ownedMoves[index] ? 0 : moveUnitCost}
											noWrapTitle
										/>
									) : (
										<InfoCard key={`${move}-${index}`}>
											<Key>{`Move ${index + 1}`}</Key>
											<Value>{move}</Value>
										</InfoCard>
									)
								)
							) : (
								<Value>-</Value>
							)}
						</Moves>
					</>
				) : null}
			</Block>

			{solved ? (
				<Block>
					<BlockTitle>VP Results</BlockTitle>
					<SummaryGrid>
						<SummaryCard style={{ gridColumn: 'span 2', textAlign: 'center' }}>
							<SummaryLabel>Total VP</SummaryLabel>
							<SummaryValue>{adjustedTotal}</SummaryValue>
						</SummaryCard>
					</SummaryGrid>
					<div>
						<Key>Stat Costs</Key>
						<StatGrid>
							{statKeys.map((k: StatKey) => (
								<SelectableCostCard
									key={k}
									label={`${k.toUpperCase()}: ${parsed.calcStats?.[k] ?? 0}`}
									checked={Boolean(ownedStats[k])}
									onChange={(checked) => {
										setOwnedStats((current) => ({ ...current, [k]: checked }));
									}}
									cost={ownedStats[k] ? 0 : solved.statCosts?.[k] ?? 0}
									disabled={(solved.statCosts?.[k] ?? 0) === 0}
								>
									<StatValues>
										<StatMetric>
											<StatMetricLabel>SP</StatMetricLabel>
											<StatMetricValue>{solved.statSpCost?.[k] ?? 0}</StatMetricValue>
										</StatMetric>
										<StatMetric>
											<StatMetricLabel>VP</StatMetricLabel>
											<StatMetricValue>{solved.statCosts?.[k] ?? 0}</StatMetricValue>
										</StatMetric>
									</StatValues>
								</SelectableCostCard>
							))}
						</StatGrid>
					</div>
				</Block>
			) : null}
		</Panel>
	);
}
