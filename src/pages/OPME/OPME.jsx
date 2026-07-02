import { useState } from 'react'
import { Box, Button } from '@mui/material'
import { FileDownload } from '@mui/icons-material'
import PageTitle from '../../components/common/PageTitle/PageTitle'
import Breadcrumb from '../../components/common/Breadcrumb/Breadcrumb'
import SearchInput from '../../components/common/SearchInput/SearchInput'
import DataTable from '../../components/common/DataTable/DataTable'
import Badge from '../../components/common/Badge/Badge'

const mockData = [
  { id: 1, produto: 'Stent Coronário', fabricante: 'Medtronic', lote: 'L2456', validade: '12/2026', quantidade: 45, status: 'disponivel' },
  { id: 2, produto: 'Cateter Balão', fabricante: 'Boston Scientific', lote: 'L7890', validade: '03/2027', quantidade: 32, status: 'disponivel' },
  { id: 3, produto: 'Fio Guia', fabricante: 'Abbott', lote: 'L3456', validade: '08/2026', quantidade: 8, status: 'critico' },
  { id: 4, produto: 'Marcapasso', fabricante: 'Medtronic', lote: 'L5678', validade: '06/2027', quantidade: 12, status: 'disponivel' },
  { id: 5, produto: 'Prótese Vascular', fabricante: 'Gore', lote: 'L9012', validade: '01/2027', quantidade: 0, status: 'indisponivel' },
  { id: 6, produto: 'Balão Intra-Aórtico', fabricante: 'Datascope', lote: 'L2345', validade: '10/2026', quantidade: 3, status: 'critico' },
  { id: 7, produto: 'Guia Hidrofílico', fabricante: 'Terumo', lote: 'L6789', validade: '05/2027', quantidade: 25, status: 'disponivel' },
  { id: 8, produto: 'Cateter Diagnóstico', fabricante: 'Cordis', lote: 'L0123', validade: '09/2026', quantidade: 18, status: 'disponivel' },
]

const columns = [
  { field: 'produto', headerName: 'Produto' },
  { field: 'fabricante', headerName: 'Fabricante' },
  { field: 'lote', headerName: 'Lote' },
  { field: 'validade', headerName: 'Validade' },
  { field: 'quantidade', headerName: 'Qtd' },
  { field: 'status', headerName: 'Status', render: (value) => <Badge label={value === 'disponivel' ? 'ativo' : value === 'critico' ? 'pendente' : 'inativo'} /> },
]

export default function OPME() {
  const [search, setSearch] = useState('')

  const filtered = mockData.filter(
    (item) =>
      item.produto.toLowerCase().includes(search.toLowerCase()) ||
      item.fabricante.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Box>
      <Breadcrumb />
      <PageTitle
        title="OPME"
        subtitle="Materiais e equipamentos OPME"
        onNew={() => {}}
        newLabel="Novo Material"
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
        <SearchInput value={search} onChange={setSearch} placeholder="Buscar produto ou fabricante..." />
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
