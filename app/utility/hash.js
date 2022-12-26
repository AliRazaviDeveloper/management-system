const bcrypt = require('bcrypt')
const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(15)
  return bcrypt.hashSync(password, salt)
}

module.exports = {
  hashPassword,
}
