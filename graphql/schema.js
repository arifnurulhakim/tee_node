const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    verificationCode: String
    isVerified: Boolean
  }

  type Query {
    getUser(userId: ID!): User
  }

  type CreateUserResponse {
    status: String!
    message: String!
    data: User
  }

  type VerifyUserResponse {
    status: String!
    message: String!
    data: User
  }

  type LoginUserResponse {
    status: String!
    message: String!
    user: User
    token: String!
  }

  type Query {
    getUser: User!
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
  }

  input VerifyUserInput {
    email: String!
    verificationCode: String!
  }

  input LoginUserInput {
    email: String!
    password: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): CreateUserResponse!
    verifyUser(input: VerifyUserInput!): VerifyUserResponse!
    loginUser(input: LoginUserInput!): LoginUserResponse!
  }
`;

module.exports = typeDefs;
