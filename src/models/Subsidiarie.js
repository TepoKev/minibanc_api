import { DataTypes } from "sequelize";
import { sequelize } from "../database";

const Subsidiaire = sequelize.define(
  "Subsidiaire",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  },
  { tableName: "subsidiaires" }
);

export default Subsidiaire;
