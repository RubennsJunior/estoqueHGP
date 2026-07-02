import { Chip } from '@mui/material'

const statusColors = {
  ativo: 'success',
  inativo: 'error',
  pendente: 'warning',
  concluido: 'success',
  cancelado: 'error',
  aguardando: 'info',
}

export default function Badge({ label, color, variant = 'filled', size = 'small' }) {
  const chipColor = statusColors[label?.toLowerCase()] || color || 'default'

  return (
    <Chip
      label={label}
      color={chipColor}
      size={size}
      variant={variant === 'outlined' ? 'outlined' : 'filled'}
      sx={{
        fontWeight: 600,
        fontSize: '0.75rem',
        height: 24,
        borderRadius: 1,
      }}
    />
  )
}
