import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Grid, Typography, Button as MuiButton } from '@mui/material'
import { FileDownload } from '@mui/icons-material'
import Breadcrumb from '../../components/common/Breadcrumb/Breadcrumb'
import DashboardCard from '../../components/common/Card/DashboardCard'
import { getMenuIcon } from '../../utils/menuIcons'
import { findMenuItemByRoute } from '../../constants/menuConfig'

const STAT_COLORS = [
  { bg: '#e3f2fd', icon: '#1976d2' },
  { bg: '#e8f5e9', icon: '#4caf50' },
  { bg: '#e0f7fa', icon: '#00acc1' },
  { bg: '#fff3e0', icon: '#ff9800' },
]

export default function SectorDashboard() {
  const location = useLocation()
  const navigate = useNavigate()
  const sector = findMenuItemByRoute(location.pathname)

  const mockStats = useMemo(() => [
    { label: 'Procedimentos Hoje', value: Math.floor(Math.random() * 40) + 10 },
    { label: 'Em Andamento', value: Math.floor(Math.random() * 15) + 2 },
    { label: 'Concluídos', value: Math.floor(Math.random() * 35) + 20 },
    { label: 'Pendentes', value: Math.floor(Math.random() * 10) + 1 },
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [location.pathname])

  if (!sector) return null
  const SectorIcon = getMenuIcon(sector.icon)

  return (
    <Box>
      <Breadcrumb />

      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 3,
              backgroundColor: '#1976d2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <SectorIcon sx={{ color: '#fff', fontSize: 28 }} />
          </Box>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b' }}>
              {sector.name}
            </Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8' }}>
              Visão geral do setor — clique num módulo abaixo ou use o menu lateral
            </Typography>
          </Box>
        </Box>
        <MuiButton variant="outlined" startIcon={<FileDownload />}>
          Exportar
        </MuiButton>
      </Box>

      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        {mockStats.map((stat, i) => {
          const child = sector.children[i % sector.children.length]
          const colors = STAT_COLORS[i]
          return (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={stat.label}>
              <DashboardCard
                title={stat.label}
                value={stat.value}
                icon={getMenuIcon(child?.icon || sector.icon)}
                color={colors.icon}
                bgColor={colors.bg}
              />
            </Grid>
          )
        })}
      </Grid>

      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1e293b', mb: 2 }}>
        Módulos disponíveis
      </Typography>
      <Grid container spacing={2}>
        {sector.children.map((child) => {
          const ChildIcon = getMenuIcon(child.icon)
          return (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={child.id}>
              <Box
                component="button"
                onClick={() => navigate(child.route)}
                sx={{
                  width: '100%',
                  textAlign: 'left',
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: 3,
                  p: 2.5,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'inherit',
                  '&:hover': {
                    borderColor: '#90caf9',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    backgroundColor: '#e3f2fd',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 1.5,
                  }}
                >
                  <ChildIcon sx={{ fontSize: 20, color: '#1976d2' }} />
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                  {child.name}
                </Typography>
              </Box>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}
