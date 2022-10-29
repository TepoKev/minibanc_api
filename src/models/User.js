import { DataTypes } from "sequelize";
import { sequelize } from "../database";
import Person from "./Person";

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
      allowNull: false,
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

export default User;
