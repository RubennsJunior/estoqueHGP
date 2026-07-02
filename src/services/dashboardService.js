import {
  DASHBOARD_STATS,
  TRIAGENS_POR_SETOR,
  CONSULTAS_POR_SETOR,
  ATENDIMENTOS_GERAIS,
  EVOLUCAO_MENSAL,
  ENTRADAS_SAIDAS,
  PRODUTOS_MAIS_USADOS,
} from '../constants'

const dashboardService = {
  getStats: async () => {
    await new Promise((r) => setTimeout(r, 300))
    return DASHBOARD_STATS
  },
  getTriagensPorSetor: async () => {
    await new Promise((r) => setTimeout(r, 200))
    return TRIAGENS_POR_SETOR
  },
  getConsultasPorSetor: async () => {
    await new Promise((r) => setTimeout(r, 200))
    return CONSULTAS_POR_SETOR
  },
  getAtendimentosGerais: async () => {
    await new Promise((r) => setTimeout(r, 200))
    return ATENDIMENTOS_GERAIS
  },
  getEvolucaoMensal: async () => {
    await new Promise((r) => setTimeout(r, 300))
    return EVOLUCAO_MENSAL
  },
  getEntradasSaidas: async () => {
    await new Promise((r) => setTimeout(r, 300))
    return ENTRADAS_SAIDAS
  },
  getProdutosMaisUsados: async () => {
    await new Promise((r) => setTimeout(r, 200))
    return PRODUTOS_MAIS_USADOS
  },
}

export default dashboardService
