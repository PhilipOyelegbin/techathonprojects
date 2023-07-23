const fs = require("fs")

exports.createBook = (req, res) => {
  let data = ""
  req.on("data", chunk => {data += chunk})
  req.on("end", () => {
    data = JSON.parse(data);
    const book = {
      uuid: data.uuid,
      title: data.title,
      content: data.content,
      created_on: new Date().toLocaleDateString(),
      updated_on: new Date().toLocaleDateString(),
    }
    if(!book.uuid || !book.title || !book.content) {
      res.writeHead(400, {"Content-type": "application/json"})
      return res.end(JSON.stringify({message: "Please provide all fields"}))
    }
    fs.readFile("./database/books.json", "utf8", (err, value) => {
      if(err) {
        res.writeHead(500, {"Content-type": "application/json"})
        return res.end(JSON.stringify({message: "Internal server error"}))
      }
      parsedBook = JSON.parse(value.toString())
      parsedBook.push(book)
      fs.writeFile("./database/books.json", JSON.stringify(parsedBook), err => {
        if(err) {
          res.writeHead(500, {"Content-type": "application/json"})
          return res.end(JSON.stringify({message: "Internal server error"}))
        }
        res.writeHead(201, {"Content-type": "application/json"})
        return res.end(JSON.stringify({message: "Book created", book}))
      })
    })
  })
}

exports.getBooks = (req, res) => {
  fs.readFile("./database/books.json", "utf8", (err, value) => {
    if(err) {
      res.writeHead(500, {"Content-type": "application/json"})
      return res.end(JSON.stringify({message: "Internal server error"}))
    }
    res.writeHead(200, {"Content-type": "application/json"})
    return res.end(JSON.stringify({
      message: "Books received", books: JSON.parse(value.toString())
    }))
  })
}

exports.getBookById = (req, res, query) => {
  uuid = query.toString().split("=")[1]
  if(!uuid) {
    res.writeHead(400, {"Content-type": "application/json"})
    return res.end(JSON.stringify({error: "The uuid is required"}))
  }
  fs.readFile("./database/books.json", "utf8", (err, value) => {
    if(err) {
      res.writeHead(500, {"Content-type": "application/json"})
      return res.end(JSON.stringify({error: "Unable to read file"}))
    }
    parsedBook = JSON.parse(value.toString())
    const findBook = parsedBook.find(book => book.uuid === uuid)
    if(!findBook) {
      res.writeHead(404, {"Content-type": "application/json"})
      return res.end(JSON.stringify({error: `Book with the uuid: ${uuid} not found`}))
    }
    res.writeHead(200, {"Content-type": "application/json"})
    return res.end(JSON.stringify({
      status: 200, message: `Book with the uuid: ${uuid} has been found`, book: findBook
    }))
  })
}

exports.updateBook = (req, res) => {
  let data = ""
  req.on("data", chunk => data += chunk)
  req.on("end", () => {
    data = JSON.parse(data.toString())
    if(!data.uuid || !data.title || !data.content) {
      res.writeHead(400, {"Content-type": "application/json"})
      return res.end(JSON.stringify({message: "Please provide all fields"}))
    }
    fs.readFile("./database/books.json", "utf8", (err, value) => {
      if(err) {
        res.writeHead(500, {"Content-type": "application/json"})
        return res.end(JSON.stringify({message: "Internal server error"}))
      }
      parsedBook = JSON.parse(value.toString())
      if(!parsedBook) {
        res.writeHead(404, {"Content-type": "application/json"})
        return res.end(JSON.stringify({message: "No book found"}))
      }
      // find the book you want to edit by uuid
      const findBook = parsedBook.find(book => book.uuid === data.uuid)
      if(!findBook) {
        res.writeHead(404, {"Content-type": "application/json"})
        return res.end(JSON.stringify({error: `Book with the uuid: ${data.uuid} not found`}))
      }
      // get the other book in the database by uuid and push the new data into it
      const filteredBook = parsedBook.filter(book => book.uuid !== data.uuid)
      filteredBook.push(data)
      fs.writeFile("./database/books.json", JSON.stringify(filteredBook), err => {
        if(err) {
          res.writeHead(500, {"Content-type": "application/json"})
          return res.end(JSON.stringify({message: "Internal server error"}))
        }
        res.writeHead(200, {"Content-type": "application/json"})
        return res.end(JSON.stringify({
          message: `Book with the uuid: ${data.uuid} has been updated successfully`, book: data
        }))
      })
    })
  })
}

exports.deleteBookById = (req, res, query) => {
  uuid = query.toString().split("=")[1]
  if(!uuid) {
    res.writeHead(400, {"Content-type": "application/json"})
    return res.end(JSON.stringify({error: "The uuid is required"}))
  }
  fs.readFile("./database/books.json", "utf8", (err, value) => {
    if(err) {
      res.writeHead(500, {"Content-type": "application/json"})
      return res.end(JSON.stringify({message: "Internal server error"}))
    }
    parsedBook = JSON.parse(value.toString())
    if(!parsedBook) {
      res.writeHead(404, {"Content-type": "application/json"})
      return res.end(JSON.stringify({message: "No book found"}))
    }
    const findBook = parsedBook.find(book => book.uuid === uuid)
    if(!findBook) {
      res.writeHead(404, {"Content-type": "application/json"})
      return res.end(JSON.stringify({error: `Book with the uuid: ${uuid} not found`}))
    }
    const filteredBook = parsedBook.filter(book => book.uuid !== uuid)
    fs.writeFile("./database/books.json", JSON.stringify(filteredBook), err => {
      if(err) {
        res.writeHead(500, {"Content-type": "application/json"})
        return res.end(JSON.stringify({message: "Internal server error"}))
      }
      res.writeHead(200, {"Content-type": "application/json"})
      return res.end(JSON.stringify({
        status: 200, message: `Book with the uuid: ${uuid} has been deleted successfully`
      }))
    })
  })
}