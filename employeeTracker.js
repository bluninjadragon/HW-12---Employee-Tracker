const mysql = require("mysql");
const inquirer = require("inquirer");
require("dotenv").config();

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Be sure to update with your own MySQL password!
  password: "blank",
  database: "employee_DB",
});

// function which prompts the user for what action they should take: add, view or update departments, roles, employees

// function to handle creating new items in DB

// query the database for departments, roles, employees in DB