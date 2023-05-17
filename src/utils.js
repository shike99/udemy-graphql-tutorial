const jwt = require('jsonwebtoken')

const APP_SECRET = "GraphQL"

const getTokenPayload = (token) => {
  return jwt.verify(token, APP_SECRET)
}

const getUserId = (req, authToken) => {
  if (req) {
    const authHeader = req.headers.authorization
    if (authHeader) {
      const token = authHeader.replace('Bearer', '')
      if (!token) {
        throw new Error('token not found')
      }

      const { userId } = getTokenPayload(token)
      return userId
    }
  } else if (authToken) {
    const { userId } = getTokenPayload(authToken)
    return userId
  }

  throw new Error('auth failed')
}

module.exports = {
  APP_SECRET,
  getUserId
}
