const inquirer = require("inquirer");
// const db = require("./db");
const mysql = require("mysql");
// Enable access to .env variables
// require("dotenv").config();

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Be sure to update with your own MySQL password!
  password: "Bluninja1",
  database: "employee_DB",
});

const start = () => {
  inquirer.prompt([
    {
      name: "start",
      type: "list",
      message: "What would you like to do?",
      choices: ["ADD", "VIEW", "UPDATE"],
    }])
    .then((answer) => {
      switch (answer.start) {
        case 'ADD':
          db.artistSearch();
          break;

        case 'VIEW':
          multiSearch();
          break;
      };
    });
}

const view = () => {
    inquirer.prompt([
      {
        name: "view",
        type: "list",
        message: "What would you like to ADD?",
        choices: ["DEPARTMENT", "ROLE", "EMPLOYEE"],
      }
    ]);
  };

connection.connect((err) => {
  if (err) throw err;
  start();
});