module.exports = [{ 
"title": "CRUD API",
"get" : `curl -i -X GET http://localhost:4000/posts`, 
"post" : `curl -i -X POST -H 'Content-Type: application/json' -d '{"title": "Test", "body": "Test"}' http://localhost:4000/posts`, 
"put" : `curl -i -X PUT -H 'Content-Type: application/json' -d '{"title": "Update test", "body": "Update test"}' http://localhost:4000/posts?id=1`,
"delete" : `curl -i -X DELETE http://localhost:4000/posts?id=1` 
}]
