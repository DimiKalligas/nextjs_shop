import { useState } from 'react'
// import Image from 'next/image'
// import { Link } from 'next/link'
import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { useTheme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
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
import { useSnackbar } from 'notistack'
import useForm from '../useForm'
// import FormControl from '@mui/material/FormControl'
// import { MdOutlineAlternateEmail } from 'react-icons/md'

const useStyles = makeStyles((theme) => ({
  // background: {
  //   backgroundImage: `url(${background})`,
  //   backgroundPosition: 'center',
  //   backgroundSize: 'cover',
  //   backgroundRepeat: 'no-repeat',
  //   height: '60em'
  // }
  h3: {
    fontSize: '2rem'
  }
}))

let initialValues = {
  email: '',
  password: ''
}

async function createUser(email, pwd) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, pwd }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Something bad happened..')
  }

  return data
}

function AuthForm() {
  // const emailInputRef = useRef()
  // const pwdInputRef = useRef()
  // const [session, loading] = useSession()
  const [isLogin, setIsLogin] = useState(true)
  // const [nameHelper, setNameHelper] = useState('')
  // const [emailHelper, setEmailHelper] = useState('')
  // const [passwordHelper, setPasswordHelper] = useState('')
  // const [message, setMessage] = useState('')
  const [dummy] = useState('')
  const [open, setOpen] = useState(false)
  const [errors, setErrors] = useState({})
  const { enqueueSnackbar } = useSnackbar()

  const login = () => {
    console.log('Callback function when form is submitted!')
    console.log('Form Values ', values)
  }

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
      temp.password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(
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

  // Custom hook call
  // const { handleSubmit, handleChange, values, errors, handleOnBlur } =
  //   useForm(finalSubmitHandler) // ή login για τεστ!
  // useForm(login)

  // const onChange = (event) => {
  //   let valid

  //   switch (event.target.id) {
  //     case 'email':
  //       let enteredEmail = emailInputRef.current.value
  //       valid = '/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$'.test(
  //         event.target.value
  //       )

  //       if (!valid) {
  //         setEmailHelper('Invalid Email!')
  //       } else {
  //         setEmailHelper('')
  //       }

  //       break
  //     default:
  //       break
  //   }
  // }

  // const classes = useStyles()
  // const theme = useTheme()

  const router = useRouter()

  // αλλάζει από login σε register
  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState)
  }

  const finalSubmitHandler = async () => {
    // const { email, password } = values
    // e.preventDefault()

    console.log(
      'on submitHandler!',
      // emailInputRef.current.value,
      // pwdInputRef.current.value
      state.email,
      state.password
    )
    // console.log(isLogin ? 'login' : 'signup')

    const enteredEmail = state.email
    const enteredPassword = state.password

    // validation here

    // εάν είμαστε σε φάση isLogin, κάνε signIn
    if (isLogin) {
      // first argument is provider, as we can have multiple providers in the same application
      // second argument triggers when back-end throws an error
      // result has any error information
      const result = await signIn('credentials', {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword
      })

      if (!result.error) {
        // set some auth state
        router.replace('/dashboard') // router.push?
      } else {
        console.log('no such user..')
      }
    } else {
      try {
        // create user
        const result = await createUser(enteredEmail, enteredPassword)
        enqueueSnackbar(`${result} created!`, {
          variant: 'success'
        })
        router.replace('/auth')
      } catch (e) {
        console.log(e)
      }
    }
  }

  const { onSubmit, state, dispatch } = useForm(
    finalSubmitHandler,
    initialValues,
    validate
  )

  // const handleChange = (e) => {
  //   setDummy(e.target.value)
  // }

  return (
    // και αν θέλαμε να ορίσουμε πλάτος: lg={3} για 3 στήλες π.χ.
    // <section className={classes.auth}>
    //   <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
    //   <form onSubmit={submitHandler}>
    //     <div className={classes.control}>
    //       <label htmlFor='email'>Your Email</label>
    //       <input type='email' id='email' required ref={emailInputRef} />
    //     </div>
    //     <div className={classes.control}>
    //       <label htmlFor='password'>Your Password</label>
    //       <input type='password' id='password' required ref={pwdInputRef} />
    //     </div>
    //     <div className={classes.actions}>
    //       <button>{isLogin ? 'Login' : 'Create Account'}</button>
    //       <button
    //         type='button'
    //         className={classes.toggle}
    //         onClick={switchAuthModeHandler}
    //       >
    //         {isLogin ? 'Create new account' : 'Login with existing account'}
    //       </button>
    //     </div>
    //   </form>
    // </section>
    <Grid
      container
      direction='column'
      justifyContent='center'
      alignItems='center'
    >
      <form id='login-form'>
        <Grid item>
          <Typography
            variant='h4'
            style={{ lineHeight: 1, marginTop: 15, marginBottom: 25 }}
          >
            Login
          </Typography>
        </Grid>

        <Grid item container style={{ maxWidth: '20em' }}>
          {/* <Grid item> depicts mui validation - θέλει useState & ισχύει από το πρώτο input... :( */}
          <Grid item>
            <TextField
              label='Email'
              name='email'
              // τα TextField θέλουν inputRef αντί για ref
              // inputRef={emailInputRef}
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
              error={!!errors.email} // !! converts String to Boolean
              helperText={errors.email}
            />
          </Grid>

          <Grid item>
            <TextField
              label='Password'
              // id='password'
              name='password'
              type='password'
              // inputRef={pwdInputRef}
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
            />
            {!!errors.password && <h5>{errors.password}</h5>}
          </Grid>
        </Grid>
        <Grid item style={{ marginTop: '20px' }}>
          <Button variant='contained' onClick={onSubmit}>
            {isLogin ? 'Login' : 'Create Account'}
          </Button>
        </Grid>
        {/* ας το δω μετά -> */}
        <Grid item style={{ marginTop: '10px' }}>
          <Button onClick={switchAuthModeHandler}>
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </Button>
        </Grid>
      </form>
      {/* Confirmation dialog: */}
      {/* επαναλαμβάνουμε τα δύο πρώτα πεδία, για confirmation */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <Grid container direction='column'>
            <Grid item></Grid>
            <Typography variant='h4' gutterBottom>
              Confirm message
            </Typography>
          </Grid>

          <Grid item>
            {/* depicting mui validation - θέλει useState & ισχύει από το πρώτο input... :( */}
            <TextField
              label='Name'
              id='name'
              value={dummy}
              // error={dummy === ''}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE STATE',
                  field: e.target.name,
                  payload: e.target.value
                })
              }
            />
          </Grid>
          <Grid item>
            <TextField
              label='Email'
              id='email'
              name='email'
              // error={emailHelper.length !== 0}
              // helperText={emailHelper}
              // τα TextField θέλουν inputRef αντί για ref
              // inputRef={emailInputRef}
              value={state.email}
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
            />
          </Grid>
          <Grid item container>
            <Grid item>
              <Button color='primary' onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </Grid>
            <Grid item>
              {/*  onClick={onSubmit} */}
              <Button type='submit' variant='contained'>
                {isLogin ? 'Login' : 'Create Account'}
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Grid>
  )
}

export default AuthForm
