// ΔΕΝ το χρησιμοποιώ γιατί είναι page, αρα προσβάσιμο
// καλώ το component!
import { useState } from 'react'
// import axios from 'axios'
// import fetch from 'isomorphic-unfetch'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Button, Typography, TextField } from '@mui/material'

const Categories = ({ allCategories }) => {
  const [mycategory, setMyCategory] = useState('')

  const handleSubmit = async () => {
    console.log('Inserting category', mycategory)
    const res = await fetch('http://localhost:3000/api/admin/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mycategory)
    })
    return res.json() // parses JSON response into native JavaScript objects
  }

  return <>
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        id='myColumn'
        container
        direction='column'
        justifyContent='center'
        alignItems='center'
      >
        <Grid id='myRow' item container spacing={2} direction='row'>
          {/* η φόρμα του δίνει column orientation */}
          {/* <form id='category-form'> */}
          <Grid item>
            <TextField
              label='Category'
              id='name'
              value={mycategory}
              // error={category === ''}
              onChange={(e) => setMyCategory(e.target.value)}
              helperText='field is required'
            />
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              xs={{ marginTop: '45px' }}
              onClick={handleSubmit}
            >
              Insert Category
            </Button>
          </Grid>
          {/* </form> */}
        </Grid>

        {/* <Grid item> */}
        <div>
          WAOOZA
          {allCategories.map((category) => {
            return <h3 key={category._id}>{category.name}</h3>
          })}
        </div>
      </Grid>
    </Box>
  </>;
}

// getInitialProps can not be used in children components. Only in pages.
// getStaticProps is recommended for nextjs ver > 9.3 - getStaticProps can not be attached to a page's component
Categories.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/admin/categories')
  const { data } = await res.json()

  console.log('sthn getInitialProps, ta data einai')

  return { allCategories: data }
}

export default Categories
