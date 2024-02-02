"use strict";
const { Sequelize } = require("sequelize");

// setup mysql connection for sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 10000,
      idle: 8000,
    },
    logging: false,
    timezone: "Pacific/Auckland",
  }
);

// connect ot mysql function
const connectMysql = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      `Successful connection to MySQL Database ${process.env.DB_NAME}`
    );
  } catch (error) {
    console.error("Unable to connect to MySQL database:", error);
    process.exit(1);
  }
};

// run the connect function
connectMysql();

module.exports = {
  Sequelize: sequelize,
  connectMysql,
};
