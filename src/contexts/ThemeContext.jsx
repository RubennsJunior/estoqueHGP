import { createContext, useContext, useMemo } from 'react'
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import CssBaseline from '@mui/material/CssBaseline'

const ThemeContext = createContext()

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}

export function ThemeProvider({ children }) {
  const mode = useSelector((state) => state.theme.mode)

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: '#1976d2', light: '#42a5f5', dark: '#1565c0' },
          secondary: { main: '#7c4dff' },
          success: { main: '#4caf50' },
          warning: { main: '#ff9800' },
          error: { main: '#f44336' },
          info: { main: '#2196f3' },
          background: {
            default: mode === 'light' ? '#f5f7fa' : '#0f172a',
            paper: mode === 'light' ? '#ffffff' : '#1e293b',
          },
          text: {
            primary: mode === 'light' ? '#1e293b' : '#f1f5f9',
            secondary: mode === 'light' ? '#64748b' : '#94a3b8',
          },
        },
        typography: {
          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          h1: { fontWeight: 700 },
          h2: { fontWeight: 700 },
          h3: { fontWeight: 600 },
          h4: { fontWeight: 600 },
          h5: { fontWeight: 600 },
          h6: { fontWeight: 600 },
        },
        shape: {
          borderRadius: 10,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 8,
                padding: '8px 20px',
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
                border: mode === 'light' ? '1px solid #e2e8f0' : '1px solid #334155',
              },
            },
          },
          MuiTableHead: {
            styleOverrides: {
              root: {
                '& .MuiTableCell-head': {
                  fontWeight: 600,
                  backgroundColor: mode === 'light' ? '#f8fafc' : '#1e293b',
                  color: mode === 'light' ? '#475569' : '#94a3b8',
                },
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                borderRadius: 12,
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                '& .MuiOutlinedInput-root': {
                  borderRadius: 8,
                },
              },
            },
          },
        },
      }),
    [mode]
  )

  return (
    <ThemeContext.Provider value={{ mode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}
