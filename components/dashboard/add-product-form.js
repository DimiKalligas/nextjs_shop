import { useState, useRef } from 'react'
import axios from 'axios'
import useForm from '../useForm'
import AddIcon from '@mui/icons-material/Add'
import {
  Box,
  Button,
  Fab,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Select,
  InputLabel,
  Input
} from '@mui/material'

const AddProductForm = ({
  allCategories,
  allProducts,
  setProducts,
  noOfRecords,
  setNoOfRecords
}) => {
  const [errors, setErrors] = useState({})
  const [previewSource, setPreviewSource] = useState('')
  const [selectedFile, setSelectedFile] = useState()
  const imageURL = useRef()
  const initialValues = {
    name: '',
    category: '',
    image: ''
  }

  // από James Quick -> cloudinary-starter
  const previewFile = (file) => {
    // console.log('You are previewing', file)
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const uploadImage = async (base64EncodedImage) => {
    const formData = new FormData()
    formData.append('file', base64EncodedImage)
    formData.append('upload_preset', 'kleidarasPhotos')

    await fetch('https://api.cloudinary.com/v1_1/dvaibg9vx/image/upload', {
      method: 'POST',
      body: formData
    }).then((res) =>
      res.json().then((data) => {
        imageURL.current = data.secure_url
      })
    )
  }

  const validate = (fieldValues = state) => {
    let temp = { ...errors }

    if ('name' in fieldValues)
      temp.name = fieldValues.name ? '' : 'This field is required.'
    if ('category' in fieldValues)
      temp.category =
        fieldValues.category.length != 0 ? '' : 'This field is required.'

    setErrors({
      ...temp
    })

    // γύρισέ μου αν όλα τα error values είναι ""
    // if (fieldValues == state) πότε χρειάζεται?
    return Object.values(temp).every((x) => x === '')
  }

  const whatHappensFinally = async () => {
    if (selectedFile) await uploadImage(previewSource)
    // console.log('will save image', imageURL.current)

    const res = await axios.post('/api/admin/products', {
      name: state.name,
      category: state.category,
      image: imageURL.current || '' // να βάλω κάποιο link to default
    })
    // για να ενημερώσει τη λίστα με τα products
    setProducts([...allProducts, res.data.data])
    setNoOfRecords((noOfRecords) => noOfRecords + 1)

    setPreviewSource('')
    dispatch({
      type: 'CLEAR FORM'
    })
  }

  const { onSubmit, state, dispatch } = useForm(
    whatHappensFinally,
    initialValues,
    validate
  )

  return (
    <>
      {/* <form id='addProductForm'> */}
      <Box
        component='form'
        sx={{
          '& > :not(style)': { m: 1 },
          p: 2,
          border: '1px dashed grey'
        }}
        noValidate
        autoComplete='off'
      >
        <Typography sx={{ mt: 4, mb: 2 }} variant='h6' component='div'>
          Add Product
        </Typography>
        <Grid container spacing={2} direction='column'>
          <Grid item>
            <TextField
              label='Name'
              name='name'
              id='formName'
              // defaultValue={prodRef.current}
              value={state.name}
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
            />
          </Grid>
          <Grid item>
            <FormControl sx={{ my: 2, minWidth: 120 }} variant='standard'>
              <InputLabel id='simple-select-label'>Category</InputLabel>
              <Select
                name='category'
                id='formCategory'
                value={state.category}
                // SelectDisplayProps={clearSelect} // OXI
                // defaultValue={allCategories[0]._catname} // OXI
                // value={state.category} // OXI
                // error={errors.category}
                // helperText={errors.category}
                onChange={(e) => {
                  dispatch({
                    type: 'UPDATE STATE',
                    field: e.target.name,
                    payload: e.target.value
                  })
                }}
              >
                {/* <MenuItem value=''> </MenuItem> */}
                {allCategories.map((cat) => (
                  <MenuItem key={cat._catname} value={cat._catname}>
                    {cat._catname}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.category}</FormHelperText>
            </FormControl>
          </Grid>

          {/* <Typography sx={{ mt: 4, ml: 2 }} variant='h7' component='div'>
              Select Image
            </Typography> */}
          <Grid container spacing={2} direction='row'>
            <Grid item>
              <label htmlFor='upload-photo'>
                <Input
                  style={{ display: 'none' }} // δεν δείχνει όνομα αρχείου
                  id='upload-photo'
                  name='image'
                  type='file'
                  value={state.image}
                  onChange={(e) => {
                    previewFile(e.target.files[0])
                    setSelectedFile(e.target.files[0])

                    dispatch({
                      type: 'UPDATE STATE',
                      field: e.target.name,
                      payload: e.target.value
                    })
                  }}
                />

                <Fab
                  color='secondary'
                  size='small'
                  component='span'
                  aria-label='add'
                  variant='extended'
                >
                  <AddIcon /> Upload photo
                </Fab>
                <br />
              </label>
            </Grid>
            {/* ////////////////// */}
            <Grid item>
              {previewSource && (
                <img
                  src={previewSource}
                  alt='product image'
                  style={{ height: '150px' }}
                />
              )}
            </Grid>
          </Grid>
        </Grid>

        {/* <Grid item>
          <TextField label='description' />
        </Grid> */}
        <Grid item sx={{ pt: 2, pl: 30 }}>
          {/* η onSubmit θα κάνει μόνο validate και θα καλέσει τη whatHappensFinally */}
          {/* disabled={errors} */}
          <Button variant='contained' onClick={onSubmit}>
            Insert Product
          </Button>
          <Button
            variant='contained'
            onClick={(e) => {
              // resetForm
              setPreviewSource('')
              dispatch({
                type: 'CLEAR FORM'
              })
            }}
            sx={{ ml: 2 }}
          >
            Reset
          </Button>
        </Grid>
      </Box>
      {/* </form> */}
    </>
  )
}

export default AddProductForm
