
export const createLedger = (req, res) => {
  const {title, content} = req.body
  const note = {
    id: cuid(),
    title: title,
    content: content,
    created_on: new Date().toLocaleDateString(),
    updated_on: new Date().toLocaleDateString(),
  }
  if(!note.title || !note.content) {
    res.status(400).json({message: "Please provide all fields"})
  }
  fs.readFile("./database/notes.json", "utf8", (err, value) => {
    if(err) {
      res.status(500).json({message: "Internal server error"})
    }
    parsedNote = JSON.parse(value.toString())
    parsedNote.push(note)
    fs.writeFile("./database/notes.json", JSON.stringify(parsedNote), err => {
      if(err) {
        res.status(500).json({message: "Internal server error"})
      }
      return res.status(201).json({message: "Note created successfully", note})
    })
  })
}

export const getLedger = (req, res) => {
  fs.readFile("./database/notes.json", "utf8", (err, value) => {
    if(err) {
      return res.status(500).json({message: "Internal server error"})
    }
    return res.status(200).json({message: "Note received", notes: JSON.parse(value.toString())})
  })
}

export const getLedgerById = (req, res, id) => {
  id = req.params.id
  if(!id) {
    return res.status(400).json({error: "The id is required"})
  }
  fs.readFile("./database/notes.json", "utf8", (err, value) => {
    if(err) {
      return res.status(500).json({error: "Unable to read file"})
    }
    parsedNote = JSON.parse(value.toString())
    const findNote = parsedNote?.find(note => note.id === id)
    if(!findNote) {
      return res.status(404).json({error: `Note with the id: ${id} not found`})
    }
    return res.status(200).json({message: "Note found", note: findNote})
  })
}

export const updateLedger = (req, res) => {
  const {id} = req.body
  if(!id) {
    return res.status(400).json({message: "Please provide note id"})
  }
  fs.readFile("./database/notes.json", "utf8", (err, value) => {
    if(err) {
      return res.status(500).json({message: "Internal server error"})
    }
    parsedNote = JSON.parse(value.toString())
    if(!parsedNote) {
      return res.status(404).json({message: "No note found"})
    }
    // find the note you want to edit by id
    const findNote = parsedNote.find(note => note.id === id)
    if(!findNote) {
      return res.status(404).json({error: `Note with the id: ${id} not found`})
    }
    // get the other note in the database by id and push the new data into it
    const filteredNote = parsedNote.filter(note => note.id !== id)
    req.body.title !== undefined ? findNote.title = req.body.title : findNote.title = findNote.title
    req.body.content !== undefined ? findNote.content = req.body.content : findNote.content = findNote.content
    findNote.updated_on = new Date().toLocaleDateString(),
    filteredNote.push(findNote)
    fs.writeFile("./database/notes.json", JSON.stringify(filteredNote), err => {
      if(err) {
        return res.status(500).json({message: "Internal server error"})
      }
      return res.status(201).json({message: "Note updated successfully", note: findNote})
    })
  })
}

export const deleteLedgerById = (req, res, id) => {
  id = req.params.id
  if(!id) {
    return res.status(400).json({error: "The id is required"})
  }
  fs.readFile("./database/notes.json", "utf8", (err, value) => {
    if(err) {
      return res.status(500).json({message: "Internal server error"})
    }
    parsedNote = JSON.parse(value.toString())
    if(!parsedNote) {
      return res.status(404).json({message: "No note found"})
    }
    const findNote = parsedNote.find(note => note.id === id)
    if(!findNote) {
      return res.status(404).json({error: `Note with the id: ${id} not found`})
    }
    const filteredNote = parsedNote.filter(note => note.id !== id)
    fs.writeFile("./database/notes.json", JSON.stringify(filteredNote), err => {
      if(err) {
        return res.status(500).json({message: "Internal server error"})
      }
      return res.status(201).json({message: "Note deleted successfully"})
    })
  })
}