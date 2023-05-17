const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET } = require('../utils')

async function post(_, { url, description }, { prisma, pubsub, userId }) {
  const newLink = await prisma.link.create({
    data: {
      description,
      url,
      postedBy: { connect: { id: userId } }
    }
  })

  pubsub.publish('NEW_LINK', newLink)

  return newLink
}

async function signUp(_, args, { prisma }) {
  const password = await bcrypt.hash(args.password, 10)
  const user = await prisma.user.create({
    data: {
      ...args,
      password
    }
  })
  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}

async function login(_, { email, password }, { prisma }) {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    throw new Error('user not found')
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    throw new Error('login failed')
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}

async function vote(_, { linkId }, { prisma, pubsub, userId }) {
  const vote = await prisma.vote.findUnique({
    where: {
      linkId_userId: {
        linkId: +linkId,
        userId
      }
    }
  })
  if (vote) {
    throw new Error(`already voted to Link: ${linkId}`)
  }

  const newVote = prisma.vote.create({
    data: {
      link: { connect: { id: +linkId } },
      user: { connect: { id: userId } },
    }
  })

  pubsub.publish('NEW_VOTE', newVote)

  return newVote
}

module.exports = {
  post,
  signUp,
  login,
  vote,
}
