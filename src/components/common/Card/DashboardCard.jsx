import { Box, Typography } from '@mui/material'
import { TrendingUp } from '@mui/icons-material'

export default function DashboardCard({ title, value, icon: Icon, color, bgColor, format }) {
  return (
    <Box
      sx={{
        backgroundColor: '#ffffff',
        borderRadius: 3,
        border: '1px solid #e2e8f0',
        p: 2.5,
        display: 'flex',
        alignItems: 'center',
        gap: 2.5,
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
          borderColor: color || '#1976d2',
        },
      }}
    >
      <Box
        sx={{
          width: 52,
          height: 52,
          borderRadius: 2.5,
          backgroundColor: bgColor || '#e3f2fd',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {Icon && <Icon sx={{ fontSize: 26, color: color || '#1976d2' }} />}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {title}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b', mt: 0.3, lineHeight: 1.2 }}>
          {format ? format(value) : value?.toLocaleString('pt-BR')}
        </Typography>
      </Box>
    </Box>
  )
}
