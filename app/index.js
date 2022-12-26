const express = require('express')
class Application {
  #app = express()
  constructor(port) {
    this.createConfig()
    this.createServer(port)
    this.createRouter()
    this.createErrorHandler()
  }

  createServer(port) {
    this.#app.listen(port, (err) => {
      if (err) throw err
      console.log(`server at running port http://localhost:${port}`)
    })
  }

  createRouter() {
    require('./router')(this.#app)
  }

  createConfig() {
    require('./middlewares')(this.#app)
  }

  createErrorHandler() {
    require('./middlewares/404')(this.#app)
    require('./middlewares/error')(this.#app)
  }
}

module.exports = Application
