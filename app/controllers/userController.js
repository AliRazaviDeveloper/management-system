const userModel = require('../model/userModel')

class UserController {
  async index(req, res, next) {
    try {
      const users = await userModel.find(
        {},
        {
          __v: 0,
        }
      )
      res.json(200, {
        result: users,
        status: 200,
      })
    } catch (error) {
      next(error)
    }
  }

  async store(req, res, next) {
    try {
      const { username, password, email, phone } = req.body
      const user = await userModel.create({
        username,
        password,
        email,
        phone,
      })
      await user.save()

      res.status(201).json({
        status: 201,
        message: 'کاربر جدید با موفقیت ایجاد شد . ',
        success: true,
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new UserController()
