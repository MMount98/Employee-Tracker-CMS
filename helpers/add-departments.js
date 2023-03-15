const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "employee_db",
});

const addDep = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the new Department's name?",
      },
    ])
    .then((data) => {
      db.query(
        "INSERT INTO departments (name) VALUES (?)",
        [data.title],
        function (err, results) {
          if (err) {
            console.log(err);
          } else {
            console.log(`Added ${data.title} to database`);
          }
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

module.exports = addDep;
