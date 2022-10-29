import { DataTypes } from "sequelize";
import { sequelize } from "../database";
import Role from "./Role";
import User from "./user";

const UserRole = sequelize.define(
  "UserRole",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    }
  },
  {
    tableName: "userroles"
  }
);

Role.hasMany(UserRole, { foreignKey: "roleId" });
UserRole.belongsTo(Role, { foreignKey: "roleId" });

User.hasMany(UserRole, { foreignKey: "userId" });
UserRole.belongsTo(User, { foreignKey: "userId" });

export default UserRole;