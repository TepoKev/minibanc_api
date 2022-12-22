import { DataTypes } from "sequelize";
import { sequelize } from "../database";
import Credit from "./Credit";

const Quota = sequelize.define(
  "Quota",
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
    collectionDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "quotas",
  }
);

Credit.hasMany(Quota, { foreignKey: "creditId" });
Quota.belongsTo(Credit, { foreignKey: "creditId" });

export default Quota;
