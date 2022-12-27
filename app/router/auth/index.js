const authController = require('../../controllers/authController')
const checkValidation = require('../../middlewares/validation')
const {
  registerValidation,
  loginValidation,
} = require('../../validations/auth')
const { avatarValidation } = require('../../validations/user')

const authRouter = require('express').Router()

authRouter.post(
  '/register',
  registerValidation(),
  checkValidation,
  authController.register
)

authRouter.post(
  '/login',
  loginValidation(),
  checkValidation,
  authController.login
)

module.exports = authRouter
