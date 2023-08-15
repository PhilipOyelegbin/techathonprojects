import { getAccountByIdService } from "../services/accountService.js"
import {
  createLedgerService,
  deleteLedgerByIdService,
  getLedgerByIdService,
  getLedgerService,
  updateLedgerByIdService
} from "../services/ledgerService.js"

export const createLedger = async(req, res) => {
  try {
    const {amount, account_id} = req.body
    if(!amount || !account_id) {
      return res.status(400).json({error: "Please provide all fields"})
    }
    const findAccount = await getAccountByIdService(account_id)
    if(!findAccount) {
      return res.status(404).json({error: "Account does not exist"})
    }
    const generateLedger = await createLedgerService(amount, account_id)
    return res.status(200).json({message: "Ledger created", generateLedger})
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}

export const getLedger = async(req, res) => {
  try {
    const findLedger = await getLedgerService()
    return res.status(200).json({message: "Ledgers found", findLedger})
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}

export const getLedgerById = async(req, res) => {
  try {
    const {id} = req.params
    if(!id) {
      return res.status(400).json({error: "Kindly provide the id"})
    }
    const findLedger = await getLedgerByIdService(id)
    if(!findLedger) {
      return res.status(404).json({error: "Ledger not found"})
    }
    return res.status(200).json({message: "Ledger found", findLedger})
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}

export const updateLedger = async(req, res) => {
  try {
    const {id} = req.params
    if(!id) {
      return res.status(400).json({error: "Kindly provide the id"})
    }
    const {amount} = req.body
    if(!amount) {
      return res.status(400).json({error: "Kindly provide the amount"})
    }
    const findLedger = await getLedgerByIdService(id)
    if(!findLedger) {
      return res.status(404).json({error: `Ledger with the id:${id}, does not exist`})
    }
    const updateLedger = await updateLedgerByIdService(id, amount)
    return res.status(200).json({message: "Ledger updated", updateLedger})
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}

export const deleteLedgerById = async(req, res) => {
  try {
    const {id} = req.params
    if(!id) {
      return res.status(400).json({error: `The id:${id}, does not exist`})
    }
    const findLedger = await getLedgerByIdService(id)
    if(!findLedger) {
      return res.status(404).json({error: "The ID provided does not exist"})
    }
    const deleteLedger = await deleteLedgerByIdService(id)
    return res.status(200).json({message: "Ledger deleted", deleteLedger})
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}