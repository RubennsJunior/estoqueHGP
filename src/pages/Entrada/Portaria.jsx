import { useEffect, useMemo, useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  IconButton,
  InputAdornment,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material'
import { Add, Search, Close, HowToReg, Groups, Logout as LogoutIcon, PlaylistAdd } from '@mui/icons-material'
import Breadcrumb from '../../components/common/Breadcrumb/Breadcrumb'
import DashboardCard from '../../components/common/Card/DashboardCard'
import DataTable from '../../components/common/DataTable/DataTable'
import Badge from '../../components/common/Badge/Badge'

const VISITANTES_KEY = 'hgp_portaria_visitantes'
const FUNCIONARIOS_KEY = 'hgp_portaria_funcionarios'

const SETORES = ['Pronto Socorro', 'Hemodinâmica', 'Centro Cirúrgico', 'OPME', 'Administrativo']

const now = () => new Date().toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })

const DEFAULT_VISITANTES = [
  { id: 'V-101', nome: 'Carlos Roberto Souza', doc: '3.456.789-SSP/TO', paciente: 'José Carlos de Souza', leito: 'Apto 204', entrada: '23/06/2026 14:30', saida: '-', cracha: '52', parentesco: 'Filho', status: 'Dentro' },
  { id: 'V-102', nome: 'Ana Maria Ferreira', doc: '4.112.345-SSP/TO', paciente: 'Mariana Lima Ferreira', leito: 'Leito 12 (Hemodinâmica)', entrada: '23/06/2026 13:00', saida: '23/06/2026 15:00', cracha: '108', parentesco: 'Irmã', status: 'Liberado' },
]

const DEFAULT_ACESSOS = [
  { id: 'A-101', nome: 'Dra. Amanda Nogueira', cargo: 'Médica Plantonista', matricula: 'M-8890', tipo: 'Entrada', dataHora: '23/06/2026 07:15', setor: 'Hemodinâmica', obs: 'Início plantão 12h' },
  { id: 'A-102', nome: 'Felipe Costa', cargo: 'Técnico de Enfermagem', matricula: 'M-4451', tipo: 'Saída', dataHora: '23/06/2026 16:00', setor: 'Pronto Socorro', obs: 'Término de turno' },
]

const loadOrDefault = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : fallback
  } catch {
    return fallback
  }
}

export default function Portaria() {
  const [activeTab, setActiveTab] = useState('visitantes')

  const [visitantes, setVisitantes] = useState(() => loadOrDefault(VISITANTES_KEY, DEFAULT_VISITANTES))
  const [vSearch, setVSearch] = useState('')
  const [vFilterStatus, setVFilterStatus] = useState('')
  const [showVisitorForm, setShowVisitorForm] = useState(false)
  const [visitorForm, setVisitorForm] = useState({ nome: '', doc: '', paciente: '', leito: '', parentesco: '', cracha: '' })

  const [acessos, setAcessos] = useState(() => loadOrDefault(FUNCIONARIOS_KEY, DEFAULT_ACESSOS))
  const [fSearch, setFSearch] = useState('')
  const [fFilterSetor, setFFilterSetor] = useState('')
  const [showEmployeeForm, setShowEmployeeForm] = useState(false)
  const [employeeForm, setEmployeeForm] = useState({ matricula: '', nome: '', cargo: '', setor: 'Pronto Socorro', tipo: 'Entrada', obs: '' })

  useEffect(() => {
    localStorage.setItem(VISITANTES_KEY, JSON.stringify(visitantes))
  }, [visitantes])

  useEffect(() => {
    localStorage.setItem(FUNCIONARIOS_KEY, JSON.stringify(acessos))
  }, [acessos])

  const handleRegistrarSaidaVisitante = (id) => {
    setVisitantes((prev) => prev.map((v) => (v.id === id ? { ...v, saida: now(), status: 'Liberado' } : v)))
  }

  const handleSalvarVisitante = (e) => {
    e.preventDefault()
    if (!visitorForm.nome.trim() || !visitorForm.paciente.trim()) {
      alert('Por favor, informe o nome do visitante e o paciente visitado.')
      return
    }
    const novo = {
      id: `V-${Math.floor(Math.random() * 900) + 100}`,
      nome: visitorForm.nome,
      doc: visitorForm.doc || 'Não Informado',
      paciente: visitorForm.paciente,
      leito: visitorForm.leito || 'Aguardando Leito',
      parentesco: visitorForm.parentesco || 'Outro',
      cracha: visitorForm.cracha || 'Sem Crachá',
      entrada: now(),
      saida: '-',
      status: 'Dentro',
    }
    setVisitantes((prev) => [novo, ...prev])
    setShowVisitorForm(false)
    setVisitorForm({ nome: '', doc: '', paciente: '', leito: '', parentesco: '', cracha: '' })
  }

  const handleRemoverVisitante = (id) => {
    if (confirm('Deseja excluir o registro desse visitante?')) {
      setVisitantes((prev) => prev.filter((v) => v.id !== id))
    }
  }

  const handleSalvarAcesso = (e) => {
    e.preventDefault()
    if (!employeeForm.nome.trim() || !employeeForm.matricula.trim()) {
      alert('Por favor, preencha o nome e a matrícula do funcionário.')
      return
    }
    const novo = {
      id: `A-${Math.floor(Math.random() * 900) + 100}`,
      nome: employeeForm.nome,
      matricula: employeeForm.matricula,
      cargo: employeeForm.cargo || 'Colaborador',
      setor: employeeForm.setor,
      tipo: employeeForm.tipo,
      dataHora: now(),
      obs: employeeForm.obs,
    }
    setAcessos((prev) => [novo, ...prev])
    setShowEmployeeForm(false)
    setEmployeeForm({ matricula: '', nome: '', cargo: '', setor: 'Pronto Socorro', tipo: 'Entrada', obs: '' })
  }

  const handleRemoverAcesso = (id) => {
    if (confirm('Deseja excluir o registro desse acesso?')) {
      setAcessos((prev) => prev.filter((a) => a.id !== id))
    }
  }

  const filteredVisitantes = useMemo(
    () =>
      visitantes.filter((v) => {
        const matchSearch =
          v.nome.toLowerCase().includes(vSearch.toLowerCase()) ||
          v.paciente.toLowerCase().includes(vSearch.toLowerCase()) ||
          v.doc.includes(vSearch) ||
          v.id.toLowerCase().includes(vSearch.toLowerCase())
        const matchStatus = vFilterStatus ? v.status === vFilterStatus : true
        return matchSearch && matchStatus
      }),
    [visitantes, vSearch, vFilterStatus]
  )

  const filteredAcessos = useMemo(
    () =>
      acessos.filter((a) => {
        const matchSearch =
          a.nome.toLowerCase().includes(fSearch.toLowerCase()) ||
          a.matricula.toLowerCase().includes(fSearch.toLowerCase()) ||
          a.id.toLowerCase().includes(fSearch.toLowerCase())
        const matchSetor = fFilterSetor ? a.setor === fFilterSetor : true
        return matchSearch && matchSetor
      }),
    [acessos, fSearch, fFilterSetor]
  )

  const vStats = useMemo(
    () => ({
      dentro: visitantes.filter((v) => v.status === 'Dentro').length,
      totalHoje: visitantes.length,
      saidas: visitantes.filter((v) => v.status === 'Liberado').length,
    }),
    [visitantes]
  )

  const fStats = useMemo(
    () => ({
      entradas: acessos.filter((a) => a.tipo === 'Entrada').length,
      saidas: acessos.filter((a) => a.tipo === 'Saída').length,
      total: acessos.length,
    }),
    [acessos]
  )

  const isFormOpen = showVisitorForm || showEmployeeForm

  return (
    <Box>
      {!isFormOpen && <Breadcrumb />}

      {!isFormOpen && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 2, mb: 4 }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ width: 40, height: 40, borderRadius: 2, backgroundColor: '#1976d2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <HowToReg sx={{ color: '#fff', fontSize: 22 }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b' }}>
                Portaria — Controle de Acessos
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#94a3b8', mt: 0.5, ml: 6.5 }}>
              Gerenciamento de visitantes e controle de fluxo de funcionários.
            </Typography>
          </Box>

          <ToggleButtonGroup
            value={activeTab}
            exclusive
            onChange={(e, value) => {
              if (!value) return
              setActiveTab(value)
              setShowVisitorForm(false)
              setShowEmployeeForm(false)
            }}
            sx={{ backgroundColor: '#f1f5f9', borderRadius: 2, p: 0.5 }}
          >
            <ToggleButton value="visitantes" sx={{ textTransform: 'none', fontWeight: 600, border: 'none', borderRadius: 1.5, px: 2 }}>
              Controle de Visitantes
            </ToggleButton>
            <ToggleButton value="funcionarios" sx={{ textTransform: 'none', fontWeight: 600, border: 'none', borderRadius: 1.5, px: 2 }}>
              Acesso de Funcionários
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      )}

      {activeTab === 'visitantes' ? (
        <Box>
          {!showVisitorForm && (
            <>
              <Grid container spacing={2.5} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={4}>
                  <DashboardCard title="Visitantes no Prédio" value={vStats.dentro} icon={Groups} color="#1976d2" bgColor="#e3f2fd" />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <DashboardCard title="Visitas Concluídas" value={vStats.saidas} icon={HowToReg} color="#4caf50" bgColor="#e8f5e9" />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <DashboardCard title="Total de Visitas Hoje" value={vStats.totalHoje} icon={Groups} color="#00acc1" bgColor="#e0f7fa" />
                </Grid>
              </Grid>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1e293b' }}>
                  Visitantes Ativos
                </Typography>
                <Button variant="contained" startIcon={<Add />} onClick={() => setShowVisitorForm(true)}>
                  Registrar Entrada de Visitante
                </Button>
              </Box>
            </>
          )}

          {showVisitorForm && (
            <Box sx={{ backgroundColor: '#fff', borderRadius: 3, border: '1px solid #e2e8f0', overflow: 'hidden', mb: 3 }}>
              <Box sx={{ backgroundColor: '#1976d2', px: 3, py: 2.5, color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>Registro de Entrada de Visitante</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.85 }}>Preencha as informações para liberação de crachá e acesso.</Typography>
                </Box>
                <IconButton onClick={() => setShowVisitorForm(false)} sx={{ color: '#fff' }}>
                  <Close />
                </IconButton>
              </Box>
              <Box component="form" onSubmit={handleSalvarVisitante} sx={{ p: 3 }}>
                <Grid container spacing={2.5}>
                  <Grid item xs={12} md={4}>
                    <TextField label="Nome Completo do Visitante *" fullWidth size="small" value={visitorForm.nome} onChange={(e) => setVisitorForm((p) => ({ ...p, nome: e.target.value }))} />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField label="Documento (RG ou CPF)" fullWidth size="small" value={visitorForm.doc} onChange={(e) => setVisitorForm((p) => ({ ...p, doc: e.target.value }))} />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField label="Número do Crachá" fullWidth size="small" value={visitorForm.cracha} onChange={(e) => setVisitorForm((p) => ({ ...p, cracha: e.target.value }))} />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField label="Paciente Visitado *" fullWidth size="small" value={visitorForm.paciente} onChange={(e) => setVisitorForm((p) => ({ ...p, paciente: e.target.value }))} />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField label="Leito / Quarto" fullWidth size="small" value={visitorForm.leito} onChange={(e) => setVisitorForm((p) => ({ ...p, leito: e.target.value }))} />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField label="Grau de Parentesco / Relação" fullWidth size="small" value={visitorForm.parentesco} onChange={(e) => setVisitorForm((p) => ({ ...p, parentesco: e.target.value }))} />
                  </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5, mt: 3, pt: 3, borderTop: '1px solid #f1f5f9' }}>
                  <Button variant="outlined" color="inherit" onClick={() => setShowVisitorForm(false)}>Cancelar</Button>
                  <Button type="submit" variant="contained" startIcon={<HowToReg />}>Registrar Entrada</Button>
                </Box>
              </Box>
            </Box>
          )}

          {!showVisitorForm && (
            <>
              <Box sx={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: 2, p: 2, mb: 2.5, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <TextField
                  size="small"
                  placeholder="Pesquisar visitante, paciente ou documento..."
                  value={vSearch}
                  onChange={(e) => setVSearch(e.target.value)}
                  sx={{ flex: 1, minWidth: 240 }}
                  InputProps={{ startAdornment: <InputAdornment position="start"><Search sx={{ fontSize: 20, color: '#94a3b8' }} /></InputAdornment> }}
                />
                <TextField select size="small" label="Status" value={vFilterStatus} onChange={(e) => setVFilterStatus(e.target.value)} sx={{ minWidth: 180 }}>
                  <MenuItem value="">Todos os Status</MenuItem>
                  <MenuItem value="Dentro">Dentro</MenuItem>
                  <MenuItem value="Liberado">Liberado (Saída)</MenuItem>
                </TextField>
              </Box>

              <DataTable
                columns={[
                  { field: 'id', headerName: 'Código' },
                  {
                    field: 'nome',
                    headerName: 'Visitante',
                    render: (value, row) => (
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>{value}</Typography>
                        <Typography variant="caption" sx={{ color: '#94a3b8' }}>Doc: {row.doc}</Typography>
                      </Box>
                    ),
                  },
                  {
                    field: 'paciente',
                    headerName: 'Motivo / Destino',
                    render: (value, row) => (
                      <Box>
                        <Typography variant="body2">Visitando: <b>{value}</b></Typography>
                        <Typography variant="caption" sx={{ color: '#94a3b8' }}>Local: {row.leito} ({row.parentesco})</Typography>
                      </Box>
                    ),
                  },
                  { field: 'cracha', headerName: 'Crachá', render: (value) => <Badge label={`Nº ${value}`} color="primary" /> },
                  {
                    field: 'entrada',
                    headerName: 'Horários',
                    render: (value, row) => (
                      <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>
                        Entrada: {value}<br />Saída: {row.saida}
                      </Typography>
                    ),
                  },
                  { field: 'status', headerName: 'Status', render: (value) => <Badge label={value} color={value === 'Dentro' ? 'warning' : 'success'} /> },
                ]}
                rows={filteredVisitantes}
                onDelete={(row) => handleRemoverVisitante(row.id)}
                onEdit={(row) => row.status === 'Dentro' && handleRegistrarSaidaVisitante(row.id)}
              />
            </>
          )}
        </Box>
      ) : (
        <Box>
          {!showEmployeeForm && (
            <>
              <Grid container spacing={2.5} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={4}>
                  <DashboardCard title="Entradas Registradas" value={fStats.entradas} icon={HowToReg} color="#4caf50" bgColor="#e8f5e9" />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <DashboardCard title="Saídas Registradas" value={fStats.saidas} icon={LogoutIcon} color="#ff9800" bgColor="#fff3e0" />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <DashboardCard title="Total Movimentações" value={fStats.total} icon={PlaylistAdd} color="#1976d2" bgColor="#e3f2fd" />
                </Grid>
              </Grid>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1e293b' }}>
                  Registros de Acesso
                </Typography>
                <Button variant="contained" startIcon={<Add />} onClick={() => setShowEmployeeForm(true)}>
                  Registrar Ponto/Acesso
                </Button>
              </Box>
            </>
          )}

          {showEmployeeForm && (
            <Box sx={{ backgroundColor: '#fff', borderRadius: 3, border: '1px solid #e2e8f0', overflow: 'hidden', mb: 3 }}>
              <Box sx={{ backgroundColor: '#1976d2', px: 3, py: 2.5, color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>Registro de Entrada/Saída de Funcionário</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.85 }}>Informe os dados do colaborador para log de presença.</Typography>
                </Box>
                <IconButton onClick={() => setShowEmployeeForm(false)} sx={{ color: '#fff' }}>
                  <Close />
                </IconButton>
              </Box>
              <Box component="form" onSubmit={handleSalvarAcesso} sx={{ p: 3 }}>
                <Grid container spacing={2.5}>
                  <Grid item xs={12} md={4}>
                    <TextField label="Matrícula *" fullWidth size="small" value={employeeForm.matricula} onChange={(e) => setEmployeeForm((p) => ({ ...p, matricula: e.target.value }))} />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField label="Nome Completo *" fullWidth size="small" value={employeeForm.nome} onChange={(e) => setEmployeeForm((p) => ({ ...p, nome: e.target.value }))} />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField label="Cargo" fullWidth size="small" value={employeeForm.cargo} onChange={(e) => setEmployeeForm((p) => ({ ...p, cargo: e.target.value }))} />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Tipo de Registro *</Typography>
                    <ToggleButtonGroup
                      value={employeeForm.tipo}
                      exclusive
                      fullWidth
                      size="small"
                      onChange={(e, value) => value && setEmployeeForm((p) => ({ ...p, tipo: value }))}
                    >
                      <ToggleButton value="Entrada" sx={{ textTransform: 'none' }}>Entrada (Check-in)</ToggleButton>
                      <ToggleButton value="Saída" sx={{ textTransform: 'none' }}>Saída (Check-out)</ToggleButton>
                    </ToggleButtonGroup>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField select label="Setor de Atuação" fullWidth size="small" value={employeeForm.setor} onChange={(e) => setEmployeeForm((p) => ({ ...p, setor: e.target.value }))}>
                      {SETORES.map((s) => (
                        <MenuItem key={s} value={s}>{s}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Observações / Justificativa" fullWidth size="small" value={employeeForm.obs} onChange={(e) => setEmployeeForm((p) => ({ ...p, obs: e.target.value }))} />
                  </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5, mt: 3, pt: 3, borderTop: '1px solid #f1f5f9' }}>
                  <Button variant="outlined" color="inherit" onClick={() => setShowEmployeeForm(false)}>Cancelar</Button>
                  <Button type="submit" variant="contained" startIcon={<HowToReg />}>Registrar Acesso</Button>
                </Box>
              </Box>
            </Box>
          )}

          {!showEmployeeForm && (
            <>
              <Box sx={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: 2, p: 2, mb: 2.5, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <TextField
                  size="small"
                  placeholder="Pesquisar por nome ou matrícula de funcionário..."
                  value={fSearch}
                  onChange={(e) => setFSearch(e.target.value)}
                  sx={{ flex: 1, minWidth: 240 }}
                  InputProps={{ startAdornment: <InputAdornment position="start"><Search sx={{ fontSize: 20, color: '#94a3b8' }} /></InputAdornment> }}
                />
                <TextField select size="small" label="Setor" value={fFilterSetor} onChange={(e) => setFFilterSetor(e.target.value)} sx={{ minWidth: 180 }}>
                  <MenuItem value="">Todos os Setores</MenuItem>
                  {SETORES.map((s) => (
                    <MenuItem key={s} value={s}>{s}</MenuItem>
                  ))}
                </TextField>
              </Box>

              <DataTable
                columns={[
                  { field: 'id', headerName: 'ID Reg' },
                  {
                    field: 'nome',
                    headerName: 'Colaborador',
                    render: (value, row) => (
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>{value}</Typography>
                        <Typography variant="caption" sx={{ color: '#94a3b8' }}>Matrícula: {row.matricula}</Typography>
                      </Box>
                    ),
                  },
                  {
                    field: 'setor',
                    headerName: 'Cargo / Setor',
                    render: (value, row) => (
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{value}</Typography>
                        <Typography variant="caption" sx={{ color: '#94a3b8' }}>{row.cargo}</Typography>
                      </Box>
                    ),
                  },
                  { field: 'tipo', headerName: 'Registro', render: (value) => <Badge label={value} color={value === 'Entrada' ? 'success' : 'warning'} /> },
                  { field: 'dataHora', headerName: 'Data e Hora' },
                  { field: 'obs', headerName: 'Observação', render: (value) => value || '-' },
                ]}
                rows={filteredAcessos}
                onDelete={(row) => handleRemoverAcesso(row.id)}
              />
            </>
          )}
        </Box>
      )}
    </Box>
  )
}
