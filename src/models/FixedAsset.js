import { DataTypes } from "sequelize";
import { sequelize } from "../database";
import Category from "./Category";
import Employee from "./Employee";

const FixedAsset = sequelize.define(
  "FixedAsset",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    cant: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    registrationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    purchaseStatus: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      comment: "P: Purchased, R: Received, D: Donated",
    },
    catalogNumber: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
  },
  {
    tableName: "fixedAssets",
  }
);

Category.hasMany(FixedAsset, { foreignKey: "categoryId" });
FixedAsset.belongsTo(Category, { foreignKey: "categoryId" });

Employee.hasMany(FixedAsset, { foreignKey: "employeeId" });
FixedAsset.belongsTo(Employee, { foreignKey: "employeeId" });

export default FixedAsset;
