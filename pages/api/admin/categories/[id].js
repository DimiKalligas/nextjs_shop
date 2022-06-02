import dbConnect from '../../../../utils/dbConnect'
import Category from '../../../../models/Category'
import Product from '../../../../models/Product'

dbConnect()

export default async (req, res) => {
  const {
    query: { id },
    method,
    body
  } = req

  switch (method) {
    // case 'GET':
    //   try {
    //     const note = await Note.findById(id)

    //     if (!note) {
    //       return res.status(400).json({ success: false })
    //     }

    //     res.status(200).json({ success: true, data: note })
    //   } catch (error) {
    //     res.status(400).json({ success: false })
    //   }
    //   break
    case 'PUT':
      try {
        console.log('we received', id, req.body.name)
        // const category = await Category.findByIdAndUpdate(id, req.body, {
        const category = await Category.findOneAndUpdate(
          { _id: id },
          { _catname: req.body.name },
          {
            // id here is actually name
            new: true,
            runValidators: true
          }
        )

        if (!category) {
          return res.status(400).json({ success: false })
        }

        res.status(200).json({ success: true, data: category })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'DELETE':
      try {
        // first check if products of such category exist
        const categ = await Category.findOne({ _id: id }).exec()
        const result = await Product.findOne({ category: categ._catname })
        // if found products
        if (result) {
          console.log('Βρήκα προϊόντα από αυτή την κατηγορία!')
          return res.status(400).send({
            message: `Cannot delete. Products of '${categ._catname}' exist.`
          })
        } else {
          // did not find any associated products, so go ahead and delete
          throw 'Did not find products of that category'
        }
      } catch (err) {
        const deletedCategory = await Category.findOneAndDelete({ _id: id })
        res.status(200).json({ success: true, data: deletedCategory })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
