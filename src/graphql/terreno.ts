import { gql } from "apollo-server";
import { IModels } from "../interfaces";

export const typeDefs = gql`
  type Terreno {
    id: ID!
    area: Float!
    comercialValue: Float!
    nearWaterBodies: Boolean!
    terrainType: String!
    hasBuildings: Boolean!
  }

  extend type Query {
    listTerrenos: [Terreno]
    getTerreno(id: ID): Terreno
  }

  extend type Mutation {
    createTerreno(input: TerrenoInput): Terreno
    updateTerreno(input: UpdateTerrenoInput): Terreno
    deleteTerreno(id: ID): Boolean
  }

  input TerrenoInput {
    area: Float
    comercialValue: Float
    nearWaterBodies: Boolean
    terrainType: String
    hasBuildings: Boolean
    PredioId: ID
  }

  input UpdateTerrenoInput {
    id: ID!
    area: Float
    comercialValue: Float
    nearWaterBodies: Boolean
    terrainType: String
    hasBuildings: Boolean
    PredioId: ID
  }
`;

export const resolvers = {
  Query: {
    listTerrenos: async (_: any, __: any, { models }: { models: IModels }) => {
      try {
        return await models.Terrenos.findAll();
      } catch (error) {
        console.log(error);
      }
    },

    getTerreno: async (
      _: any,
      { id }: any,
      { models }: { models: IModels }
    ) => {
      try {
        return await models.Terrenos.findByPk(id);
      } catch (error) {
        console.log(error);
      }
    },
  },

  Mutation: {
    createTerreno: async (
      _: any,
      { input }: any,
      { models }: { models: IModels }
    ) => {
      try {
        return await models.Terrenos.create({ ...input });
      } catch (error) {
        console.log(error);
      }
    },

    updateTerreno: async (
      _: any,
      { input }: any,
      { models }: { models: IModels }
    ) => {
      try {
        const { id, ...restInput } = input;
        return await models.Terrenos.update(
          { ...restInput },
          { where: { id } }
        );
      } catch (error) {
        console.log(error);
      }
    },

    deleteTerreno: async (
      _: any,
      { id }: any,
      { models }: { models: IModels }
    ) => {
      try {
        await models.Terrenos.destroy({ where: { id } });
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
