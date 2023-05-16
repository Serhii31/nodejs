const http = require("http")
const fs = require("fs")
const PORT = process.env.PORT || 4000

const get = require("./get")
const post = require("./post")
const put = require("./put")
const deleteR = require("./delete")
const posts = require("./data")
const getBody = require("./getBody")

const server = http.createServer((request, response) => {
    request.posts = posts
    request.query = new URL(request.url, `http://${request.headers.host}`)

  switch (request.method) {
    case "GET":
    getBody(request, response, get);
      break

    case "POST":
    getBody(request, response, post);
      break

    case "PUT":
    getBody(request, response, put);
      break

    case "DELETE":
    getBody(request, response, deleteR);
      break

    default:
      response.statusCode = 400
      response.write("No Response")
      response.end()
  }
})


server.listen(PORT, err => {
  err ? console.error(err) : console.log(`API Server is running on port ${PORT}`)
})
