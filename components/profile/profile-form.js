// import { useRef } from 'react'
import {
  Avatar,
  Grid,
  Typography,
  Button,
  TextField,
  FormHelperText,
  Dialog,
  DialogContent
} from '@mui/material'
import useForm from '../useForm'
import classes from './profile-form.module.css'

function ProfileForm(props) {
  // const oldPasswordRef = useRef()
  // const newPasswordRef = useRef()

  // Custom hook call
  const { handleSubmit, handleChange, values, errors, handleOnBlur } =
    useForm(finalSubmitHandler) // η login για τεστ!

  function submitHandler(e) {
    e.preventDefault()

    const enteredOldPassword = oldPasswordRef.current.value
    const enteredNewPassword = newPasswordRef.current.value

    // validation here

    props.onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword
    })
  }

  async function finalSubmitHandler(values) {
    const { newPassword, oldPassword } = values
    // e.preventDefault()

    console.log(
      'on submitHandler!',
      // emailInputRef.current.value,
      // pwdInputRef.current.value
      oldPassword,
      newPassword
    )

    props.onChangePassword({
      oldPassword,
      newPassword
    })
  }

  return (
    // <Grid container direction='column' justify='center' alignItems='center'>
    <form
      id='password-change-form'
      className={classes.form}
      onSubmit={handleSubmit}
    >
      {/* <Grid item>
        <Typography variant='h5' style={{ lineHeight: 1 }}>
          New Password
        </Typography>
      </Grid> */}

      <Grid item>
        <TextField
          label='Old Password'
          id='oldPassword'
          name='oldPassword'
          // inputRef={pwdInputRef}
          onChange={handleChange}
          onBlur={handleOnBlur}
        />
        {/* {errors.password && <h5>{errors.password}</h5>} */}
      </Grid>

      <Grid item>
        <TextField
          label='New Password'
          id='newPassword'
          name='newPassword'
          // inputRef={pwdInputRef}
          onChange={handleChange}
          onBlur={handleOnBlur}
        />
        {/* {errors.password && <h5>{errors.password}</h5>} */}
      </Grid>

      <Grid item style={{ marginTop: '20px' }}>
        <Button type='submit' variant='contained' onClick={handleSubmit}>
          Change password
        </Button>
      </Grid>
      {/* </Grid> */}

      {/* <div className={classes.control}>
          <label htmlFor='new-password'>New Password</label>
          <input type='password' id='new-password' ref={newPasswordRef} />
        </div> */}

      {/* <div className={classes.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input type='password' id='old-password' ref={oldPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>  */}
    </form>
    // </Grid>
  )
}

export default ProfileForm
