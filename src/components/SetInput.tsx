import React from 'react';
import styled from 'styled-components';
import AppButton from './AppButton';
import { parseShowdownTeam } from '../utils/parser';
import { ParsedSet } from '../utils/parser';

const Panel = styled.section`
	padding: clamp(18px, 3vw, 28px);
	border-radius: var(--border-radius-xl);
	background: linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(248, 251, 255, 0.82));
	border: 1px solid var(--border);
	box-shadow: var(--shadow-md);
`;

const Header = styled.div`
	display: grid;
	gap: 6px;
`;

const Title = styled.label`
	display: block;
	font-size: 14px;
	font-weight: 800;
	letter-spacing: 0.04em;
	text-transform: uppercase;
	color: var(--accent-strong);
`;

const Hint = styled.p`
	margin: 0;
	font-size: 14px;
	color: var(--muted);
`;

const Text = styled.textarea`
	width: 100%;
	min-height: 280px;
	margin-top: 16px;
	padding: 16px 18px;
	border-radius: var(--border-radius-l);
	border: 1px solid var(--border-strong);
	background: rgba(255, 255, 255, 0.9);
	color: var(--text);
	font-size: 14px;
	line-height: 1.55;
	font-family: monospace;
	resize: vertical;
	box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8);

	&:focus {
		outline: none;
		border-color: rgba(25, 118, 210, 0.56);
		box-shadow: 0 0 0 4px rgba(25, 118, 210, 0.12);
	}

	&::placeholder {
		color: #7a8694;
	}

	@media (max-width: 640px) {
		min-height: 240px;
		padding: 14px;
	}
`;

const Row = styled.div`
	display: flex;
	gap: 10px;
	margin-top: 14px;
	justify-content: flex-start;
	flex-wrap: wrap;
`;

const Footer = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 12px;
	align-items: center;
	margin-top: 12px;

	@media (max-width: 640px) {
		flex-direction: column;
		align-items: stretch;
	}
`;

const Footnote = styled.div`
	font-size: 13px;
	color: var(--muted);
`;

export default function SetInput({
	value,
	onChange,
	onParse,
}: {
	value: string;
	onChange: (v: string) => void;
	onParse: (p: ParsedSet[] | null) => void;
}) {
	return (
		<Panel>
			<Header>
				<Title htmlFor="set-input">Showdown export</Title>
				<Hint>Paste a Showdown set or full team export below.</Hint>
			</Header>
			<Text
				id="set-input"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={`Pikachu @ Light Ball\nAbility: Static\nTera Type: Electric\nEVs: 252 Atk / 4 SpD / 252 Spe\nJolly Nature\n- Volt Tackle\n- Fake Out\n- Knock Off\n- Protect`}
			/>
			<Footer>
				<Footnote>
					{value.trim() ? 'Ready to parse team data' : 'No Showdown export pasted yet'}
				</Footnote>
				<Row>
					<AppButton primary onClick={() => onParse(parseShowdownTeam(value))}>
						Parse
					</AppButton>
					<AppButton
						onClick={() => {
							onChange('');
							onParse(null);
						}}
					>
						Clear
					</AppButton>
				</Row>
			</Footer>
		</Panel>
	);
}
