import { useState, useEffect } from 'react'
import { Box, Grid, useMediaQuery } from '@mui/material'
import {
  People,
  Assignment,
  MedicalServices,
  Inventory,
  Warning,
  TrendingUp,
  TrendingDown,
  PersonAdd,
} from '@mui/icons-material'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts'
import DashboardCard from '../../components/common/Card/DashboardCard'
import ChartCard from '../../components/common/Card/ChartCard'
import PageTitle from '../../components/common/PageTitle/PageTitle'
import Breadcrumb from '../../components/common/Breadcrumb/Breadcrumb'
import Loading from '../../components/common/Loading/Loading'
import dashboardService from '../../services/dashboardService'
import {
  CORES_CARDS,
  TRIAGENS_POR_SETOR,
  CONSULTAS_POR_SETOR,
  ATENDIMENTOS_GERAIS,
  EVOLUCAO_MENSAL,
  ENTRADAS_SAIDAS,
  PRODUTOS_MAIS_USADOS,
} from '../../constants'

const PIE_COLORS = ['#1976d2', '#7c4dff', '#4caf50']

const cardConfig = [
  { key: 'totalAtendimentos', title: 'Total de Atendimentos', icon: People },
  { key: 'totalTriagens', title: 'Total de Triagens', icon: Assignment },
  { key: 'totalConsultas', title: 'Total de Consultas', icon: MedicalServices },
  { key: 'estoqueAtual', title: 'Estoque Atual', icon: Inventory },
  { key: 'produtosEmFalta', title: 'Produtos em Falta', icon: Warning },
  { key: 'entradasDia', title: 'Entradas do Dia', icon: TrendingUp },
  { key: 'saidasDia', title: 'Saídas do Dia', icon: TrendingDown },
  { key: 'pacientesAtendidos', title: 'Pacientes Atendidos', icon: PersonAdd },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: 2,
          p: 1.5,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <Box sx={{ color: '#64748b', fontSize: '0.75rem', mb: 0.5 }}>{label}</Box>
        {payload.map((entry, index) => (
          <Box key={index} sx={{ color: entry.color, fontSize: '0.85rem', fontWeight: 600 }}>
            {entry.name}: {entry.value?.toLocaleString('pt-BR')}
          </Box>
        ))}
      </Box>
    )
  }
  return null
}

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const isMobile = useMediaQuery('(max-width:768px)')

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await dashboardService.getStats()
        setStats(data)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) return <Loading message="Carregando dashboard..." />

  return (
    <Box>
      <Breadcrumb />
      <PageTitle title="Dashboard" subtitle="Visão geral do sistema" />

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {cardConfig.map((card) => {
          const colors = CORES_CARDS[card.key]
          return (
            <Grid item xs={12} sm={6} md={3} key={card.key}>
              <DashboardCard
                title={card.title}
                value={stats?.[card.key]}
                icon={card.icon}
                color={colors?.icon}
                bgColor={colors?.bg}
              />
            </Grid>
          )
        })}
      </Grid>

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={6}>
          <ChartCard title="Triagens por Setor" subtitle="Quantidade de triagens por setor">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={TRIAGENS_POR_SETOR} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="setor"
                  tick={{ fontSize: isMobile ? 10 : 12, fill: '#64748b' }}
                  tickFormatter={(value) => isMobile && value.length > 10 ? `${value.substring(0, 8)}...` : value}
                />
                <YAxis tick={{ fontSize: isMobile ? 10 : 12, fill: '#64748b' }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="quantidade" fill="#1976d2" radius={[6, 6, 0, 0]} maxBarSize={isMobile ? 35 : 60} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <ChartCard title="Consultas por Setor" subtitle="Quantidade de consultas por setor">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={CONSULTAS_POR_SETOR} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="setor"
                  tick={{ fontSize: isMobile ? 10 : 12, fill: '#64748b' }}
                  tickFormatter={(value) => isMobile && value.length > 10 ? `${value.substring(0, 8)}...` : value}
                />
                <YAxis tick={{ fontSize: isMobile ? 10 : 12, fill: '#64748b' }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="quantidade" fill="#7c4dff" radius={[6, 6, 0, 0]} maxBarSize={isMobile ? 35 : 60} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <ChartCard title="Atendimentos Gerais" subtitle="Distribuição geral">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={ATENDIMENTOS_GERAIS}
                  cx="50%"
                  cy="50%"
                  innerRadius={isMobile ? 50 : 60}
                  outerRadius={isMobile ? 85 : 100}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {ATENDIMENTOS_GERAIS.map((entry, index) => (
                    <Cell key={entry.name} fill={PIE_COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="bottom"
                  formatter={(value) => <span style={{ color: '#64748b', fontSize: isMobile ? '0.7rem' : '0.8rem' }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        <Grid item xs={12} md={8}>
          <ChartCard title="Evolução Mensal" subtitle="Consultas, triagens e atendimentos por mês">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={EVOLUCAO_MENSAL} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="mes" tick={{ fontSize: isMobile ? 10 : 12, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: isMobile ? 10 : 12, fill: '#64748b' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  formatter={(value) => <span style={{ color: '#64748b', fontSize: isMobile ? '0.7rem' : '0.8rem' }}>{value}</span>}
                />
                <Line type="monotone" dataKey="consultas" stroke="#1976d2" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="triagens" stroke="#7c4dff" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="atendimentos" stroke="#4caf50" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <ChartCard title="Entradas vs Saídas" subtitle="Comparativo mensal de estoque">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={ENTRADAS_SAIDAS} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="mes" tick={{ fontSize: isMobile ? 10 : 12, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: isMobile ? 10 : 12, fill: '#64748b' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  formatter={(value) => <span style={{ color: '#64748b', fontSize: isMobile ? '0.7rem' : '0.8rem' }}>{value}</span>}
                />
                <Bar dataKey="entradas" fill="#4caf50" radius={[4, 4, 0, 0]} maxBarSize={isMobile ? 20 : 40} name="Entradas" />
                <Bar dataKey="saidas" fill="#f44336" radius={[4, 4, 0, 0]} maxBarSize={isMobile ? 20 : 40} name="Saídas" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <ChartCard title="Produtos mais Utilizados" subtitle="Top produtos por uso">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={PRODUTOS_MAIS_USADOS}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: isMobile ? 10 : 12, fill: '#64748b' }} />
                <YAxis
                  type="category"
                  dataKey="produto"
                  tick={{ fontSize: isMobile ? 9 : 11, fill: '#64748b' }}
                  width={isMobile ? 85 : 130}
                  tickFormatter={(value) => isMobile && value.length > 12 ? `${value.substring(0, 10)}...` : value}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="quantidade" fill="#ff9800" radius={[0, 6, 6, 0]} maxBarSize={isMobile ? 12 : 20} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>
    </Box>
  )
}
