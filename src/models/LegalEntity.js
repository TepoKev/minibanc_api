import { DataTypes } from "sequelize";
import { sequelize } from "../database";

import Person from "./Person";

const LegalEntity = sequelize.define(
  "LegalEntity",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name:{
      type: DataTypes.STRING(300),
      allowNull: false,
    }
  },
  {
    tableName: "legalEntitys",
  }
);

Person.hasOne(LegalEntity, { foreignKey: "legalAgentId" });
LegalEntity.belongsTo(Person, { foreignKey: "legalAgentId" });

export default LegalEntity;
