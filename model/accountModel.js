import {Schema, model} from "mongoose";

const accountSchema = Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone_number: {
    type: Number,
    required: true
  },
  account_number: {
    type: Number,
    required: true,
    unique: true,
    index: true
  },
  password: {
    type: String,
    required: true
  }
}, {timestamps: true})

export const accountModel = model("accounts", accountSchema)