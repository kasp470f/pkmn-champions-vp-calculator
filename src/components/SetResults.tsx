import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ParsedSet } from '../utils/parser';
import { SolvedVP } from '../utils/solver';
import { createOwnedState, getAdjustedCosts, OwnedState } from '../utils/resultOwnership';
import SetResultDetails from './SetResultDetails';
import TeamResultAccordionItem from './TeamResultAccordionItem';

const Panel = styled.div`
	padding: clamp(18px, 3vw, 28px);
	border-radius: var(--radius-xl);
	background: linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(244, 249, 255, 0.84));
	border: 1px solid var(--border);
	box-shadow: var(--shadow-md);
	text-align: left;
	display: grid;
	gap: 18px;
`;

const EmptyPanel = styled(Panel)`
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

const SummaryGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 12px;

	@media (max-width: 640px) {
		grid-template-columns: 1fr;
	}
`;

const SummaryCard = styled.div`
	padding: 18px 20px;
	border-radius: var(--radius-l);
	background: rgba(255, 255, 255, 0.8);
	border: 1px solid rgba(17, 32, 51, 0.08);
	display: grid;
	gap: 4px;
`;

const SummaryLabel = styled.div`
	font-size: 11px;
	font-weight: 800;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	color: var(--muted);
`;

const SummaryValue = styled.div`
	font-size: 30px;
	font-weight: 800;
	letter-spacing: -0.04em;
	color: var(--text);
`;

const SummaryHint = styled.div`
	font-size: 13px;
	color: var(--muted);
`;

const ResultsHeader = styled.div`
	display: grid;
	gap: 6px;
`;

const ResultsEyebrow = styled.div`
	font-size: 12px;
	font-weight: 800;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	color: var(--accent-strong);
`;

const ResultsTitle = styled.div`
	font-size: 22px;
	font-weight: 800;
	letter-spacing: -0.03em;
	color: var(--text);
`;

const ResultsText = styled.p`
	margin: 0;
	font-size: 14px;
	line-height: 1.6;
	color: var(--muted);
`;

interface SetResultsProps {
	parsedTeam: ParsedSet[] | null;
	solvedTeam: SolvedVP[] | null;
}

export default function SetResults({ parsedTeam, solvedTeam }: SetResultsProps) {
	const [ownedTeam, setOwnedTeam] = useState<OwnedState[]>([]);
	const [openIndexes, setOpenIndexes] = useState<number[]>([]);

	useEffect(() => {
		if (!parsedTeam?.length || !solvedTeam?.length) {
			setOwnedTeam([]);
			setOpenIndexes([]);
			return;
		}

		setOwnedTeam(parsedTeam.map(() => createOwnedState()));
	}, [parsedTeam, solvedTeam]);

	if (!parsedTeam?.length || !solvedTeam?.length) {
		return (
			<EmptyPanel>
				<EmptyEyebrow>Waiting</EmptyEyebrow>
				<EmptyTitle>No parsed team yet</EmptyTitle>
				<EmptyText>
					Paste a Showdown set or full team export to review each Pokemon and the combined VP total.
				</EmptyText>
			</EmptyPanel>
		);
	}

	const team = parsedTeam;

	const members = team.map((parsed, index) => {
		const solved = solvedTeam[index];
		const owned = ownedTeam[index] ?? createOwnedState();
		const adjusted = getAdjustedCosts(parsed, solved, owned);

		return { adjusted, owned, parsed, solved };
	});

	const currentTeamTotal = members.reduce((sum, member) => sum + member.adjusted.totalCost, 0);
	const rawTeamTotal = members.reduce((sum, member) => sum + member.adjusted.rawTotalCost, 0);

	function updateOwned(index: number, updater: (current: OwnedState) => OwnedState) {
		setOwnedTeam((current) =>
			team.map((_, memberIndex) => {
				const existing = current[memberIndex] ?? createOwnedState();
				return memberIndex === index ? updater(existing) : existing;
			})
		);
	}

	function toggleOpen(index: number) {
		setOpenIndexes((current) =>
			current.includes(index) ? current.filter((value) => value !== index) : [...current, index]
		);
	}

	return (
		<Panel>
			<ResultsHeader>
				<ResultsEyebrow>Team Results</ResultsEyebrow>
				<ResultsTitle>
					{team.length === 1 ? '1 parsed Pokemon' : `${team.length} parsed Pokemon`}
				</ResultsTitle>
				<ResultsText>
					Each section keeps the same item, ability, nature, move, and stat breakdown while the team
					summary updates live.
				</ResultsText>
			</ResultsHeader>

			<SummaryGrid>
				<SummaryCard>
					<SummaryLabel>Current Team Total</SummaryLabel>
					<SummaryValue>{currentTeamTotal}</SummaryValue>
					<SummaryHint>Reflects the ownership toggles inside each Pokemon section.</SummaryHint>
				</SummaryCard>
				<SummaryCard>
					<SummaryLabel>Full Team Total</SummaryLabel>
					<SummaryValue>{rawTeamTotal}</SummaryValue>
					<SummaryHint>Baseline cost before marking any parts as already owned.</SummaryHint>
				</SummaryCard>
			</SummaryGrid>

			{members.map((member, index) => (
				<TeamResultAccordionItem
					key={`${member.parsed.species || 'pokemon'}-${index}`}
					index={index}
					species={member.parsed.species || 'Unknown Pokemon'}
					currentTotal={member.adjusted.totalCost}
					rawTotal={member.adjusted.rawTotalCost}
					isOpen={openIndexes.includes(index)}
					onToggle={() => toggleOpen(index)}
				>
					<SetResultDetails
						parsed={member.parsed}
						solved={member.solved}
						owned={member.owned}
						adjusted={member.adjusted}
						onAbilityChange={(checked) => {
							updateOwned(index, (current) => ({ ...current, ability: checked }));
						}}
						onNatureChange={(checked) => {
							updateOwned(index, (current) => ({ ...current, nature: checked }));
						}}
						onItemChange={(checked) => {
							updateOwned(index, (current) => ({ ...current, item: checked }));
						}}
						onMoveChange={(moveIndex, checked) => {
							updateOwned(index, (current) => ({
								...current,
								moves: { ...current.moves, [moveIndex]: checked },
							}));
						}}
						onStatChange={(statKey, checked) => {
							updateOwned(index, (current) => ({
								...current,
								stats: { ...current.stats, [statKey]: checked },
							}));
						}}
					/>
				</TeamResultAccordionItem>
			))}
		</Panel>
	);
}
