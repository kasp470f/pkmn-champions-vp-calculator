import React from 'react';
import styled from 'styled-components';

const AppFrame = styled.main`
	width: 100%;
	min-height: 100vh;
	padding: clamp(18px, 4vw, 42px);
`;

const Shell = styled.div`
	max-width: 1160px;
	width: 100%;
	margin: 0 auto;
	display: grid;
	gap: clamp(18px, 3vw, 28px);
`;

const Masthead = styled.header`
	position: relative;
	overflow: hidden;
	display: grid;
	gap: 14px;
	padding: clamp(22px, 4vw, 34px);
	border-radius: var(--radius-xl);
	background: linear-gradient(160deg, rgba(255, 255, 255, 0.88), rgba(244, 250, 255, 0.82));
	border: 1px solid rgba(255, 255, 255, 0.72);
	box-shadow: var(--shadow-lg);
	backdrop-filter: blur(16px);

	&::after {
		content: '';
		position: absolute;
		inset: auto -4% -34% auto;
		width: 220px;
		height: 220px;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(25, 118, 210, 0.18), transparent 68%);
		pointer-events: none;
	}
`;

const BrandRow = styled.div`
	display: flex;
	align-items: flex-start;
	gap: 16px;
	position: relative;
	z-index: 1;

	@media (max-width: 640px) {
		gap: 12px;
	}
`;

const BrandMark = styled.div`
	width: 56px;
	height: 56px;
	flex: 0 0 auto;
	border-radius: 18px;
	background: linear-gradient(160deg, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.35)),
		linear-gradient(180deg, var(--accent), #1f9d73);
	box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.72), 0 16px 26px rgba(25, 118, 210, 0.2);
	position: relative;

	&::before,
	&::after {
		content: '';
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		background: rgba(255, 255, 255, 0.9);
	}

	&::before {
		top: 11px;
		width: 30px;
		height: 30px;
		border-radius: 50%;
	}

	&::after {
		top: 26px;
		width: 34px;
		height: 4px;
		border-radius: 999px;
	}
`;

const Heading = styled.div`
	position: relative;
	z-index: 1;
`;

const Title = styled.h1`
	margin: 0;
	font-size: clamp(28px, 4vw, 44px);
	line-height: 1.02;
	letter-spacing: -0.04em;
	color: var(--text);
`;

const Subtitle = styled.p`
	margin: 10px 0 0;
	max-width: 38ch;
	font-size: clamp(14px, 1.8vw, 17px);
	line-height: 1.6;
	color: var(--muted);
`;

const Layout = styled.section`
	display: grid;
	grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
	gap: clamp(16px, 2.4vw, 24px);
	align-items: start;

	@media (max-width: 1100px) {
		grid-template-columns: 1fr;
	}
`;

const PrimaryColumn = styled.section`
	display: grid;
	gap: 14px;
`;

const SecondaryColumn = styled.aside`
	display: grid;
	gap: 14px;
	align-content: start;

	@media (min-width: 1101px) {
		position: sticky;
		top: 22px;
	}
`;

export function PageShell({ children }: { children: React.ReactNode }) {
	return (
		<AppFrame>
			<Shell>{children}</Shell>
		</AppFrame>
	);
}

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
	return (
		<Masthead>
			<BrandRow>
				<BrandMark />
				<Heading>
					<Title>{title}</Title>
					{subtitle ? <Subtitle>{subtitle}</Subtitle> : null}
				</Heading>
			</BrandRow>
		</Masthead>
	);
}

export function TwoColumnLayout({
	primary,
	secondary,
}: {
	primary: React.ReactNode;
	secondary: React.ReactNode;
}) {
	return (
		<Layout>
			<PrimaryColumn>{primary}</PrimaryColumn>
			<SecondaryColumn>{secondary}</SecondaryColumn>
		</Layout>
	);
}
