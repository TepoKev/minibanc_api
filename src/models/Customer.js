import { DataTypes } from "sequelize";
import { sequelize } from "../database";
import Person from "./Person";

const Customer = sequelize.define(
  "Customer",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
  },
  {
    tableName: "customers",
  }
);

Person.hasOne(Customer, { foreignKey: "personId" });
Customer.belongsTo(Person, { foreignKey: "personId" });

export default Customer;