//Modules
const inquirer = require("inquirer");
const mysql = require("mysql2");
const table = require("console.table");
const db = mysql.createConnection(
  {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "employee_db",
  },
  console.log(`Connected to Employee Database!`)
);

inquirer
  .prompt([
    {
      type: "list",
      name: "selection",
      message: "What would you like to do?",
      choices: [
        "View All Departments",
        "View All Employees",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Update an Employee role",
        "Quit",
      ],
    },
  ])
  .then((data) => {
    switch (data.selection) {
      case "View All Departments":
        db.query("SELECT * FROM departments", function (err, results) {
          console.table(results);
        });
        break;
      case "View All Employees":
        db.query("SELECT * FROM employee", function (err, results) {
          console.table(results);
        });
        break;
      case "Add a Department":
        break;
      default:
        throw Error("Failed to pass shape value to Constructor");
    }
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Coudnlt Render Prompt");
    } else {
      console.log("Error with inquire, check if update is needed");
    }
  });
