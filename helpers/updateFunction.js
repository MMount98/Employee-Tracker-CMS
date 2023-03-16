const inquirer = require("inquirer");
const mysql = require("mysql2");
const { empChoices, roleChoices } = require("./addFunctions.js");

const updateRole = async (db, cb) => {
  const employees = await empChoices(db);
  const roles = await roleChoices(db);

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
        console.log(`Employee's role was updated`);
        cb(db);
      });
    })
    .catch((error) => {
      if (error) {
        console.log("Couldnt Render Prompt");
      } else {
        console.log("Error with my life");
      }
    });
};

module.exports = { updateRole };
