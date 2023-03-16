const inquirer = require("inquirer");
const mysql = require("mysql2");
const { empChoices, depChoices, roleChoices } = require("./addFunctions.js");

const db = mysql
  .createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "employee_db",
  })
  .promise();

const updateRole = async (cb) => {
  const employees = await empChoices();
  const roles = await roleChoices();
  // const test2 = await depChoices();
  // console.log(employees);
  // console.log(test);
  // console.log(test2);
  inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: "Which employee would you like to Update their Role?",
        choices: employees,
      },
      {
        type: "list",
        name: "newRole",
        message: "What Role would you like to change it too?",
        choices: roles,
      },
    ])
    .then((data) => {
      db.query("UPDATE employees SET roles_id = ? WHERE id = ?;", [
        data.newRole,
        data.employee,
      ]).then(function (results) {
        console.log(`${data.employee}'s role was updated to ${data.newRole}`);
        cb();
      });
    })
    .catch((error) => {
      if (error) {
        console.log("Couldnt Render Prompt");
      } else {
        console.log("Error with inquire, check if update is needed");
      }
    });
};

module.exports = { updateRole };
