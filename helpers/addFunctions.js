const inquirer = require("inquirer");
const mysql = require("mysql2");
const initial = require("./inquirer.js");

const db = mysql
  .createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "employee_db",
  })
  .promise();

const depChoices = async () => {
  const departments = await db.query(
    `SELECT id AS value, name FROM departments;`
  );
  return departments[0];
};

const addRole = async (cb) => {
  const departments = await depChoices();
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
      db.query("INSERT INTO role(title,salary,department_id) VALUES (?,?,?)", [
        data.title,
        data.salary,
        data.department,
      ]).then(function (results) {
        console.log(`Added ${data.title} to role database`);
        cb();
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

const addDep = (cb) => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the new Department's name?",
      },
    ])
    .then((data) => {
      console.log(data);
      db.query("INSERT INTO departments (name) VALUES (?)", [data.title]).then(
        function (results) {
          console.log(`Added ${data.title} to department database`);
          cb();
        }
      );
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log("Coudnlt Render Prompt");
      } else {
        console.log("Error with inquire, check if update is needed");
      }
    });
};

module.exports = { addRole, addDep };
