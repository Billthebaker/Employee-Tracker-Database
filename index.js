const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2')

const db = mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'partyongarth',
        database: 'employees'
    },
);
function Questions() {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'choices',
          message: 'What would you like to do?',
          choices: [
            { name: 'View Departments', value: 'departments' },
            { name: 'View Roles', value: 'roles' },
            { name: 'View Employees', value: 'employees' },
            { name: 'Add Department', value: 'addDepartment' },
            { name: 'Add Roles', value: 'addRole' },
            { name: 'Add Employee', value: 'addEmployee' },
            { name: 'Update Employee Roles', value: 'updateRole' },
            { name: 'Update Manager', value: 'updateManager' },
          ],
        },
  
      ])
      .then((answers) => {
        switch (answers.choices) {
          case "departments":
            viewDepartments()
            break;
          case "roles":
            viewRoles()
            break;
          case "employees":
            viewEmployees()
            break;
          case "addDepartment":
            addDepartment()
            break;
          case "addRole":
            addRole()
            break;
          case "addEmployee":
            addEmployee()
            break;
          case "updateRole":
            updateRole()
            break;
            case "updateManager":
            updateManager()
            break;
        }
      });
  };

  function viewDepartments() {
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, result) => {
      if (err) {
        throw err
      }
      console.table(result);
      Questions();
    });
  };
 
  function init (){
    Questions();
  };

  init();
  
