import { Box, Typography } from '@mui/material'

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 3,
        textAlign: 'center',
        borderTop: '1px solid #e2e8f0',
        backgroundColor: '#ffffff',
      }}
    >
      <Typography variant="caption" sx={{ color: '#94a3b8' }}>
        © {new Date().getFullYear()} HGP ERP - Gestão Hospitalar. Todos os direitos reservados.
      </Typography>
    </Box>
  )
}
