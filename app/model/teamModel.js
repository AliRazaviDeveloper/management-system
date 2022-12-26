const { Schema, model, default: mongoose } = require('mongoose')
const teamSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: Text, required: true },
    users: {
      type: [mongoose.Types.ObjectId],
      required: true,
      ref: 'user',
      default: [],
    },
    projects: {
      type: [mongoose.Types.ObjectId],
      required: true,
      ref: 'projects',
      default: [],
    },

    avatar: {
      type: String,
      required: false,
      default: '/public/image/avatar.png',
    },
  },
  {
    timestamps: true,
  }
)

const teamModel = new model('Team', teamSchema)

module.exports = teamModel
