import { useState } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  MenuItem,
  Stack,
  Chip,
} from '@mui/material'
import {
  PictureAsPdf,
  TableChart,
  Description,
  BarChart,
  Receipt,
  Inventory,
  LocalHospital,
  People,
} from '@mui/icons-material'
import PageTitle from '../../components/common/PageTitle/PageTitle'
import Breadcrumb from '../../components/common/Breadcrumb/Breadcrumb'

const reportTypes = [
  { id: 'estoque', label: 'Relatório de Estoque', icon: Inventory, color: '#4caf50' },
  { id: 'procedimentos', label: 'Relatório de Procedimentos', icon: LocalHospital, color: '#1976d2' },
  { id: 'financeiro', label: 'Relatório Financeiro', icon: Receipt, color: '#ff9800' },
  { id: 'pacientes', label: 'Relatório de Pacientes', icon: People, color: '#7c4dff' },
]

const periods = [
  { value: 'today', label: 'Hoje' },
  { value: 'yesterday', label: 'Ontem' },
  { value: 'week', label: 'Esta Semana' },
  { value: 'month', label: 'Este Mês' },
  { value: 'lastMonth', label: 'Mês Passado' },
  { value: 'year', label: 'Este Ano' },
  { value: 'custom', label: 'Personalizado' },
]

export default function Relatorios() {
  const [reportType, setReportType] = useState('')
  const [period, setPeriod] = useState('month')

  return (
    <Box>
      <Breadcrumb />
      <PageTitle title="Relatórios" subtitle="Geração e exportação de relatórios" />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#1e293b' }}>
            Tipos de Relatório
          </Typography>
          <Grid container spacing={2}>
            {reportTypes.map((report) => {
              const Icon = report.icon
              return (
                <Grid size={{ xs: 12, sm: 6 }} key={report.id}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      border: reportType === report.id ? `2px solid ${report.color}` : '1px solid #e2e8f0',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                      },
                    }}
                    onClick={() => setReportType(report.id)}
                  >
                    <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2.5 }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          backgroundColor: `${report.color}15`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Icon sx={{ color: report.color, fontSize: 24 }} />
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                          {report.label}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                          Clique para selecionar
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ p: 2.5 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2.5, color: '#1e293b' }}>
              Filtros
            </Typography>
            <Stack spacing={2.5}>
              <TextField
                select
                label="Período"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                fullWidth
                size="small"
              >
                {periods.map((p) => (
                  <MenuItem key={p.value} value={p.value}>{p.label}</MenuItem>
                ))}
              </TextField>

              {period === 'custom' && (
                <>
                  <TextField label="Data Início" type="date" size="small" fullWidth InputLabelProps={{ shrink: true }} />
                  <TextField label="Data Fim" type="date" size="small" fullWidth InputLabelProps={{ shrink: true }} />
                </>
              )}

              <TextField select label="Setor" defaultValue="" fullWidth size="small">
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="hemodinamica">Hemodinâmica</MenuItem>
                <MenuItem value="cirurgico">Centro Cirúrgico</MenuItem>
                <MenuItem value="opme">OPME</MenuItem>
              </TextField>

              <Typography variant="subtitle2" sx={{ color: '#64748b', mt: 1 }}>
                Formato de Exportação
              </Typography>

              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                <Chip
                  icon={<PictureAsPdf />}
                  label="PDF"
                  color="error"
                  variant="outlined"
                  sx={{ cursor: 'pointer', fontWeight: 600 }}
                />
                <Chip
                  icon={<Description />}
                  label="Excel"
                  color="success"
                  variant="outlined"
                  sx={{ cursor: 'pointer', fontWeight: 600 }}
                />
                <Chip
                  icon={<TableChart />}
                  label="CSV"
                  color="info"
                  variant="outlined"
                  sx={{ cursor: 'pointer', fontWeight: 600 }}
                />
              </Stack>

              <Button
                variant="contained"
                fullWidth
                size="large"
                startIcon={<BarChart />}
                disabled={!reportType}
                sx={{ mt: 1 }}
              >
                Gerar Relatório
              </Button>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
