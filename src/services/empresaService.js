import api from './api'

const empresaService = {
  listar: async () => {
    const response = await api.get('/empresas')
    return response.data
  },
  obter: async (id) => {
    const response = await api.get(`/empresas/${id}`)
    return response.data
  },
  criar: async (data) => {
    const response = await api.post('/empresas', data)
    return response.data
  },
  atualizar: async (id, data) => {
    const response = await api.put(`/empresas/${id}`, data)
    return response.data
  },
  remover: async (id) => {
    const response = await api.delete(`/empresas/${id}`)
    return response.data
  },
}

export default empresaService
