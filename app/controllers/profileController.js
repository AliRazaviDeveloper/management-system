const userModel = require('../model/userModel')

class ProfileController {
  async editProfile(req, res, next) {
    try {
      const { skills, first_name, last_name } = req.body

      const result = await userModel.updateOne(
        { email: req.user.email },
        {
          $set: {
            skills,
            first_name,
            last_name,
          },
        }
      )
      if (result.acknowledged) {
        res.status(200).json({
          status: 200,
          message: 'پروفایل شما با موفقیت بروزرسانی شد .',
          success: true,
        })
      }
    } catch (error) {
      next(error)
    }
  }
  async profile(req, res, next) {
    try {
      res.status(200).json({
        status: 200,
        result: req.user,
        success: true,
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new ProfileController()
