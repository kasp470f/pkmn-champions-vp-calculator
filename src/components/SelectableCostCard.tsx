import React from 'react';
import styled, { css } from 'styled-components';

const Card = styled.div<{ $checked: boolean }>`
	padding: 14px 16px;
	border-radius: var(--border-radius-m);
	background: rgba(255, 255, 255, 0.76);
	border: 1px solid rgba(17, 32, 51, 0.08);
	display: grid;
	gap: 6px;
	transition: border-color 120ms ease, background-color 120ms ease, opacity 120ms ease;

	${({ $checked }) =>
		$checked
			? css`
					background: rgba(220, 236, 255, 0.5);
					border-color: rgba(25, 118, 210, 0.22);
			  `
			: ''}
`;

const Header = styled.div`
	display: flex;
	align-items: start;
	justify-content: space-between;
	gap: 12px;
`;

const HeaderRight = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 8px;
	flex: 0 0 auto;
`;

const Label = styled.div`
	font-size: 11px;
	font-weight: 800;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	color: var(--muted);
`;

const CheckboxLabel = styled.label<{ $hidden: boolean }>`
	position: relative;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 20px;
	height: 20px;
	flex: 0 0 auto;
	cursor: pointer;
	pointer-events: ${({ $hidden: hidden }) => (hidden ? 'none' : 'auto')};
`;

const Checkbox = styled.input`
	position: absolute;
	inset: 0;
	opacity: 0;
	margin: 0;
	cursor: inherit;
`;

const CheckboxVisual = styled.span<{ $checked: boolean; $hidden: boolean }>`
	width: 20px;
	height: 20px;
	border-radius: var(--border-radius-xs);
	border: 1px solid ${({ $checked }) => ($checked ? 'var(--accent)' : 'rgba(17, 32, 51, 0.18)')};
	background: ${({ $checked }) =>
		$checked ? 'rgba(25, 118, 210, 0.12)' : 'rgba(255, 255, 255, 0.96)'};
	transition: border-color 120ms ease, background-color 120ms ease, opacity 120ms ease;
	position: relative;
	display: ${({ $hidden }) => ($hidden ? 'none' : 'block')};

	&::after {
		content: '';
		position: absolute;
		left: 6px;
		top: 2px;
		width: 5px;
		height: 10px;
		border-right: 2px solid ${({ $checked }) => ($checked ? 'var(--accent-strong)' : 'transparent')};
		border-bottom: 2px solid
			${({ $checked }) => ($checked ? 'var(--accent-strong)' : 'transparent')};
		transform: rotate(45deg);
	}

	${CheckboxLabel}:hover & {
		border-color: rgba(25, 118, 210, 0.3);
	}
`;

const CostInline = styled.div`
	font-size: 10px;
	font-weight: 800;
	letter-spacing: 0.04em;
	text-transform: uppercase;
	color: var(--muted);
	white-space: nowrap;
`;

const Title = styled.div<{ $noWrap?: boolean }>`
	color: var(--text);
	font-size: 14px;
	font-weight: 700;
	line-height: 1.4;

	${({ $noWrap }) =>
		$noWrap
			? css`
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
			  `
			: ''}
`;

const Body = styled.div`
	display: grid;
	gap: 8px;
`;

interface SelectableCostCardProps {
	label: string;
	title?: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
	cost: number;
	children?: React.ReactNode;
	noWrapTitle?: boolean;
	hidden?: boolean;
}

export default function SelectableCostCard({
	label,
	title,
	checked,
	onChange,
	cost,
	children,
	noWrapTitle = false,
	hidden = false,
}: SelectableCostCardProps) {
	return (
		<Card $checked={checked}>
			<Header>
				<Label>{label}</Label>
				<HeaderRight>
					<CostInline>{cost} VP</CostInline>
					<CheckboxLabel $hidden={hidden}>
						<Checkbox
							type="checkbox"
							checked={checked}
							onChange={(event) => onChange(event.target.checked)}
							$hidden={hidden}
							aria-label={`${label} already owned`}
						/>
						<CheckboxVisual $checked={checked} $hidden={hidden} />
					</CheckboxLabel>
				</HeaderRight>
			</Header>
			<Body>
				{title ? <Title $noWrap={noWrapTitle}>{title}</Title> : null}
				{children}
			</Body>
		</Card>
	);
}
