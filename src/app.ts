import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { env } from 'process';
import mongoose from 'mongoose';
import Entity from './models/entity';
import Debtor from './models/debtor';
dotenv.config();

async function main() {
    const file = fs.readFileSync(env.IMPORT_FILE_NAME)

    const lines = file.toString().split('\n')

    let entities = {}, debtors = {}

    lines.forEach(line => {
        const entityId = line.substring(0, 5).trim()
        const clientIdentityCode = line.substring(13, 13 + 11).trim()
        const situation = line.substring(27, 27 + 2).trim()
        const totalDebt = parseFloat(line.substring(29, 29 + 12).trim().replace(',', '.'))

        entities[entityId] = {
            entityId,
            totalDebt: (entities[entityId] ? entities[entityId].totalDebt : 0) + totalDebt
        }

        debtors[clientIdentityCode] = {
            clientIdentityCode,
            situation: (debtors[clientIdentityCode] && debtors[clientIdentityCode].situation >= situation) ? debtors[clientIdentityCode].situation : situation,
            totalDebt: (debtors[clientIdentityCode] ? debtors[clientIdentityCode].totalDebt : 0) + totalDebt
        }
    });


    try {
        await mongoose.connect('mongodb://bank-challenge-db:27017/bank-challenge')
    } catch {
        throw new Error('Error connecting to database')
    }
    await Entity.insertMany(Object.values(entities))
    await Debtor.insertMany(Object.values(debtors))
}


main()