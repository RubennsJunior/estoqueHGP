import { useAuth } from './contexts/AuthContext'
import AppRoutes from './routes/AppRoutes'
import Layout from './components/layout/Layout'

export default function App() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <AppRoutes />
  }

  return (
    <Layout>
      <AppRoutes />
    </Layout>
  )
}
