import { DataTypes } from "sequelize";
import { sequelize } from "../database";
import Person from "./Person";
import LegalEntity from "./LegalEntity";
import Role from "./Role";

const User = sequelize.define(
  "User",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: "users",
  }
);

User.hasOne(Person, { foreignKey: "userId" });
Person.belongsTo(User, { foreignKey: "userId" });

Role.hasOne(User, { foreignKey: "roleId" });
User.belongsTo(Role, { foreignKey: "roleId" });

export default User;
