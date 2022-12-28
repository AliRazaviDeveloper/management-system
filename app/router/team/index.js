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

module.exports = teamRouter
