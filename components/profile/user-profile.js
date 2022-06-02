// Protected route (in useEffect, with getSession)
import { getSession } from 'next-auth/client'
import { useEffect, useState } from 'react'
import ProfileForm from './profile-form'
import { Grid, Typography } from '@mui/material'
import classes from './user-profile.module.css'

function UserProfile() {
  // const [isLoading, setisLoading] = useState(true)

  // Redirect away if NOT auth
  // ..but not needed, since this is handled in pages/profile.js server-side
  // useEffect(() => {
  //   // session will be either null, or an object with session data
  //   getSession().then((session) => {
  //     if (!session) {
  //       // changes the url in the browser
  //       window.location.href = '/auth' // resets the whole application
  //     } else {
  //       setisLoading(false) // so, we manage session manually - instead of useSession
  //     }
  //   })
  // }, [])

  // with useSession, session & loading do not change when logging out
  // we'll manage manually ^ with getSession
  // const [session, loading] = useSession()

  // .. otherwise (if there is a session), render this
  // if (isLoading) {
  //   return <p className={classes.profile}>Loading...</p>
  // }

  async function changePasswordHandler(passwordData) {
    console.log('in changePasswordHandler, received', passwordData)
    const response = await fetch('/api/user/change-password', {
      method: 'PATCH',
      body: JSON.stringify(passwordData), // old & new password fields
      headers: {
        'Content-Type': 'application/json' // make sure this request carries JSON data
      }
    })

    const data = await response.json()

    console.log(data)
  }

  return (
    // <section className={classes.profile}>
    //   <h1>Your User Profile</h1>
    //   <ProfileForm onChangePassword={changePasswordHandler} />
    // </section>
    <Grid container direction='column' justifyContent='center' alignItems='center'>
      <Grid item>
        <Typography variant='h3' style={{ lineHeight: 1, marginTop: 15 }}>
          Your User Profile
        </Typography>
      </Grid>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </Grid>
  );
}

export default UserProfile
