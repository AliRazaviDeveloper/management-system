const { Schema, model, default: mongoose } = require('mongoose')
const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    first_name: { type: String, required: false },
    last_name: { type: String, required: false },
    skills: { type: Array, default: [] },
    role: {
      type: String,
      default: 'USER',
      required: true,
      enum: ['USER', 'ADMIN', 'DEVELOPER'],
    },
    teams: {
      type: [mongoose.Types.ObjectId],
      default: [],
      ref: 'team',
    },
    avatar: {
      type: String,
      required: false,
      default: '/image/avatar.png',
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

const userModel = new model('User', userSchema)

module.exports = userModel
