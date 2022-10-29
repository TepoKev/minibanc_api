import { DataTypes } from "sequelize";
import { sequelize } from "../database";
import Gender from "./Gender";

const Person = sequelize.define(
  "Person",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    dui: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    photoUrl: {
      type: DataTypes.STRING(2000),
      allowNull: true,
    },
  },
  {
    tableName: "persons",
  }
);

Gender.hasOne(Person, { foreignKey: "genderId" });
Person.belongsTo(Gender, { foreignKey: "genderId" });

export default Person;
