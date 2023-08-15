import {
  createAccountService,
  deleteAccountByIdService,
  getAccountByIdService,
  getAccountService,
  updateAccountByIdService
} from "../services/accountService.js";

export const createAccount = async(req, res) => {
  try {
    const {first_name, last_name, email, address, phone_number, password} = req.body;
    if(!first_name || !last_name || !email || !address || !phone_number || !password) {
      return res.status(400).json({message: "Please provide all fields"})
    }
    const newAccount = await createAccountService(req.body)
    return res.status(200).json({message: "Account created successfully", newAccount})
  } catch (error) {
    return res.status(500).json({error: "Internal server error"})
  }
}

export const getAccounts = async(req, res) => {
  try {
    const allAccount = await getAccountService(req.body)
    res.status(200).json({message: "Account received", allAccount})
  } catch (error) {
    res.status(500).json({message: "Internal server error"})
  }
}

export const getAccountById = async(req, res) => {
  try {
    const {id} = req.params
    if(!id) {
      return res.status(400).json({message: "Please provide the account id"})
    }
    const foundAccount = await getAccountByIdService(id)
    if(!foundAccount) {
      return res.status(404).json({error: "Account not found"})
    }
    res.status(200).json({message: "Account received", foundAccount})
  } catch (error) {
    res.status(500).json({message: "Internal server error"})
  }
}

export const updateAccount = async(req, res) => {
  try {
    const {id} = req.params;
    if(!id) {
      return res.status(400).json({message: "Please provide the account id"})
    }
    const foundAccount = await getAccountByIdService(id)
    if(!foundAccount) {
      return res.status(404).json({error: "Account not found"})
    }
    const newAccount = await updateAccountByIdService(id, req.body)
    res.status(200).json({message: "Account updated successfully", newAccount})
  } catch (error) {
    res.status(500).json({error: "Internal server error"})
  }
}

export const deleteAccountById = async(req, res) => {
  try {
    const {id} = req.params;
    if(!id) {
      return res.status(400).json({message: "Please provide the account id"})
    }
    const foundAccount = await getAccountByIdService(id)
    if(!foundAccount) {
      return res.status(404).json({error: "Account not found"})
    }
    const eraseAccount = await deleteAccountByIdService(id)
    res.status(200).json({message: "Account deleted successfully", eraseAccount})
  } catch (error) {
    res.status(500).json({message: "Internal server error"})
  }
}
