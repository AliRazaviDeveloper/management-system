const { Schema, model, default: mongoose } = require('mongoose')
const projectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: Text, required: true },
    owner: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'user',
      default: [],
    },
    team: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'team',
      default: [],
    },

    image: {
      type: String,
      required: false,
      default: '/public/image/default.png',
    },
    status: {
      type: String,
      required: true,
      default: 'DRAFT',
      enum: ['DRAFT', 'PUBLISH', 'UNPUBLISH'],
    },
  },
  {
    timestamps: true,
  }
)

const projectModel = new model('Project', projectSchema)

module.exports = projectModel
