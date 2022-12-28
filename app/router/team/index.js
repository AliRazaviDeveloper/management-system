const teamController = require('../../controllers/teamController')
const checkAuth = require('../../middlewares/checkAuth')
const checkValidation = require('../../middlewares/validation')
const { teamValidtion } = require('../../validations/team')

const teamRouter = require('express').Router()
teamRouter.get('/', checkAuth, teamController.index)
teamRouter.post(
  '/',
  checkAuth,
  teamValidtion(),
  checkValidation,
  teamController.store
)
teamRouter.get('/me', checkAuth, teamController.getMeTeams)
teamRouter.get('/invite/:teamId/:userId', checkAuth, teamController.inviteUser)
teamRouter.get('/:id', checkAuth, checkValidation, teamController.findById)
teamRouter.delete('/:id', checkAuth, checkValidation, teamController.remove)

module.exports = teamRouter
