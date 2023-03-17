//Required Modules
const inquirer = require("inquirer");
const mysql = require("mysql2");

//Queary Functions

const depChoices = async (db) => {
  const departments = await db.query(
    `SELECT id AS value, name FROM departments;`
  );
  return departments[0];
};

const roleChoices = async (db) => {
  const employees = await db.query(
    `SELECT id AS value, title AS name FROM roles;`
  );
  return employees[0];
};

const empChoices = async (db) => {
  const mangers = await db.query(
    `SELECT id AS value, CONCAT(first_name, " ", last_name) AS name FROM employees;`
  );
  return mangers[0];
};

//Adding Functions

const addRole = async (db, cb) => {
  const departments = await depChoices(db.promise());
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What Role would you like to add?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the going salary?",
      },
      {
        type: "list",
        name: "department",
        message: "Which department?",
        choices: departments,
      },
    ])
    .then((data) => {
      db.promise()
        .query(
          "INSERT INTO roles(title,salary,departments_id) VALUES (?,?,?)",
          [data.title, data.salary, data.department]
        )
        .then(function (results) {
          console.log(`Added ${data.title} to roles database`);
          cb(db);
        });
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log("Coudnlt Render Prompt");
      } else {
        console.log("Error with inquire, check if update is needed");
      }
    });
};

const addDep = (db, cb) => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the new Department's name?",
      },
    ])
    .then((data) => {
      db.promise()
        .query("INSERT INTO departments (name) VALUES (?)", [data.title])
        .then(function (results) {
          console.log(`Added ${data.title} to department database`);
          cb(db);
        });
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log("Coudnlt Render Prompt");
      } else {
        console.log("Error with inquire, check if update is needed");
      }
    });
};

const addEmpl = async (db, cb) => {
  const employees = await roleChoices(db.promise());
  const mangers = await empChoices(db.promise());
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the employee's last name?",
      },
      {
        type: "list",
        name: "role",
        message: "What is the employee's role?",
        choices: employees,
      },
      {
        type: "list",
        name: "manger",
        message: "What is the employee's manger?",
        choices: mangers,
      },
    ])
    .then((data) => {
      db.promise()
        .query(
          "INSERT INTO employees (first_name,last_name,roles_id,manager_id) VALUES (?,?,?,?)",
          [data.first_name, data.last_name, data.role, data.manger]
        )
        .then(function (results) {
          console.log(
            `Added ${data.first_name} ${data.last_name} to roles database`
          );
          cb(db);
        });
    })
    .catch((error) => {
      if (error) {
        console.log("Could not Render Prompt");
      } else {
        console.log("Error with inquire, check if update is needed");
      }
    });
};

module.exports = {
  addRole,
  addDep,
  addEmpl,
  empChoices,
  depChoices,
  roleChoices,
};
