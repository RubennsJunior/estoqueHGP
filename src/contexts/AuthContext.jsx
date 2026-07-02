import { createContext, useContext, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginStart, loginSuccess, loginFailure, logout as logoutAction } from '../store/slices/authSlice'
import { MOCK_USER } from '../constants'

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

export function AuthProvider({ children }) {
  const dispatch = useDispatch()
  const { user, isAuthenticated, loading, error, permissions } = useSelector((state) => state.auth)

  const login = useCallback(async (username, password) => {
    dispatch(loginStart())
    try {
      await new Promise((r) => setTimeout(r, 1000))
      if (username === 'admin' && password === 'admin') {
        dispatch(loginSuccess({
          user: MOCK_USER,
          token: 'mock_token_' + Date.now(),
          permissions: ['*'],
        }))
        return true
      }
      dispatch(loginFailure('Usuário ou senha inválidos'))
      return false
    } catch (err) {
      dispatch(loginFailure(err.message))
      return false
    }
  }, [dispatch])

  const logout = useCallback(() => {
    dispatch(logoutAction())
  }, [dispatch])

  const hasPermission = useCallback((permission) => {
    if (permissions.includes('*')) return true
    return permissions.includes(permission)
  }, [permissions])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, error, permissions, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  )
}
