const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    db: {
      host: "sql10.freesqldatabase.com",
      database: "sql10745805",
      email: "polalextest@gamil.com",
      password: "test1234",
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        queryDb: (query) => {
          return queryTestDb(query, config);
        },
      });
    },
  },
});
const mysql = require("mysql");
function queryTestDb(query, config) {
  const connection = mysql.createConnection({
    host: config.env.db.host,
    email: config.env.db.email,
    password: config.env.db.password,
    database: config.env.db.database,
  });
  connection.connect();
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject(error);
      else {
        connection.end();
        resolve(results);
      }
    });
  });
}
