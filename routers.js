const {Router} = require("express")

const {getAccounts, getAccountById, createAccount, updateAccount, deleteAccountById} = require("./controllers/account")

const {getNotes, getNoteById, createNote, updateNote, deleteNoteById} = require("./controllers/note")

const accountRoutes = Router("/user")
const notesRoutes = Router("/note")

accountRoutes.get("/", getAccounts)
accountRoutes.get("/:id", getAccountById)
accountRoutes.post("/", createAccount)
accountRoutes.put("/", updateAccount)
accountRoutes.delete("/:id", deleteAccountById)

notesRoutes.get("/", getNotes)
notesRoutes.get("/:id", getNoteById)
notesRoutes.post("/", createNote)
notesRoutes.put("/", updateNote)
notesRoutes.delete("/:id", deleteNoteById)

module.exports = {accountRoutes, notesRoutes}