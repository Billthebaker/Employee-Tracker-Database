const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2')

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'partyongarth',
    database: 'employees_db'
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

function viewRoles() {
  const sql = `SELECT * FROM roles`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err
    }
    console.table(result);
    Questions();
  });
};

function viewEmployees() {
  const sql = `SELECT * FROM employee`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err
    }
    console.table(result);
    Questions();
  });
};

function addDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'dept_name',
        message: 'Enter Department Name'
      },
    ])
    .then((answers) => {
      console.log(answers)
      console.log(answers.department_name)
      const sql = `INSERT INTO departments SET ?`;
      db.query(sql, answers, (err, result) => {
        if (err) {
          throw err
        }
        console.table(result);
        Questions();
      });
    })
};

function addRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter Role Name'
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter Role Salary'
      },
      {
        type: 'input',
        name: 'dept_id',
        message: 'Enter Role ID'
      },
    ])
    .then((answers) => {
      console.log(answers)
      const sql = `INSERT INTO roles SET ?`;
      db.query(sql, answers, (err, result) => {
        if (err) {
          throw err
        }
        console.table(result);
        Questions();
      });
    })
};

function addEmployee() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'first_name',
        message: 'Enter First Name'
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'Enter Last Name'
      },
      {
        type: 'input',
        name: 'role_id',
        message: 'Enter Role ID'
      },
      {
        type: 'input',
        name: 'manager_id',
        message: 'Enter Supervisor ID Here'
      },
    ])
    .then((answers) => {
      console.log(answers)
      const sql = `INSERT INTO employee SET ?`;
      db.query(sql, answers, (err, result) => {
        if (err) {
          throw err
        }
        console.table(result);
        Questions();
      });
    })
};


function updateManager() {
  inquirer
  .prompt([
    {
      type: 'input',
      name: 'id',
      message: 'Enter Employee ID'
    },
      {
        type: 'input',
        name: 'manager_id',
        message: 'Enter Employee Manager ID'
      },
    ])
    .then((answers) => {
      const sql = `UPDATE employee SET manager_id = ? WHERE id = ?`;
      const params = [answers.manager_id, answers.id];
      db.query(sql, params, (err, result) => {
        if (err) {
          throw err
        }
        console.table(result);
        promptQuestions();
      });
    })
  };
  function updateRole() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'id',
          message: 'Enter New ID'
        },
        {
          type: 'input',
          name: 'role_id',
          message: 'Enter New Role ID'
        },
      ])
      .then((answers) => {
        const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
        const params = [answers.role_id, answers.id];
        db.query(sql, params, (err, result) => {
          if (err) {
            throw err
          }
          console.table(result);
          promptQuestions();
        });
      })
  };
  
  
  
  function init() {
    Questions();
  };
  
  init();

  