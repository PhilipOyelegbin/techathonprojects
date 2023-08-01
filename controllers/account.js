const fs = require("fs")
const cuid = require("cuid")

const createAccount = (req, res) => {
  const {first_name, last_name, email, phone_number, password} = req.body;
  const account = {
    id: cuid(),
    first_name: first_name,
    last_name: last_name,
    email: email,
    phone_number: phone_number,
    password: password,
    created_on: new Date().toLocaleDateString(),
    updated_on: new Date().toLocaleDateString(),
  }
  if(!first_name || !last_name || !email || !phone_number || !password) {
    res.status(400).json({message: "Please provide all fields"})
  }
  fs.readFile("./database/accounts.json", "utf8", (err, value) => {
    if(err) {
      res.status(500).json({message: "Internal server error"})
    }
    parsedAccount = JSON.parse(value.toString())
    parsedAccount.push(account)
    fs.writeFile("./database/accounts.json", JSON.stringify(parsedAccount), err => {
      if(err) {
        res.status(500).json({message: "Internal server error"})
      }
      res.status(201).json({message: "Account created", account})
    })
  })
}

const getAccounts = (req, res) => {
  fs.readFile("./database/accounts.json", "utf8", (err, value) => {
    if(err) {
      res.status(500).json({message: "Internal server error"})
    }
    res.status(200).json({message: "Account received", accounts: JSON.parse(value.toString())})
  })
}

const getAccountById = (req, res, id) => {
  id = req.params.id
  if(!id) {
    res.status(400).json({error: "The user id is required"})
  }
  fs.readFile("./database/accounts.json", "utf8", (err, value) => {
    if(err) {
      res.status(500).json({error: "unable to read file"})
    }
    parsedAccount = JSON.parse(value.toString())
    const findAccount = parsedAccount.find(account => account.id === id)
    if(!findAccount) {
      res.status(404).json({error: "Account with the id not found"})
    }
    return res.status(200).json({message: "Account found", account: findAccount})
  })
}

const updateAccount = (req, res) => {
  const {id} = req.body;
  if(!id) {
    return res.status(400).json({message: "Please provide the user id"})
  }
  fs.readFile("./database/accounts.json", "utf8", (err, value) => {
    if(err) {
      return res.status(500).json({message: "Internal server error"})
    }
    parsedAccount = JSON.parse(value.toString())
    if(!parsedAccount) {
      return res.status(400).json({message: "No account found"})
    }
    // find the account you want to edit by email
    const findAccount = parsedAccount.find(account => account.id === id)
    if(!findAccount) {
      return res.status(404).json({error: `Account with the id: ${id} not found`})
    }
    // get the other account in the database by email and push the new data into it
    const filteredAccount = parsedAccount.filter(account => account.id !== id)
    req.body.first_name !== undefined ? findAccount.first_name = req.body.first_name : findAccount.first_name = findAccount.first_name
    req.body.last_name !== undefined ? findAccount.last_name = req.body.last_name : findAccount.last_name = findAccount.last_name
    req.body.email !== undefined ? findAccount.email = req.body.email : findAccount.email = findAccount.email
    req.body.phone_number !== undefined ? findAccount.phone_number = req.body.phone_number : findAccount.phone_number = findAccount.phone_number
    req.body.password !== undefined ? findAccount.password = req.body.password : findAccount.password = findAccount.password
    findAccount.updated_on = new Date().toLocaleDateString(),
    filteredAccount.push(findAccount)
    fs.writeFile("./database/accounts.json", JSON.stringify(filteredAccount), err => {
      if(err) {
        return res.status(500).json({message: "Internal server error"})
      }
      return res.status(201).json({message: "Account updated successfully", account: findAccount})
    })
  })
}

const deleteAccountById = (req, res, id) => {
  id = req.params.id
  if(!id) {
    res.status(400).json({error: "The user id is required"})
  }
  fs.readFile("./database/accounts.json", "utf8", (err, value) => {
    if(err) {
      res.status(500).json({message: "Internal server error"})
    }
    parsedAccount = JSON.parse(value.toString())
    if(!parsedAccount) {
      res.status(404).json({message: "No account found"})
    }
    const findAccount = parsedAccount.find(account => account.id === id)
    if(!findAccount) {
      res.status(404).json({error: "Account with the email not found"})
    }
    const filteredAccount = parsedAccount.filter(account => account.id !== id)
    fs.writeFile("./database/accounts.json", JSON.stringify(filteredAccount), err => {
      if(err) {
        res.status(500).json({message: "Internal server error"})
      }
      res.status(201).json({message: "Account deleted successfully"})
    })
  })
}

module.exports = {createAccount, getAccounts, getAccountById, updateAccount, deleteAccountById}