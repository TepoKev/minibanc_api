import { DataTypes } from "sequelize";
import { sequelize } from "../database";
import Credit from "./Credit";

const Refinancing = sequelize.define(
    "Refinancing",
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
        refinancingDate: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    },
    {
        tableName: "refinancings",
    }
);

Credit.hasMany(Refinancing, { foreignKey: "creditId" });
Refinancing.belongsTo(Credit, { foreignKey: "creditId" });

export default Refinancing;