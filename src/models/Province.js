import { DataTypes } from "sequelize";
import { sequelize } from "../database";
import Country from "./Country";

const Province = sequelize.define(
  "Province",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    zipCode: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },
  },
  { tableName: "provinces" }
);

Country.hasMany(Province, { foreignKey: "countryId" });
Province.belongsTo(Country, { foreignKey: "countryId" });

export default Province;
