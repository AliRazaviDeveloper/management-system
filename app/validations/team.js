const { body } = require('express-validator')
const teamModel = require('../model/teamModel')

const teamValidtion = () => {
  return [
    body('title')
      .isString()
      .withMessage('عنوان تیم باید شامل حروف  باشد . ')
      .bail()
      .notEmpty()
      .withMessage('عنوان یک تیم نمی تواند خالی باشد .')
      .bail()
      .custom(async (value, ctx) => {
        const result = await teamModel.findOne({ title: value })

        if (result) throw 'این نام تیم قبلا استفاده شده است . '
        return true
      }),

    body('description')
      .isString()
      .withMessage('توضیحات تیم باید شامل حروف  باشد . ')
      .bail()
      .notEmpty()
      .withMessage('توضیحات یک تیم نمی تواند خالی باشد .')
      .bail(),
  ]
}

module.exports = {
  teamValidtion,
}
