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

connection.connect((err) => {
  if (err) throw err;
  start();
});

//initialize 
const start = () => {
  inquirer.prompt([
    {
      name: "start",
      type: "list",
      message: "What would you like to do?",
      choices: ["VIEW", "ADD", "UPDATE"],
    }])
    .then((answer) => {
      switch (answer.start) {
        case 'VIEW':
          view();
          break;

        case 'ADD':
          add();
        break;
      };
    });
}

//function for calling READ route
// const view = () => {
//     inquirer.prompt([
//       {
//         name: "view",
//         type: "list",
//         message: "What would you like to VIEW?",
//         choices: ["DEPARTMENT", "ROLE", "EMPLOYEE"],
//       }
//     ])
//     .then((answer) => {
//       switch (answer.view) {
//         case 'DEPARTMENT':
//           db.Query.getAllDepartment();
//           break;
//       };
//     });
//   };

//function for calling CREATE route
const add = () => {
  inquirer.prompt([
    {
      name: "add",
      type: "list",
      message: "What would you like to ADD?",
      choices: ["DEPARTMENT", "ROLE", "EMPLOYEE"],
    }
  ])
  .then((answer) => {
    switch (answer.add) {
      case 'DEPARTMENT':
        addDepartment();
        break;
    };
  });
};

//function for creating a new department
const addDepartment = () => {
  inquirer.prompt([
    {
      name: "add_department",
      type: "input",
      message: "What would you like to call the new DEPARTMENT?",
    }
  ])
  .then((answer) => {
    // when finished prompting, insert a new item into the db with that info
    connection.query(
      'INSERT INTO department SET ?',
      {
        department_name: answer.add_department,
      },
      (err) => {
        if (err) throw err;
        console.log('Your DEPARTMENT was created successfully!');
        // re-prompt the user for if they want to bid or post
        start();
      }
    );
  });
};



