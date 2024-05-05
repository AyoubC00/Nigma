import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { ThemeProvider } from '@mui/material'
import "./index.css"
import theme from './theme'
import { QuizzesContextProvider } from './contexts/QuizzesContext'
import { AuthContextProvider } from './contexts/AuthContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={ theme }>
      <AuthContextProvider>
        <QuizzesContextProvider>
          <RouterProvider router={ router } />
        </QuizzesContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
)