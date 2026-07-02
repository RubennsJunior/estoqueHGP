import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSidebar } from '../../../store/slices/themeSlice'
import { useAuth } from '../../../contexts/AuthContext'
import { useCompany } from '../../../contexts/CompanyContext'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  useMediaQuery,
} from '@mui/material'
import {
  Menu as MenuIcon,
  Person,
  Settings,
  Lock,
  Logout,
  Business,
} from '@mui/icons-material'

export default function Header() {
  const dispatch = useDispatch()
  const sidebarOpen = useSelector((state) => state.theme.sidebarOpen)
  const isMobile = useMediaQuery('(max-width:768px)')
  const { user, logout } = useAuth()
  const { selectedCompany, companies, changeCompany } = useCompany()

  const [anchorEl, setAnchorEl] = useState(null)
  const [openPasswordModal, setOpenPasswordModal] = useState(false)
  const [openLogoutModal, setOpenLogoutModal] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleMenuClick = (e) => setAnchorEl(e.currentTarget)
  const handleMenuClose = () => setAnchorEl(null)

  const handleLogoutClick = () => {
    handleMenuClose()
    setOpenLogoutModal(true)
  }

  const handleConfirmLogout = () => {
    logout()
    setOpenLogoutModal(false)
  }

  const handleChangePassword = () => {
    handleMenuClose()
    setOpenPasswordModal(true)
  }

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          height: 64,
          zIndex: 1201,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          left: isMobile ? 0 : (sidebarOpen ? '260px' : '70px'),
          width: isMobile ? '100%' : `calc(100% - ${sidebarOpen ? '260px' : '70px'})`,
        }}
      >
        <Toolbar sx={{ height: 64, minHeight: '64px !important', px: 2 }}>
          <IconButton
            onClick={() => dispatch(toggleSidebar())}
            sx={{ color: '#475569', mr: 1 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            sx={{
              color: '#1e293b',
              fontWeight: 700,
              fontSize: '1.1rem',
              letterSpacing: '-0.01em',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            HGP ERP
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Select
            value={selectedCompany?.id || ''}
            onChange={(e) => {
              const company = companies.find((c) => c.id === e.target.value)
              if (company) changeCompany(company)
            }}
            size="small"
            sx={{
              mr: 2,
              minWidth: { xs: 120, sm: 180, md: 200 },
              maxWidth: { xs: 160, sm: 'none' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e2e8f0' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#1976d2' },
              color: '#475569',
              fontSize: '0.875rem',
            }}
            renderValue={(selected) => {
              const company = companies.find((c) => c.id === selected)
              return (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
                  <Business sx={{ fontSize: 18, color: '#1976d2', flexShrink: 0 }} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }} noWrap>
                    {company?.nome || 'Selecionar empresa'}
                  </Typography>
                </Box>
              )
            }}
          >
            {companies.map((company) => (
              <MenuItem key={company.id} value={company.id}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Business sx={{ fontSize: 18, color: '#1976d2' }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {company.nome}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                      {company.cnpj}
                    </Typography>
                  </Box>
                </Box>
              </MenuItem>
            ))}
          </Select>

          <IconButton onClick={handleMenuClick} sx={{ p: 0 }}>
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: '#1976d2',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              {user?.nome?.charAt(0) || 'U'}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              elevation: 2,
              sx: {
                mt: 1.5,
                minWidth: 220,
                borderRadius: 2,
                border: '1px solid #e2e8f0',
                '& .MuiMenuItem-root': { py: 1.2 },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                {user?.nome}
              </Typography>
              <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                {user?.email}
              </Typography>
            </Box>
            <Divider />
            <MenuItem onClick={handleChangePassword}>
              <ListItemIcon><Lock sx={{ fontSize: 20 }} /></ListItemIcon>
              Alterar Senha
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogoutClick}>
              <ListItemIcon><Logout sx={{ fontSize: 20 }} /></ListItemIcon>
              Sair
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Dialog open={openPasswordModal} onClose={() => setOpenPasswordModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 600 }}>Alterar Senha</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Senha Atual"
              type="password"
              fullWidth
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
            />
            <TextField
              label="Nova Senha"
              type="password"
              fullWidth
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
            />
            <TextField
              label="Confirmar Nova Senha"
              type="password"
              fullWidth
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={() => setOpenPasswordModal(false)} variant="outlined" color="inherit">
            Cancelar
          </Button>
          <Button onClick={() => setOpenPasswordModal(false)} variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openLogoutModal} onClose={() => setOpenLogoutModal(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 600 }}>Sair do Sistema</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Tem certeza que deseja sair do sistema?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={() => setOpenLogoutModal(false)} variant="outlined" color="inherit">
            Cancelar
          </Button>
          <Button onClick={handleConfirmLogout} variant="contained" color="error">
            Sair
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
