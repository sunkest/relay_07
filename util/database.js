const Sequelize = require("sequelize");

const sequelize = new Sequelize("relay07", "relay07", "1q2w3e4r", {
  dialect: "mysql",
  host: "52.79.240.124",
});

module.exports = sequelize;
