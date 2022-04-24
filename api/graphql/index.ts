import { ApolloServer } from 'apollo-server';

import { GraphAPI } from './datasources/graph';
//import auth from './firebase';
import { createGraph } from './redis';
import { resolvers } from './resolvers';
import { typeDefs } from './schema';

export const handler = async (req: any, res: any) => {

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      graphAPI: new GraphAPI({
        graph: createGraph()
      })
    }),
    /*context: async () => {
      //const token = req.headers.get('x-auth-token');
      let _user: any;
      try {
        _user = '' //await auth().verifyIdToken(token);
        return { _user };
      } catch (e: any) {
        _user = undefined;
        console.error(e);
      }
      return { _user };
    }*/
  });

  res.status(200).json({
    body: await server.executeOperation(req.body)
  });
}

