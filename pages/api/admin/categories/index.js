// import nc from 'next-connect'
// // import Category from '../../../models/Category'
// const Category = require('../../../models/Category')
// // import { isAuth, isAdmin } from '../../../utils/auth'
// import db from '../../../utils/db' // αυτή η μαλακία του amazona δεν παίζει
// // import { connectToDatabase } from '../../../utils/db2'
// // import { onError } from '../../../utils/error'

// // define onError in case eg payment method is missing
// const handler = nc()
// // {onError}

// // ***** CHECK IF AUTH!

// // to pass the user from the token in the request
// // handler.use(isAuth, isAdmin)
// // so, only authenticated user can have access to following API ->

// const categoryList

// // sand back list of all categories
// handler.get(async (req, res) => {
//   console.log('in categories handler')
//   await db.connect()

//   // ΧΩΡΙΣ MONGOOSE
//   // const client = await connectToDatabase()
//   // const db = client.db()

//   // res.json({ message: 'You made it' })

//   // Category.find({}).sort({ createdAt: -1 }).exec());
//   // Queries do return a thenable, but if you need a real Promise you should use the exec method.

//   try {
//     // ME MONGOOSE
//     let categoryList = await Category.find({}).exec()
//     console.log('Sending back categories', categoryList)

//     // ΧΩΡΙΣ MONGOOSE
//     // const categoryList = await db.collection('category').find({})
//   } catch (e) {
//     console.log('Error reading categories', e)
//   }
//   // res.json(categoryList)
//   res.json({'ante': 'kai gamisou'})
// })

// // add new category
// handler.post(async (req, res) => {
//   if (req.method === 'POST') {
//     console.log('received', req.body.values.name)
//   }
//   await db.connect()

//   try {
//     const newCategory = new Category({ name: req.body.values.name })
//     const category = await newCategory.save()
//     console.log('in server category is', category)
//     res.status(201).send(category)
//   } catch (err) {
//     console.log('in server error ', err)
//   }
//   // res.status(201).json({ message: 'You made it' })
// })

// export default handler

import dbConnect from '../../../../utils/dbConnect'
import Category from '../../../../models/Category'

dbConnect()

export default async (req, res) => {
  // το back-end το έχω πάρει από το crud
  const {
    // query: { id }, XREIAZETAI??
    method
  } = req

  switch (method) {
    case 'GET':
      try {
        const categories = await Category.find({})
        res.status(200).json({ success: true, data: categories })
      } catch (error) {
        res
          .status(400)
          .json({ success: false, data: error.response.data.message })
      }
      break
    case 'POST':
      try {
        const categfound = await Category.find({
          _catname: req.body.newCatName
        })
        console.log(categfound[0]._catname, 'already exists!')
        res.status(400).send({ message: 'category already exists!' })
      } catch (error) {
        console.log('adding category')
        const doc = new Category()
        doc._catname = req.body.newCatName
        doc.slug = req.body.newCatName
        try {
          // as per documentation
          const category = await doc.save()

          res.status(201).json({ success: true, data: category })
        } catch (error) {
          console.log('possible duplication', error)
          res.status(400).json({ success: false })
          // send({ message: 'Λάθος email ή password' })
          // json({ err: err.message, });
        }
      }

      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
