import { Container } from '@mui/material'
import Product from '../../models/Product'
import db from '../../utils/db'
// import axios from 'axios'

const SingleProductPage = (props) => {
  const { product } = props

  return (
    <Container maxWidth='md'>
      <h4>You is looking at product {product.name}</h4>
    </Container>
  )
}

export async function getServerSideProps(context) {
  const { params } = context
  const { slug } = params

  await db.connect()
  // lean: skip instantiating a full Mongoose document, and just give us Javascript object
  // lean is due to nextjs bug: https://github.com/vercel/next.js/issues/11993
  const product = await Product.findOne({ slug: slug }).lean()
  return {
    props: {
      // check bug above ^
      product: JSON.parse(JSON.stringify(product))
    }
  }
}

export default SingleProductPage
