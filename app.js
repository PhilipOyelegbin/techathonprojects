const express = require("express");
const bodyParser = require("body-parser")
const accountRoutes = require("./routers");

const app = express()

app.use(bodyParser.json());
app.use("/user", accountRoutes)
// app.use("/note", notesRoutes)

app.get("/", (req, res) => {
  res.status(200).send("Note API created using express by Philip Oyelegbin")
})

// // error route
// app.use((req, res) => {
//   res.status(404).render('error', {title: "404"})
// })

const port = 3001
app.listen(port, () => console.log(`Server is running on https://localhost:${port}`))