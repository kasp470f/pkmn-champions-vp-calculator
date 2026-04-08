import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
	display: grid;
	gap: 8px;
	padding: 0 2px;
`;

const Eyebrow = styled.div`
	font-size: 12px;
	font-weight: 800;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	color: var(--accent-strong);
`;

const Title = styled.h2`
	margin: 0;
	font-size: clamp(20px, 2.4vw, 28px);
	letter-spacing: -0.03em;
	color: var(--text);
`;

export default function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
	return (
		<Wrap>
			<Eyebrow>{eyebrow}</Eyebrow>
			<Title>{title}</Title>
		</Wrap>
	);
}
