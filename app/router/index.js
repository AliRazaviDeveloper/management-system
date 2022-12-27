const authRouter = require('./auth')
const profileRouter = require('./profile')
const projectRouter = require('./project')
const userRouter = require('./user')

module.exports = (app) => {
  app.use('/api/v1/users', userRouter)
  app.use('/api/v1/auth', authRouter)
  app.use('/api/v1/profile', profileRouter)
  app.use('/api/v1/projects', projectRouter)
}
