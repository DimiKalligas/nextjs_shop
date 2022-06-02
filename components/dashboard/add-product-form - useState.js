import { useState, useRef } from 'react'
import axios from 'axios'
import useForm from '../useForm'
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Select,
  InputLabel,
  Input
} from '@mui/material'

const AddProductForm = ({ allCategories, setProducts }) => {
  const [errors, setErrors] = useState({})
  const [previewSource, setPreviewSource] = useState('')
  const [selectedFile, setSelectedFile] = useState()
  // const [clearSelect, setClearSelect] = useState(false)
  // const [selectValue, setSelectValue] = useState('')
  const imageURL = useRef()
  const initialValues = {
    name: '',
    category: '',
    pic: ''
    // id: 0
  }

  // από James Quick -> cloudinary-starter
  const previewFile = (file) => {
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
        // console.log(data)
        console.log(data.secure_url)
        imageURL.current = data.secure_url
      })
    )
  }

  const validate = (fieldValues = values) => {
    let temp = { ...errors }

    if ('name' in fieldValues)
      temp.name = fieldValues.name ? '' : 'This field is required.'
    if ('category' in fieldValues)
      temp.category = fieldValues.category.length
        ? 0
        : 'This field is required.'

    setErrors({
      ...temp
    })

    // γύρισέ μου αν όλα τα error values είναι ""
    // if (fieldValues == state) πότε χρειάζεται?
    return Object.values(temp).every((x) => x === '')
  }

  const whatHappensFinally = async () => {
    if (selectedFile) await uploadImage(previewSource)
    console.log('will save image', imageURL.current)

    const res = await axios.post('/api/admin/products', {
      name: state.name,
      category: state.category,
      image: imageURL.current || '' // να βάλω κάποιο link to default
    })
    let x = await res.json() // γιατί το κάνουμε αυτό?

    // clear out the form
    // let formelements = document.getElementById('addProductForm').childNodes
    // var array = Array.from(formelements)
    // console.log(array)

    // για να ενημερώσει τη λίστα με τις κατηγορίες
    setProducts([...allProducts, x.data])
  }

  const {
    values,
    setValues,
    // errors,
    // setErrors,
    onSubmit,
    handleInputChange,
    resetForm
  } = useForm(whatHappensFinally, initialValues, validate, setPreviewSource)

  return (
    <>
      <form id='addProductForm'>
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
                value={values.name}
                onChange={handleInputChange}
                // onBlur={(e) =>
                //   dispatch({
                //     type: 'UPDATE STATE',
                //     field: e.target.name,
                //     payload: e.target.value
                //   })
                // }
                error={errors.name}
                helperText={errors.name}
              />
            </Grid>
            <Grid item>
              <FormControl sx={{ minWidth: 120 }} variant='standard'>
                <InputLabel id='simple-select-label'>Category2</InputLabel>
                <Select
                  name='category'
                  value={values.category}
                  onChange={handleInputChange}
                >
                  <MenuItem value=''>&nbsp</MenuItem>
                  {allCategories.map((cat) => (
                    <MenuItem value={cat._id}>{cat._catname}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Typography sx={{ mt: 4, ml: 2 }} variant='h7' component='div'>
              Select Image
            </Typography>
            <Grid container spacing={2} direction='row'>
              <Grid item>
                <InputLabel htmlFor='import-button'>
                  <Input
                    id='import-button'
                    // accept='image/*'
                    name='image'
                    inputProps={{
                      accept: '.jpg'
                    }}
                    type='file'
                    value={values.pic}
                    onChange={(e) => {
                      previewFile(e.target.files[0])
                      setSelectedFile(e.target.files[0])
                      setValues({
                        ...values,
                        [values.pic]: e.target.files[0]
                      })
                    }}
                  />
                </InputLabel>
              </Grid>
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
            <Button variant='contained' onClick={onSubmit}>
              Insert Product
            </Button>
            <Button variant='contained' onClick={resetForm} sx={{ ml: 2 }}>
              Reset
            </Button>
          </Grid>
        </Box>
      </form>
    </>
  )
}

export default AddProductForm
