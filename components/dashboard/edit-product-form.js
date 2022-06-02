import React, { useState } from 'react'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import useForm from '../useForm'
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  Select,
  InputLabel
} from '@mui/material'

const EditProductForm = ({
  initialValues,
  allCategories,
  allProducts,
  setProducts,
  open,
  setOpen
}) => {
  const [errors, setErrors] = useState({})
  const { enqueueSnackbar } = useSnackbar()

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

  const whatHappensFinally = async () => {
    try {
      const response = await axios.put(`/api/admin/products/${state._id}`, {
        name: state.name,
        category: state.category,
        image: state.image || '' // να βάλω κάποιο link to default
      })
      setOpen(false)
      enqueueSnackbar(`Product ${response.data.data.name} updated`, {
        variant: 'success'
      })
      // ενημερώνω και τον πίνακα με τα products
      setProducts(
        allProducts.map((product) =>
          product._id === response.data.data._id ? response.data.data : product
        )
      )
    } catch (err) {
      enqueueSnackbar(err.message, {
        variant: 'error'
      })
    }
  }

  const { onSubmit, state, dispatch } = useForm(
    whatHappensFinally,
    initialValues,
    validate
  )

  return (
    <>
      <Box
        component='form'
        sx={{
          '& > :not(style)': { m: 1 }
        }}
        noValidate
        autoComplete='off'
      >
        <Dialog
          PaperProps={{
            sx: {
              width: '90%',
              maxHeight: 400
            }
          }}
          open={open}
          onClose={() => setOpen(false)}
        >
          <DialogTitle>Edit Product {state.name}</DialogTitle>
          <DialogContent dividers>
            <TextField
              label='Name'
              name='name'
              defaultValue={state.name}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE STATE',
                  field: e.target.name,
                  payload: e.target.value
                })
              }
              onBlur={(e) =>
                dispatch({
                  type: 'UPDATE STATE',
                  field: e.target.name,
                  payload: e.target.value
                })
              }
              error={errors.name}
              helperText={errors.name}
              // {...(errors && { error: true, helperText: errors })}
            />

            {/* ******** Update Category using SELECT ********** */}
            <div>
              {/* FormControl: Provides context such as filled/focused/error/required for form inputs. */}
              <FormControl
                sx={{ m: 1, minWidth: 120 }}
                variant='standard'
                error={errors.category}
              >
                <InputLabel id='simple-select-label'>Category</InputLabel>
                <Select
                  labelId='simple-select-label'
                  id='simple-select'
                  name='category'
                  value={state.category}
                  // renderValue={(value) => ` ⚠️  -${value}`}
                  // ...να δείχνει την παλιά τιμή και να ενημερώνει σωστά
                  onChange={(e) => {
                    dispatch({
                      type: 'UPDATE STATE',
                      field: e.target.name,
                      payload: e.target.value
                    })
                  }}
                >
                  {allCategories.map((cat) => (
                    <MenuItem value={cat._catname}>{cat._catname}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <Grid item container sx={{ mt: 2 }}>
              <Grid item>
                <Button color='primary' onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </Grid>
              <Grid item onClick={onSubmit}>
                <Button type='submit' variant='contained'>
                  Change Details
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  )
}

export default EditProductForm
