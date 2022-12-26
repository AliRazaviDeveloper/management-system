const userModel = require('../model/userModel')
const { hashPassword } = require('../utility/hash')

class AuthController {
  async register(req, res, next) {
    try {
      const { username, phone, email, password } = req.body

      const user = await new userModel({
        username,
        phone,
        email,
        password: hashPassword(password),
      })
      await user.save()

      res.status(201).json({
        status: 201,
        success: true,
        message: 'ثبت نام شما با موفقیت صورت گرفت .',
      })
    } catch (error) {
      next(error)
    }
  }
  async login(req, res, next) {
    try {
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new AuthController()
