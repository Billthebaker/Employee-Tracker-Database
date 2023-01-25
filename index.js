const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2')

const db = mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'partyongarth',
        database: 'employees_db'
    },
);