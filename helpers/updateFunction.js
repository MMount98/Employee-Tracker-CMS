const inquirer = require("inquirer");
const mysql = require("mysql2");
const { empChoices, roleChoices } = require("./addFunctions.js");

const updateRole = async (db, cb) => {
  const employees = await empChoices(db.promise());
  const roles = await roleChoices(db.promise());

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
      db.promise()
        .query("UPDATE employees SET roles_id = ? WHERE id = ?;", [
          data.newRole,
          data.employee,
        ])
        .then(function (results) {
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

const updateManager = async (db, cb) => {
  const employees = await empChoices(db.promise());

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
        name: "newManager",
        message: "Who is the new Manager?",
        choices: employees,
      },
    ])
    .then((data) => {
      db.promise()
        .query("UPDATE employees SET manager_id = ? WHERE id = ?", [
          data.newManager,
          data.employee,
        ])
        .then(function (results) {
          console.log(`${data.employee}'s new Manager is ${data.newManager}`);
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

module.exports = { updateRole, updateManager };
