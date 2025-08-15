const { Sequelize } = require("sequelize");

const dbConfig = {
  host: "127.0.0.1",
  user: "root",
  password: "S@ikiran9959",
  database: "formtable",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 300000,
    idle: 100000,
  },
};

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("DB Connected successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

sequelize
  .sync({ force: false }) // Use 'force: true' to drop and recreate tables, 'alter: true' to update existing tables
  .then(() => {
    console.log("Database synchronized successfully.");
  })
  .catch((err) => {
    console.error("Error synchronizing database:", err);
  });

module.exports = sequelize;
