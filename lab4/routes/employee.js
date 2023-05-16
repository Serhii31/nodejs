var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

    var query = "SELECT * FROM employee";

    database.query(query, function(error, data){

        if(error)
        {
            throw error; 
        }
        else
        {
            response.render('employee', {title:'Employee', action:'list', sampleData:data});
        }

    });

});

router.get("/add", function(request, response, next){

    response.render("employee", {title:'Employee Insert', action:'add'});

});

router.post("/add_data", function(request, response, next){

    var manager_id = request.body.manager_id;

    var employee_id = request.body.employee_id;

    var employee_name = request.body.employee_name;

    var employee_surname = request.body.employee_surname;

    var employee_position = request.body.employee_position;

    var employee_hire_date = request.body.employee_hire_date;

    var query = `
    INSERT INTO employee 
    (manager_id, employee_id, employee_name, employee_surname, employee_position, employee_hire_date) 
    VALUES ("${manager_id}", "${employee_id}", "${employee_name}", "${employee_surname}", "${employee_position}", "${employee_hire_date}")
    `;

    database.query(query, function(error, data){

        if(error)
        {
            throw error;
        }   
        else
        {
            response.redirect("/employee");
        }

    });

});

router.get('/edit/:id', function(request, response, next){

    var id = request.params.id;

    var query = `SELECT * FROM employee WHERE employee_id = "${id}"`;

    database.query(query, function(error, data){

        response.render('employee', {title: 'Employee Edit', action:'edit', employee:data[0]});

    });

});

router.post('/edit/:id', function(request, response, next){

    var manager_id = request.body.manager_id;

    var employee_id = request.body.employee_id;

    var employee_name = request.body.employee_name;

    var employee_surname = request.body.employee_surname;

    var employee_position = request.body.employee_position;

    var employee_hire_date = request.body.employee_hire_date;

    var query = `
    UPDATE employee 
    SET manager_id = "${manager_id}", 
    employee_id = "${employee_id}", 
    employee_name = "${employee_name}", 
    employee_surname = "${employee_surname}",
    employee_position = "${employee_position}",
    employee_hire_date = "${employee_hire_date}" 
    WHERE employee_id = "${employee_id}"
    `;

    database.query(query, function(error, data){

        if(error)
        {
            throw error;
        }
        else
        {
            response.redirect('/employee');
        }

    });

});

router.get('/delete/:id', function(request, response, next){

    var id = request.params.id; 

    var query = `
    DELETE FROM employee WHERE employee_id = "${id}"
    `;

    database.query(query, function(error, data){

        if(error)
        {
            throw error;
        }
        else
        {
            response.redirect("/employee");
        }

    });

});

module.exports = router;
