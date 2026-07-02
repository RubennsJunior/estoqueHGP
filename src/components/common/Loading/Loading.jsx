import { Box, CircularProgress, Typography } from '@mui/material'

export default function Loading({ message }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        gap: 2,
      }}
    >
      <CircularProgress size={40} sx={{ color: '#1976d2' }} />
      {message && (
        <Typography variant="body2" sx={{ color: '#94a3b8' }}>
          {message}
        </Typography>
      )}
    </Box>
  )
}
