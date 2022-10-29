import { gql } from "apollo-server";
import { IModels } from "../interfaces";

export const typeDefs = gql`
  type Predio {
    id: ID!
    numberIdentifier: String!
    value: Float!
    name: String!
    department: String!
    municipality: String!
    Propietarios: [Propietario]
    Construcciones: [Construccion]
    Terreno: Terreno
  }

  extend type Query {
    listPredios: [Predio]
    getPredio(id: ID): Predio
  }

  extend type Mutation {
    createPredio(input: PredioInput): Predio
    updatePredio(input: UpdatePredioInput): Predio
    deletePredio(id: ID): Boolean
  }

  input PredioInput {
    numberIdentifier: String!
    value: Float!
    name: String!
    department: String!
    municipality: String!
    Propietarios: [ID]
    Construcciones: [ConstruccionInput]
    Terreno: TerrenoInput
  }

  input UpdatePredioInput {
    id: ID!
    numberIdentifier: String
    value: Float
    name: String
    department: String
    municipality: String
    Propietarios: [ID]
    Construcciones: [ConstruccionInput]
    Terreno: TerrenoInput
  }
`;

export const resolvers = {
  Query: {
    listPredios: async (_: any, __: any, { models }: { models: IModels }) => {
      try {
        const predios = await models.Predios.findAll({
          include: [
            models.Terrenos,
            models.Construcciones,
            models.Propietarios,
          ],
        });

        return predios;
      } catch (error) {
        console.log(error);
      }
    },

    getPredio: async (_: any, { id }: any, { models }: { models: IModels }) => {
      try {
        return await models.Predios.findByPk(id, {
          include: ["Terreno", "Construcciones", "Propietarios"],
        });
      } catch (error) {
        console.log(error);
      }
    },
  },

  Mutation: {
    createPredio: async (
      _: any,
      { input }: any,
      { models }: { models: IModels }
    ) => {
      try {
        const newPredio = await models.Predios.create({ ...input });
        if (input.Propietarios) {
          await Promise.all(
            input.Propietarios.forEach(async (propietarioId: any) => {
              const propietario = await models.Propietarios.findByPk(
                propietarioId
              );
              //@ts-ignore
              await newPredio.addPropietarios(propietario);
            })
          );
        }
        return newPredio;
      } catch (error) {
        console.log(error);
      }
    },

    updatePredio: async (
      _: any,
      { input }: any,
      { models }: { models: IModels }
    ) => {
      try {
        const { id, ...restInput } = input;
        return await models.Predios.update({ ...restInput }, { where: { id } });
      } catch (error) {
        console.log(error);
      }
    },

    deletePredio: async (
      _: any,
      { id }: any,
      { models }: { models: IModels }
    ) => {
      try {
        await models.Predios.destroy({ where: { id } });
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
