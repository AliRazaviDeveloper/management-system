const userController = require('../../controllers/userController')
const checkAuth = require('../../middlewares/checkAuth')

const userRouter = require('express').Router()

userRouter.get('/', checkAuth, userController.index)
userRouter.post('/', userController.store)
userRouter.get('/invite/request', checkAuth, userController.invitesAll)
userRouter.get(
  '/invite/request/:filter',
  checkAuth,
  userController.filterInvite
)
userRouter.get(
  '/status/request/:id/:status',
  checkAuth,
  userController.changeStatus
)

module.exports = userRouter
