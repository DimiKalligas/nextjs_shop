import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useSnackbar } from 'notistack'
// import fetch from 'isomorphic-unfetch'
import { styled } from '@mui/material/styles'
// import List from '@mui/material/List'
// import ListItem from '@mui/material/ListItem'
// import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {
  Divider,
  Fab,
  Grid,
  Button,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TextField,
  Dialog,
  DialogContent
} from '@mui/material'

const Categories = () => {
  const [catToAdd, setCatToAdd] = useState('')
  const [allCategories, setCategories] = useState([])
  const [open, setOpen] = useState(false)
  const [catToChange, setCatToChange] = useState({
    name: '',
    id: 0 // θέλω το id για να κάνω PUT
  })
  const [loading, setLoading] = useState(false)
  const catRef = useRef()

  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    //   // check if authed???
    //   // if (!userInfo) {
    //   //   router.push('/login')
    //   // }
    const fetchData = async () => {
      try {
        // dispatch({ type: 'FETCH_REQUEST' })
        const { data } = await axios.get(`/api/admin/categories`)
        setCategories(data.data)
        // dispatch({ type: 'FETCH_SUCCESS', payload: data })
      } catch (err) {
        console.log('error fetching categories')
        // dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
      }
    }
    fetchData()
  }, [])

  // useEffect(() => {
  //   console.log('all categories', allCategories)
  // }, [allCategories])

  // το στέλνω στο ΑΡΙ να το σβήσει από τη βάση, και αν οκ, μετά το αφαιρώ και από το state
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/api/admin/categories/${id}`)
      const remainingCategories = allCategories.filter((cat) => cat._id !== id)
      setCategories(remainingCategories)
      enqueueSnackbar(`succesfully deleted ${data.data._catname}`, {
        variant: 'success'
      })
    } catch (error) {
      enqueueSnackbar(`${error.response.data.message}`, {
        variant: 'error'
      })
    }
  }

  const handleEdit = async () => {
    const res = await axios.put(`/api/admin/categories/${catToChange.id}`, {
      name: catToChange.name
    })
    // const res = await fetch(`/api/admin/categories/${catToChange.id}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(catToChange.changeTo)
    // })
    console.log('back from PUT', res)
    setOpen(false)
  }

  const handleChange = (e) => {
    // changing catToChange.name to e.target.value
    setCatToChange({ id: catToChange.id, name: e.target.value })
  }

  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper
  }))

  const handleAddCategory = async () => {
    setLoading(true)
    try {
      const res = await fetch('http://localhost:3000/api/admin/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newCatName: catToAdd })
      })

      let x = await res.json()

      // Check for duplication
      switch (x.success) {
        case true:
          enqueueSnackbar(`category ${catToAdd} added!`, { variant: 'success' })

          // για να ενημερώσει τη λίστα με τις κατηγορίες
          setCategories([...allCategories, x.data])
          break
        default:
          enqueueSnackbar(
            // err.response.data ? err.response.data.message : err.message,
            `${x.message}`,
            { variant: 'Error' }
          )
        // return
      }
      setLoading(false)
    } catch (e) {
      console.log('Error in submitting new category', e)
    }
    setCatToAdd('')
    // return res.json() // parses JSON response into native JavaScript objects)
  }

  return (
    <>
      {/* *************************************************************** DISPLAY CATEGORY LIST */}
      {loading && <h1>Έχε λίγη υπομονή...</h1>}
      <Typography sx={{ mt: 4, mb: 2 }} variant='h6' component='div'>
        Existing Categories
      </Typography>

      {!loading && (
        <TableContainer component={Paper} sx={{ minWidth: 370 }}>
          {/* <Demo> */}
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allCategories.map((category) => (
                <TableRow
                  key={category.slug}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{category._catname}</TableCell>
                  {/* // ************************************************** DELETE */}
                  <Fab
                    sx={{ mt: 1, ml: 4 }}
                    size='small'
                    variant='extended'
                    color='primary'
                    onClick={handleDelete.bind(null, category._id)}
                  >
                    <DeleteIcon />
                  </Fab>

                  <Fab
                    sx={{ mt: 1, ml: 4 }}
                    size='small'
                    variant='extended'
                    color='primary'
                    onClick={() => {
                      // ********************************************** EDIT
                      catRef.current = category.name
                      setCatToChange({
                        name: category._catname,
                        id: category._id
                      })
                      setOpen(true)
                    }}
                  >
                    <EditIcon />
                  </Fab>
                  {/* **************************************** DISPLAY CATEGORIES */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* </Demo> */}
        </TableContainer>
      )}

      <Divider>---------------------------------</Divider>

      {/* ****************************************************** ADD CATEGORY */}
      {/* η φόρμα του δίνει column orientation */}
      <Grid
        id='myRow'
        item
        container
        spacing={2}
        direction='row'
        alignItems='center' // κατεβάζει λίγο το button
      >
        <Grid item>
          <TextField
            label='Category'
            id='name'
            value={catToAdd}
            onChange={(e) => setCatToAdd(e.target.value)}
            // helperText='field is required'
          />
        </Grid>
        <Grid item>
          <Button variant='contained' onClick={handleAddCategory}>
            Insert Category
          </Button>
        </Grid>
      </Grid>

      {/* *********************************************************** EDIT CATEGORY */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <Grid container direction='column'>
            <Grid item></Grid>
            <Typography variant='h4' gutterBottom>
              Edit Category {catRef.current}
            </Typography>
          </Grid>

          <Grid item>
            <TextField
              label='Name'
              id='name'
              value={catToChange.name}
              onChange={(e) => handleChange(e)}
            />
          </Grid>

          <Grid item container>
            <Grid item>
              <Button color='primary' onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </Grid>
            <Grid item onClick={(e) => handleEdit()}>
              <Button type='submit' variant='contained'>
                Change Name
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  )
}

// getInitialProps can not be used in children components. Only in pages.
// getStaticProps is recommended for nextjs ver > 9.3
// Categories.getStaticProps = async (context) => {
//   const res = await fetch('http://localhost:3000/api/admin/categories')
//   const { data } = await res.json()

//   console.log('sthn getInitialProps, ta data einai')

//   return { allCategories: data }
// }

export default Categories
