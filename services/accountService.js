import { accountModel } from "../model/accountModel.js";
import { generateAccNum } from "../utilities/accNumGenerator.js";

// create a new account service
export const createAccountService = async(data) => {
  const newAccount = new accountModel({
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    address: data.address,
    phone_number: data.phone_number,
    account_number: generateAccNum(),
    password: data.password
  })
  newAccount.save()
  return newAccount
}

// get all account service
export const getAccountService = async() => {
  const allAccount = accountModel.find()
  return allAccount
}

// get account service by id
export const getAccountByIdService = async(id) => {
  const oneAccount = accountModel.findById(id)
  return oneAccount
}

// update account service by id
export const updateAccountByIdService = async(id, data) => {
  const updateAccount = accountModel.findByIdAndUpdate(id, {
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    address: data.address,
    phone_number: data.phone_number,
    password: data.password
  }, {new: true})
  return updateAccount
}

// delete account service by id
export const deleteAccountByIdService = async(id) => {
  const deleteAccount = accountModel.findByIdAndDelete(id)
  return deleteAccount
}
