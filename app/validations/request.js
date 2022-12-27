const { param } = require('express-validator')
const projectModel = require('../model/projectModel')

const checkParamValidationId = () => {
  return [
    param('id')
      .isMongoId()
      .withMessage('ایدی وارد شده صحیح نمی باشد . ')
      .custom(async (value, ctx) => {
        const result = await projectModel.findOne({
          _id: value,
          owner: ctx.req.user._id,
        })
        if (!result) throw 'ایدی با این مشخصه یافت نشد . '
        return true
      }),
  ]
}

module.exports = {
  checkParamValidationId,
}
