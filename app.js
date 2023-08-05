const express = require("express");
const bodyParser = require("body-parser")
const {accountRoutes, notesRoutes} = require("./routers");

const app = express()

app.use(bodyParser.json());
app.use("/user", accountRoutes)
app.use("/note", notesRoutes)

app.get("/", (req, res) => {
  res.status(200).send(
    `<div>
      <h3>Note API created using express by Philip K. Oyelegbin</h3>
      <ul>
        <li>Root: <a href="http://localhost:3001">http://localhost:3001</a></li>
        <li>Get, post and update account: <a href="http://localhost:3001/user">http://localhost:3001/user</a></li>
        <li>Get and delete account by the id: <a href="http://localhost:3001/user/:id">http://localhost:3001/user/:id</a></li>
        <li>Get, post and update note: <a href="http://localhost:3001/note">http://localhost:3001/note</a></li>
        <li>Get and delete note by the id: <a href="http://localhost:3001/note/:id">http://localhost:3001/note/:id</a></li>
      </ul>
    </div>`
  )
})

const port = 3001
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`))