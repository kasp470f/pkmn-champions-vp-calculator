import React from 'react';
import styled from 'styled-components';
import githubMark from '../assets/github-icon.svg';

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

const Footer = styled.footer`
	display: flex;
	justify-content: center;
	padding: 4px 0 12px;
	color: var(--muted);
	font-size: 13px;
`;

const FooterLink = styled.a`
	display: inline-flex;
	align-items: center;
	gap: 8px;
	color: var(--muted);
	font-weight: 600;
	text-decoration: none;

	&:hover {
		color: var(--text);
	}
`;

const GithubIcon = styled.img`
	width: 16px;
	height: 16px;
	flex: 0 0 auto;
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
`;

export function PageShell({ children }: { children: React.ReactNode }) {
	return (
		<AppFrame>
			<Shell>
				{children}
				<Footer>
					<FooterLink
						href="https://github.com/kasp470f/pkmn-champions-vp-calculator"
						target="_blank"
						rel="noreferrer"
					>
						<GithubIcon src={githubMark} alt="" aria-hidden="true" />
						<span>Source code</span>
					</FooterLink>
				</Footer>
			</Shell>
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
