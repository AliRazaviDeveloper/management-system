const { body } = require('express-validator')
const avatarValidation = () => {
  return [
    body('image')
      .isEmpty()
      .withMessage('عکس نمی تواند خالی باشد . ')
      .bail()
      .custom((value, ctx) => {
        const whiteListExt = ['.png', '.jpg', '.jpeg']
        const ext = require('path').extname(ctx.req.file.originalname)

        if (!whiteListExt.includes(ext)) throw 'فرمت عکس صحیح نمی باشد . '
        const maxSize = 2 * 1024 * 1024
        if (ctx.req.file.size > maxSize)
          throw 'سایز عکس بیش از حد مجاز می باشد . حداقل باید زیر دو مگابایت باشد '

        return true
      })
      .bail(),
  ]
}

module.exports = {
  avatarValidation,
}
