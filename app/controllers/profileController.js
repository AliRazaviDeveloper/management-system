const userModel = require('../model/userModel')
const { uploadFileImage } = require('../utility/upload')

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
      throw {
        status: 400,
        message: 'خطا در ابدیت پروفایل کاربر رخ داده است ',
        success: false,
      }
    } catch (error) {
      next(error)
    }
  }
  async profile(req, res, next) {
    try {
      req.user.avatar = `http://${req.get('host')}${req.user.avatar}`
      res.status(200).json({
        status: 200,
        result: req.user,
        success: true,
      })
    } catch (error) {
      next(error)
    }
  }

  async uploadProfile(req, res, next) {
    try {
      const userID = req.user._id
      const result = await userModel.updateOne(
        { _id: userID },
        {
          $set: {
            avatar: uploadFileImage(req.file),
          },
        }
      )

      if (result.modifiedCount == 0)
        throw {
          status: 400,
          success: false,
          message: 'مشکلی در اپلود تصویر به وجود آمده است .',
        }
      res.status(200).json({
        success: true,
        message: 'تصویر شما با موفقیت بروز رسانی شد . ',
        status: 200,
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new ProfileController()
