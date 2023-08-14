import {Router} from "express";
import { createLedger, deleteLedgerById, getLedger, getLedgerById, updateLedger } from "../controllers/ledgerController.js";


export const ledgerRoutes = Router("/ledger")

ledgerRoutes.get("/", getLedger)
ledgerRoutes.get("/:id", getLedgerById)
ledgerRoutes.post("/", createLedger)
ledgerRoutes.put("/", updateLedger)
ledgerRoutes.delete("/:id", deleteLedgerById)