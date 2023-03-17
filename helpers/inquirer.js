const inquirer = require("inquirer");
const mysql = require("mysql2");
const table = require("console.table");
const { addDep, addRole, addEmpl } = require("./addFunctions.js");
const { updateRole, updateManager } = require("./updateFunction.js");
const { deleteRole, deleteDepartment } = require("./deleteFunctions.js");
var figlet = require("figlet");

const initial = (db) => {
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
          "Update an Employee Manager",
          "Delete a Role",
          "Delete a Department",
          "Quit",
        ],
      },
    ])
    .then((data) => {
      switch (data.selection) {
        case "View All Departments":
          db.query("SELECT * FROM departments", function (err, results) {
            console.table(results);
            initial(db);
          });
          break;
        case "View All Employees":
          db.query(
            "SELECT employees.id, employees.first_name, employees.last_name, roles.title,  departments.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees LEFT JOIN roles ON employees.roles_id = roles.id LEFT JOIN departments ON roles.departments_id = departments.id LEFT JOIN employees AS manager ON manager.id = employees.manager_id;",
            function (err, results) {
              console.table(results);
              initial(db);
            }
          );
          break;
        case "Veiw All Roles":
          db.query(
            "SELECT roles.id, roles.title, departments.name AS department, roles.salary FROM roles JOIN departments ON roles.departments_id  = departments.id ORDER BY roles.id;",
            function (err, results) {
              if (err) {
                console.log(err);
              } else {
                console.table(results);
                initial(db);
              }
            }
          );
          break;
        case "Add a Department":
          addDep(db, initial);
          break;

        case "Add a Role":
          return addRole(db, initial);
          break;

        case "Add an Employee":
          return addEmpl(db, initial);
          break;

        case "Update an Employee role":
          return updateRole(db, initial);
          break;

        case "Update an Employee Manager":
          return updateManager(db, initial);
          break;

        case "Delete a Role":
          return deleteRole(db, initial);
          break;

        case "Delete a Department":
          return deleteDepartment(db, initial);
          break;

        case "Quit":
          db.end(function (err) {
            if (err) {
              return console.log("error:" + err.message);
            }
            console.log(
              figlet.textSync("GoodBye! Have a Great Day!", {
                width: 120,
                whitespaceBreak: true,
              })
            );
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
