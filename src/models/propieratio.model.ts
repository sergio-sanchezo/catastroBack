import { DataTypes, Sequelize } from "@sequelize/core/types";

export default (sequelize: Sequelize, DataType: typeof DataTypes) => {
  const propietario = sequelize.define(
    "Propietarios",
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4(),
      },
      address: { type: DataType.STRING, allowNull: false },
      phone: { type: DataType.STRING, allowNull: false },
      email: { type: DataType.STRING },
      type: {
        type: DataType.ENUM("Natural", "Juridica"),
        allowNull: false,
      },

      // Personas naturales
      docType: { type: DataType.STRING },
      docNum: { type: DataType.STRING },
      name: { type: DataType.STRING },

      // Personas juridicas
      nit: { type: DataType.STRING },
      businessName: { type: DataType.STRING },
    },
    {
      freezeTableName: true,
    }
  );

  //@ts-ignore
  propietario.associate = (models: any): void => {
    propietario.belongsToMany(models.Predios, {
      through: models.Propietario_Predio,
    });
  };

  return propietario;
};
