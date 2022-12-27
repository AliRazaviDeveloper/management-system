const projectModel = require('../model/projectModel')
const { uploadFileImage } = require('../utility/upload')

class ProjectController {
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
}
module.exports = new ProjectController()
