import api from './api'

const estoqueService = {
  listar: async (params) => {
    const response = await api.get('/estoque', { params })
    return response.data
  },
  obter: async (id) => {
    const response = await api.get(`/estoque/${id}`)
    return response.data
  },
  criar: async (data) => {
    const response = await api.post('/estoque', data)
    return response.data
  },
  atualizar: async (id, data) => {
    const response = await api.put(`/estoque/${id}`, data)
    return response.data
  },
  remover: async (id) => {
    const response = await api.delete(`/estoque/${id}`)
    return response.data
  },
  entrada: async (data) => {
    const response = await api.post('/estoque/entrada', data)
    return response.data
  },
  saida: async (data) => {
    const response = await api.post('/estoque/saida', data)
    return response.data
  },
  transferencia: async (data) => {
    const response = await api.post('/estoque/transferencia', data)
    return response.data
  },
  inventario: async (data) => {
    const response = await api.post('/estoque/inventario', data)
    return response.data
  },
}

export default estoqueService
