import * as fs from 'node:fs';
import { env } from 'node:process';
import { processLine } from '../utils/process-debtor-line';
import { DebtorRepository } from './../repositories/debtor.repository';
import { EntityRepository } from './../repositories/entity.repository';

export default class ImportDebtorsService {
	private debtorRepository: DebtorRepository;
	private entityRepository: EntityRepository;

	constructor() {
		this.debtorRepository = new DebtorRepository();
		this.entityRepository = new EntityRepository();
	}

	private getFileContent(): string[] {
		const file = fs.readFileSync(env.IMPORT_FILE_NAME);

		const lines = file.toString().split('\n');

		return lines;
	}

	public async importDebtors() {
		const lines = this.getFileContent();

		const entities = {};
		const debtors = {};

		for (const line of lines) {
			const { entityId, clientIdentityCode, situation, totalDebt } =
				processLine(line);

			const entityPrevTotalDebt = entities[entityId]
				? entities[entityId].totalDebt
				: 0;
			entities[entityId] = {
				entityId,
				totalDebt: entityPrevTotalDebt + totalDebt,
			};

			const debtorPrevTotalDebt = debtors[clientIdentityCode]
				? debtors[clientIdentityCode].totalDebt
				: 0;
			const debtorPrevSituation = debtors[clientIdentityCode] ? situation : 0;
			debtors[clientIdentityCode] = {
				clientIdentityCode,
				situation:
					debtorPrevSituation > situation ? debtorPrevSituation : situation,
				totalDebt: debtorPrevTotalDebt + totalDebt,
			};
		}

		await this.entityRepository.createMany(Object.values(entities));
		await this.debtorRepository.createMany(Object.values(debtors));
	}
}
