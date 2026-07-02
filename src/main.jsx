import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { SnackbarProvider } from 'notistack'
import { theme } from './styles/theme'
import './styles/globals.scss'
import App from './App.jsx'
import { store, persistor } from './Redux/store'
import { SnackbarBridge } from './components/general/SnackbarBridge/SnackbarBridge'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SnackbarProvider
            maxSnack={3}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <SnackbarBridge />
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </SnackbarProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
