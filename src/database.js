import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("minibanc", "postgres", "root", {
  host: "localhost",
  dialect: "postgres",
  pool: 5,
  port: '5432'
});
