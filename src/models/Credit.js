import { DataTypes } from "sequelize";
import { sequelize } from "../database";
import Employee from "./Employee";
import TypeCredit from "./TypeCredit";

const Credit = sequelize.define(
  "Credit",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    paymentPeriod: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "in months",
    },
    totalFees: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "credits",
  }
);
Employee.hasMany(Credit, { foreignKey: "employeeId" });
Credit.belongsTo(Employee, { foreignKey: "employeeId" });

TypeCredit.hasMany(Credit, { foreignKey: "typeCreditId" });
Credit.belongsTo(TypeCredit, { foreignKey: "typeCreditId" });

export default Credit;
