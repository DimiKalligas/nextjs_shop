import React, { useEffect, useState } from 'react'
import axios from 'axios'
import EditProductForm from './edit-product-form'

const LoadProductToEdit = ({ id, open, setOpen, allProducts, setProducts }) => {
  const [product, setProduct] = useState({})
  const [allCategories, setAllCategories] = useState([])

  useEffect(() => {
    const fetchProduct = () => {
      try {
        // const fetchProduct = async () => { // αυτό γιατί δεν παίζει?
        //   setProduct(await axios.get(`/api/admin/products/${id}`).data.data)
        // }
        const { data } = axios
          .get(`/api/admin/products/${id}`)
          .then((data) => setProduct(data.data.data))
      } catch (err) {
        console.log('error fetching product', err)
      }
    }

    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/admin/categories`)
        setAllCategories(data.data)
      } catch (err) {
        console.log('error fetching categories')
      }
    }
    fetchProduct()
    fetchCategories()
  }, [])

  // size of object > 0 === στο δεύτερο render - μετά το πρώτο useEffect :(
  return Object.keys(product).length > 0 ? (
    <>
      <EditProductForm
        initialValues={product}
        allCategories={allCategories}
        allProducts={allProducts}
        setProducts={setProducts}
        open={open}
        setOpen={setOpen}
      />
    </>
  ) : (
    <div>Loading...{Object.keys(product).length}</div>
  )
}

export default LoadProductToEdit
