const { Schema, model, default: mongoose } = require('mongoose')

const teamSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    users: {
      type: [mongoose.Types.ObjectId],
      required: true,
      ref: 'user',
      default: [],
    },
    owner: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    projects: {
      type: [mongoose.Types.ObjectId],
      required: true,
      ref: 'projects',
    },

    avatar: {
      type: String,
      required: false,
      default: '/uploads/avatar.png',
    },
  },
  {
    timestamps: true,
  }
)

const teamModel = new model('Team', teamSchema)

module.exports = teamModel
