import { CssBaseline } from '@mui/material'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { UserAuthProvider } from './context.jsx'
import { ThemeProvider } from '@emotion/react'
import theme from './modules/theme.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme = {theme}>
    <CssBaseline />
      <UserAuthProvider>
        <App />
      </UserAuthProvider> 
    </ThemeProvider>
  </StrictMode>
)
