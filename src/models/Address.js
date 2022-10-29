import { DataTypes } from "sequelize";
import { sequelize } from "../database";
import Person from "./Person";
import Province from "./Province";

const Address = sequelize.define(
  "Address",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    number: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  { tableName: "addresses" }
);

Person.hasMany(Address, { foreignKey: "personId" });
Address.belongsTo(Person, { foreignKey: "personId" });

Province.hasMany(Address, { foreignKey: "provinceId"});
Address.belongsTo(Province, { foreignKey: "provinceId" });

export default Address;
