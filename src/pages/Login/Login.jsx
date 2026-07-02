import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Link,
  InputAdornment,
  IconButton,
  Alert,
  Divider,
} from '@mui/material'
import {
  LocalHospital,
  Visibility,
  VisibilityOff,
  Person,
  Lock,
} from '@mui/icons-material'

export default function Login() {
  const navigate = useNavigate()
  const { login, loading, error } = useAuth()
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('admin')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await login(username, password)
    if (success) {
      navigate('/dashboard')
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        p: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 420,
          width: '100%',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2.5,
              backgroundColor: '#1976d2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <LocalHospital sx={{ color: '#fff', fontSize: 28 }} />
          </Box>
          <Box>
            <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700, lineHeight: 1.2 }}>
              HGP ERP
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748b' }}>
              Gestão Hospitalar
            </Typography>
          </Box>
        </Box>

        <Card
          elevation={0}
          sx={{
            width: '100%',
            borderRadius: 3,
            border: '1px solid #1e293b',
            backgroundColor: '#ffffff',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b', mb: 0.5 }}>
              Entrar no Sistema
            </Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8', mb: 3 }}>
              Informe suas credenciais para acessar
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: 1.5 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: '#94a3b8', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
              />

              <TextField
                fullWidth
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: '#94a3b8', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
              />

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1, mb: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      size="small"
                    />
                  }
                  label={<Typography variant="body2" sx={{ color: '#64748b' }}>Lembrar-me</Typography>}
                />
                <Link
                  href="#"
                  variant="body2"
                  sx={{ color: '#1976d2', fontWeight: 500, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                  Esqueci minha senha
                </Link>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  py: 1.3,
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  borderRadius: 1.5,
                  backgroundColor: '#1976d2',
                  '&:hover': { backgroundColor: '#1565c0' },
                }}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>

            <Divider sx={{ my: 3 }}>
              <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                ou
              </Typography>
            </Divider>

            <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', textAlign: 'center' }}>
              Use admin / admin para acessar o sistema
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}
