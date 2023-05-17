async function feed(_, __, { prisma }) {
  return prisma.link.findMany()
}

module.exports = {
  feed
}
