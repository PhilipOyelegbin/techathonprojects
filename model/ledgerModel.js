import {Schema, Model} from "mongoose";

const ledgerSchema = Schema({
  account_number: {
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
  }
}, {timestamps: true})

export const ledgerModel = Model("ledgers", ledgerSchema)