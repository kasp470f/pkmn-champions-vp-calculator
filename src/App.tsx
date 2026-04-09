import React, { useState } from 'react';
import SetInput from './components/SetInput';
import SetResults from './components/SetResults';
import { PageShell, TwoColumnLayout } from './components/PageShell';
import { ParsedSet } from './utils/parser';
import { solveForVP, SolvedVP } from './utils/solver';

export default function App() {
	const [setText, setSetText] = useState<string>('');
	const [parsedTeam, setParsedTeam] = useState<ParsedSet[] | null>(null);
	const [solvedTeam, setSolvedTeam] = useState<SolvedVP[] | null>(null);

	function handleParse(nextParsedTeam: ParsedSet[] | null) {
		setParsedTeam(nextParsedTeam);

		if (!nextParsedTeam?.length) {
			setSolvedTeam(null);
			return;
		}

		try {
			setSolvedTeam(nextParsedTeam.map((parsedSet) => solveForVP(parsedSet)));
		} catch (err) {
			setSolvedTeam(null);
			alert((err as Error).message || 'Failed to solve');
		}
	}

	return (
		<PageShell>
			<TwoColumnLayout
				primary={
					<>
						<SetInput value={setText} onChange={setSetText} onParse={handleParse} />
					</>
				}
				secondary={
					<>
						<SetResults parsedTeam={parsedTeam} solvedTeam={solvedTeam} />
					</>
				}
			/>
		</PageShell>
	);
}
