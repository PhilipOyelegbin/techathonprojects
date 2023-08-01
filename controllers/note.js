const fs = require("fs")

exports.createNote = (req, res) => {
  let data = ""
  req.on("data", chunk => {data += chunk})
  req.on("end", () => {
    data = JSON.parse(data);
    const note = {
      id: data.id,
      title: data.title,
      content: data.content,
      created_on: new Date().toLocaleDateString(),
      updated_on: new Date().toLocaleDateString(),
    }
    if(!note.id || !note.title || !note.content) {
      res.writeHead(400, {"Content-type": "application/json"})
      return res.end(JSON.stringify({message: "Please provide all fields"}))
    }
    fs.readFile("./data/notes.json", "utf8", (err, value) => {
      if(err) {
        res.writeHead(500, {"Content-type": "application/json"})
        return res.end(JSON.stringify({message: "Internal server error"}))
      }
      parsedNote = JSON.parse(value.toString())
      parsedNote.push(note)
      fs.writeFile("./data/notes.json", JSON.stringify(parsedNote), err => {
        if(err) {
          res.writeHead(500, {"Content-type": "application/json"})
          return res.end(JSON.stringify({message: "Internal server error"}))
        }
        res.writeHead(201, {"Content-type": "application/json"})
        return res.end(JSON.stringify({message: "Note created successfully", note}))
      })
    })
  })
}

exports.getNotes = (req, res) => {
  fs.readFile("./data/notes.json", "utf8", (err, value) => {
    if(err) {
      res.writeHead(500, {"Content-type": "application/json"})
      return res.end(JSON.stringify({message: "Internal server error"}))
    }
    res.writeHead(200, {"Content-type": "application/json"})
    return res.end(JSON.stringify({
      message: "Note received", notes: JSON.parse(value.toString())
    }))
  })
}

exports.getNoteById = (req, res, query) => {
  id = query.toString().split("=")[1]
  if(!id) {
    res.writeHead(400, {"Content-type": "application/json"})
    return res.end(JSON.stringify({error: "The id is required"}))
  }
  fs.readFile("./data/notes.json", "utf8", (err, value) => {
    if(err) {
      res.writeHead(500, {"Content-type": "application/json"})
      return res.end(JSON.stringify({error: "Unable to read file"}))
    }
    parsedNote = JSON.parse(value.toString())
    const findNote = parsedNote?.find(note => note.id === id)
    if(!findNote) {
      res.writeHead(404, {"Content-type": "application/json"})
      return res.end(JSON.stringify({error: `Note with the id: ${id} not found`}))
    }
    return res.end(JSON.stringify({
      status: 200, message: "Note found", note: findNote
    }))
  })
}

exports.updateNote = (req, res) => {
  let data = ""
  req.on("data", chunk => data += chunk)
  req.on("end", () => {
    data = JSON.parse(data.toString())
    if(!data.id || !data.title || !data.content) {
      res.writeHead(400, {"Content-type": "application/json"})
      return res.end(JSON.stringify({message: "Please provide all fields"}))
    }
    fs.readFile("./data/notes.json", "utf8", (err, value) => {
      if(err) {
        res.writeHead(500, {"Content-type": "application/json"})
        return res.end(JSON.stringify({message: "Internal server error"}))
      }
      parsedNote = JSON.parse(value.toString())
      if(!parsedNote) {
        res.writeHead(404, {"Content-type": "application/json"})
        return res.end(JSON.stringify({message: "No note found"}))
      }
      // find the note you want to edit by id
      const findNote = parsedNote.find(note => note.id === data.id)
      if(!findNote) {
        res.writeHead(404, {"Content-type": "application/json"})
        return res.end(JSON.stringify({error: `Note with the id: ${id} not found`}))
      }
      // get the other note in the database by id and push the new data into it
      const filteredNote = parsedNote.filter(note => note.id !== data.id)
      filteredNote.push(data)
      fs.writeFile("./data/notes.json", JSON.stringify(filteredNote), err => {
        if(err) {
          res.writeHead(500, {"Content-type": "application/json"})
          return res.end(JSON.stringify({message: "Internal server error"}))
        }
        res.writeHead(201, {"Content-type": "application/json"})
        return res.end(JSON.stringify({
          message: "Note updated successfully", note: data
        }))
      })
    })
  })
}

exports.deleteNote = (req, res, query) => {
  id = query.toString().split("=")[1]
  if(!id) {
    res.writeHead(400, {"Content-type": "application/json"})
    return res.end(JSON.stringify({error: "The id is required"}))
  }
  fs.readFile("./data/notes.json", "utf8", (err, value) => {
    if(err) {
      res.writeHead(500, {"Content-type": "application/json"})
      return res.end(JSON.stringify({message: "Internal server error"}))
    }
    parsedNote = JSON.parse(value.toString())
    if(!parsedNote) {
      res.writeHead(404, {"Content-type": "application/json"})
      return res.end(JSON.stringify({message: "No note found"}))
    }
    const findNote = parsedNote.find(note => note.id === id)
    if(!findNote) {
      res.writeHead(404, {"Content-type": "application/json"})
      return res.end(JSON.stringify({error: `Note with the id: ${id} not found`}))
    }
    const filteredNote = parsedNote.filter(note => note.id !== id)
    fs.writeFile("./data/notes.json", JSON.stringify(filteredNote), err => {
      if(err) {
        res.writeHead(500, {"Content-type": "application/json"})
        return res.end(JSON.stringify({message: "Internal server error"}))
      }
      res.writeHead(201, {"Content-type": "application/json"})
      return res.end(JSON.stringify({
        message: "Note deleted successfully"
      }))
    })
  })
}