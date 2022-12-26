module.exports = (app) => {
  app.use((error, req, res, next) => {
    const status = error.status || 500
    res.status(404).send({
      status,
      message_en:
        error.message || 'مشکلی در سرور به وجود آمده است به زودی باز میگردیم .',
      message_fa: 'مشکلی در سرور پیش آمده است به زودی باز میگردیم .',
      success: false,
    })
  })
}
