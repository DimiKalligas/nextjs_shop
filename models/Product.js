const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: 'Name is required',
      minlength: [2, 'Too short'],
      maxlength: [32, 'Too long']
    },
    description: {
      type: String,
      trim: true
    },
    category: {
      // μετά θα γίνει array
      // type: mongoose.Schema.Types.ObjectId,
      // ref: 'Category',
      type: String,
      trim: true,
      required: 'Name is required',
      required: true
    },
    featured: {
      type: Boolean,
      default: false
    },
    image: {
      type: String
      //   type: Array
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true
    }
  },
  { timestamps: true }
)

module.exports =
  mongoose.models.Product || mongoose.model('Product', productSchema)
