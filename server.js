//Modules
const mysql = require("mysql2");
var figlet = require("figlet");

//Helpers
const initial = require("./helpers/inquirer.js");

//CONNECTION
const db = mysql.createConnection(
  {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "employee_db",
  },
  console.log(
    figlet.textSync("Employee  Manager", {
      width: 120,
      whitespaceBreak: true,
    })
  )
);


initial(db);
