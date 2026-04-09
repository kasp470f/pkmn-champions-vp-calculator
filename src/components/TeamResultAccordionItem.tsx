import React from 'react';
import styled from 'styled-components';

const Item = styled.section`
	border: 1px solid rgba(17, 32, 51, 0.08);
	border-radius: var(--radius-lg);
	background: rgba(255, 255, 255, 0.66);
	overflow: hidden;
`;

const HeaderButton = styled.button`
	width: 100%;
	border: 0;
	padding: 16px 18px;
	background: transparent;
	color: inherit;
	display: grid;
	grid-template-columns: minmax(0, 1fr) auto;
	gap: 14px;
	align-items: center;
	text-align: left;
	cursor: pointer;

	&:hover {
		background: rgba(25, 118, 210, 0.04);
	}

	@media (max-width: 640px) {
		grid-template-columns: 1fr;
	}
`;

const Heading = styled.div`
	display: grid;
	gap: 4px;
`;

const Eyebrow = styled.div`
	font-size: 11px;
	font-weight: 800;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	color: var(--accent-strong);
`;

const Title = styled.div`
	font-size: 18px;
	font-weight: 800;
	margin-bottom: 2px;
	letter-spacing: 0.03em;
	color: var(--text);
`;

const Meta = styled.div`
	font-size: 13px;
	color: var(--muted);
`;

const Totals = styled.div`
	display: grid;
	justify-items: end;
	gap: 4px;

	@media (max-width: 640px) {
		justify-items: start;
	}
`;

const TotalLabel = styled.div`
	font-size: 11px;
	font-weight: 800;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	color: var(--muted);
`;

const TotalValue = styled.div`
	font-size: 24px;
	font-weight: 800;
	letter-spacing: -0.04em;
	color: var(--text);
`;

const TotalMeta = styled.div`
	font-size: 13px;
	color: var(--muted);
`;

const Body = styled.div`
	padding: 18px;
	border-top: 1px solid rgba(17, 32, 51, 0.08);
	background: rgba(248, 251, 255, 0.46);
	display: grid;
	gap: 18px;
`;

interface TeamResultAccordionItemProps {
	children: React.ReactNode;
	currentTotal: number;
	index: number;
	isOpen: boolean;
	onToggle: () => void;
	rawTotal: number;
	species: string;
}

export default function TeamResultAccordionItem({
	children,
	currentTotal,
	index,
	isOpen,
	onToggle,
	rawTotal,
	species,
}: TeamResultAccordionItemProps) {
	return (
		<Item>
			<HeaderButton type="button" onClick={onToggle} aria-expanded={isOpen}>
				<Heading>
					<Eyebrow>{`Pokemon ${index + 1}`}</Eyebrow>
					<Title>{species}</Title>
					<Meta>{isOpen ? 'Hide detailed VP breakdown' : 'Show detailed VP breakdown'}</Meta>
				</Heading>
				<Totals>
					<TotalLabel>Current VP</TotalLabel>
					<TotalValue>{currentTotal}</TotalValue>
					<TotalMeta>{`Total ${rawTotal} VP`}</TotalMeta>
				</Totals>
			</HeaderButton>
			{isOpen ? <Body>{children}</Body> : null}
		</Item>
	);
}
