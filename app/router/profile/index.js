const profileController = require('../../controllers/profileController')
const checkAuth = require('../../middlewares/checkAuth')
const checkValidation = require('../../middlewares/validation')

const profileRouter = require('express').Router()

profileRouter.patch(
  '/edit',
  checkAuth,
  checkValidation,
  profileController.editProfile
)

profileRouter.get('/me', checkAuth, profileController.profile)

module.exports = profileRouter
