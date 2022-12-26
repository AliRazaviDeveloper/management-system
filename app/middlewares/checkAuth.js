const userModel = require('../model/userModel')
const { verifyToken } = require('../utility/auth')

const checkAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null)
      res.status(401).json({
        status: 401,
        message: 'لطفا وارد اکانت خود شوید . دسترسی به این صفحه ندارید ',
        success: false,
      })
    const { payload } = verifyToken(token)
    if (!payload)
      throw {
        status: 401,
        message: 'توکن شما معتبر نیست ',
        success: false,
      }
    const user = await userModel.findOne(
      { email: payload },
      {
        password: 0,
        __v: 0,
      }
    )
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}
module.exports = checkAuth
