import {Schema, model} from "mongoose";

const ledgerSchema = Schema({
  amount: {
    type: Number,
    required: true
  },
  interest: {
    type: Number,
    required: true
  },
  paid: {
    type: Boolean,
    default: false,
    required: true
  },
  account_id: {
    type: Schema.Types.ObjectId,
    ref: "accounts",
    required: true
  },
  total: {
    type: Number,
    required: true
  }
}, {timestamps: true})

export const ledgerModel = model("ledgers", ledgerSchema)