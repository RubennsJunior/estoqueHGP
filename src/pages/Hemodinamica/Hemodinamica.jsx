import { useState } from 'react'
import { Box, Grid, Button, Chip } from '@mui/material'
import { FileDownload } from '@mui/icons-material'
import PageTitle from '../../components/common/PageTitle/PageTitle'
import Breadcrumb from '../../components/common/Breadcrumb/Breadcrumb'
import SearchInput from '../../components/common/SearchInput/SearchInput'
import DataTable from '../../components/common/DataTable/DataTable'
import Badge from '../../components/common/Badge/Badge'

const mockData = [
  { id: 1, paciente: 'Maria Oliveira', procedimento: 'Cateterismo Cardíaco', medico: 'Dr. Carlos Santos', data: '23/06/2026', status: 'concluido' },
  { id: 2, paciente: 'João Pereira', procedimento: 'Angioplastia', medico: 'Dr. Ana Costa', data: '22/06/2026', status: 'aguardando' },
  { id: 3, paciente: 'Ana Rodrigues', procedimento: 'Implante de Marcapasso', medico: 'Dr. Carlos Santos', data: '21/06/2026', status: 'concluido' },
  { id: 4, paciente: 'Pedro Alves', procedimento: 'Hemodinâmica Geral', medico: 'Dr. Ana Costa', data: '20/06/2026', status: 'pendente' },
  { id: 5, paciente: 'Lucia Ferreira', procedimento: 'Cateterismo Cardíaco', medico: 'Dr. Carlos Santos', data: '19/06/2026', status: 'cancelado' },
  { id: 6, paciente: 'Roberto Lima', procedimento: 'Angioplastia', medico: 'Dr. Ana Costa', data: '18/06/2026', status: 'concluido' },
  { id: 7, paciente: 'Carla Souza', procedimento: 'Implante de Marcapasso', medico: 'Dr. Carlos Santos', data: '17/06/2026', status: 'aguardando' },
  { id: 8, paciente: 'Fernando Dias', procedimento: 'Hemodinâmica Geral', medico: 'Dr. Ana Costa', data: '16/06/2026', status: 'concluido' },
]

const columns = [
  { field: 'paciente', headerName: 'Paciente' },
  { field: 'procedimento', headerName: 'Procedimento' },
  { field: 'medico', headerName: 'Médico' },
  { field: 'data', headerName: 'Data' },
  {
    field: 'status',
    headerName: 'Status',
    render: (value) => <Badge label={value} />,
  },
]

export default function Hemodinamica() {
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
        title="Hemodinâmica"
        subtitle="Gerenciamento de procedimentos hemodinâmicos"
        onNew={() => {}}
        newLabel="Novo Procedimento"
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

      <DataTable
        columns={columns}
        rows={filtered}
        onView={(row) => {}}
        onEdit={(row) => {}}
        onDelete={(row) => {}}
      />
    </Box>
  )
}
