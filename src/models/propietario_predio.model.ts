import { DataTypes, Sequelize } from "@sequelize/core/types";

export default (sequelize: Sequelize, DataType: typeof DataTypes) => {
  const propietario_predio = sequelize.define(
    "Propietario_Predio",
    {},
    { freezeTableName: true }
  );

  return propietario_predio;
};
