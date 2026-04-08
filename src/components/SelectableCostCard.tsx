import React from 'react';
import styled, { css } from 'styled-components';

const Card = styled.div<{ $checked: boolean }>`
	padding: 14px 16px;
	border-radius: var(--radius-md);
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

const CheckboxLabel = styled.label<{ $disabled: boolean }>`
	position: relative;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 20px;
	height: 20px;
	flex: 0 0 auto;
	cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
`;

const Checkbox = styled.input`
	position: absolute;
	inset: 0;
	opacity: 0;
	margin: 0;
	cursor: inherit;
`;

const CheckboxVisual = styled.span<{ $checked: boolean; $disabled: boolean }>`
	width: 20px;
	height: 20px;
	border-radius: 6px;
	border: 1px solid ${({ $checked }) => ($checked ? 'var(--accent)' : 'rgba(17, 32, 51, 0.18)')};
	background: ${({ $checked }) =>
		$checked ? 'rgba(25, 118, 210, 0.12)' : 'rgba(255, 255, 255, 0.96)'};
	transition: border-color 120ms ease, background-color 120ms ease, opacity 120ms ease;
	opacity: ${({ $disabled }) => ($disabled ? 0.55 : 1)};
	position: relative;

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

	${Checkbox}:focus-visible + & {
		outline: 2px solid rgba(25, 118, 210, 0.22);
		outline-offset: 2px;
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

export default function SelectableCostCard({
	label,
	title,
	checked,
	onChange,
	cost,
	children,
	noWrapTitle = false,
	disabled = false,
}: {
	label: string;
	title?: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
	cost: number;
	children?: React.ReactNode;
	noWrapTitle?: boolean;
	disabled?: boolean;
}) {
	return (
		<Card $checked={checked}>
			<Header>
				<Label>{label}</Label>
				<HeaderRight>
					<CostInline>{cost} VP</CostInline>
					<CheckboxLabel $disabled={disabled}>
						<Checkbox
							type="checkbox"
							checked={checked}
							onChange={(event) => onChange(event.target.checked)}
							disabled={disabled}
							aria-label={`${label} already owned`}
						/>
						<CheckboxVisual $checked={checked} $disabled={disabled} />
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
