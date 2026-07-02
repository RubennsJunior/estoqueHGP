import { Box, useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux'
import Header from './Header/Header'
import Sidebar from './Sidebar/Sidebar'
import Footer from './Footer/Footer'

export default function Layout({ children }) {
  const sidebarOpen = useSelector((state) => state.theme.sidebarOpen)
  const isMobile = useMediaQuery('(max-width:768px)')

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
      <Sidebar />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          ml: isMobile ? 0 : (sidebarOpen ? '260px' : '70px'),
        }}
      >
        <Header />
        <Box
          component="main"
          sx={{
            flex: 1,
            px: { xs: 2, md: 3 },
            py: 3,
            mt: '64px',
            minHeight: 'calc(100vh - 64px)',
          }}
        >
          {children}
        </Box>
        <Footer />
      </Box>
    </Box>
  )
}
