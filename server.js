//Modules
const mysql = require("mysql2");

//Helpers
const initial = require("./helpers/inquirer.js");

//
const db = mysql
  .createConnection(
    {
      host: "127.0.0.1",
      user: "root",
      password: "",
      database: "employee_db",
    },
    console.log(`Connected to Employee Database!`)
  )


initial();
