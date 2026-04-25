import React from 'react';
import styled, { css } from 'styled-components';

type AppButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	primary?: boolean;
};

const primaryStyles = css`
	background: var(--accent-soft);
	color: var(--accent-strong);
	border: 1px solid rgba(25, 118, 210, 0.2);

	&:hover {
		background: rgba(25, 118, 210, 0.14);
		border-color: rgba(25, 118, 210, 0.28);
	}
`;

const secondaryStyles = css`
	background: rgba(255, 255, 255, 0.7);
	color: var(--text);
	border: 1px solid var(--border-strong);

	&:hover {
		background: rgba(255, 255, 255, 0.23);
		border-color: rgba(38, 60, 82, 0.32);
	}
`;

const ButtonRoot = styled.button<{ $primary: boolean }>`
	padding: 12px 18px;
	border-radius: var(--border-radius-s);
	cursor: pointer;
	font-size: 14px;
	font-weight: 700;
	transition: background-color 120ms ease, border-color 120ms ease, color 120ms ease,
		box-shadow 120ms ease;
	outline: none;

	&:focus-visible {
		outline: none;
	}

	${({ $primary }) => ($primary ? primaryStyles : secondaryStyles)}
`;

export default function AppButton({ primary = false, ...props }: AppButtonProps) {
	return <ButtonRoot $primary={primary} {...props} />;
}
