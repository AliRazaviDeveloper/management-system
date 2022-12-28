const { body } = require('express-validator')
const projectValidation = () => {
  return [
    body('title')
      .notEmpty()
      .withMessage('عنوان پروژه نمی تواند خالی باشد . ')
      .bail(),
    body('description')
      .notEmpty()
      .withMessage('توضیحات یک پروژه نمی تواند خالی باشد . ')
      .bail(),
    body('status')
      .isIn(['DRAFT', 'PUBLISH', 'UNPUBLISH'])
      .withMessage(
        'وضعیت باید در حالت نویسه شده یا منتشر شده یا منتشر نشده باشد . '
      )
      .bail(),
    body('image')
      .custom((vlaue, ctx) => {
        const whiteListExt = ['.png', '.jpg', '.jpeg']
        const ext = require('path').extname(ctx.req.file.originalname)

        if (!whiteListExt.includes(ext)) throw 'فرمت عکس صحیح نمی باشد . '
        const maxSize = 2 * 1024 * 1024
        if (ctx.req.file.size > maxSize)
          throw 'سایز عکس بیش از حد مجاز می باشد . حداقل باید زیر دو مگابایت باشد '

        return true
      })
      .bail(),

    body('tags')
      .isArray({ min: 0, max: 10 })
      .withMessage('برچسب نباید بیشتر از ۱۰ ردیف باشد . ')
      .bail(),
  ]
}

const projectValidationUpdate = () => {
  return [
    body('status')
      .isIn(['DRAFT', 'PUBLISH', 'UNPUBLISH'])
      .withMessage(
        'وضعیت باید در حالت نویسه شده یا منتشر شده یا منتشر نشده باشد . '
      ),
    body('tags')
      .isArray({ min: 0, max: 10 })
      .withMessage('برچسب نباید بیشتر از ۱۰ ردیف باشد . ')
      .bail(),
  ]
}

const projectValidationImage = () => {
  return [
    body('image')
      .custom((vlaue, ctx) => {
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
  projectValidation,
  projectValidationUpdate,
  projectValidationImage,
}
