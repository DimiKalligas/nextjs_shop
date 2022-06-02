// εδώ θα γίνει μόνο auth, και θα καλέσει την Categories - πως μπορούν να γίνουν μαζί?
import { getSession } from 'next-auth/client'
import Products from '../components/dashboard/products'
// import Categories from './categories'

function ProductsPage() {
  return <Products />
}

// έτσι βλέπουμε αν ο user είναι authed
export async function getServerSideProps(context) {
  // here, we use getSession server-side
  const session = await getSession({ req: context.req })
  // αυτό να χρησιμοποιήσω στο amazona?

  // if user is not authenticated, redirect them
  if (!session) {
    return {
      // notFount: true, // this is the 404 page
      redirect: {
        destination: '/auth',
        permanent: false // only this time redirect them
      }
    }
  }

  // const res = await fetch('http://localhost:3000/api/admin/categories')
  // const { data } = await res.json()

  // console.log('sthn getInitialProps, ta data einai')

  // return { allCategories: data }

  // user is authenticated
  // για να μην ξανακάνει check όταν κάνουμε reload, κάνουμε wrap το _app με <Provider>
  return {
    props: { session }
    // allCategories: data
  }
}

export default ProductsPage
