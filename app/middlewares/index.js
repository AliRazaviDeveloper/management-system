const express = require('express')
const bodyParser = require('body-parser')
module.exports = (app) => {
  app.use(bodyParser.json())
  app.use(express.static(require('path').join(__dirname, '..', 'public')))
}
