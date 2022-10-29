import { DataTypes } from "sequelize";
import { sequelize } from "../database";
import Person from "./Person";

const Gender = sequelize.define(
  "Gender",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  { tableName: "genres" }
);

export default Gender;
