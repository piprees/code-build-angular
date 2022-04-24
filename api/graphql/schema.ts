import { gql } from 'apollo-server';

export const typeDefs = gql`
    type User {
        id: ID!
        fid: String!
        email: String!
        displayName: String
        username: String
        resources: [Resource]
    }
    type Resource {
        id: ID!
        name: String!
        description: String!
        url: String
        topics: [Topic!]!
    }
    type Topic {
        id: ID!
        name: String!
    }
    type Query {
        getUser(id: ID!, email: String, fid: String): User!
        queryUser: [User!]
    }
    type Mutation {
        addUser(displayName: String, fid: String!, email: String!, username: String): User!
    }
`;
