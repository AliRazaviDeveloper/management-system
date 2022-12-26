const { validationResult } = require('express-validator')

const checkValidation = (req, res, next) => {
  try {
    let messages = {}
    let result = validationResult(req)
    if (result?.errors?.length > 0) {
      result?.errors?.forEach((err) => {
        messages[err.param] = err.msg
      })
      return res.status(400).json({
        status: 400,
        success: false,
        errors: messages,
      })
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
}

module.exports = checkValidation
