const connection = require('./connection');

class Query {
    constructor(connection) { this.connection = connection }

    //query all employees from table
    getAllEmployees() {
        return this.connection.promise().query('SELECT * FROM employee')
    }
};

modules.export = new Query(connection);