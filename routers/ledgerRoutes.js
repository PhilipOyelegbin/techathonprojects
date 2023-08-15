import {Router} from "express";
import { createLedger, deleteLedgerById, getLedger, getLedgerById, updateLedger } from "../controllers/ledgerController.js";

export const ledgerRoutes = Router("/ledger")

ledgerRoutes.route("/").get(getLedger).post(createLedger)
ledgerRoutes.route("/:id").get(getLedgerById).patch(updateLedger).delete(deleteLedgerById)