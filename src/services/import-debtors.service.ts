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

			entities[entityId] = {
				entityId,
				totalDebt:
					(entities[entityId] ? entities[entityId].totalDebt : 0) + totalDebt,
			};

			debtors[clientIdentityCode] = {
				clientIdentityCode,
				situation:
					debtors[clientIdentityCode] &&
					debtors[clientIdentityCode].situation >= situation
						? debtors[clientIdentityCode].situation
						: situation,
				totalDebt:
					(debtors[clientIdentityCode]
						? debtors[clientIdentityCode].totalDebt
						: 0) + totalDebt,
			};
		}

		await this.entityRepository.createMany(Object.values(entities));
		await this.debtorRepository.createMany(Object.values(debtors));
	}
}
