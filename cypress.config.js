const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    db: {
      host: "sql10.freesqldatabase.com",
      user: "sql10749772",
      password: "6BzzLJPDtF",
      database: "sql10749772",
      port: 3306,
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
    user: config.env.db.user,
    password: config.env.db.password,
    database: config.env.db.database,
    port: config.env.db.port,
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
