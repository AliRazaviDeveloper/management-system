const bcrypt = require('bcrypt')
const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(15)
  return bcrypt.hashSync(password, salt)
}

const comparePassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword)
}

module.exports = {
  hashPassword,
  comparePassword,
}
