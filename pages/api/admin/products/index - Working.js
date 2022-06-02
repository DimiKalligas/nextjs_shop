import mongoose from 'mongoose'
import FormData from 'form-data' // για να παίξει η FormData server-side...
import dbConnect from '../../../../utils/dbConnect'
import Product from '../../../../models/Product'
import Category from '../../../../models/Category' // χρειάζεται λόγω του populate
// as per documentation https://cloudinary.com/documentation/node_image_and_video_upload#server_side_upload
require('dotenv').config()
const cloudinary = require('cloudinary').v2
console.log(cloudinary.config().cloud_name)

dbConnect()

export default async (req, res) => {
  // το back-end το έχω πάρει από το crud
  const {
    query: { page, limit },
    method,
    body
  } = req

  let onPage = parseInt(page, 10) || 1
  if (onPage > 0) {
    let previous = page - 1
  }
  let forLimit = parseInt(limit, 10) || 0 // 0 για να μετρήσει documents
  const startIndex = (onPage - 1) * forLimit // διορθώνουμε την σελίδα 1, την κάνουμε 0
  const endIndex = onPage * forLimit

  // θέλω τη db για να κάνω object την category: db.Types.ObjectId(req.body.category)
  let db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  switch (method) {
    case 'GET':
      console.log(
        'you want to start at page',
        onPage,
        'with a limit of',
        forLimit
      )
      try {
        const products = await Product.find({})
          // .populate('category')
          .skip(startIndex)
          .limit(forLimit)
          .exec()
        // .populate(category).exec() ΔΕΝ μπορεί να το κάνει, γιατί το category είναι Object..
        res.status(200).json({ success: true, data: products })
      } catch (error) {
        console.log('error', error)
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      // //// Πρώτα ανεβάζουμε το image στο cloudinary ////////
      cloudinary.uploader
        .upload(req.body.image, {
          resource_type: 'image'
        })
        .then((res) => {
          console.log('success', JSON.stringify(res, null, 2))
        })
        .catch((err) => {
          console.log('cloudinary error', JSON.stringify(err, null, 2))
        })
      // const formData = new FormData()
      // formData.append('file', req.body.image)
      // formData.append('upload_preset', 'demo-image-upload-starter') // 2nd value is our preset

      // let cloudinaryUrl
      // try {
      //   const data = await fetch(
      //     'https://api.cloudinary.com/v1_1/dvaibg9vx/image/upload',
      //     {
      //       method: 'POST',
      //       body: formData
      //     }
      //   ).then((res) => {
      //     res.json()
      //     cloudinaryUrl = res.url
      //     console.log('got back url', cloudinaryUrl)
      //   })
      // } catch (e) {
      //   console.log('cloudinary error', e)
      // }

      // console.log('in POST', req.body.name, req.body.category, req.body.image)
      const doc = new Product()
      doc.name = req.body.name
      doc.slug = req.body.name
      doc.category = req.body.category
      // doc.category = db.Types.ObjectId(req.body.category)
      doc.description = 'to be in edit'
      doc.image = req.body.image
      // doc.image = cloudinaryUrl
      try {
        // as per documentation
        const product = await doc.save()

        res.status(201).json({ success: true, data: product })
      } catch (error) {
        console.log('possible duplication', error)
        res.status(400).json({ success: false })
        // send({ message: 'Λάθος email ή password' })
        // json({ err: err.message, });
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
