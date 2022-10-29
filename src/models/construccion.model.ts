import { DataTypes, Sequelize } from "@sequelize/core/types";

export default (sequelize: Sequelize, DataType: typeof DataTypes) => {
  const construccion = sequelize.define(
    "Construcciones",
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4(),
      },
      floorsNumber: { type: DataType.INTEGER, allowNull: false },
      area: { type: DataType.FLOAT, allowNull: false },
      buildingType: { type: DataType.STRING, allowNull: false },
      address: { type: DataType.STRING, allowNull: false },
    },
    {
      freezeTableName: true,
    }
  );

  // @ts-ignore
  construccion.associate = (models: any): void => {
    construccion.belongsTo(models.Predios);
  };

  return construccion;
};
