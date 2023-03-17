DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE departments (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
departments_id INT,
FOREIGN KEY (departments_id)
REFERENCES departments(id)
ON DELETE SET NULL
);

CREATE TABLE employees (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
first_name VARCHAR (30) NOT NULL,
last_name VARCHAR (30) NOT NULL,
roles_id INT,
manager_id INT REFERENCES employees,

FOREIGN KEY (roles_id)
REFERENCES roles(id)
ON DELETE SET NULL
);