var sql = require("mssql");

var dbConfig = {
    server: "localhost",
    database: "BGrade",
    user: "sa",
    password: "dung12345678",
    port: 1433
};

const db = new sql.ConnectionPool(dbConfig);
//console.log(db);
module.exports = db