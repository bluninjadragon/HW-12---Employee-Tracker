const inquirer = require("inquirer");
// const db = require("./db/query");
const mysql = require("mysql");

require("console.table");
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
  inquirer
    .prompt([
      {
        name: "start",
        type: "list",
        message: "What would you like to do?",
        choices: ["VIEW", "ADD", "UPDATE"],
      },
    ])
    .then((answer) => {
      switch (answer.start) {
        case "VIEW":
          view();
          break;

        case "ADD":
          add();
          break;

        case "UPDATE":
          update();
          break;
      }
    });
};

// function for calling READ route
const view = () => {
  inquirer
    .prompt([
      {
        name: "view",
        type: "list",
        message: "What would you like to VIEW?",
        choices: ["DEPARTMENT", "ROLE", "EMPLOYEE"],
      },
    ])
    .then((answer) => {
      switch (answer.view) {
        case "DEPARTMENT":
          viewDepartment();
          break;
        case "ROLE":
          viewRole();
          break;
        case "EMPLOYEE":
          viewEmployee();
          break;
      }
    });
};

//functions for viewing
const viewDepartment = () => {
  connection.query("SELECT * FROM department", function (error, results) {
    if (error) throw error;
    console.table(results);
    start();
  });
};

const viewRole = () => {
  connection.query("SELECT * FROM roles", function (error, results) {
    if (error) throw error;
    console.table(results);
    start();
  });
};

const viewEmployee = () => {
  connection.query("SELECT * FROM employee", function (error, results) {
    if (error) throw error;
    console.table(results);
    start();
  });
};

//function for calling CREATE route
const add = () => {
  inquirer
    .prompt([
      {
        name: "add",
        type: "list",
        message: "What would you like to ADD?",
        choices: ["DEPARTMENT", "ROLE", "EMPLOYEE"],
      },
    ])
    .then((answer) => {
      switch (answer.add) {
        case "DEPARTMENT":
          addDepartment();
          break;
      }
      switch (answer.add) {
        case "ROLE":
          addRole();
          break;
      }
      switch (answer.add) {
        case "EMPLOYEE":
          addEmployee();
          break;
      }
    });
};

//function for creating a new department
const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: "deptName",
        type: "input",
        message: "What would you like to call the new DEPARTMENT?",
      },
    ])
    .then((answer) => {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO department SET ?",
        {
          department_name: answer.deptName,
        },
        (err) => {
          if (err) throw err;
          console.log("Your DEPARTMENT was created successfully!");
          // re-prompt the user for if they want to repeat
          start();
        }
      );
    });
};

//function for creating a new role
const addRole = () => {
  connection.query("SELECT * FROM department", (err, results) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "roleName",
          type: "input",
          message: "What would you like to call the new ROLE?",
        },
        {
          name: "salary",
          type: "number",
          message: "What is the salary for this new ROLE?",
        },
        {
          name: "roleDept",
          type: "list",
          message: "What is the department for this new ROLE?",
          //used the greatbaybasic.js file in 12-10 to find this example for pointing to the table in real time and displaying all current choices of a specific column in a table
          choices() {
            const choiceArray = [];
            results.forEach(({ id, department_name }) => {
              choiceArray.push({
                name: department_name,
                value: id,
              });
            });
            return choiceArray;
          },
        },
      ])
      .then((answer) => {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
          "INSERT INTO roles SET ?",
          {
            role_title: answer.roleName,
            salary: answer.salary,

            // QUESTION!
            // HOW DO I ADD DEPARTMENT_ID USING FOREIGN KEY LOGIC??
            // Tutor-Answer: turn the choices() function into an OBJECT to capture the value
            department_id: answer.roleDept,
          },
          (err) => {
            if (err) throw err;
            console.log("Your ROLE was created successfully!");
            // re-prompt the user for if they want to repeat
            start();
          }
        );
      });
  });
};

//function for creating new employee
const addEmployee = () => {
  connection.query("SELECT * FROM roles", (err, results) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "firstName",
          type: "input",
          message: "What's the EMPLOYEE's first name?",
        },
        {
          name: "lastName",
          type: "input",
          message: "What's the EMPLOYEE's last name?",
        },
        {
          name: "employeeRole",
          type: "list",
          message: "What's the EMPLOYEE's job title/role?",
          //used the greatbaybasic.js file in 12-10 to find this example for pointing to the table in real time and displaying all current choices of a specific column in a table
          choices() {
            const choiceArray = [];
            results.forEach(({ id, role_title }) => {
              choiceArray.push({
                name: role_title,
                value: id,
              });
            });
            return choiceArray;
          },
        },
      ])
      .then((answer) => {
        // when finished   prompting, insert a new item into the db with that info
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: answer.employeeRole,
          },
          (err) => {
            if (err) throw err;
            console.log("Your ROLE was created successfully!");
            // re-prompt the user for if they want to repeat
            start();
          }
        );
      });
  });
};

//function for calling UPDATE route
const update = () => {
  inquirer
    .prompt([
      {
        name: "update",
        type: "list",
        message: "What would you like to UPDATE?",
        choices: ["DEPARTMENT", "ROLE", "EMPLOYEE"],
      },
    ])
    .then((answer) => {
      switch (answer.update) {
        case "DEPARTMENT":
          updateDepartment();
          break;
      }
      switch (answer.update) {
        case "ROLE":
          updateRole();
          break;
      }
      switch (answer.update) {
        case "EMPLOYEE":
          updateEmployee();
          break;
      }
    });
};

const updateDepartment = () => {
  connection.query("SELECT * FROM department", (err, results) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "deptName",
          type: "list",
          message: "Which DEPARTMENT do you want to udpate?",
          choices() {
            const choiceArray = [];
            results.forEach(({ department_name, id }) => {
              choiceArray.push({
                name: department_name,
                value: id,
              });
            });
            return choiceArray;
          },
        },
        {
          name: "updatedName",
          type: "input",
          message: "What would you like to rename the DEPARTMENT to?",
        },
      ])
      .then((answer) => {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
          "UPDATE department SET ? WHERE ?",
          [
            {
              department_name: answer.updatedName,
            },
            {
              id: answer.deptName,
            },
          ],
          (err) => {
            if (err) throw err;
            console.log("Your DEPARTMENT was updated successfully!");
            // re-prompt the user for if they want to repeat
            start();
          }
        );
      });
  });
};

const updateRole = () => {
  connection.query("SELECT * FROM roles", (err, results) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "roleName",
          type: "list",
          message: "Which ROLE do you want to udpate?",
          choices() {
            const choiceArray = [];
            results.forEach(({ role_title, id }) => {
              choiceArray.push({
                name: role_title,
                value: id,
              });
            });
            return choiceArray;
          },
        },
        {
          name: "updatedName",
          type: "input",
          message: "What would you like to rename the ROLE to?",
        },
      ])
      .then((answer) => {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
          "UPDATE roles SET ? WHERE ?",
          [
            {
              role_title: answer.updatedName,
            },
            {
              id: answer.roleName,
            },
          ],
          (err) => {
            if (err) throw err;
            console.log("Your ROLE was updated successfully!");
            // re-prompt the user for if they want to repeat
            start();
          }
        );
      });
  });
};

const updateEmployee = () => {
  //realized for the other foreign keys, I should've been using INNER JOINs to query foreign data points such as role title from employee table
  connection.query(
    "SELECT employee.first_name, employee.last_name, employee.role_id, roles.role_title FROM roles INNER JOIN employee ON (employee.role_id=roles.id);",
    (err, results) => {
      if (err) throw err;
      inquirer
        .prompt([
          {
            name: "employeeName",
            type: "list",
            message: "Which EMPLOYEE do you want to udpate?",
            choices() {
              const choiceArray = [];
              results.forEach(({ first_name, last_name, employee_id }) => {
                choiceArray.push({
                  name: `${first_name} ${last_name}`,
                  value: employee_id,
                });
              });
              return choiceArray;
            },
          },
          {
            name: "updatedRole",
            type: "list",
            message: "What updated role should the EMPLOYEE have?",
            choices() {
              const choiceArray = [];
              results.forEach(({ role_title }) => {
                choiceArray.push(role_title);
              });
              return choiceArray;
            },
          },
        ])
        .then((answer) => {
          // when finished prompting, insert a new item into the db with that info
          connection.query(
            "UPDATE employee SET ? WHERE ?",
            [
              {
                role_id: answer.updatedRole,
              },
              {
                employee_id: answer.employeeName,
              },
            ],
            (err) => {
              if (err) throw err;
              console.log("Your ROLE was updated successfully!");
              // re-prompt the user for if they want to repeat
              start();
            }
          );
        });
    }
  );
};
