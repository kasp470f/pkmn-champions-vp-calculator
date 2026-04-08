import React from 'react';
import styled from 'styled-components';

const AppFrame = styled.main`
	width: 100%;
	min-height: 100vh;
	padding: clamp(16px, 3vw, 28px);
`;

const Shell = styled.div`
	max-width: 1160px;
	width: 100%;
	margin: 0 auto;
	display: grid;
	gap: 18px;
`;

const Masthead = styled.header`
	padding: 6px 0 2px;
`;

const BrandRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 12px;
`;

const Heading = styled.div`
	text-align: center;
`;

const Title = styled.h1`
	margin: 0;
	font-size: clamp(22px, 3vw, 34px);
	line-height: 1.15;
	letter-spacing: -0.03em;
	color: var(--text);
`;

const Subtitle = styled.p`
	margin: 6px 0 0;
	max-width: 38ch;
	font-size: 14px;
	line-height: 1.5;
	color: var(--muted);
	margin-left: auto;
	margin-right: auto;
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
