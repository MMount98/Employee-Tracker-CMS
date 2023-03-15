const inquirer = require("inquirer");
const mysql = require("mysql2");
const initial = require("./inquirer.js");

const db = mysql.createConnection(
  {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "employee_db",
  },
);

const addRole = () => {
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
        choices: ["Billing", "Human Resources", "Engineering", "Sales"],
      },
    ])
    .then((data) => {
      switch (data.department) {
        case "Billing":
          db.query(
            "INSERT INTO role (title, salary, department_id) VALUES (?,?,1)",
            [data.title, data.salary],
            function (err, results) {
              if (err) {
                console.log(err);
              } else {
                console.log(`Added ${data.title} to database`);
              }
            }
          );
          break;
        case "Human Resources":
          db.query(
            "INSERT INTO role (title, salary, department_id) VALUES (?,?,2)",
            [data.title, data.salary],
            function (err, results) {
              if (err) {
                console.log(err);
              } else {
                console.log(`Added ${data.title} to database`);
              }
            }
          );
          break;
        case "Engineering":
          db.query(
            "INSERT INTO role (title, salary, department_id) VALUES (?,?,3)",
            [data.title, data.salary],
            function (err, results) {
              if (err) {
                console.log(err);
              } else {
                console.log(`Added ${data.title} to database`);
              }
            }
          );
          break;
        case "Sales":
          db.query(
            "INSERT INTO role (title, salary, department_id) VALUES (?,?,4)",
            [data.title, data.salary],
            function (err, results) {
              if (err) {
                console.log(err);
              } else {
                console.log(`Added ${data.title} to database`);
              }
            }
          );
          break;
        default:
          console.log("Error adding in new Role");
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

module.exports = addRole;
