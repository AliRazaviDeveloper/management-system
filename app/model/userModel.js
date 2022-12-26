const { Schema, model } = require('mongoose')
const userModel = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    first_name: { type: String, required: false },
    last_name: { type: String, required: false },
    avatar: {
      type: String,
      required: false,
      default: '/public/image/avatar.png',
    },
    token: {
      type: String,
      required: false,
      default: '',
    },
  },
  {
    timestamps: true,
  }
)

module.exports = new model('User', userModel)
