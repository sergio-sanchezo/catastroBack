import { ApolloServer } from "apollo-server";
import models from "./models";
import { typeDefs, resolvers } from "./graphql/schema";

const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { models },
  });

  models.sequelize.sync({ force: false }).then(async () => {
    console.info("db connected");
    const { url } = await server.listen();
    console.info("Server is running on ", url);
  });
};

startApolloServer();
