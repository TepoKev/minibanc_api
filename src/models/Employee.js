import { DataTypes } from "sequelize";
import { sequelize } from "../database";
import Person from "./Person";
import Subsidiaire from "./Subsidiarie";

const Employee = sequelize.define(
  "Employee",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
  },
  {
    tableName: "employees",
  }
);

Person.hasOne(Employee, { foreignKey: "personId" });
Employee.belongsTo(Person, { foreignKey: "personId" });

Subsidiaire.hasOne(Employee, { foreignKey: "subsidiarieId" });
Employee.belongsTo(Subsidiaire, { foreignKey: "subsidiarieId" });

export default Employee;
