import { useState } from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import Divider from '@mui/material/Divider'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Check from '@mui/icons-material/Check'
import Collapse from '@mui/material/Collapse'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import DraftsIcon from '@mui/icons-material/Drafts'
import SendIcon from '@mui/icons-material/Send'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import StarBorder from '@mui/icons-material/StarBorder'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import CategoriesPage from '../../pages/categoriespage'
import ProductsPage from '../../pages/productspage'
// import ProductsPage from '../../pages/products/productspage'
// import { Link } from 'react-router-dom'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}))

function userDashboard() {
  // const [open, setOpen] = useState(true)
  // const [openProfil, setOpenProfil] = useState(true)
  const [showCategories, setShowCategories] = useState(false)
  const [showProducts, setShowProducts] = useState(false)
  const router = useRouter()

  // const handleClick = () => {
  //   setOpen(!open)
  // }

  const handleProfile = () => {
    // setAnchorEl(null)
    router.push('/profile')
  }

  const handleCategories = () => {
    router.push
  }

  const handleShowCategories = () => {
    setShowProducts(false)
    setShowCategories(true)
  }

  const handleShowProducts = () => {
    setShowProducts(true)
    setShowCategories(false)
  }

  return (
    <>
      <Box sx={{ flexGrow: 1, ml: 1 }}>
        <Grid id='topGrid' container spacing={1} direction='row'>
          {/*  το αριστερό μενού */}
          <Grid
            item
            container
            xs={4}
            direction='column'
            sx={{ marginLeft: '3px' }}
          >
            <Grid item sx={{ width: 180, my: '20px' }}>
              <Typography variant='h6' component='h2'>
                Admin Dashboard
              </Typography>
            </Grid>
            <Paper sx={{ width: 150 }}>
              <MenuList dense>
                <MenuItem>
                  <ListItemText inset onClick={() => handleShowCategories()}>
                    Categories
                  </ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText inset onClick={() => handleShowProducts()}>
                    Products
                  </ListItemText>
                </MenuItem>
                {/* <MenuItem>
                  <ListItemIcon>
                    <Check />
                  </ListItemIcon>
                  Custom: 1.2
                </MenuItem> */}
                <Divider />
              </MenuList>
            </Paper>
          </Grid>

          <Grid
            item
            xs={6}
            sx={{ width: 680, marginTop: '20px', justifyContent: 'flex-start' }}
          >
            {showCategories && <CategoriesPage />}
            {showProducts && <ProductsPage />}
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default userDashboard
