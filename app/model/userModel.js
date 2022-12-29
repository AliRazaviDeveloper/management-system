const { mongoose } = require('mongoose')
const inviteSchema = new mongoose.Schema({
  sent: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
  caller: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
  teamId: { type: mongoose.Types.ObjectId, ref: 'team', required: true },
  status: { type: String, default: 'pending' },
  sentDate: { type: Date, default: Date.now() },
})
const userSchema = new mongoose.Schema(
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

    inviteRequest: { type: [inviteSchema], default: [] },
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

const userModel = mongoose.model('User', userSchema)

module.exports = userModel
