var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

    var query = "SELECT * FROM department";

    database.query(query, function(error, data){

        if(error)
        {
            throw error; 
        }
        else
        {
            response.render('department', {title:'Department', action:'list', sampleData:data});
        }

    });

});

router.get("/add", function(request, response, next){

    response.render("department", {title:'Department Insert', action:'add'});

});

router.post("/add_data", function(request, response, next){

    var department_id = request.body.department_id;

    var department_name = request.body.department_name;

    var department_type = request.body.department_type;

    var department_staff = request.body.department_staff;

    var department_date_of_creation = request.body.department_date_of_creation;

    var query = `
    INSERT INTO department 
    (department_id, department_name, department_type, department_staff, department_date_of_creation) 
    VALUES ("${department_id}", "${department_name}", "${department_type}", "${department_staff}", "${department_date_of_creation}")
    `;

    database.query(query, function(error, data){

        if(error)
        {
            throw error;
        }   
        else
        {
            response.redirect("/department");
        }

    });

});

router.get('/edit/:id', function(request, response, next){

    var id = request.params.id;

    var query = `SELECT * FROM department WHERE department_id = "${id}"`;

    database.query(query, function(error, data){

        response.render('department', {title: 'Department Edit', action:'edit', department:data[0]});

    });

});

router.post('/edit/:id', function(request, response, next){

    var id = request.params.id;

    var department_name = request.body.department_name;

    var department_type = request.body.department_type;

    var department_staff = request.body.department_staff;

    var department_date_of_creation = request.body.department_date_of_creation;

    var query = `
    UPDATE department 
    SET department_name = "${department_name}", 
    department_type = "${department_type}", 
    department_staff = "${department_staff}", 
    department_date_of_creation = "${department_date_of_creation}" 
    WHERE department_id = "${id}"
    `;

    database.query(query, function(error, data){

        if(error)
        {
            throw error;
        }
        else
        {
            response.redirect('/department');
        }

    });

});

router.get('/delete/:id', function(request, response, next){

    var id = request.params.id; 

    var query = `
    DELETE FROM department WHERE department_id = "${id}"
    `;

    database.query(query, function(error, data){

        if(error)
        {
            throw error;
        }
        else
        {
            response.redirect("/department");
        }

    });

});

module.exports = router;
