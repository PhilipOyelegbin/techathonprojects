import { ledgerModel } from "../model/ledgerModel.js";
import { generateLedgerNum } from "../utilities/ledgerNumGenerator.js";

// create a new ledger service
export const createLedgerService = async(data) => {
  const newLedger = new ledgerModel({
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    address: data.address,
    phone_number: data.phone_number,
    ledger_number: generateLedgerNum(),
    password: data.password
  })
  newLedger.save()
  return newLedger
}

// get all ledger service
export const getLedgerService = async() => {
  const allLedger = ledgerModel.find()
  return allLedger
}

// get ledger service by id
export const getLedgerByIdService = async(id) => {
  const oneLedger = ledgerModel.findById(id)
  return oneLedger
}

// update ledger service by id
export const updateLedgerByIdService = async(id, data) => {
  const updateLedger = ledgerModel.findByIdAndUpdate(id, {
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    address: data.address,
    phone_number: data.phone_number,
    password: data.password
  }, {new: true})
  return updateLedger
}

// delete ledger service by id
export const deleteLedgerByIdService = async(id) => {
  const deleteLedger = ledgerModel.findByIdAndDelete(id)
  return deleteLedger
}
