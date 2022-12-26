const { body } = require('express-validator')
const userModel = require('../model/userModel')

const registerValidation = () => {
  return [
    body('username')
      .isLength({ min: 5, max: 21 })
      .withMessage('طول نام کاربری باید بین ۵ تا ۲۱ کارکتر باشد .')
      .bail()
      .isAlphanumeric()
      .withMessage('نام کاربری باید شامل اعداد و حروف باشد .')
      .bail()
      .custom(async (value, ctx) => {
        const user = await userModel.findOne({ username: value.username })
        if (user) throw 'نام کاربری قبلا در سیستم ثبت شده است .'
      })
      .trim()
      .bail(),

    body('email')
      .isEmail()
      .withMessage('ایمیل باید با فرمت صحیح وارد شود .')
      .bail()
      .notEmpty()
      .withMessage('ایمیل نمی تواند خالی باشد . ')
      .bail()
      .custom(async (value, ctx) => {
        const user = await userModel.findOne({ email: value.email })
        if (user) throw ' ایمیل قبلا در سیستم ثبت شده است .'
      }),

    body('phone')
      .isMobilePhone('fa-IR')
      .withMessage('موبایل باید با فرمت صحیح وارد شود .')
      .bail()
      .notEmpty()
      .withMessage('موبایل نمی تواند خالی باشد . ')
      .bail()
      .custom(async (value, ctx) => {
        const user = await userModel.findOne({ phone: value.phone })
        if (user) throw ' موبایل قبلا در سیستم ثبت شده است .'
      }),
    body('password')
      .notEmpty()
      .withMessage('پسورد نباید خالی باشد .')
      .bail()
      .isLength({ min: 8 })
      .withMessage('طول فیلد پسورد باید بیشتر از ۸ کارکتر باشد .')
      .bail()
      .custom((value, ctx) => {
        if (value !== ctx.req.body.confirm_password)
          throw 'فیلد پسورد با تکرار پسورد یکسان نیست . '
        return true
      })
      .bail(),
  ]
}

const loginValidation = () => {
  return [
    body('email')
      .isEmail()
      .withMessage('ایمیل باید با فرمت صحیح وارد شود .')
      .bail()
      .notEmpty()
      .withMessage('ایمیل نمی تواند خالی باشد . ')
      .bail(),

    body('password')
      .notEmpty()
      .withMessage('پسورد نباید خالی باشد .')
      .bail()
      .isLength({ min: 8 })
      .withMessage('طول فیلد پسورد باید بیشتر از ۸ کارکتر باشد .')
      .bail(),
  ]
}

module.exports = {
  registerValidation,
  loginValidation,
}
