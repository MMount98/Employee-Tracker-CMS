//Modules
const mysql = require("mysql2");

//Helpers
const initial = require("./helpers/inquirer.js");

//CONNECTION
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "employee_db",
});

initial(db);
