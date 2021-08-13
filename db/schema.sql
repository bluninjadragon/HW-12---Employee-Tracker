DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;

USE employee_DB;

CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles(
  id INT NOT NULL AUTO_INCREMENT,
  role_title VARCHAR(30) NOT NULL,
  salary DECIMAL(2) NOT NULL,
  department_id INT default 0,
  FOREIGN KEY (department_id) REFERENCES department(id),
  PRIMARY KEY (id)
);

CREATE TABLE employee(
  id INT AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT default 0,
  FOREIGN KEY (role_id) REFERENCES roles(id),
  manager_id INT default 0,
  FOREIGN KEY (manager_id) REFERENCES employee(id),
  PRIMARY KEY (id)
);

-- starting/sample data

INSERT INTO department (department_name)
VALUES ("Internal Medicine");

INSERT INTO roles (role_title, salary, department_id)
VALUES ("Physician", "200000.01", "1");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Smith", "1", "1");