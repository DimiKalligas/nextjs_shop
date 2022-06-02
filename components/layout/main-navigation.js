import NextLink from 'next/link'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/client'
import AccountCircle from '@mui/icons-material/AccountCircle'
import {
  AppBar,
  // Avatar,
  Box,
  Container,
  Toolbar,
  Typography,
  IconButton,
  Link,
  // ThemeProvider,
  // CssBaseline,
  // Badge,
  // Button,
  Menu,
  MenuItem,
  Tooltip
} from '@mui/material'
import { useState } from 'react'
import { useRouter } from 'next/router'

import classes from './main-navigation.module.css'

const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

function MainNavigation() {
  const [session, loading] = useSession()
  const [anchorEl, setAnchorEl] = useState(null)
  const router = useRouter()

  const handleChange = (event) => {
    setAuth(event.target.checked)
  }
  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget)
  // }
  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget)
  // }

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null)
  // }

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null)
  // }

  // console.log(loading)
  // console.log(session.user.email)

  // const loginClickHandler = (e) => {
  //   // = έχω κάνει κλικ στο username - το θέλει για να ξέρει να εμφανίσει το μενού του χρήστη
  //   setAnchorEl(e.currentTarget)
  // }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDashboard = () => {
    setAnchorEl(null)
    router.push('/dashboard')
  }

  const handleProfile = () => {
    setAnchorEl(null)
    router.push('/profile')
  }

  const handleLogout = () => {
    handleClose()
    signOut()
  }

  function logoutHandler() {
    signOut() // nextjs will clear the login cookie
  }

  return (
    // <header className={classes.header}>
    // {/* <Link href='/'>
    //   <a>
    //     <div className={classes.logo}>Next Auth</div>
    //   </a>
    // </Link>
    // <nav>
    //   <ul>
    //     {!session && !loading && (
    //       <li>
    //         <Link href='/auth'>Login</Link>
    //       </li>
    //     )}
    //     {session && (
    //       <li>
    //         <Link href='/profile'>Profile</Link>
    //       </li>
    //     )}
    //     {session && (
    //       <li>
    //         <button onClick={logoutHandler}>Logout</button>
    //       </li>
    //     )}
    //   </ul>
    // </nav> */}

    <Box sx={{ flexGrow: 1 }}>
      {/* <CssBaseline /> */}
      <AppBar position='static' color='primary'>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <NextLink href='/' passHref>
              <Link color='inherit' underline='none'>
                <Typography
                  variant='h6'
                  color='secondary'
                  noWrap
                  component='div'
                  // sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                >
                  Super Store
                </Typography>
              </Link>
            </NextLink>
            {/* η flexGrow πάει τα επόμενα div τέρμα δεξιά */}
            <div className={classes.grow}></div>
            <div>
              {/* <NextLink href='/cart' passHref>
              <Link>
                {cart.cartItems.length > 0 ? (
                  <Badge
                    // color="secondary"
                    badgeContent={cart.cartItems.length}
                  >
                    Cart
                  </Badge>
                ) : (
                  'Cart'
                )}
              </Link>
            </NextLink> */}
              {session && !loading && (
                <>
                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title='Open settings'>
                      <IconButton
                        size='medium'
                        aria-label='account of current user'
                        aria-controls='menu-appbar'
                        aria-haspopup='true'
                        onClick={handleMenu}
                        color='inherit'
                      >
                        <AccountCircle />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      id='menu-appbar'
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleDashboard}>Dashboard</MenuItem>
                      <MenuItem onClick={handleProfile}>Profile</MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </Box>
                </>
              )}
              {!session && !loading && (
                // <NextLink href='/auth' passHref>
                <Link href='/auth' color='inherit' underline='none'>
                  Login
                </Link>
                // </NextLink>
              )}
              {/* {session && (
              <Button color='inherit' onClick={logoutHandler}>
                Logout
              </Button>
            )} */}
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
    // </header>
  )
}

export default MainNavigation
