import { gql } from "apollo-server";
import { typeDefs as Predios, resolvers as PrediosResolvers } from "./predio";
import {
  typeDefs as Terrenos,
  resolvers as TerrenosResolvers,
} from "./terreno";
import {
  typeDefs as Construcciones,
  resolvers as ConstruccionesResolvers,
} from "./construccion";
import {
  typeDefs as Propietarios,
  resolvers as PropietariosResolvers,
} from "./propietario";

const rooTypeDefs = gql`
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }

  scalar Any
`;

export const resolvers = [
  PrediosResolvers,
  TerrenosResolvers,
  ConstruccionesResolvers,
  PropietariosResolvers,
];

export const typeDefs = [
  rooTypeDefs,
  Predios,
  Terrenos,
  Construcciones,
  Propietarios,
];
