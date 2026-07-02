import { Routes, Route, Navigate } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Login from '../pages/Login/Login'
import Dashboard from '../pages/Dashboard/Dashboard'
import Hemodinamica from '../pages/Hemodinamica/Hemodinamica'
import CentroCirurgico from '../pages/CentroCirurgico/CentroCirurgico'
import OPME from '../pages/OPME/OPME'
import Relatorios from '../pages/Relatorios/Relatorios'
import Gestao from '../pages/Gestao/Gestao'
import Sistema from '../pages/Sistema/Sistema'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/hemodinamica"
        element={
          <PrivateRoute>
            <Hemodinamica />
          </PrivateRoute>
        }
      />
      <Route
        path="/centro-cirurgico"
        element={
          <PrivateRoute>
            <CentroCirurgico />
          </PrivateRoute>
        }
      />
      <Route
        path="/opme"
        element={
          <PrivateRoute>
            <OPME />
          </PrivateRoute>
        }
      />
      <Route
        path="/relatorios"
        element={
          <PrivateRoute>
            <Relatorios />
          </PrivateRoute>
        }
      />
      <Route
        path="/gestao"
        element={
          <PrivateRoute>
            <Gestao />
          </PrivateRoute>
        }
      />
      <Route
        path="/sistema"
        element={
          <PrivateRoute>
            <Sistema />
          </PrivateRoute>
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
