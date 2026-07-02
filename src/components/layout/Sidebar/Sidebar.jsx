import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setSidebarOpen } from '../../../store/slices/themeSlice'
import { SIDEBAR_MENU } from '../../../constants'
import { useWindowSize } from '../../../hooks/useWindowSize'
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  useMediaQuery,
} from '@mui/material'
import {
  GridView,
  Favorite,
  LocalHospital,
  MonitorHeart,
  BarChart,
  Settings,
  Shield,
} from '@mui/icons-material'

const iconMap = {
  BiGridAlt: GridView,
  BiHeart: Favorite,
  BiHealth: LocalHospital,
  BiPulse: MonitorHeart,
  BiBarChartAlt2: BarChart,
  BiCog: Settings,
  BiShield: Shield,
}

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const open = useSelector((state) => state.theme.sidebarOpen)
  const isMobile = useMediaQuery('(max-width:768px)')

  const handleNavigate = (path) => {
    navigate(path)
    if (isMobile) {
      dispatch(setSidebarOpen(false))
    }
  }

  const sidebarContent = (
    <Box
      sx={{
        height: '100%',
        backgroundColor: '#0f172a',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid #1e293b',
          px: 2,
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 1.5,
            backgroundColor: '#1976d2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <LocalHospital sx={{ color: '#fff', fontSize: 20 }} />
        </Box>
        <Box
          sx={{
            ml: 1.5,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            transition: 'opacity 0.3s ease',
            opacity: open ? 1 : 0,
            width: open ? 'auto' : 0,
          }}
        >
          <Box sx={{ color: '#fff', fontWeight: 700, fontSize: '1rem', lineHeight: 1.2 }}>
            HGP ERP
          </Box>
          <Box sx={{ color: '#64748b', fontSize: '0.7rem', lineHeight: 1.2 }}>
            Gestão Hospitalar
          </Box>
        </Box>
      </Box>

      <List sx={{ flex: 1, py: 1, px: 1 }}>
        {SIDEBAR_MENU.map((item) => {
          const Icon = iconMap[item.icon]
          const isActive = location.pathname === item.path

          return (
            <ListItem key={item.id} disablePadding sx={{ display: 'block', mb: 0.3 }}>
              <ListItemButton
                onClick={() => handleNavigate(item.path)}
                sx={{
                  minHeight: 44,
                  justifyContent: open ? 'initial' : 'center',
                  px: 1.5,
                  borderRadius: 1.5,
                  backgroundColor: isActive ? '#1976d2' : 'transparent',
                  color: isActive ? '#fff' : '#64748b',
                  '&:hover': {
                    backgroundColor: isActive ? '#1976d2' : '#1e293b',
                    color: isActive ? '#fff' : '#cbd5e1',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: 'center',
                    color: 'inherit',
                    mr: open ? 1.5 : 'auto',
                    fontSize: 20,
                  }}
                >
                  <Icon sx={{ fontSize: 20 }} />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{
                    opacity: open ? 1 : 0,
                    whiteSpace: 'nowrap',
                    '& .MuiListItemText-primary': {
                      fontSize: '0.85rem',
                      fontWeight: isActive ? 600 : 400,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>

      <Box
        sx={{
          p: 2,
          borderTop: '1px solid #1e293b',
          opacity: open ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        <Box sx={{ color: '#64748b', fontSize: '0.7rem', textAlign: 'center' }}>
          v1.0.0
        </Box>
      </Box>
    </Box>
  )

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={open}
        onClose={() => dispatch(setSidebarOpen(false))}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            width: 260,
            boxSizing: 'border-box',
            border: 'none',
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    )
  }

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      open={open}
      sx={{
        width: open ? 260 : 70,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        '& .MuiDrawer-paper': {
          width: open ? 260 : 70,
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          border: 'none',
          borderRight: '1px solid #1e293b',
          backgroundColor: '#0f172a',
        },
      }}
    >
      {sidebarContent}
    </Drawer>
  )
}
