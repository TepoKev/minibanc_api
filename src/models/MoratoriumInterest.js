import { DataTypes } from "sequelize";
import { sequelize } from "../database";
import Quota from "./Quota";

const MoratoriumInterest = sequelize.define(
  "MoratoriumInterest",
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
    paymentDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { tableName: "moratoriumInterests" }
);

Quota.hasOne(MoratoriumInterest, { foreignKey: "quotaId" });
MoratoriumInterest.belongsTo(Quota, { foreignKey: "quotaId" });

export default MoratoriumInterest;
