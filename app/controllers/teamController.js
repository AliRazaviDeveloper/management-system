const teamModel = require('../model/teamModel')

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
}

module.exports = new TeamController()
