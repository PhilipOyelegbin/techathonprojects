import { ledgerModel } from "../model/ledgerModel.js";

// create a new ledger service
export const createLedgerService = async(amount, account_id) => {
  const interestRate = 0.05;
  const newLedger = new ledgerModel({
    amount,
    interest: amount * interestRate,
    account_id,
    total: amount + (amount * interestRate)
  })
  await newLedger.save()
  return newLedger
}

// get all ledger service
export const getLedgerService = async() => {
  const allLedger = await ledgerModel.find()
  return allLedger
}

// get ledger service by id
export const getLedgerByIdService = async(id) => {
  const oneLedger = await ledgerModel.findById(id)
  return oneLedger
}

// update ledger service by id
export const updateLedgerByIdService = async(id, amount) => {
  const updateLedger = await ledgerModel.findByIdAndUpdate(id, {
    amount,
    interest: amount * 0.05,
    total: amount + (amount * 0.05)
  }, {new: true})
  await updateLedger.save()
  return updateLedger
}

// delete ledger service by id
export const deleteLedgerByIdService = async(id) => {
  const deleteLedger = await ledgerModel.findByIdAndDelete(id)
  return deleteLedger
}
