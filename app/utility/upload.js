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

const multerUploadImage = multer({ storage })

module.exports = multerUploadImage
