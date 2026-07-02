import { Box, TextField, MenuItem, InputAdornment } from '@mui/material'
import { Search } from '@mui/icons-material'
import { useLocation } from 'react-router-dom'
import Breadcrumb from '../../components/common/Breadcrumb/Breadcrumb'
import PageTitle from '../../components/common/PageTitle/PageTitle'
import DataTable from '../../components/common/DataTable/DataTable'
import Badge from '../../components/common/Badge/Badge'
import { resolvePageInfo } from '../../constants/menuConfig'

const MOCK_ROWS = [
  { id: '#1001', paciente: 'Maria Souza', procedimento: 'Angioplastia', data: '15/06/2026 09:30', itens: 14, status: 'Concluído' },
  { id: '#1002', paciente: 'João Silva', procedimento: 'Cateterismo', data: '15/06/2026 11:15', itens: 8, status: 'Concluído' },
  { id: '#1003', paciente: 'Pedro Alves', procedimento: 'Aneurisma', data: '16/06/2026 08:00', itens: 25, status: 'Pendente' },
  { id: '#1004', paciente: 'Ana Costa', procedimento: 'Implante Marcapasso', data: '16/06/2026 14:00', itens: 11, status: 'Cancelado' },
]

const STATUS_COLOR = {
  Concluído: 'success',
  Pendente: 'default',
  Cancelado: 'error',
}

export default function PlaceholderModule() {
  const location = useLocation()
  const { title, subtitle } = resolvePageInfo(location.pathname)

  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'paciente', headerName: 'Paciente' },
    { field: 'procedimento', headerName: 'Procedimento' },
    { field: 'data', headerName: 'Data/Hora' },
    { field: 'itens', headerName: 'Itens' },
    {
      field: 'status',
      headerName: 'Status',
      render: (value) => <Badge label={value} color={STATUS_COLOR[value] || 'default'} />,
    },
  ]

  return (
    <Box>
      <Breadcrumb />
      <PageTitle title={title} subtitle={subtitle} onNew={() => {}} newLabel="Novo Registro" />

      <Box
        sx={{
          backgroundColor: '#fff',
          border: '1px solid #e2e8f0',
          borderRadius: 2,
          p: 2,
          mb: 2.5,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <TextField
          size="small"
          placeholder="Pesquisar por paciente, médico ou item..."
          sx={{ flex: 1, minWidth: 220 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ fontSize: 20, color: '#94a3b8' }} />
              </InputAdornment>
            ),
          }}
        />
        <TextField select size="small" defaultValue="" sx={{ minWidth: 180 }} label="Status">
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="Concluído">Concluído</MenuItem>
          <MenuItem value="Pendente">Pendente</MenuItem>
          <MenuItem value="Cancelado">Cancelado</MenuItem>
        </TextField>
        <TextField select size="small" defaultValue="30" sx={{ minWidth: 180 }} label="Período">
          <MenuItem value="30">Últimos 30 dias</MenuItem>
          <MenuItem value="mes">Este mês</MenuItem>
        </TextField>
      </Box>

      <DataTable columns={columns} rows={MOCK_ROWS} onView={() => {}} onEdit={() => {}} />
    </Box>
  )
}
