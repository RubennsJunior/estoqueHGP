import { Box, Typography, Button } from '@mui/material'
import { Add } from '@mui/icons-material'

export default function PageTitle({ title, subtitle, onNew, newLabel }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3,
        flexWrap: 'wrap',
        gap: 2,
      }}
    >
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b' }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" sx={{ color: '#94a3b8', mt: 0.5 }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      {onNew && (
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={onNew}
          sx={{ height: 40 }}
        >
          {newLabel || 'Novo'}
        </Button>
      )}
    </Box>
  )
}
