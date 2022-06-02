import mongoose from 'mongoose'
import dbConnect from '../../../../utils/dbConnect'
import Product from '../../../../models/Product'

dbConnect()

export default async (req, res) => {
  const {
    query: { id },
    method,
    body
  } = req

  let db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  switch (method) {
    case 'GET':
      try {
        // const product = await Product.findOne({ slug: slug })
        const product = await Product.findOne({ _id: id })
          // .populate('category')
          .exec()
        console.log('hey, in GET API found product', product)

        if (!product) {
          return res.status(400).json({ success: false })
        }
        // res.status(200).json({ product: product })
        res.status(200).json({ success: true, data: product })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'PUT':
      try {
        console.log(
          'received',
          id,
          req.body.name,
          req.body.name,
          req.body.image
        )

        const product = await Product.findOneAndUpdate(
          { _id: id },
          req.body,
          // {
          // name: req.body.name,
          // // category: db.Types.ObjectId(req.body.category)
          // category: req.body.category,
          // image: req.body.image
          // },
          {
            new: true
            // runValidators: true
          }
        ).exec()
        res.status(200).json({ success: true, data: product })
      } catch (err) {
        res
          .status(400)
          .json({ success: false, message: 'error in Product PUT' })
      }
      break
    case 'DELETE':
      try {
        // η deleteOne αν πετύχει, γυρίζει '1'
        // η findOneAndDelete που μου επιστρέφει το record?
        const deletedProduct = await Product.findOneAndDelete({ _id: id })

        if (!deletedProduct) {
          return res.status(400).json({ success: false })
        }

        res.status(200).json({ success: true, data: deletedProduct })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
