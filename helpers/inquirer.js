const inquirer = require("inquirer");
const mysql = require("mysql2");
const table = require("console.table");
const { addDep, addRole } = require("./addFunctions.js");

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "employee_db",
});

const initial = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "selection",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "View All Employees",
          "Veiw All Roles",
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
            initial();
          });
          break;
        case "View All Employees":
          db.query(
            "SELECT first_name, last_name, title, salary FROM employee JOIN role ON employee.role_id = role.id ",
            function (err, results) {
              console.table(results);
              initial();
            }
          );
          break;
        case "Veiw All Roles":
          db.query(
            "SELECT title, name AS department, salary FROM role JOIN departments ON role.department_id = departments.id;",
            function (err, results) {
              console.table(results);
              initial();
            }
          );
          break;
        case "Add a Department":
          addDep(initial);
          break;

        case "Add a Role":
          return addRole(initial);
          break;

        case "Quit":
          db.end(function (err) {
            if (err) {
              return console.log("error:" + err.message);
            }
            console.log("Close the database connection.");
          });
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
};

module.exports = initial;
