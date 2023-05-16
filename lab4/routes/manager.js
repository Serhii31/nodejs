var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

    var query = "SELECT * FROM manager";

    database.query(query, function(error, data){

        if(error)
        {
            throw error; 
        }
        else
        {
            response.render('manager', {title:'Manager', action:'list', sampleData:data});
        }

    });

});

router.get("/add", function(request, response, next){

    response.render("manager", {title:'Manager Insert', action:'add'});

});

router.post("/add_data", function(request, response, next){

    var manager_id = request.body.manager_id;

    var department_id = request.body.department_id;

    var manager_name = request.body.manager_name;

    var manager_surname = request.body.manager_surname;
    
    var manager_project = request.body.manager_project;

    var query = `
    INSERT INTO manager 
    (manager_id, department_id, manager_name, manager_surname, manager_project) 
    VALUES ("${manager_id}", "${department_id}", "${manager_name}", "${manager_surname}", "${manager_project}")
    `;

    database.query(query, function(error, data){

        if(error)
        {
            throw error;
        }   
        else
        {
            response.redirect("/manager");
        }

    });

});

router.get('/edit/:id', function(request, response, next){

    var id = request.params.id;

    var query = `SELECT * FROM manager WHERE manager_id = "${id}"`;

    database.query(query, function(error, data){

        response.render('manager', {title: 'Manager Edit', action:'edit', manager:data[0]});

    });

});

router.post('/edit/:id', function(request, response, next){

    var manager_id = request.body.manager_id;

    var department_id = request.body.department_id;

    var manager_name = request.body.manager_name;

    var manager_surname = request.body.manager_surname;

    var manager_project = request.body.manager_project;

    var query = `
    UPDATE manager 
    SET manager_id = "${manager_id}", 
    department_id = "${department_id}", 
    manager_name = "${manager_name}", 
    manager_surname = "${manager_surname}",
    manager_project = "${manager_project}" 
    WHERE manager_id = "${manager_id}"
    `;

    database.query(query, function(error, data){

        if(error)
        {
            throw error;
        }
        else
        {
            response.redirect('/manager');
        }

    });

});

router.get('/delete/:id', function(request, response, next){

    var id = request.params.id; 

    var query = `
    DELETE FROM manager WHERE manager_id = "${id}"
    `;

    database.query(query, function(error, data){

        if(error)
        {
            throw error;
        }
        else
        {
            response.redirect("/manager");
        }

    });

});

module.exports = router;
