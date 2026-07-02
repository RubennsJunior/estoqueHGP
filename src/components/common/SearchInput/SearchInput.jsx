import { TextField, InputAdornment } from '@mui/material'
import { Search } from '@mui/icons-material'

export default function SearchInput({ value, onChange, placeholder, fullWidth }) {
  return (
    <TextField
      size="small"
      placeholder={placeholder || 'Pesquisar...'}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      fullWidth={fullWidth}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search sx={{ fontSize: 20, color: '#94a3b8' }} />
          </InputAdornment>
        ),
        sx: {
          backgroundColor: '#ffffff',
          borderRadius: 1.5,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#e2e8f0',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1976d2',
          },
        },
      }}
      sx={{ minWidth: fullWidth ? '100%' : { xs: '100%', sm: 280 } }}
    />
  )
}
