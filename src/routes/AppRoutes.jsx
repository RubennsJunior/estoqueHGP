import { Routes, Route, Navigate } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Login from '../pages/Login/Login'
import Dashboard from '../pages/Dashboard/Dashboard'
import SectorDashboard from '../pages/SectorDashboard/SectorDashboard'
import PlaceholderModule from '../pages/PlaceholderModule/PlaceholderModule'
import Portaria from '../pages/Entrada/Portaria'
import ProntoSocorro from '../pages/Entrada/ProntoSocorro'
import CadastroPaciente from '../pages/Cadastro/CadastroPaciente'
import CadastroPessoa from '../pages/Cadastro/CadastroPessoa'
import { flattenMenuRoutes } from '../constants/menuConfig'

const SECTOR_ROUTES = ['/hemodinamica', '/centro-cirurgico', '/opme']

const BESPOKE_ROUTES = {
  '/dashboard': <Dashboard />,
  '/entrada/portaria': <Portaria />,
  '/entrada/pronto-socorro': <ProntoSocorro />,
  '/cadastro/paciente': <CadastroPaciente />,
  '/cadastro/fornecedor': <CadastroPessoa tipo="Fornecedor" />,
  '/cadastro/transportadora': <CadastroPessoa tipo="Transportadora" />,
  '/cadastro/funcionario': <CadastroPessoa tipo="Funcionário" />,
}

const genericRoutes = flattenMenuRoutes().filter(
  (item) => !SECTOR_ROUTES.includes(item.route) && !BESPOKE_ROUTES[item.route]
)

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {Object.entries(BESPOKE_ROUTES).map(([path, element]) => (
        <Route
          key={path}
          path={path}
          element={<PrivateRoute>{element}</PrivateRoute>}
        />
      ))}

      {SECTOR_ROUTES.map((path) => (
        <Route
          key={path}
          path={path}
          element={
            <PrivateRoute>
              <SectorDashboard />
            </PrivateRoute>
          }
        />
      ))}

      {genericRoutes.map((item) => (
        <Route
          key={item.id}
          path={item.route}
          element={
            <PrivateRoute>
              <PlaceholderModule />
            </PrivateRoute>
          }
        />
      ))}

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
