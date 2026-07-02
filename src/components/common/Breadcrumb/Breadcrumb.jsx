import { Breadcrumbs, Typography, Link } from '@mui/material'
import { NavigateNext, Home } from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom'

const routeNames = {
  '/dashboard': 'Dashboard',
  '/hemodinamica': 'Hemodinâmica',
  '/centro-cirurgico': 'Centro Cirúrgico',
  '/opme': 'OPME',
  '/relatorios': 'Relatórios',
  '/gestao': 'Gestão',
  '/sistema': 'Sistema',
}

export default function Breadcrumb() {
  const location = useLocation()
  const navigate = useNavigate()
  const pathnames = location.pathname.split('/').filter(Boolean)

  return (
    <Breadcrumbs
      separator={<NavigateNext sx={{ fontSize: 18, color: '#94a3b8' }} />}
      sx={{ mb: 2 }}
    >
      <Link
        underline="hover"
        sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer', color: '#64748b', fontSize: '0.85rem' }}
        onClick={() => navigate('/dashboard')}
      >
        <Home sx={{ fontSize: 18 }} />
        Início
      </Link>
      {pathnames.map((value, index) => {
        const path = `/${pathnames.slice(0, index + 1).join('/')}`
        const name = routeNames[path] || value.charAt(0).toUpperCase() + value.slice(1)
        const isLast = index === pathnames.length - 1

        return isLast ? (
          <Typography key={path} sx={{ color: '#1e293b', fontWeight: 600, fontSize: '0.85rem' }}>
            {name}
          </Typography>
        ) : (
          <Link
            key={path}
            underline="hover"
            sx={{ cursor: 'pointer', color: '#64748b', fontSize: '0.85rem' }}
            onClick={() => navigate(path)}
          >
            {name}
          </Link>
        )
      })}
    </Breadcrumbs>
  )
}
