const jwt = require('jsonwebtoken')
const generateToken = (payload) => {
  return jwt.sign({ payload }, process.env.TOKEN_SECRET, {
    expiresIn: '2 days',
  })
}

const verifyToken = (token) => {
  const result = jwt.verify(token, process.env.TOKEN_SECRET)

  if (!result.payload) {
    throw {
      status: 401,
      message: 'لطفا وارد اکانت خود شوید . دسترسی به این صفحه ندارید ',
      success: false,
    }
  }
  return result
}
module.exports = {
  generateToken,
  verifyToken,
}
