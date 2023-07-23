const {createServer} = require("http");

const {createBook, getBooks, getBookById, updateBook, deleteBookById} = require("./book")

const server = createServer((req, res) => {
  url = req.url;
  method = req.method;
  headers = req.headers;
  parsedURL = new URL(url, `http://${headers.host}`);
  pathname = parsedURL.pathname;
  query = parsedURL.searchParams;
  switch (pathname) {
    case "/":
      res.writeHead(200, {"Content-type": "application/json"})
      return res.end(JSON.stringify({
        message: "This is a book API developed using Nodejs by Philip Oyelegbin",
        book_path: "/book"
      }))
    case "/book":
      if(method === "POST") {
        createBook(req, res)
      } else if(method === "GET" && query == "") {
        getBooks(req, res)
      } else if(method === "GET" && query !== "") {
        getBookById(req, res, query)
      } else if(method === "PUT") {
        updateBook(req, res)
      } else if(method === "DELETE" && query !== "") {
        deleteBookById(req, res, query)
      }
      break;
    default:
      res.writeHead(404, {"Content-type": "application/json"})
      return res.end(JSON.stringify({message: "Not found"}))
  }
})

const port = 3001
server.listen(port, () => console.log(`Server is running on https://localhost:${port}`))