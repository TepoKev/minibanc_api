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

Credit.hasMany(Debtor, { foreignKey: "creditId" });
Debtor.belongsTo(Credit, { foreignKey: "creditId" });

Person.hasMany(Debtor, { foreignKey: "personId" });
Debtor.belongsTo(Person, { foreignKey: "personId" });

export default Debtor;