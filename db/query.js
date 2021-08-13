const connection = require("./connection");

class Query {
  constructor(connection) {
    this.connection = connection;
  }

  //query all employees from table
  getAllEmployees() {
    return this.connection.promise().query("SELECT * FROM employee");
  }

  //query all dep from table
  getAllDepartments() {
    return this.connection.promise().query("SELECT * FROM department");
  }

  //query all role from table
  getAllRoles() {
    return this.connection.promise().query("SELECT * FROM roles");
  }
}

module.export = new Query(connection);
