const Sequelize = require("sequelize");
​
const sequelize = new Sequelize("dbName", "id", "pw", {
  dialect: "mysql",
  host: "localhost",
});
​
module.exports = sequelize;