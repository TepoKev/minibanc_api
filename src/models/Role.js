import { DataTypes } from "sequelize";
import { sequelize } from "../database";

const Role = sequelize.define(
  "Role",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "roles",
  }
);

export default Role;
