const userController = require('../../controllers/userController')

const userRouter = require('express').Router()

userRouter.get('/', userController.index)
userRouter.post('/', userController.store)

module.exports = userRouter
