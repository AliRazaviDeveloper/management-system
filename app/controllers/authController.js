const userModel = require('../model/userModel')
const { generateToken } = require('../utility/auth')
const { hashPassword, comparePassword } = require('../utility/hash')

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
      const { email, password } = req.body
      const user = await userModel.findOne({ email })
      if (!user)
        throw {
          status: 401,
          success: false,
          message: 'ایمیل یا پسورد صحیح نمی باشد .',
        }

      if (!comparePassword(password, user.password)) {
        throw {
          status: 401,
          success: false,
          message: 'ایمیل یا پسورد صحیح نمی باشد .',
        }
      }

      const token = generateToken(user.email)
      user.token = token

      await user.save()

      return res.status(200).json({
        status: 200,
        success: true,
        message: 'شما با موفقیت وارد حساب کاربری خود شدید . ',
        token,
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new AuthController()
