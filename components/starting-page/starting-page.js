import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography
} from '@mui/material'
// import classes from './starting-page.module.css'

function StartingPageContent() {
  const [products, setProducts] = useState([])
  // Show Link to Login page if NOT auth

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // dispatch({ type: 'FETCH_REQUEST' })
        const { data } = await axios.get(`/api/admin/products?page=1&limit=6`)
        setProducts(data.data)
        // dispatch({ type: 'FETCH_SUCCESS', payload: data })
      } catch (err) {
        console.log('error fetching products')
        // dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
      }
    }
    fetchProducts()
  }, [])

  return (
    // <section className={classes.starting}>
    //   <h4>Featured products</h4>
    //   <div>
    //     {products && products.map((product) => <h3>{product.name}</h3>)}
    //   </div>
    // </section>
    // )
    <Container maxWidth='md'>
      <h1>Featured Products</h1>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item md={4} key={product.name}>
            <Card>
              <Link href={`/product/${product.slug}`}>
                <CardActionArea>
                  <CardMedia
                    component='img'
                    image={product.image}
                    title={product.name}
                  ></CardMedia>
                  {/* <CardContent>
                  <Typography>K{product.name}</Typography>
                </CardContent> */}
                </CardActionArea>
              </Link>
              <CardActions
                sx={{ display: 'flex', justifyContent: 'space-around' }}
              >
                <Typography>{product.description}</Typography>
                <Button
                  variant='outlined'
                  // sx={{ float: 'right' }}
                  size='small'
                  color='primary'
                  onClick={() => console.log(product.name)}
                >
                  More info
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default StartingPageContent
