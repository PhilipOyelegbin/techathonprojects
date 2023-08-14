import {Router} from "express";
import {
  createAccount,
  deleteAccountById,
  getAccountById,
  getAccounts,
  updateAccount
} from "../controllers/accountController.js";

export const accountRoutes = Router("/account")

accountRoutes.route("/").get(getAccounts).post(createAccount)
accountRoutes.route("/:id").get(getAccountById).patch(updateAccount).delete(deleteAccountById)