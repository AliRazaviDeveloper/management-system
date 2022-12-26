module.exports = (app) => {
  app.use((req, res, next) => {
    res.status(404).send({
      status: 404,
      message_en: 'not found routes',
      message_fa: 'صفحه مدنظر یافت نشد .',
      success: false,
    })
  })
}
