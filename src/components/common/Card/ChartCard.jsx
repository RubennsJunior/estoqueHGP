import { Box, Typography } from '@mui/material'

export default function ChartCard({ title, subtitle, children, height }) {
  return (
    <Box
      sx={{
        backgroundColor: '#ffffff',
        borderRadius: 3,
        border: '1px solid #e2e8f0',
        p: 2.5,
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        },
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1e293b' }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="caption" sx={{ color: '#94a3b8' }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      <Box sx={{ width: '100%', height: height || 300 }}>
        {children}
      </Box>
    </Box>
  )
}
