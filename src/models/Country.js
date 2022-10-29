import { DataTypes } from "sequelize";
import { sequelize } from "../database";

const Country = sequelize.define(
  "Country",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  { tableName: "countries" }
);

export default Country;
