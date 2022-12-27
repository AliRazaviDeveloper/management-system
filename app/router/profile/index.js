const profileController = require('../../controllers/profileController')
const checkAuth = require('../../middlewares/checkAuth')
const checkValidation = require('../../middlewares/validation')
const multerUploadImage = require('../../utility/upload')
const { avatarValidation } = require('../../validations/user')

const profileRouter = require('express').Router()

profileRouter.patch(
  '/edit',
  checkAuth,
  checkValidation,
  profileController.editProfile
)

profileRouter.get('/me', checkAuth, profileController.profile)

profileRouter.post(
  '/upload-profile',
  checkAuth,
  multerUploadImage.single('image'),
  avatarValidation(),
  checkValidation,
  profileController.uploadProfile
)

module.exports = profileRouter
