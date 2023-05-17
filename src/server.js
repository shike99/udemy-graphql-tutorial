const { ApolloServer, PubSub } = require('apollo-server')
const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Subscription = require('./resolvers/Subscription')
const Link = require('./resolvers/Link')
const User = require('./resolvers/User')
const Vote = require('./resolvers/Vote')
const { getUserId } = require('./utils')

const typeDefs = fs.readFileSync(path.join(__dirname, 'schema.gql'), 'utf-8')

const prisma = new PrismaClient()
const pubsub = new PubSub()

const resolvers = {
  Query,
  Mutation,
  Subscription,
  Link,
  User,
  Vote,
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      pubsub,
      userId: req && req.headers.authorization ? getUserId(req) : null
    }
  }
})
server.listen().then(({ url }) => console.log(`Server ready at ${url}`))
