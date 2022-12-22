import { DataTypes } from "sequelize";
import { sequelize } from "../database";

const TypeCredit = sequelize.define(
  "TypeCredit",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "typeCredits",
  }
);
 export default TypeCredit;