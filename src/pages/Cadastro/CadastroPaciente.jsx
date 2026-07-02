import { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  IconButton,
  InputAdornment,
  Tabs,
  Tab,
  Alert,
  Snackbar,
  CircularProgress,
} from '@mui/material'
import { Add, Search, ArrowBack, Save, PersonOutlined, Assignment } from '@mui/icons-material'
import Breadcrumb from '../../components/common/Breadcrumb/Breadcrumb'
import DataTable from '../../components/common/DataTable/DataTable'
import Badge from '../../components/common/Badge/Badge'
import { formatDate } from '../../utils/format'

const STORAGE_KEY = 'hgp_cadastro_pacientes'
const FORM_STATE_KEY = 'hgp_paciente_form_state'

const TABS = ['dados', 'pessoal', 'observacoes', 'farmacia', 'agendamentos', 'historico']
const TAB_LABEL = {
  dados: 'Dados',
  pessoal: 'Pessoal',
  observacoes: 'Observações',
  farmacia: 'Farmácia',
  agendamentos: 'Agendamentos',
  historico: 'Histórico',
}

const emptyForm = {
  nome: '', nomeCurto: '', codigo: '', tipoCliente: 'nao_contribuinte',
  dataNascimento: '', sexo: '', estadoCivil: '', naturalidade: '',
  nomeMae: '', nomePai: '', cpf: '', rg: '', orgaoEmissor: '', cns: '',
  email: '', telefone: '', celular: '', contatoEmergencia: '', telEmergencia: '',
  cep: '', logradouro: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '',
  profissao: '', escolaridade: '', etnia: '', observacao: '', status: 'ativo',
}

const loadFormState = () => {
  try {
    const saved = localStorage.getItem(FORM_STATE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {
    /* ignore */
  }
  return null
}

export default function CadastroPaciente() {
  const savedState = loadFormState()

  const [activeTab, setActiveTab] = useState(savedState?.activeTab || 'dados')
  const [patients, setPatients] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    } catch {
      return []
    }
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(savedState?.showForm || false)
  const [editingId, setEditingId] = useState(savedState?.editingId || null)
  const [validationErrors, setValidationErrors] = useState([])
  const [loadingCep, setLoadingCep] = useState(false)
  const [cepError, setCepError] = useState('')
  const [form, setForm] = useState(savedState?.form || { ...emptyForm })

  const set = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))
  const handle = (e) => set(e.target.name, e.target.value)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(patients))
  }, [patients])

  useEffect(() => {
    if (showForm) {
      localStorage.setItem(FORM_STATE_KEY, JSON.stringify({ showForm, editingId, form, activeTab }))
    } else {
      localStorage.removeItem(FORM_STATE_KEY)
    }
  }, [showForm, editingId, form, activeTab])

  const clearForm = () => {
    setForm({ ...emptyForm })
    setEditingId(null)
    setActiveTab('dados')
    setCepError('')
    localStorage.removeItem(FORM_STATE_KEY)
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
    if (!form.nome.trim()) errors.push('Nome')
    if (!form.cpf.trim()) errors.push('CPF')
    if (errors.length > 0) {
      setValidationErrors(errors)
      setTimeout(() => setValidationErrors([]), 5000)
      return
    }
    setValidationErrors([])
    const novo = { ...form, id: editingId || `PAC-${Date.now()}`, dataCadastro: new Date().toISOString() }
    setPatients((prev) => (editingId ? prev.map((i) => (i.id === editingId ? novo : i)) : [novo, ...prev]))
    setShowForm(false)
    clearForm()
  }

  const handleEditar = (item) => {
    setForm({ ...emptyForm, ...item })
    setEditingId(item.id)
    setShowForm(true)
  }

  const handleExcluir = (id) => setPatients((prev) => prev.filter((i) => i.id !== id))

  if (!showForm) {
    const filtered = patients.filter(
      (i) =>
        !searchTerm ||
        i.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.cpf?.includes(searchTerm) ||
        i.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.cns?.includes(searchTerm)
    )

    const columns = [
      { field: 'nome', headerName: 'Nome' },
      { field: 'cpf', headerName: 'CPF' },
      { field: 'cns', headerName: 'CNS' },
      { field: 'telefone', headerName: 'Telefone' },
      { field: 'dataNascimento', headerName: 'Nascimento', render: (value) => (value ? formatDate(`${value}T00:00:00`) : '-') },
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
            Cadastro de Paciente
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => {
              clearForm()
              setShowForm(true)
            }}
          >
            Novo Paciente
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
            placeholder="Buscar por nome, CPF, CNS..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ minWidth: 280 }}
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
              {searchTerm ? 'Nenhum paciente encontrado.' : 'Nenhum paciente cadastrado.'}
            </Typography>
          </Box>
        ) : (
          <DataTable columns={columns} rows={filtered} onEdit={handleEditar} onDelete={(row) => handleExcluir(row.id)} />
        )}
      </Box>
    )
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          borderBottom: '1px solid #e2e8f0',
          pb: 2,
          mb: 3,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <IconButton
            onClick={() => {
              setShowForm(false)
              clearForm()
            }}
            sx={{ color: '#94a3b8' }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b' }}>
            Cadastro de Paciente
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => {
              setShowForm(false)
              clearForm()
            }}
          >
            Fechar
          </Button>
          <Button type="submit" form="formPaciente" variant="contained" startIcon={<Save />}>
            Gravar
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          alignItems: 'flex-end',
          backgroundColor: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: 2,
          p: 2,
          mb: 3,
        }}
      >
        <TextField label="Nome" size="small" sx={{ flex: 1, minWidth: 220 }} value={form.nome} onChange={(e) => set('nome', e.target.value)} />
        <TextField label="CPF" size="small" sx={{ width: 200 }} value={form.cpf} onChange={(e) => set('cpf', e.target.value)} />
        <TextField select label="Ativo" size="small" sx={{ width: 120 }} value={form.status} onChange={(e) => set('status', e.target.value)}>
          <MenuItem value="ativo">Sim</MenuItem>
          <MenuItem value="inativo">Não</MenuItem>
        </TextField>
      </Box>

      <Tabs
        value={activeTab}
        onChange={(e, value) => setActiveTab(value)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ borderBottom: '1px solid #e2e8f0', mb: 3, minHeight: 40 }}
      >
        {TABS.map((tab) => (
          <Tab key={tab} value={tab} label={TAB_LABEL[tab]} sx={{ textTransform: 'none', minHeight: 40, fontWeight: 500 }} />
        ))}
      </Tabs>

      <Box component="form" id="formPaciente" onSubmit={handleSalvar}>
        {activeTab === 'dados' && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <FieldGrid cols={3}>
              <TextField select label="Tipo Cliente" size="small" name="tipoCliente" value={form.tipoCliente} onChange={handle}>
                <MenuItem value="nao_contribuinte">Não Contribuinte</MenuItem>
                <MenuItem value="contribuinte">Contribuinte</MenuItem>
                <MenuItem value="particular">Particular</MenuItem>
                <MenuItem value="convenio">Convênio</MenuItem>
              </TextField>
              <TextField label="Nome Curto" size="small" placeholder="Apelido do Paciente" name="nomeCurto" value={form.nomeCurto} onChange={handle} />
              <TextField label="RG" size="small" name="rg" value={form.rg} onChange={handle} />
            </FieldGrid>
            <FieldGrid cols={2}>
              <TextField
                label="Data de Nascimento"
                type="date"
                size="small"
                name="dataNascimento"
                value={form.dataNascimento}
                onChange={handle}
                InputLabelProps={{ shrink: true }}
              />
              <TextField select label="Estado Civil" size="small" name="estadoCivil" value={form.estadoCivil} onChange={handle}>
                <MenuItem value="">-- Selecione --</MenuItem>
                <MenuItem value="solteiro">Solteiro(a)</MenuItem>
                <MenuItem value="casado">Casado(a)</MenuItem>
                <MenuItem value="divorciado">Divorciado(a)</MenuItem>
                <MenuItem value="viuvo">Viúvo(a)</MenuItem>
              </TextField>
            </FieldGrid>
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
                <TextField label="Estado" size="small" name="estado" value={form.estado} onChange={handle} />
                <TextField label="Cidade" size="small" name="cidade" value={form.cidade} onChange={handle} />
                <TextField label="Endereço" size="small" name="logradouro" value={form.logradouro} onChange={handle} />
              </FieldGrid>
              <FieldGrid cols={2} sx={{ mt: 2.5 }}>
                <TextField label="Bairro" size="small" name="bairro" value={form.bairro} onChange={handle} />
                <TextField label="Número" size="small" name="numero" value={form.numero} onChange={handle} />
              </FieldGrid>
            </FormSection>
          </Box>
        )}

        {activeTab === 'pessoal' && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <FieldGrid cols={3}>
              <TextField label="Naturalidade" size="small" placeholder="Cidade / UF" name="naturalidade" value={form.naturalidade} onChange={handle} />
              <TextField select label="Sexo" size="small" name="sexo" value={form.sexo} onChange={handle}>
                <MenuItem value="">-- Selecione --</MenuItem>
                <MenuItem value="masculino">Masculino</MenuItem>
                <MenuItem value="feminino">Feminino</MenuItem>
              </TextField>
              <TextField label="CNS" size="small" placeholder="Cartão Nacional de Saúde" name="cns" value={form.cns} onChange={handle} />
              <TextField label="Órgão Emissor RG" size="small" placeholder="SSP/TO" name="orgaoEmissor" value={form.orgaoEmissor} onChange={handle} />
              <TextField label="Profissão" size="small" name="profissao" value={form.profissao} onChange={handle} />
              <TextField select label="Escolaridade" size="small" name="escolaridade" value={form.escolaridade} onChange={handle}>
                <MenuItem value="">-- Selecione --</MenuItem>
                <MenuItem value="fundamental">Ensino Fundamental</MenuItem>
                <MenuItem value="medio">Ensino Médio</MenuItem>
                <MenuItem value="superior">Ensino Superior</MenuItem>
                <MenuItem value="pos">Pós-Graduação</MenuItem>
              </TextField>
            </FieldGrid>
            <FormSection title="Filiação">
              <FieldGrid cols={2}>
                <TextField label="Nome da Mãe" size="small" name="nomeMae" value={form.nomeMae} onChange={handle} />
                <TextField label="Nome do Pai" size="small" name="nomePai" value={form.nomePai} onChange={handle} />
              </FieldGrid>
            </FormSection>
            <FormSection title="Contato">
              <FieldGrid cols={3}>
                <TextField label="E-mail" type="email" size="small" name="email" value={form.email} onChange={handle} />
                <TextField label="Telefone" size="small" name="telefone" value={form.telefone} onChange={handle} />
                <TextField label="Celular" size="small" name="celular" value={form.celular} onChange={handle} />
              </FieldGrid>
              <FieldGrid cols={2} sx={{ mt: 2.5 }}>
                <TextField label="Contato de Emergência" size="small" name="contatoEmergencia" value={form.contatoEmergencia} onChange={handle} />
                <TextField label="Tel. Emergência" size="small" name="telEmergencia" value={form.telEmergencia} onChange={handle} />
              </FieldGrid>
            </FormSection>
          </Box>
        )}

        {activeTab === 'observacoes' && (
          <TextField
            label="Observações Gerais"
            multiline
            rows={6}
            fullWidth
            size="small"
            placeholder="Informações adicionais relevantes sobre o paciente..."
            name="observacao"
            value={form.observacao}
            onChange={handle}
          />
        )}

        {['farmacia', 'agendamentos', 'historico'].includes(activeTab) && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Assignment sx={{ fontSize: 48, color: '#cbd5e1', mb: 1.5 }} />
            <Typography sx={{ color: '#94a3b8', fontWeight: 500 }}>Módulo em desenvolvimento</Typography>
            <Typography variant="body2" sx={{ color: '#cbd5e1', mt: 0.5 }}>
              Os registros de {TAB_LABEL[activeTab].toLowerCase()} estarão disponíveis em breve.
            </Typography>
          </Box>
        )}
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
    <Box sx={{ border: '1px solid #e2e8f0', borderRadius: 2, p: 2.5 }}>
      <Typography variant="overline" sx={{ display: 'block', fontWeight: 700, color: '#475569', mb: 2 }}>
        {title}
      </Typography>
      {children}
    </Box>
  )
}

function FieldGrid({ cols = 3, children, sx }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: `repeat(${cols}, 1fr)` },
        gap: 2.5,
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}
