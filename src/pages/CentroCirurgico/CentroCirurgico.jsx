import { useState } from 'react'
import { Box, Button } from '@mui/material'
import { FileDownload } from '@mui/icons-material'
import PageTitle from '../../components/common/PageTitle/PageTitle'
import Breadcrumb from '../../components/common/Breadcrumb/Breadcrumb'
import SearchInput from '../../components/common/SearchInput/SearchInput'
import DataTable from '../../components/common/DataTable/DataTable'
import Badge from '../../components/common/Badge/Badge'

const mockData = [
  { id: 1, paciente: 'Carlos Eduardo', procedimento: 'Cirurgia Geral', medico: 'Dr. Roberto Alves', sala: 'Sala 1', data: '23/06/2026', status: 'concluido' },
  { id: 2, paciente: 'Marina Silva', procedimento: 'Cirurgia Cardíaca', medico: 'Dr. Fernando Lima', sala: 'Sala 2', data: '22/06/2026', status: 'aguardando' },
  { id: 3, paciente: 'Paulo Henrique', procedimento: 'Cirurgia Ortopédica', medico: 'Dr. Roberto Alves', sala: 'Sala 3', data: '21/06/2026', status: 'concluido' },
  { id: 4, paciente: 'Sandra Vieira', procedimento: 'Cirurgia Geral', medico: 'Dr. Fernando Lima', sala: 'Sala 1', data: '20/06/2026', status: 'pendente' },
  { id: 5, paciente: 'Lucas Mendes', procedimento: 'Cirurgia Torácica', medico: 'Dr. Roberto Alves', sala: 'Sala 2', data: '19/06/2026', status: 'cancelado' },
  { id: 6, paciente: 'Juliana Costa', procedimento: 'Cirurgia Cardíaca', medico: 'Dr. Fernando Lima', sala: 'Sala 3', data: '18/06/2026', status: 'concluido' },
  { id: 7, paciente: 'Rafael Souza', procedimento: 'Cirurgia Geral', medico: 'Dr. Roberto Alves', sala: 'Sala 1', data: '17/06/2026', status: 'aguardando' },
  { id: 8, paciente: 'Beatriz Santos', procedimento: 'Cirurgia Ortopédica', medico: 'Dr. Fernando Lima', sala: 'Sala 2', data: '16/06/2026', status: 'concluido' },
]

const columns = [
  { field: 'paciente', headerName: 'Paciente' },
  { field: 'procedimento', headerName: 'Procedimento' },
  { field: 'medico', headerName: 'Médico' },
  { field: 'sala', headerName: 'Sala' },
  { field: 'data', headerName: 'Data' },
  { field: 'status', headerName: 'Status', render: (value) => <Badge label={value} /> },
]

export default function CentroCirurgico() {
  const [search, setSearch] = useState('')

  const filtered = mockData.filter(
    (item) =>
      item.paciente.toLowerCase().includes(search.toLowerCase()) ||
      item.procedimento.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Box>
      <Breadcrumb />
      <PageTitle
        title="Centro Cirúrgico"
        subtitle="Gerenciamento de procedimentos cirúrgicos"
        onNew={() => {}}
        newLabel="Nova Cirurgia"
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'stretch', sm: 'center' },
          mb: 2.5,
          gap: 2,
        }}
      >
        <SearchInput value={search} onChange={setSearch} placeholder="Buscar paciente ou procedimento..." />
        <Button
          variant="outlined"
          startIcon={<FileDownload />}
          sx={{ height: 40, width: { xs: '100%', sm: 'auto' } }}
        >
          Exportar
        </Button>
      </Box>

      <DataTable columns={columns} rows={filtered} onView={() => {}} onEdit={() => {}} onDelete={() => {}} />
    </Box>
  )
}
