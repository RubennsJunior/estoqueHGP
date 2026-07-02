import { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  IconButton,
  InputAdornment,
  Alert,
  Snackbar,
  CircularProgress,
} from '@mui/material'
import { Add, Search, ArrowBack, Save, PersonOutlined } from '@mui/icons-material'
import Breadcrumb from '../../components/common/Breadcrumb/Breadcrumb'
import DataTable from '../../components/common/DataTable/DataTable'
import Badge from '../../components/common/Badge/Badge'
import { formatCpfCnpj } from '../../utils/format'

const emptyFormFor = (isJuridico) => ({
  tipoPessoa: isJuridico ? 'juridica' : 'fisica',
  cpfCnpj: '',
  nome: '',
  nomeFantasia: '',
  rgIe: '',
  dataNascimento: '',
  email: '',
  telefone: '',
  celular: '',
  cep: '',
  logradouro: '',
  numero: '',
  complemento: '',
  bairro: '',
  cidade: '',
  estado: '',
  observacao: '',
  status: 'ativo',
})

export default function CadastroPessoa({ tipo }) {
  const storageKey = `hgp_cadastro_${tipo.toLowerCase()}`
  const isJuridico = tipo === 'Fornecedor' || tipo === 'Transportadora'

  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || '[]')
    } catch {
      return []
    }
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(() => emptyFormFor(isJuridico))
  const [loadingCep, setLoadingCep] = useState(false)
  const [cepError, setCepError] = useState('')
  const [validationErrors, setValidationErrors] = useState([])

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items))
  }, [items, storageKey])

  const clearForm = () => {
    setForm(emptyFormFor(isJuridico))
    setCepError('')
    setEditingId(null)
  }

  const set = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))
  const handle = (e) => set(e.target.name, e.target.value)

  const handleCpfCnpj = (e) => {
    const raw = e.target.value
    const clean = raw.replace(/\D/g, '')
    setForm((prev) => ({ ...prev, cpfCnpj: formatCpfCnpj(raw), tipoPessoa: clean.length > 11 ? 'juridica' : 'fisica' }))
  }

  const buscarCep = async () => {
    const cep = (form.cep || '').replace(/\D/g, '')
    if (cep.length !== 8) {
      setCepError('CEP inválido.')
      return
    }
    setLoadingCep(true)
    setCepError('')
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await res.json()
      if (data.erro) {
        setCepError('CEP não encontrado.')
        return
      }
      setForm((prev) => ({
        ...prev,
        logradouro: data.logradouro || '',
        bairro: data.bairro || '',
        cidade: data.localidade || '',
        estado: data.uf || '',
        complemento: data.complemento || '',
      }))
    } catch {
      setCepError('Erro ao buscar CEP.')
    } finally {
      setLoadingCep(false)
    }
  }

  const handleSalvar = (e) => {
    e.preventDefault()
    const errors = []
    if (!form.nome.trim()) errors.push('Nome / Razão Social')
    if (!form.cpfCnpj.trim()) errors.push('CPF / CNPJ')
    if (errors.length > 0) {
      setValidationErrors(errors)
      setTimeout(() => setValidationErrors([]), 5000)
      return
    }
    setValidationErrors([])
    const novoItem = {
      ...form,
      id: editingId || `${tipo.substring(0, 2).toUpperCase()}-${Date.now()}`,
      dataCadastro: new Date().toISOString(),
    }
    setItems((prev) => {
      if (editingId) return prev.map((i) => (i.id === editingId ? novoItem : i))
      return [novoItem, ...prev]
    })
    setShowForm(false)
    clearForm()
  }

  const handleEditar = (item) => {
    setForm({ ...emptyFormFor(isJuridico), ...item })
    setEditingId(item.id)
    setShowForm(true)
  }

  const handleExcluir = (id) => setItems((prev) => prev.filter((i) => i.id !== id))

  if (!showForm) {
    const filtered = items.filter(
      (i) =>
        !searchTerm ||
        i.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.cpfCnpj?.includes(searchTerm) ||
        i.email?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const columns = [
      { field: 'nome', headerName: isJuridico ? 'Razão Social' : 'Nome' },
      { field: 'cpfCnpj', headerName: isJuridico ? 'CNPJ' : 'CPF' },
      { field: 'email', headerName: 'E-mail' },
      { field: 'telefone', headerName: 'Telefone' },
      { field: 'cidade', headerName: 'Cidade' },
      {
        field: 'status',
        headerName: 'Status',
        render: (value) => <Badge label={value === 'ativo' ? 'Ativo' : 'Inativo'} color={value === 'ativo' ? 'success' : 'error'} />,
      },
    ]

    return (
      <Box>
        <Breadcrumb />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 2, mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b' }}>
            Cadastro de {tipo}s
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => {
              clearForm()
              setShowForm(true)
            }}
          >
            Novo {tipo}
          </Button>
        </Box>

        <Box
          sx={{
            backgroundColor: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: 2,
            p: 2,
            mb: 2.5,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <TextField
            size="small"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ minWidth: 260 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ fontSize: 20, color: '#94a3b8' }} />
                </InputAdornment>
              ),
            }}
          />
          <Typography variant="body2" sx={{ color: '#94a3b8', ml: 'auto' }}>
            {filtered.length} registro(s)
          </Typography>
        </Box>

        {filtered.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8, backgroundColor: '#fff', borderRadius: 2, border: '1px solid #e2e8f0' }}>
            <PersonOutlined sx={{ fontSize: 64, color: '#cbd5e1', mb: 1 }} />
            <Typography sx={{ color: '#94a3b8', fontWeight: 500 }}>
              {searchTerm ? 'Nenhum resultado encontrado.' : `Nenhum ${tipo.toLowerCase()} cadastrado.`}
            </Typography>
          </Box>
        ) : (
          <DataTable
            columns={columns}
            rows={filtered}
            onEdit={handleEditar}
            onDelete={(row) => handleExcluir(row.id)}
          />
        )}
      </Box>
    )
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <IconButton
          onClick={() => {
            setShowForm(false)
            clearForm()
          }}
          sx={{ color: '#94a3b8' }}
        >
          <ArrowBack />
        </IconButton>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b' }}>
            {editingId ? `Editar ${tipo}` : `Novo ${tipo}`}
          </Typography>
          <Typography variant="body2" sx={{ color: '#94a3b8' }}>
            Preencha os dados do cadastro
          </Typography>
        </Box>
      </Box>

      <Box component="form" onSubmit={handleSalvar} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <FormSection title={null}>
          <FieldGrid>
            <TextField label="Código" value={editingId || '——'} disabled size="small" />
            <TextField
              select
              label="Pessoa"
              size="small"
              value={form.tipoPessoa}
              onChange={(e) => setForm((prev) => ({ ...prev, tipoPessoa: e.target.value, cpfCnpj: '' }))}
            >
              <MenuItem value="fisica">Física</MenuItem>
              <MenuItem value="juridica">Jurídica</MenuItem>
            </TextField>
            <TextField
              label={form.tipoPessoa === 'juridica' ? 'CNPJ *' : 'CPF *'}
              size="small"
              value={form.cpfCnpj}
              onChange={handleCpfCnpj}
              placeholder={form.tipoPessoa === 'juridica' ? '00.000.000/0000-00' : '000.000.000-00'}
              sx={{ gridColumn: 'span 2' }}
            />
            <TextField
              label={form.tipoPessoa === 'juridica' ? 'Razão Social *' : 'Nome *'}
              size="small"
              name="nome"
              value={form.nome}
              onChange={handle}
              sx={{ gridColumn: 'span 2' }}
            />
            <TextField label="Nome Fantasia" size="small" name="nomeFantasia" value={form.nomeFantasia} onChange={handle} sx={{ gridColumn: 'span 2' }} />
            <TextField label={isJuridico ? 'Insc. Estadual' : 'RG'} size="small" name="rgIe" value={form.rgIe} onChange={handle} />
            <TextField
              label="Data Nasc./Fund."
              type="date"
              size="small"
              name="dataNascimento"
              value={form.dataNascimento}
              onChange={handle}
              InputLabelProps={{ shrink: true }}
            />
            <TextField select label="Status" size="small" name="status" value={form.status} onChange={handle}>
              <MenuItem value="ativo">Ativo</MenuItem>
              <MenuItem value="inativo">Inativo</MenuItem>
            </TextField>
          </FieldGrid>
        </FormSection>

        <FormSection title="Contato">
          <FieldGrid cols={3}>
            <TextField label="E-mail" type="email" size="small" name="email" value={form.email} onChange={handle} />
            <TextField label="Telefone" size="small" name="telefone" value={form.telefone} onChange={handle} placeholder="(63) 1234-5678" />
            <TextField label="Celular" size="small" name="celular" value={form.celular} onChange={handle} placeholder="(63) 91234-5678" />
          </FieldGrid>
        </FormSection>

        <FormSection title="Endereço">
          <FieldGrid cols={4}>
            <Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  label="CEP"
                  size="small"
                  name="cep"
                  value={form.cep}
                  onChange={handle}
                  fullWidth
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      buscarCep()
                    }
                  }}
                />
                <IconButton onClick={buscarCep} disabled={loadingCep} sx={{ border: '1px solid #e2e8f0', borderRadius: 1.5 }}>
                  {loadingCep ? <CircularProgress size={18} /> : <Search fontSize="small" />}
                </IconButton>
              </Box>
              {cepError && (
                <Typography variant="caption" sx={{ color: 'error.main' }}>
                  {cepError}
                </Typography>
              )}
            </Box>
            <TextField label="Estado" size="small" name="estado" value={form.estado} onChange={handle} inputProps={{ maxLength: 2 }} />
            <TextField label="Cidade" size="small" name="cidade" value={form.cidade} onChange={handle} />
            <TextField label="Logradouro" size="small" name="logradouro" value={form.logradouro} onChange={handle} />
            <TextField label="Bairro" size="small" name="bairro" value={form.bairro} onChange={handle} />
            <TextField label="Número" size="small" name="numero" value={form.numero} onChange={handle} />
            <TextField
              label="Complemento"
              size="small"
              name="complemento"
              value={form.complemento}
              onChange={handle}
              sx={{ gridColumn: 'span 2' }}
            />
          </FieldGrid>
        </FormSection>

        <FormSection title="Observações">
          <TextField
            multiline
            rows={3}
            fullWidth
            size="small"
            name="observacao"
            value={form.observacao}
            onChange={handle}
            placeholder="Informações adicionais..."
          />
        </FormSection>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5 }}>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => {
              setShowForm(false)
              clearForm()
            }}
          >
            Cancelar
          </Button>
          <Button type="submit" variant="contained" startIcon={<Save />}>
            {editingId ? `Salvar ${tipo}` : `Cadastrar ${tipo}`}
          </Button>
        </Box>
      </Box>

      <Snackbar open={validationErrors.length > 0} autoHideDuration={5000} onClose={() => setValidationErrors([])}>
        <Alert severity="error" onClose={() => setValidationErrors([])}>
          Preencha: {validationErrors.join(', ')}
        </Alert>
      </Snackbar>
    </Box>
  )
}

function FormSection({ title, children }) {
  return (
    <Box sx={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: 2, p: 3 }}>
      {title && (
        <Typography
          variant="overline"
          sx={{ display: 'block', fontWeight: 700, color: '#475569', mb: 2, pb: 1.5, borderBottom: '1px solid #f1f5f9' }}
        >
          {title}
        </Typography>
      )}
      {children}
    </Box>
  )
}

function FieldGrid({ cols = 6, children }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: `repeat(${cols}, 1fr)` },
        gap: 2.5,
      }}
    >
      {children}
    </Box>
  )
}
