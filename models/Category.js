const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
  {
    _catname: {
      type: String,
      trim: true,
      required: 'Name is required',
      minlength: [2, 'Too short'],
      maxlength: [32, 'Too long']
    },
    // image: {
    //   type: String,
    //   trim: true
    // },
    images: {
      type: Array
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

// const Category =
//   mongoose.models.Category || mongoose.model('Category', categorySchema)

// export default Category
module.exports =
  mongoose.models.Category || mongoose.model('Category', categorySchema)
// στη βάση θα πάει ως categories
