import mongoose, { Schema } from "mongoose";

const entitySchema = new Schema({
    entityId: String,
    totalDebt: Number
});

const Entity = mongoose.model('Entity', entitySchema)

export default Entity