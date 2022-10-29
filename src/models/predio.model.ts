import { DataTypes, Sequelize } from "@sequelize/core/types";

export default (sequelize: Sequelize, DataType: typeof DataTypes) => {
  const predio = sequelize.define(
    "Predios",
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4(),
      },
      numberIdentifier: {
        allowNull: false,
        type: DataType.STRING,
        unique: true,
      },
      value: { type: DataType.FLOAT, allowNull: false },
      name: { type: DataType.STRING, allowNull: false },
      department: { type: DataType.STRING, allowNull: false },
      municipality: { type: DataType.STRING, allowNull: false },
    },
    {
      freezeTableName: true,
    }
  );

  //@ts-ignore
  predio.associate = (models: IModels): void => {
    predio.belongsToMany(models.Propietarios, {
      through: models.Propietario_Predio,
    });

    predio.hasMany(models.Construcciones);

    predio.hasOne(models.Terrenos);
  };

  return predio;
};
