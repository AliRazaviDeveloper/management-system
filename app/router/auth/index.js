const authController = require('../../controllers/authController')
const checkValidation = require('../../middlewares/validation')
const { registerValidation } = require('../../validations/auth')

const authRouter = require('express').Router()

authRouter.post(
  '/register',
  registerValidation(),
  checkValidation,
  authController.register
)

authRouter.post('/login', authController.login)

module.exports = authRouter
