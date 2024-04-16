import Debtor from './../models/debtor';

export class DebtorRepository {
	public async createMany(debtors: DebtorsInput[]) {
		await Debtor.insertMany(Object.values(debtors));
	}
}

interface DebtorsInput {
	clientIdentityCode: string;
	situation: number;
	totalDebt: number;
}
