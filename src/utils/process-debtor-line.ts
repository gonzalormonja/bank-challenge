export function processLine(line: string): {
	entityId: string;
	clientIdentityCode: string;
	situation: string;
	totalDebt: number;
} {
	const entityId = line.substring(0, 5).trim();
	const clientIdentityCode = line.substring(13, 13 + 11).trim();
	const situation = line.substring(27, 27 + 2).trim();
	const totalDebt = Number.parseFloat(
		line
			.substring(29, 29 + 12)
			.trim()
			.replace(',', '.'),
	);

	if (!entityId) {
		throw new Error('entityId cannot be empty');
	}

	if (!clientIdentityCode) {
		throw new Error('clientIdentityCode cannot be empty');
	}

	if (!situation) {
		throw new Error('situation cannot be empty');
	}

	if (Number.isNaN(totalDebt)) {
		throw new Error('totalDebt cannot be empty');
	}

	return { entityId, clientIdentityCode, situation, totalDebt };
}
