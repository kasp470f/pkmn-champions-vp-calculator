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
