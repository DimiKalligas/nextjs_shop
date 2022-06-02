import { getSession } from 'next-auth/client'
import UserProfile from '../components/profile/user-profile'

function ProfilePage() {
  return <UserProfile />
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

  // user is authenticated
  // για να μην ξανακάνει check όταν κάνουμε reload, κάνουμε wrap το _app με <Provider>
  return {
    props: { session }
  }
}

export default ProfilePage
