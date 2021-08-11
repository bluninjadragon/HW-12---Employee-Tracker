const connection = require('./connection');

class Query {
  constructor(connection) {
    this.connection = connection;
  }

  //query all employees from table
  getAllEmployees() {
    return this.connection.promise().query("SELECT * FROM employee");
    };

  //query all employees from table
  getAllDepartments() {
    return this.connection.promise().query("SELECT * FROM department");
  }
};

modules.export = new Query(connection);