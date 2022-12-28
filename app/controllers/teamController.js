const teamModel = require('../model/teamModel')
const userModel = require('../model/userModel')

class TeamController {
  async store(req, res, next) {
    try {
      const { title, description } = req.body
      const result = await new teamModel({
        title,
        description,
        owner: req.user._id,
        users: [req.user._id],
      })

      await result.save()

      res.status(201).json({
        status: 201,
        success: true,
        message: 'تیم شما با موفقیت ایجاد شد .',
      })
    } catch (error) {
      next(error)
    }
  }

  async index(req, res, next) {
    try {
      const result = await teamModel.find({}, { __v: 0 })
      res.status(200).json({
        status: 200,
        success: true,
        result,
      })
    } catch (error) {
      next(error)
    }
  }

  async findById(req, res, next) {
    try {
      const { id } = req.params
      const team = await teamModel.findOne({ _id: id })
      console.log({
        team,
        id,
      })
      if (!team)
        throw {
          status: 404,
          success: false,
          message: 'تیم مورد نظر یافت نشد . ',
        }
      return res.status(200).json({
        status: 200,
        success: false,
        result: team,
      })
    } catch (error) {
      next(error)
    }
  }

  async getMeTeams(req, res, next) {
    try {
      const teams = await teamModel.find({
        $or: [{ owner: req.user._id }, { users: req.user._id }],
      })

      if (!teams)
        throw {
          status: 404,
          status: false,
          message: 'شما در هیچ تیمی عضو نیستید .',
        }
      return res.status(200).json({
        success: true,
        status: 200,
        result: teams,
      })
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const { id } = req.params
      const team = await teamModel.deleteOne({ _id: id, owner: req.user._id })

      if (team.deletedCount == 0)
        throw {
          status: 500,
          success: false,
          message:
            'مشکلی در عملیات حذف تیم به وجود آمده است دوباره تلاش فرمایید .',
        }

      return res.status(200).json({
        success: true,
        message: 'با موفقیت تیم شما حذف شد . ',
        status: 200,
      })
    } catch (error) {
      next(error)
    }
  }

  async inviteUser(req, res, next) {
    try {
      const { teamId, userId } = req.params
      const userAuthId = req.user._id

      const user = await userModel.findOne({ _id: userId })

      if (!user)
        throw {
          status: 404,
          success: false,
          message: 'همچین کاربری وجود ندارد . ',
        }

      const team = await teamModel.findOne({
        $or: [{ owner: userAuthId }, { users: userAuthId }],
        $ne: [{ users: userId }],
        _id: teamId,
      })

      const teamRequestUser = await teamModel.findOne({
        $or: [{ owner: userAuthId }, { users: userAuthId }],
        _id: teamId,
      })

      if (teamRequestUser)
        throw {
          status: 400,
          message: 'شما owner یا جز از این تیم هستید . ',
          success: false,
        }

      if (!team)
        throw {
          status: 400,
          message: 'شما به این تیم دسترسی ندارید . ',
          success: false,
        }

      const userStatus = await userModel.findOne(
        { _id: user._id },
        {
          inviteRequest: {
            teamId: team._id,
          },
        }
      )
      console.log(userStatus)

      if (userStatus)
        throw {
          status: 400,
          message: 'به این کاربر قبلا درخواست زده شده است . ',
          success: false,
        }

      const result = await userModel.updateOne(
        { _id: user._id },
        {
          $push: {
            inviteRequest: {
              sent: userAuthId,
              caller: user._id,
              teamId: team._id,
              status: 'pending',
              sentDate: Date.now(),
            },
          },
        }
      )

      if (result.modifiedCount == 0)
        throw {
          status: 500,
          message:
            'مشکل در عملیات درخواست شما رخ داده است مجددا تلاش فرمایید . ',
          success: false,
        }
      res.status(200).json({
        status: 200,
        success: true,
        message: 'درخواست شما با موفقیت ارسال شد .',
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new TeamController()
