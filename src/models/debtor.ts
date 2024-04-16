import mongoose, { Schema } from 'mongoose';

const debtorSchema = new Schema({
	clientIdentityCode: String,
	situation: Number,
	totalDebt: Number,
});

const Debtor = mongoose.model('Debtor', debtorSchema);

export default Debtor;
