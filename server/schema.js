const { gql } = require('apollo-server');

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
        age: Int!
        position: String!
        image: String
        rating: Int!
        skills: [String!]!
    }

    type Rating {
        id: ID!
        userId: ID!
        rating: Int!
    }

    type Query {
        users: [User]
        user(id: ID!): User
        ratings: [Rating!]!
    }

    type Mutation {
        rateUser(userId: ID!, rating: Int!): Rating!
    }
`;

module.exports = typeDefs;
