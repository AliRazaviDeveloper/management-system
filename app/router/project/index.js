const projectController = require('../../controllers/projectController')
const checkAuth = require('../../middlewares/checkAuth')
const checkValidation = require('../../middlewares/validation')
const { multerUploadImage } = require('../../utility/upload')
const projectValidation = require('../../validations/project')

const projectRouter = require('express').Router()

projectRouter.post(
  '/',
  checkAuth,
  multerUploadImage.single('image'),
  projectValidation(),
  checkValidation,
  projectController.store
)

module.exports = projectRouter
