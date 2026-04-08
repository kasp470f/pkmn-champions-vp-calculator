import React, { useState } from 'react';
import SetInput from './components/SetInput';
import SetResults from './components/SetResults';
import { PageShell, TwoColumnLayout } from './components/PageShell';
import { ParsedSet } from './utils/parser';
import { solveForVP, SolvedVP } from './utils/solver';

export default function App() {
	const [setText, setSetText] = useState<string>('');
	const [parsed, setParsed] = useState<any>(null);
	const [solved, setSolved] = useState<SolvedVP | null>(null);

	function handleParse(nextParsed: ParsedSet | null) {
		setParsed(nextParsed);

		if (!nextParsed) {
			setSolved(null);
			return;
		}

		try {
			setSolved(solveForVP(nextParsed));
		} catch (err) {
			setSolved(null);
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
						<SetResults parsed={parsed} solved={solved} />
					</>
				}
			/>
		</PageShell>
	);
}
