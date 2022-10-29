import { ModelCtor } from "sequelize-typescript";

export interface IModels {
  Predios: ModelCtor;
  Terrenos: ModelCtor;
  Construcciones: ModelCtor;
  Propietarios: ModelCtor;
  Propietario_Predio: ModelCtor;
}
