import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
  Box,
  Typography,
} from '@mui/material'
import { Edit, Delete, Visibility } from '@mui/icons-material'

export default function DataTable({
  columns,
  rows,
  loading,
  onEdit,
  onDelete,
  onView,
  onSelectionChange,
  selectable,
  actions = true,
}) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [orderBy, setOrderBy] = useState('')
  const [order, setOrder] = useState('asc')
  const [selected, setSelected] = useState([])

  const handleSort = (column) => {
    const isAsc = orderBy === column && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(column)
  }

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const newSelected = rows.map((row) => row.id)
      setSelected(newSelected)
      onSelectionChange?.(newSelected)
    } else {
      setSelected([])
      onSelectionChange?.([])
    }
  }

  const handleSelect = (id) => {
    const newSelected = selected.includes(id)
      ? selected.filter((s) => s !== id)
      : [...selected, id]
    setSelected(newSelected)
    onSelectionChange?.(newSelected)
  }

  const sortedRows = [...rows].sort((a, b) => {
    if (orderBy) {
      const aVal = a[orderBy]
      const bVal = b[orderBy]
      if (aVal < bVal) return order === 'asc' ? -1 : 1
      if (aVal > bVal) return order === 'asc' ? 1 : -1
    }
    return 0
  })

  const pagedRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  return (
    <Paper
      elevation={0}
      sx={{
        border: '1px solid #e2e8f0',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {selectable && (
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selected.length > 0 && selected.length < rows.length}
                    checked={rows.length > 0 && selected.length === rows.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
              )}
              {columns.map((col) => (
                <TableCell
                  key={col.field}
                  sortDirection={orderBy === col.field ? order : false}
                  sx={{ fontWeight: 600, color: '#64748b', fontSize: '0.8rem' }}
                >
                  {col.sortable !== false ? (
                    <TableSortLabel
                      active={orderBy === col.field}
                      direction={orderBy === col.field ? order : 'asc'}
                      onClick={() => handleSort(col.field)}
                    >
                      {col.headerName}
                    </TableSortLabel>
                  ) : (
                    col.headerName
                  )}
                </TableCell>
              ))}
              {actions && (
                <TableCell align="right" sx={{ fontWeight: 600, color: '#64748b', fontSize: '0.8rem' }}>
                  Ações
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {pagedRows.map((row) => (
              <TableRow
                key={row.id}
                hover
                selected={selected.includes(row.id)}
                sx={{ '&:hover': { backgroundColor: '#f8fafc' } }}
              >
                {selectable && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selected.includes(row.id)}
                      onChange={() => handleSelect(row.id)}
                    />
                  </TableCell>
                )}
                {columns.map((col) => (
                  <TableCell key={col.field} sx={{ fontSize: '0.85rem', color: '#475569' }}>
                    {col.render ? col.render(row[col.field], row) : row[col.field]}
                  </TableCell>
                ))}
                {actions && (
                  <TableCell align="right">
                    {onView && (
                      <Tooltip title="Visualizar">
                        <IconButton size="small" onClick={() => onView(row)} sx={{ color: '#1976d2' }}>
                          <Visibility fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                    {onEdit && (
                      <Tooltip title="Editar">
                        <IconButton size="small" onClick={() => onEdit(row)} sx={{ color: '#ff9800' }}>
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                    {onDelete && (
                      <Tooltip title="Excluir">
                        <IconButton size="small" onClick={() => onDelete(row)} sx={{ color: '#f44336' }}>
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
            {pagedRows.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length + (selectable ? 1 : 0) + (actions ? 1 : 0)} align="center">
                  <Box sx={{ py: 4 }}>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                      Nenhum registro encontrado
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={rows.length}
        page={page}
        onPageChange={(e, p) => setPage(p)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10))
          setPage(0)
        }}
        labelRowsPerPage="Linhas por página:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        sx={{ borderTop: '1px solid #e2e8f0' }}
      />
    </Paper>
  )
}
