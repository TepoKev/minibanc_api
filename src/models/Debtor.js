import { DataTypes } from "sequelize";
import { sequelize } from "../database";
import Credit from "./Credit";
import Person from "./Person";

const Debtor = sequelize.define(
    "Debtor",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
    },
    {
        tableName: "debtors",
    }
);

export default Debtor;