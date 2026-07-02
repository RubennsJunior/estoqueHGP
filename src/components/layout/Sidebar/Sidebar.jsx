import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Drawer, useMediaQuery } from '@mui/material'
import { LocalHospital } from '@mui/icons-material'
import { setSidebarOpen } from '../../../store/slices/themeSlice'
import { MENU_CONFIG } from '../../../constants/menuConfig'
import { SidebarMenuContext } from './SidebarMenuContext'
import SidebarItem from './SidebarItem'

const STORAGE_KEY = 'hgp_open_menu_ids'

// Fecha os "irmãos" do mesmo nível ao abrir um item, mantendo apenas um ramo aberto por vez
const computeToggledIds = (prev, menuId) => {
  if (prev.includes(menuId)) {
    return prev.filter((id) => !id.startsWith(menuId))
  }
  const parts = menuId.split('/')
  const parentPrefix = parts.slice(0, -1).join('/')

  const filtered = prev.filter((id) => {
    const idParts = id.split('/')
    const idParentPrefix = idParts.slice(0, -1).join('/')
    if (idParentPrefix === parentPrefix && idParts.length === parts.length) {
      return false
    }
    if (id.startsWith(parentPrefix + '/') && !id.startsWith(menuId + '/')) {
      const afterParent = id.substring(parentPrefix ? parentPrefix.length + 1 : 0)
      const firstSegment = afterParent.split('/')[0]
      const targetFirstSegment = menuId.substring(parentPrefix ? parentPrefix.length + 1 : 0).split('/')[0]
      if (firstSegment !== targetFirstSegment) {
        return false
      }
    }
    return true
  })
  return [...filtered, menuId]
}

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const open = useSelector((state) => state.theme.sidebarOpen)
  const isMobile = useMediaQuery('(max-width:768px)')
  const drawerRef = useRef(null)

  const [openMenuIds, setOpenMenuIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(openMenuIds))
  }, [openMenuIds])

  const toggleAccordion = (menuId) => {
    setOpenMenuIds((prev) => computeToggledIds(prev, menuId))
  }

  const handleNavigate = (path) => {
    navigate(path)
    dispatch(setSidebarOpen(false))
    setOpenMenuIds([])
  }

  // Fecha o menu ao clicar fora dele (mas não ao clicar no próprio botão de abrir/fechar)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!open) return
      if (drawerRef.current && drawerRef.current.contains(event.target)) return
      const toggleButton = document.querySelector('[data-sidebar-toggle]')
      if (toggleButton && toggleButton.contains(event.target)) return
      dispatch(setSidebarOpen(false))
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open, dispatch])

  const menuContextValue = {
    openMenuIds,
    toggleAccordion,
    activePath: location.pathname,
    onNavigate: handleNavigate,
  }

  const sidebarContent = (
    <Box
      ref={drawerRef}
      sx={{
        height: '100%',
        width: 270,
        backgroundColor: '#0f172a',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          px: 2,
          borderBottom: '1px solid #1e293b',
          flexShrink: 0,
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
        <Box sx={{ ml: 1.5, overflow: 'hidden' }}>
          <Box sx={{ color: '#fff', fontWeight: 700, fontSize: '1rem', lineHeight: 1.2 }}>
            HGP ERP
          </Box>
          <Box sx={{ color: '#64748b', fontSize: '0.7rem', lineHeight: 1.2 }}>
            Gestão Hospitalar
          </Box>
        </Box>
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto', py: 1.5, px: 1 }}>
        <SidebarMenuContext.Provider value={menuContextValue}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.3 }}>
            {MENU_CONFIG.map((item) => (
              <SidebarItem key={item.id} item={item} />
            ))}
          </Box>
        </SidebarMenuContext.Provider>
      </Box>

      <Box sx={{ p: 2, borderTop: '1px solid #1e293b' }}>
        <Box sx={{ color: '#64748b', fontSize: '0.7rem', textAlign: 'center' }}>v1.0.0</Box>
      </Box>
    </Box>
  )

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'persistent'}
      anchor="left"
      open={open}
      onClose={() => dispatch(setSidebarOpen(false))}
      ModalProps={{ keepMounted: true }}
      sx={{
        '& .MuiDrawer-paper': {
          width: 270,
          boxSizing: 'border-box',
          border: 'none',
          borderRight: isMobile ? 'none' : '1px solid #1e293b',
        },
      }}
    >
      {sidebarContent}
    </Drawer>
  )
}
