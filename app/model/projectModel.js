const { Schema, model, default: mongoose } = require('mongoose')
const projectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    owner: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'user',
      default: [],
    },
    team: {
      type: mongoose.Types.ObjectId,
      ref: 'team',
    },

    image: {
      type: String,
      required: false,
      default: '/uploads/project/default.png',
    },
    status: {
      type: String,
      required: true,
      default: 'DRAFT',
      enum: ['DRAFT', 'PUBLISH', 'UNPUBLISH'],
    },
    tags: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
)

const projectModel = new model('Project', projectSchema)

module.exports = projectModel
