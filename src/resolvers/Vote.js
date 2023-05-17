function link(parent, _, { prisma }) {
  return prisma.vote.findUnique({ where: { id: parent.id } }).link()
}

function user(parent, _, { prisma }) {
  return prisma.vote.findUnique({ where: { id: parent.id } }).user()
}

module.exports = {
  link,
  user,
}
