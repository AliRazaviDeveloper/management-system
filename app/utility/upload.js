const multer = require('multer')
const storage = multer.diskStorage({
  destination(req, file, callback) {
    let d = new Date()
    const path = require('path').join(
      __dirname,
      '..',
      '..',
      'public',
      'uploads',
      '' + d.getFullYear(),
      '' + d.getMonth(),
      '' + d.getDay()
    )
    require('fs').mkdirSync(path, { recursive: true })
    callback(null, path)
  },
  filename(req, file, callback) {
    const extname = require('path').extname(file.originalname)
    callback(null, Date.now() + extname)
  },
})

const uploadFileImage = (file) => {
  const pathImage = file.path
  if (Object.keys(file).length == 0)
    throw {
      status: 400,
      success: false,
      message: 'لطفا یک عکس برای اپلود انتخاب کنید ',
    }
  const pathFile = pathImage.split('public')[1]
  return pathFile
}

const multerUploadImage = multer({ storage })

module.exports = {
  multerUploadImage,
  uploadFileImage,
}
