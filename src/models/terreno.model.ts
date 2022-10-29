import { DataTypes, Sequelize } from "@sequelize/core/types";

export default (sequelize: Sequelize, DataType: typeof DataTypes) => {
  const terreno = sequelize.define(
    "Terrenos",
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4(),
      },
      area: { type: DataType.FLOAT, allowNull: false },
      comercialValue: { type: DataType.FLOAT, allowNull: false },
      nearWaterBodies: { type: DataType.BOOLEAN, allowNull: false },
      terrainType: { type: DataType.STRING, allowNull: false },
      hasBuildings: { type: DataType.BOOLEAN, allowNull: false },
    },
    {
      freezeTableName: true,
    }
  );

  // @ts-ignore
  terreno.associate = (models: any): void => {
    terreno.belongsTo(models.Predios);
  };

  return terreno;
};
