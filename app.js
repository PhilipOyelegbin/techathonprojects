import express from "express";
import dotenv from "dotenv";
import {connect} from "mongoose";
import { accountRoutes } from "./routers/accountRoutes.js";
import { ledgerRoutes } from "./routers/ledgerRoutes.js";

dotenv.config()
const app = express()

app.use(express.json())
app.use("/account", accountRoutes)
app.use("/ledger", ledgerRoutes)

app.get("/", (req, res) => {
  res.status(200).send(
    `<div>
      <h3>Loan Money API created using express by Philip K. Oyelegbin</h3>
      <ul>
        <li>Root: <a href="http://localhost:3001">http://localhost:3001</a></li>
        <li>Get and post account: <a href="http://localhost:3001/account">http://localhost:3001/account</a></li>
        <li>Get, update and delete account by id: <a href="http://localhost:3001/account/:id">http://localhost:3001/account/:id</a></li>
        <li>Get and post ledger: <a href="http://localhost:3001/ledger">http://localhost:3001/ledger</a></li>
        <li>Get, update and delete ledger by id: <a href="http://localhost:3001/ledger/:id">http://localhost:3001/ledger/:id</a></li>
      </ul>
    </div>`
  )
})

app.listen(process.env.PORT, async() => {
  await connect(process.env.DATABASE_URL)
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
})