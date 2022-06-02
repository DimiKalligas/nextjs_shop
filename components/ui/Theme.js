import { createTheme, adaptV4Theme } from '@mui/material/styles'

const arcBlue = '#0B72B9'
const arcOrange = '#FFBA60'

export default createTheme(
  adaptV4Theme({
    palette: {
      common: {
        blue: arcBlue,
        orange: arcOrange
      },
      primary: {
        main: arcBlue
      },
      secondary: {
        main: arcOrange
      }
    },
    typography: {
      h6: {
        htmlFontSize: 19,
        fontWeight: 100
      }
    },
    // override default components, check mui documentation Textfield API section
    // & CSS stylesheet name of individual component that Textfield comprises of (MuiInputLabel)
    overrides: {
      MuiInputLabel: {
        root: {
          color: arcOrange,
          fontSize: '1rem'
        }
      },
      MuiInput: {
        underline: {
          '&:before': {
            borderBottom: `2px solid ${arcBlue}`
          },
          ':hover:not($disabled):not($focused):not($error):before': {
            borderBottom: `2px solid ${arcBlue}`
          }
        }
      }
      // MuiGrid: {
      //   maxWidth: '14%'
      // }
    }
  })
)
