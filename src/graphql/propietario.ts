import { gql } from "apollo-server";
import { IModels } from "../interfaces";

export const typeDefs = gql`
  type Propietario {
    id: ID!
    address: String!
    phone: String!
    email: String
    type: PropietarioType!

    # Naturales
    docType: String
    docNum: String
    name: String

    # Jurídicas
    nit: String
    businessName: String

    predios: [Predio]
  }

  enum PropietarioType {
    Natural
    Juridica
  }

  extend type Query {
    listPropietarios: [Propietario]
    listPropietariosNaturales: [Propietario]
    listPropietariosJuridicos: [Propietario]
    getPropietario(id: ID): Propietario
  }

  extend type Mutation {
    createPropietario(input: PropietarioInput): Propietario
    updatePropietario(input: UpdatePropietarioInput): Propietario
    deletePropietario(id: ID): Boolean
  }

  input PropietarioInput {
    address: String!
    phone: String!
    email: String
    type: PropietarioType!

    # Naturales
    docType: String
    docNum: String
    name: String

    # Jurídicas
    nit: String
    businessName: String

    predios: [ID]
  }

  input UpdatePropietarioInput {
    id: ID!
    address: String
    phone: String
    email: String
    type: PropietarioType

    # Naturales
    docType: String
    docNum: String
    name: String

    # Jurídicas
    nit: String
    businessName: String

    predios: [ID]
  }
`;

export const resolvers = {
  Query: {
    listPropietarios: async (
      _: any,
      __: any,
      { models }: { models: IModels }
    ) => {
      try {
        return await models.Propietarios.findAll();
      } catch (error) {
        console.log(error);
      }
    },

    listPropietariosNaturales: async (
      _: any,
      __: any,
      { models }: { models: IModels }
    ) => {
      try {
        return await models.Propietarios.findAll({
          where: { type: "Natural" },
        });
      } catch (error) {
        console.log(error);
      }
    },

    listPropietariosJuridicos: async (
      _: any,
      __: any,
      { models }: { models: IModels }
    ) => {
      try {
        return await models.Propietarios.findAll({
          where: { type: "Juridica" },
        });
      } catch (error) {
        console.log(error);
      }
    },

    getPropietario: async (
      _: any,
      { id }: any,
      { models }: { models: IModels }
    ) => {
      try {
        return await models.Propietarios.findByPk(id);
      } catch (error) {
        console.log(error);
      }
    },
  },

  Mutation: {
    createPropietario: async (
      _: any,
      { input }: any,
      { models }: { models: IModels }
    ) => {
      try {
        const newPropietario = await models.Propietarios.create({ ...input });
        if (input.predios) {
          await Promise.all(
            input.predios.forEach(async (predioId: any) => {
              const predio = await models.Predios.findByPk(predioId);
              //@ts-ignore
              await newPropietario.addPredios(predio);
            })
          );
        }

        return newPropietario;
      } catch (error) {
        console.log(error);
      }
    },

    updatePropietario: async (
      _: any,
      { input }: any,
      { models }: { models: IModels }
    ) => {
      try {
        const { id, ...restInput } = input;
        return await models.Propietarios.update(
          { ...restInput },
          { where: { _id: id } }
        );
      } catch (error) {
        console.log(error);
      }
    },

    deletePropietario: async (
      _: any,
      { id }: any,
      { models }: { models: IModels }
    ) => {
      try {
        await models.Propietarios.destroy({ where: { id } });
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
