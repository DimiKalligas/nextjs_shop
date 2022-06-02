import { Provider } from 'next-auth/client'
import { SnackbarProvider } from 'notistack'
// import { ThemeProvider } from '@mui/material/styles'
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles'

import theme from '../components/ui/Theme'
import Layout from '../components/layout/layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  // pageProps is from getStaticProps or getServerSideProps
  // check that in profile page props contain session
  return (
    // most pages will not have pageProps.session - profile page has it
    // so, by using Provider, when reloading profile page, component will not have to check again for session
    <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      {/* <StyledEngineProvider injectFirst> τι κάνει αυτό? */}
      <ThemeProvider theme={theme}>
        <Provider session={pageProps.session}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </ThemeProvider>
      {/* </StyledEngineProvider> */}
    </SnackbarProvider>
  )
}

export default MyApp
