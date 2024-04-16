import mongoose, { Schema } from "mongoose";

const debtorSchema = new Schema({
    clientIdentityCode: String,
    situation: String,
    debtorId: String,
});

const Debtor = mongoose.model('Debtor', debtorSchema)

export default Debtor