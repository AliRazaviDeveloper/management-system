const projectController = require('../../controllers/projectController')
const checkAuth = require('../../middlewares/checkAuth')
const checkValidation = require('../../middlewares/validation')
const { multerUploadImage } = require('../../utility/upload')
const {
  projectValidation,
  projectValidationUpdate,
  projectValidationImage,
} = require('../../validations/project')
const { checkParamValidationId } = require('../../validations/request')
const projectRouter = require('express').Router()
projectRouter.get('/', checkAuth, projectController.index)
projectRouter.post(
  '/',
  checkAuth,
  multerUploadImage.single('image'),
  projectValidation(),
  checkValidation,
  projectController.store
)

projectRouter.get(
  '/:id',
  checkAuth,
  checkParamValidationId(),
  checkValidation,
  projectController.findById
)
projectRouter.delete(
  '/:id',
  checkAuth,
  checkParamValidationId(),
  checkValidation,
  projectController.remove
)

projectRouter.patch(
  '/:id',
  checkAuth,
  checkParamValidationId(),
  projectValidationUpdate(),
  checkValidation,
  projectController.update
)

projectRouter.put(
  '/:id',
  checkAuth,
  multerUploadImage.single('image'),
  checkParamValidationId(),
  projectValidationImage(),
  checkValidation,
  projectController.updateImage
)

module.exports = projectRouter
