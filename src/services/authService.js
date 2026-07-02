import api from './api'

const authService = {
  login: async (username, password) => {
    const response = await api.post('/auth/login', { username, password })
    return response.data
  },
  logout: async () => {
    const response = await api.post('/auth/logout')
    return response.data
  },
  refreshToken: async (token) => {
    const response = await api.post('/auth/refresh', { token })
    return response.data
  },
  changePassword: async (data) => {
    const response = await api.put('/auth/change-password', data)
    return response.data
  },
  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email })
    return response.data
  },
  getProfile: async () => {
    const response = await api.get('/auth/profile')
    return response.data
  },
}

export default authService
