//Required Modules
const inquirer = require("inquirer");
const mysql = require("mysql2");
const { empChoices, roleChoices } = require("./addFunctions.js");

const deleteRole = async (db, cb) => {
  const roles = await roleChoices(db.promise());
  inquirer
    .prompt([
      {
        type: "list",
        name: "deleteValue",
        message: "Which role?",
        choices: roles,
      },
    ])
    .then((data) => {
      db.promise()
        .query("DELETE FROM roles WHERE id = ?;", [data.deleteValue])
        .then(function (results) {
          console.log(`Removed Role from Database`);
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

module.exports = { deleteRole };
