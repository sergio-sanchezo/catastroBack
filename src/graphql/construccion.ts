import { gql } from "apollo-server";
import { IModels } from "../interfaces";

export const typeDefs = gql`
  type Construccion {
    id: ID!
    floorsNumber: Int
    area: Float
    buildingType: String
    address: String
  }

  extend type Query {
    listConstrucciones: [Construccion]
    getConstruccion(id: ID): Construccion
  }

  extend type Mutation {
    createConstruccion(input: ConstruccionInput): Construccion
    updateConstruccion(input: UpdateConstruccionInput): Construccion
    deleteConstruccion(id: ID): Boolean
  }

  input ConstruccionInput {
    floorsNumber: Int
    area: Float
    buildingType: String
    address: String
    PredioId: ID
  }

  input UpdateConstruccionInput {
    id: ID!
    floorsNumber: Int
    area: Float
    buildingType: String
    address: String
    PredioId: ID
  }
`;

export const resolvers = {
  Query: {
    listConstrucciones: async (
      _: any,
      __: any,
      { models }: { models: IModels }
    ) => {
      try {
        return await models.Construcciones.findAll();
      } catch (error) {
        console.log(error);
      }
    },

    getConstruccion: async (
      _: any,
      { id }: any,
      { models }: { models: IModels }
    ) => {
      try {
        return await models.Construcciones.findByPk(id);
      } catch (error) {
        console.log(error);
      }
    },
  },

  Mutation: {
    createConstruccion: async (
      _: any,
      { input }: any,
      { models }: { models: IModels }
    ) => {
      try {
        return await models.Construcciones.create({ ...input });
      } catch (error) {
        console.log(error);
      }
    },

    updateConstruccion: async (
      _: any,
      { input }: any,
      { models }: { models: IModels }
    ) => {
      try {
        const { id, ...restInput } = input;
        return await models.Construcciones.update(
          { ...restInput },
          { where: { _id: id } }
        );
      } catch (error) {
        console.log(error);
      }
    },

    deleteConstruccion: async (
      _: any,
      { id }: any,
      { models }: { models: IModels }
    ) => {
      try {
        await models.Construcciones.destroy({ where: { id } });
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
