import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import useForm from '../useForm'
// import usePagination from '../usePagination'
// import usePagination from '../Pagination'
import AddProductForm from './add-product-form'
import LoadProductToEdit from './load-product-to-edit'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useSnackbar } from 'notistack'

import {
  Divider,
  Fab,
  Grid,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from '@mui/material'

// είναι ο πίνακας που κάνουμε display τα products, και add product..
const Products = () => {
  const [allProducts, setProducts] = useState([]) // all products IN A PAGE
  const [noOfRecords, setNoOfRecords] = useState()
  const [allCategories, setAllCategories] = useState([])
  const [errors, setErrors] = useState({})
  const [open, setOpen] = useState(false)
  // pagination
  let [currentPage, setPage] = useState(1)
  const PER_PAGE = 4

  // const count = Math.ceil(noOfRecords / PER_PAGE) // pagination: πόσες σελίδες
  const initialValues = {
    name: '',
    category: '', // null
    id: 0 // θέλω το id για να κάνω PUT
  }
  const ApiAddress = axios.create({
    baseURL: '/api/admin/products'
  })
  const idRef = useRef()

  const { enqueueSnackbar } = useSnackbar()

  // από default, τα fieldValues θα παίρνουν το state για την περίπτωση του onSubmit
  const validate = (fieldValues = state) => {
    let temp = { ...errors }

    if ('name' in fieldValues)
      temp.name = fieldValues.name ? '' : 'This field is required.'
    if ('email' in fieldValues)
      temp.email =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          fieldValues.email
        )
          ? ''
          : 'Email is not valid.'

    if ('password' in fieldValues)
      temp.password =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          fieldValues.password
        )
          ? '' // να αφαιρεθεί
          : 'Password should contain at least 8 characters including uppercase and a number.'

    setErrors({
      ...temp
    })

    // γύρισέ μου αν όλα τα error values είναι ""
    // if (fieldValues == state) πότε χρειάζεται?
    return Object.values(temp).every((x) => x === '')
  }

  useEffect(() => {
    const countProducts = async () => {
      const total = await axios.get(`/api/admin/products`)
      // noOfRecords = noOfRecords.data.data
      setNoOfRecords(total.data.data)
      // console.log('initially numOfProducts is', total.data.data)
      // setProducts(data.data)
    }

    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/admin/categories`)
        setAllCategories(data.data)
      } catch (err) {
        console.log('error fetching categories')
      }
    }

    countProducts()
    fetchCategories()
  }, [])

  // const { jump, begin, end } = usePagination(noOfRecords, PER_PAGE)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await ApiAddress.get(
          '?page=' + currentPage + '&limit=' + PER_PAGE
        )
        setProducts(data.data)
      } catch (err) {
        console.log('error fetching products')
      }
    }

    fetchProducts()
  }, [currentPage])

  // κάνει add το product
  const whatHappensFinally = async () => {
    try {
      const res = await axios.post(`/api/admin/products/${idRef.current}`, {
        name: state.name,
        category: state.category
      })
      // για να ενημερώσει τη λίστα με τα products
      setProducts([...allProducts, res.data])
    } catch (error) {
      console.log('error from POST', error)
    }

    // console.log(res.data)
    setOpen(false)
    enqueueSnackbar('Product added', { variant: 'success' })
  }

  const { onSubmit, state, dispatch } = useForm(
    whatHappensFinally,
    initialValues,
    validate
  )

  // const handleChangePage = (page) => {
  //   console.log('you called for page', page)
  //   setPage(page)
  //   jump(page) // όταν πατάμε 2 πάει στο 3..
  // }

  return (
    <>
      <Typography sx={{ mt: 4, mb: 2 }} variant='h6' component='div'>
        All Products
      </Typography>
      <TableContainer component={Paper} sx={{ minWidth: 670 }}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align='right'>Description&nbsp;</TableCell>
              <TableCell align='right'>Category&nbsp;</TableCell>
              <TableCell align='right'>Featured&nbsp;</TableCell>
              <TableCell align='right'>&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allProducts.map((product) => (
              <TableRow
                key={product.slug}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{product.name}</TableCell>
                <TableCell align='right'>{product.description}</TableCell>
                <TableCell align='right'>{product.category}</TableCell>
                <TableCell align='right'>
                  {product.featured ? 'Y' : 'N'}
                </TableCell>
                {/* ***  EDIT ICON *** */}
                <Fab
                  sx={{ mt: 1, ml: 4 }}
                  size='small'
                  variant='extended'
                  color='primary'
                  onClick={() => {
                    setOpen(true)
                  }}
                >
                  <EditIcon />
                </Fab>
                {/* ***  DELETE ICON *** */}
                <Fab
                  sx={{ mt: 1, ml: 4 }}
                  size='small'
                  variant='extended'
                  color='primary'
                  onClick={() => {
                    // **************************************************** DELETE
                    console.log('you are deleting', product.name)
                    const response = axios.delete(
                      `/api/admin/products/${product._id}`
                    )
                    let currentId = product._id
                    enqueueSnackbar(`${product.name} deleted`, {
                      variant: 'success'
                    })
                    setNoOfRecords((noOfRecords) => noOfRecords--)
                    const remaining = allProducts.filter(
                      (product) => product._id !== currentId
                    )
                    setProducts(remaining)
                  }}
                >
                  <DeleteIcon color='error' />
                </Fab>
                {/* Καλύτερα Fab^ από το κακόμοιρο IconButton :) */}
                {/* <IconButton
                  onClick={() => {
                    // **************************************************** EDIT
                    prodRef.current = product.name
                    setProdToChange({
                      name: product.name,
                      category: product.category._catname,
                      id: product._id
                    })
                    setOpen(true)
                  }}
                  size='large'
                >
                  <EditIcon />
                </IconButton> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ------------------- PAGINATION ---------------------- */}
      <Stack direction='row' spacing={2} sx={{ marginTop: '10px' }}>
        <Pagination
          // component='div'
          count={Math.ceil(noOfRecords / PER_PAGE)}
          page={currentPage}
          onChange={(e, value) => setPage(value)}
          // rowsPerPage={PER_PAGE}
          // onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Stack>

      {/* -------------------- ADD PRODUCT ---------------------- */}
      <Divider>- - - - - - - - </Divider>
      <Grid id='AddProductForm' sx={{ display: 'block' }}>
        <AddProductForm
          allProducts={allProducts}
          setProducts={setProducts}
          allCategories={allCategories}
          setAllCategories={setAllCategories}
          noOfRecords={noOfRecords}
          setNoOfRecords={setNoOfRecords}
        />
      </Grid>

      {/* -------------------- EDIT PRODUCT ---------------------- */}
      {open && ( // καλεί το edit-product-form.js
        <LoadProductToEdit
          id={idRef.current}
          open={open}
          setOpen={setOpen}
          allProducts={allProducts}
          setProducts={setProducts}
        />
      )}
    </>
  )
}

export default Products
