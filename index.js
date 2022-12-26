require('dotenv').config()
require('./database')()
const app = require('./app')
const startApplication = new app(process.env.APP_PORT)
