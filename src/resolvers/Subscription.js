function newLinkSubscribe(parent, args, { pubsub }) {
  return pubsub.asyncIterator("NEW_LINK")
}

const newLink = {
  subscribe: newLinkSubscribe,
  resolve: (payload) => payload
}

function newVoteSubscribe(parent, args, { pubsub }) {
  return pubsub.asyncIterator("NEW_VOTE")
}

const newVote = {
  subscribe: newVoteSubscribe,
  resolve: (payload) => payload
}

module.exports = {
  newLink,
  newVote,
}
