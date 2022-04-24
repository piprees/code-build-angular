/*import { GraphQLScalarType } from "graphql";

const dateScalar = new GraphQLScalarType({
    name: 'Date',
    parseValue(value: any) {
        return new Date(value);
    },
    serialize(value: any) {
        return value.toISOString();
    }
});
*/
export const resolvers = {
    //Date: dateScalar,
    Query: {
        getUser: (_: any, { id, email, fid }: any, { dataSources, _user }: any) =>
            dataSources.graphAPI.getUser({ id, email, fid, _user }),
        queryUser: (_: any, __: any, { dataSources, _user }: any) =>
            dataSources.graphAPI.queryUser({ _user })
    },
    Mutation: {
        addUser: async (_: any, { displayName, fid, username, email }: any, { dataSources, _user }: any) =>
            dataSources.graphAPI.addUser({ displayName, fid, username, email, _user })
    },
};
