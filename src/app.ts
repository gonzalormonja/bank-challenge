import { env } from 'node:process';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import ImportDebtorsService from './services/import-debtors.service';
import resetDatabase from './utils/reset-database';
dotenv.config();

async function main() {
	const importDebtorService = new ImportDebtorsService();
	await importDebtorService.importDebtors();

	console.error('End import debtors');
}

mongoose
	.connect(env.MONGODB_URI)
	.then(async () => {
		console.error('Database connected successfully');

		//this is only for testing purposes
		await resetDatabase();

		console.error('End truncate database');

		await main();
	})
	.catch((err) => {
		console.error('Error connecting to database:', err.message);
	});
