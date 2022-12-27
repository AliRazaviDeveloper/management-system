const projectModel = require('../model/projectModel')
const { uploadFileImage } = require('../utility/upload')

class ProjectController {
  async index(req, res, next) {
    try {
      const projects = await projectModel.find(
        { owner: req.user._id },
        {
          __v: 0,
        }
      )
      res.status(200).json({
        status: 200,
        success: true,
        result: projects,
      })
    } catch (error) {
      next(error)
    }
  }
  async store(req, res, next) {
    try {
      const { title, description, status, tags } = req.body
      const project = await new projectModel({
        title,
        description,
        status,
        owner: req.user._id,
        image: uploadFileImage(req.file),
        tags,
      })

      await project.save()

      res.status(201).json({
        status: 201,
        message: 'پروژه با موفقیت ایجاد شد . ',
        success: true,
      })
    } catch (error) {
      next(error)
    }
  }

  async findById(req, res, next) {
    try {
      const projectID = req.params.id
      const project = await projectModel.findOne(
        {
          owner: req.user._id,
          _id: projectID,
        },
        {
          __v: 0,
        }
      )

      res.status(200).json({
        success: true,
        status: 200,
        result: project,
      })
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const result = await projectModel.deleteOne({
        owner: req.user._id,
        _id: req.params.id,
      })

      if (result.deletedCount == 0)
        throw {
          status: 400,
          message: 'مشکل در عملیات حذف پروژه پیش آمده است ',
          success: false,
        }

      res.status(200).json({
        status: 200,
        message: 'پروژه شما با موفقیت حذف شد . ',
        success: true,
      })
    } catch (error) {
      next(error)
    }
  }
}
module.exports = new ProjectController()
