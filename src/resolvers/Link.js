function postedBy(parent, _, { prisma }) {
  return prisma.link.findUnique({ where: { id: parent.id } }).postedBy()
}

function votes(parent, _, { prisma }) {
  return prisma.link.findUnique({ where: { id: parent.id } }).votes()
}

module.exports = {
  postedBy,
  votes,
}
