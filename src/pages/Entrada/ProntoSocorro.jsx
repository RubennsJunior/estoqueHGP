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
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogContent,
  DialogActions,
  Chip,
} from '@mui/material'
import { Add, Search, Close, PlaylistAdd, PersonOutlined, HowToReg, WarningAmber, Print } from '@mui/icons-material'
import Breadcrumb from '../../components/common/Breadcrumb/Breadcrumb'
import DashboardCard from '../../components/common/Card/DashboardCard'
import DataTable from '../../components/common/DataTable/DataTable'
import Badge from '../../components/common/Badge/Badge'
import { formatDate } from '../../utils/format'

const STORAGE_KEY = 'hgp_pronto_socorro_triagens'

const PRIORIDADES_MANCHESTER = [
  { id: 'emergencia', nome: 'Emergência', tempo: 'Imediato', desc: 'Necessidade de atendimento imediato. Risco de morte.', color: '#ef4444' },
  { id: 'muito-urgente', nome: 'Muito Urgente', tempo: '10 minutos', desc: 'Necessidade de atendimento muito rápido.', color: '#f97316' },
  { id: 'urgente', nome: 'Urgente', tempo: '50 minutos', desc: 'Necessidade de atendimento rápido.', color: '#eab308' },
  { id: 'pouco-urgente', nome: 'Pouco Urgente', tempo: '120 minutos', desc: 'Atendimento pode aguardar um pouco.', color: '#22c55e' },
  { id: 'nao-urgente', nome: 'Não Urgente', tempo: '240 minutos', desc: 'Caso de menor complexidade.', color: '#3b82f6' },
]

const SETORES_DESTINO = [
  { id: 'hemodinamica', nome: 'Hemodinâmica' },
  { id: 'centro-cirurgico', nome: 'Centro Cirúrgico' },
  { id: 'opme', nome: 'OPME (Logística/Materiais)' },
  { id: 'pronto-socorro', nome: 'Pronto Socorro Geral' },
  { id: 'uti', nome: 'UTI Coronariana' },
  { id: 'ambulatorio', nome: 'Ambulatório' },
]

const MOCK_TRIAGENS = [
  {
    id: 'TR-101',
    dataHora: '23/06/2026 15:30',
    paciente: { nome: 'José Carlos de Souza', nascimento: '1965-04-12', cpf: '123.456.789-00', telefone: '(63) 98452-1122', nomeMae: 'Maria das Dores de Souza', temDependente: true, nomeDependente: 'Antônia de Souza', parentesco: 'Cônjuge', telDependente: '(63) 98452-1123' },
    queixa: 'Dor torácica irradiando para o braço esquerdo, sudorese fria há cerca de 30 minutos.',
    sinaisVitais: { PA: '140/90', FC: 98, Temp: '36.5', Sat: 94 },
    prioridade: PRIORIDADES_MANCHESTER[0],
    destino: SETORES_DESTINO[0],
    status: 'Encaminhado',
  },
  {
    id: 'TR-102',
    dataHora: '23/06/2026 15:45',
    paciente: { nome: 'Mariana Lima Ferreira', nascimento: '1988-09-28', cpf: '987.654.321-11', telefone: '(63) 99211-4455', nomeMae: 'Tereza Lima Ferreira', temDependente: false },
    queixa: 'Palpitações, falta de ar leve e ansiedade. Histórico de arritmia.',
    sinaisVitais: { PA: '130/80', FC: 110, Temp: '36.7', Sat: 97 },
    prioridade: PRIORIDADES_MANCHESTER[1],
    destino: SETORES_DESTINO[0],
    status: 'Aguardando',
  },
  {
    id: 'TR-103',
    dataHora: '23/06/2026 16:00',
    paciente: { nome: 'Carlos Eduardo Santos', nascimento: '1990-11-05', cpf: '456.789.123-22', telefone: '(63) 98877-6655', nomeMae: 'Ana Santos', temDependente: true, nomeDependente: 'Bernardo Santos', parentesco: 'Filho', telDependente: '(63) 98877-6655' },
    queixa: 'Paciente encaminhado para cirurgia eletiva programada no Centro Cirúrgico.',
    sinaisVitais: { PA: '120/80', FC: 72, Temp: '36.2', Sat: 99 },
    prioridade: PRIORIDADES_MANCHESTER[3],
    destino: SETORES_DESTINO[1],
    status: 'Encaminhado',
  },
]

const emptyPacienteForm = {
  nome: '', cpf: '', nascimento: '', telefone: '', nomeMae: '',
  temDependente: false, nomeDependente: '', parentesco: '', telDependente: '',
  queixa: '', pa: '', fc: '', temp: '', sat: '',
  prioridadeId: PRIORIDADES_MANCHESTER[2].id,
  destinoId: SETORES_DESTINO[0].id,
}

export default function ProntoSocorro() {
  const [triagens, setTriagens] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : MOCK_TRIAGENS
    } catch {
      return MOCK_TRIAGENS
    }
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [filterPrioridade, setFilterPrioridade] = useState('')
  const [filterDestino, setFilterDestino] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [form, setForm] = useState(emptyPacienteForm)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(triagens))
  }, [triagens])

  const set = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))
  const clearForm = () => setForm(emptyPacienteForm)

  const handleSalvarTriagem = (e) => {
    e.preventDefault()
    if (!form.nome.trim() || !form.queixa.trim()) {
      alert('Por favor, preencha o nome do paciente e a queixa principal.')
      return
    }
    const prioridadeObj = PRIORIDADES_MANCHESTER.find((p) => p.id === form.prioridadeId)
    const destinoObj = SETORES_DESTINO.find((d) => d.id === form.destinoId)

    const novaTriagem = {
      id: `TR-${Math.floor(Math.random() * 900) + 100}`,
      dataHora: new Date().toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      paciente: {
        nome: form.nome,
        nascimento: form.nascimento,
        cpf: form.cpf,
        telefone: form.telefone,
        nomeMae: form.nomeMae,
        temDependente: form.temDependente,
        nomeDependente: form.temDependente ? form.nomeDependente : '',
        parentesco: form.temDependente ? form.parentesco : '',
        telDependente: form.temDependente ? form.telDependente : '',
      },
      queixa: form.queixa,
      sinaisVitais: { PA: form.pa || 'N/A', FC: form.fc || 'N/A', Temp: form.temp || 'N/A', Sat: form.sat || 'N/A' },
      prioridade: prioridadeObj,
      destino: destinoObj,
      status: 'Aguardando',
    }
    setTriagens((prev) => [novaTriagem, ...prev])
    setShowForm(false)
    clearForm()
  }

  const handleEncaminhar = (id) => setTriagens((prev) => prev.map((t) => (t.id === id ? { ...t, status: 'Encaminhado' } : t)))

  const handleRemover = (id) => {
    if (confirm('Tem certeza que deseja excluir esta triagem?')) {
      setTriagens((prev) => prev.filter((t) => t.id !== id))
    }
  }

  const filteredTriagens = useMemo(
    () =>
      triagens.filter((t) => {
        const matchesSearch =
          t.paciente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.paciente.cpf.includes(searchTerm) ||
          t.id.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesPrioridade = filterPrioridade ? t.prioridade.id === filterPrioridade : true
        const matchesDestino = filterDestino ? t.destino.id === filterDestino : true
        return matchesSearch && matchesPrioridade && matchesDestino
      }),
    [triagens, searchTerm, filterPrioridade, filterDestino]
  )

  const stats = useMemo(
    () => ({
      total: triagens.length,
      aguardando: triagens.filter((t) => t.status === 'Aguardando').length,
      encaminhados: triagens.filter((t) => t.status === 'Encaminhado').length,
      criticos: triagens.filter((t) => t.prioridade.id === 'emergencia' || t.prioridade.id === 'muito-urgente').length,
    }),
    [triagens]
  )

  return (
    <Box>
      {!showForm && <Breadcrumb />}

      {!showForm && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 2, mb: 4 }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ width: 40, height: 40, borderRadius: 2, backgroundColor: '#1976d2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PlaylistAdd sx={{ color: '#fff', fontSize: 22 }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b' }}>
                Pronto Socorro — Triagem Rápida
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#94a3b8', mt: 0.5, ml: 6.5 }}>
              Registro e encaminhamento de pacientes na chegada ao hospital.
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => {
              clearForm()
              setShowForm(true)
            }}
          >
            Nova Triagem Rápida
          </Button>
        </Box>
      )}

      {!showForm && (
        <Grid container spacing={2.5} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <DashboardCard title="Triados Hoje" value={stats.total} icon={PlaylistAdd} color="#1976d2" bgColor="#e3f2fd" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <DashboardCard title="Aguardando Setor" value={stats.aguardando} icon={PersonOutlined} color="#ff9800" bgColor="#fff3e0" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <DashboardCard title="Encaminhados" value={stats.encaminhados} icon={HowToReg} color="#4caf50" bgColor="#e8f5e9" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <DashboardCard title="Casos Críticos" value={stats.criticos} icon={WarningAmber} color="#f44336" bgColor="#ffebee" />
          </Grid>
        </Grid>
      )}

      {showForm ? (
        <Box sx={{ backgroundColor: '#fff', borderRadius: 3, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <Box sx={{ backgroundColor: '#1976d2', px: 3, py: 2.5, color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>Ficha de Triagem Rápida</Typography>
              <Typography variant="caption" sx={{ opacity: 0.85 }}>Preencha os dados abaixo com queixas e classificação de risco.</Typography>
            </Box>
            <IconButton onClick={() => setShowForm(false)} sx={{ color: '#fff' }}>
              <Close />
            </IconButton>
          </Box>

          <Box component="form" onSubmit={handleSalvarTriagem} sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <FormSection title="1. Identificação do Paciente">
              <Grid container spacing={2.5}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField label="Nome Completo *" fullWidth size="small" value={form.nome} onChange={(e) => set('nome', e.target.value)} />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField label="CPF" fullWidth size="small" placeholder="000.000.000-00" value={form.cpf} onChange={(e) => set('cpf', e.target.value)} />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField label="Data de Nascimento" type="date" fullWidth size="small" value={form.nascimento} onChange={(e) => set('nascimento', e.target.value)} InputLabelProps={{ shrink: true }} />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField label="Telefone de Contato" fullWidth size="small" value={form.telefone} onChange={(e) => set('telefone', e.target.value)} />
                </Grid>
                <Grid size={{ xs: 12, md: 8 }}>
                  <TextField label="Nome da Mãe" fullWidth size="small" value={form.nomeMae} onChange={(e) => set('nomeMae', e.target.value)} />
                </Grid>
              </Grid>
            </FormSection>

            <FormSection
              title="2. Informações de Acompanhante / Dependente"
              action={
                <FormControlLabel
                  control={<Checkbox checked={form.temDependente} onChange={(e) => set('temDependente', e.target.checked)} size="small" />}
                  label="Tem Acompanhante / Dependente?"
                />
              }
            >
              {form.temDependente && (
                <Grid container spacing={2.5}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField label="Nome do Acompanhante" fullWidth size="small" value={form.nomeDependente} onChange={(e) => set('nomeDependente', e.target.value)} />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField label="Grau de Parentesco" fullWidth size="small" value={form.parentesco} onChange={(e) => set('parentesco', e.target.value)} />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField label="Telefone do Acompanhante" fullWidth size="small" value={form.telDependente} onChange={(e) => set('telDependente', e.target.value)} />
                  </Grid>
                </Grid>
              )}
            </FormSection>

            <FormSection title="3. Dados Clínicos e Queixa Principal">
              <Grid container spacing={2.5}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="Queixa Principal / O que está sentindo *"
                    fullWidth
                    multiline
                    rows={3}
                    size="small"
                    value={form.queixa}
                    onChange={(e) => set('queixa', e.target.value)}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <TextField label="Pressão Arterial (PA)" fullWidth size="small" placeholder="Ex: 120/80" value={form.pa} onChange={(e) => set('pa', e.target.value)} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <TextField label="Frequência Cardíaca (FC)" type="number" fullWidth size="small" value={form.fc} onChange={(e) => set('fc', e.target.value)} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <TextField label="Temperatura" fullWidth size="small" placeholder="Ex: 36.5" value={form.temp} onChange={(e) => set('temp', e.target.value)} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <TextField label="Saturação de O2 (%)" type="number" fullWidth size="small" value={form.sat} onChange={(e) => set('sat', e.target.value)} />
                </Grid>
              </Grid>
            </FormSection>

            <FormSection title="4. Classificação de Risco (Protocolo Manchester)">
              <Grid container spacing={2}>
                {PRIORIDADES_MANCHESTER.map((p) => {
                  const isSelected = form.prioridadeId === p.id
                  return (
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }} key={p.id}>
                      <Box
                        component="button"
                        type="button"
                        onClick={() => set('prioridadeId', p.id)}
                        sx={{
                          width: '100%',
                          textAlign: 'left',
                          borderRadius: 3,
                          border: isSelected ? `2px solid ${p.color}` : '1px solid #e2e8f0',
                          backgroundColor: '#fff',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                          p: 0,
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <Box sx={{ backgroundColor: p.color, color: p.id === 'urgente' ? '#1e293b' : '#fff', px: 1.5, py: 0.8, fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>
                          {p.nome}
                        </Box>
                        <Box sx={{ p: 1.5 }}>
                          <Typography sx={{ fontSize: '0.7rem', color: '#64748b' }}>{p.desc}</Typography>
                          <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: '#475569', mt: 1, pt: 1, borderTop: '1px solid #f1f5f9' }}>
                            Tempo: {p.tempo}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  )
                })}
              </Grid>
            </FormSection>

            <FormSection title="5. Destino de Encaminhamento">
              <Grid container spacing={2.5}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField select label="Setor de Destino *" fullWidth size="small" value={form.destinoId} onChange={(e) => set('destinoId', e.target.value)}>
                    {SETORES_DESTINO.map((s) => (
                      <MenuItem key={s.id} value={s.id}>{s.nome}</MenuItem>
                    ))}
                  </TextField>
                  <Typography variant="caption" sx={{ color: '#94a3b8', mt: 0.5, display: 'block' }}>
                    O paciente será cadastrado e direcionado ao setor de destino selecionado.
                  </Typography>
                </Grid>
              </Grid>
            </FormSection>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5, pt: 2, borderTop: '1px solid #f1f5f9' }}>
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
              <Button type="submit" variant="contained" startIcon={<HowToReg />}>
                Salvar e Triar Paciente
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box>
          <Box sx={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: 2, p: 2, mb: 2.5, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <TextField
              size="small"
              placeholder="Pesquisar por paciente, CPF ou código..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ flex: 1, minWidth: 240 }}
              InputProps={{ startAdornment: <InputAdornment position="start"><Search sx={{ fontSize: 20, color: '#94a3b8' }} /></InputAdornment> }}
            />
            <TextField select size="small" label="Prioridade" value={filterPrioridade} onChange={(e) => setFilterPrioridade(e.target.value)} sx={{ minWidth: 180 }}>
              <MenuItem value="">Todas as Prioridades</MenuItem>
              {PRIORIDADES_MANCHESTER.map((p) => (
                <MenuItem key={p.id} value={p.id}>{p.nome}</MenuItem>
              ))}
            </TextField>
            <TextField select size="small" label="Setor" value={filterDestino} onChange={(e) => setFilterDestino(e.target.value)} sx={{ minWidth: 180 }}>
              <MenuItem value="">Todos os Setores</MenuItem>
              {SETORES_DESTINO.map((s) => (
                <MenuItem key={s.id} value={s.id}>{s.nome}</MenuItem>
              ))}
            </TextField>
            {(searchTerm || filterPrioridade || filterDestino) && (
              <Button
                variant="text"
                onClick={() => {
                  setSearchTerm('')
                  setFilterPrioridade('')
                  setFilterDestino('')
                }}
              >
                Limpar Filtros
              </Button>
            )}
          </Box>

          <DataTable
            columns={[
              { field: 'id', headerName: 'Código' },
              { field: 'dataHora', headerName: 'Data/Hora' },
              {
                field: 'paciente',
                headerName: 'Paciente',
                render: (value) => (
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>{value.nome}</Typography>
                    <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>
                      CPF: {value.cpf || 'N/A'} • Nasc: {value.nascimento ? formatDate(`${value.nascimento}T00:00:00`) : 'N/A'}
                    </Typography>
                    {value.temDependente && (
                      <Typography variant="caption" sx={{ color: '#1976d2' }}>
                        Acompanhante: {value.nomeDependente} ({value.parentesco})
                      </Typography>
                    )}
                  </Box>
                ),
              },
              {
                field: 'queixa',
                headerName: 'Queixa / Sinais Vitais',
                render: (value, row) => (
                  <Box sx={{ maxWidth: 200 }}>
                    <Typography variant="body2" noWrap title={value}>{value}</Typography>
                    <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                      PA: {row.sinaisVitais.PA} • FC: {row.sinaisVitais.FC} bpm • T: {row.sinaisVitais.Temp}°C
                    </Typography>
                  </Box>
                ),
              },
              {
                field: 'prioridade',
                headerName: 'Classificação',
                render: (value) => (
                  <Chip
                    label={value.nome}
                    size="small"
                    sx={{
                      backgroundColor: `${value.color}22`,
                      color: value.color,
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      border: `1px solid ${value.color}55`,
                    }}
                  />
                ),
              },
              { field: 'destino', headerName: 'Setor de Destino', render: (value) => value.nome },
              { field: 'status', headerName: 'Status', render: (value) => <Badge label={value} color={value === 'Encaminhado' ? 'success' : 'warning'} /> },
            ]}
            rows={filteredTriagens}
            onView={(row) => setSelectedTicket(row)}
            onEdit={(row) => row.status === 'Aguardando' && handleEncaminhar(row.id)}
            onDelete={(row) => handleRemover(row.id)}
          />

          {filteredTriagens.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 6, backgroundColor: '#fff', borderRadius: 2, border: '1px solid #e2e8f0', mt: 2 }}>
              <PlaylistAdd sx={{ fontSize: 48, color: '#cbd5e1', mb: 1 }} />
              <Typography sx={{ color: '#64748b', fontWeight: 600 }}>Nenhuma triagem encontrada.</Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8' }}>Experimente mudar os filtros ou adicione uma nova triagem.</Typography>
            </Box>
          )}
        </Box>
      )}

      <Dialog open={!!selectedTicket} onClose={() => setSelectedTicket(null)} maxWidth="xs" fullWidth>
        {selectedTicket && (
          <>
            <DialogContent sx={{ p: 0 }}>
              <Box sx={{ position: 'relative', p: 3, fontFamily: 'monospace', fontSize: '0.75rem' }}>
                <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, backgroundColor: selectedTicket.prioridade.color }} />
                <Box sx={{ textAlign: 'center', borderBottom: '1px solid #e2e8f0', pb: 1.5, mb: 1.5, mt: 1 }}>
                  <Typography sx={{ fontWeight: 700, letterSpacing: 1, fontFamily: 'inherit' }}>HOSPITAL GERAL DE PALMAS</Typography>
                  <Typography variant="caption" sx={{ color: '#94a3b8' }}>ESTADO DO TOCANTINS</Typography>
                  <Box>
                    <Badge label={selectedTicket.id} color="primary" />
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Typography sx={{ fontFamily: 'inherit', fontSize: 'inherit' }}><b>DATA/HORA:</b> {selectedTicket.dataHora}</Typography>
                  <Typography sx={{ fontFamily: 'inherit', fontSize: 'inherit' }}><b>PACIENTE:</b> {selectedTicket.paciente.nome}</Typography>
                  <Typography sx={{ fontFamily: 'inherit', fontSize: 'inherit' }}><b>CPF:</b> {selectedTicket.paciente.cpf || 'N/A'}</Typography>
                  <Typography sx={{ fontFamily: 'inherit', fontSize: 'inherit' }}>
                    <b>NASC.:</b> {selectedTicket.paciente.nascimento ? formatDate(`${selectedTicket.paciente.nascimento}T00:00:00`) : 'N/A'}
                  </Typography>

                  {selectedTicket.paciente.temDependente && (
                    <Box sx={{ borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', py: 1, my: 1 }}>
                      <Typography sx={{ fontFamily: 'inherit', fontSize: 'inherit' }}><b>ACOMPANHANTE:</b> {selectedTicket.paciente.nomeDependente}</Typography>
                      <Typography sx={{ fontFamily: 'inherit', fontSize: 'inherit' }}><b>PARENTESCO:</b> {selectedTicket.paciente.parentesco}</Typography>
                      <Typography sx={{ fontFamily: 'inherit', fontSize: 'inherit' }}><b>TEL ACOMP.:</b> {selectedTicket.paciente.telDependente || 'N/A'}</Typography>
                    </Box>
                  )}

                  <Typography sx={{ fontFamily: 'inherit', fontSize: 'inherit' }}><b>QUEIXA:</b> {selectedTicket.queixa}</Typography>

                  <Box sx={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 1, p: 1, display: 'flex', justifyContent: 'space-between', gap: 1, fontWeight: 700, fontSize: '0.65rem', mt: 0.5 }}>
                    <span>PA: {selectedTicket.sinaisVitais.PA}</span>
                    <span>FC: {selectedTicket.sinaisVitais.FC} bpm</span>
                    <span>TEMP: {selectedTicket.sinaisVitais.Temp}°C</span>
                    <span>SAT: {selectedTicket.sinaisVitais.Sat}%</span>
                  </Box>

                  <Box sx={{ borderTop: '1px solid #e2e8f0', pt: 1, mt: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="caption" sx={{ color: '#94a3b8', textTransform: 'uppercase' }}>Classificação</Typography>
                      <Typography sx={{ fontWeight: 800, fontFamily: 'inherit', color: selectedTicket.prioridade.color }}>{selectedTicket.prioridade.nome}</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="caption" sx={{ color: '#94a3b8', textTransform: 'uppercase' }}>Tempo Limite</Typography>
                      <Typography sx={{ fontWeight: 700, fontFamily: 'inherit' }}>{selectedTicket.prioridade.tempo}</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ backgroundColor: '#1976d2', color: '#fff', borderRadius: 2, textAlign: 'center', p: 1, mt: 1.5 }}>
                    <Typography variant="caption" sx={{ opacity: 0.85, textTransform: 'uppercase', fontFamily: 'sans-serif' }}>Setor de Destino</Typography>
                    <Typography sx={{ fontWeight: 700, fontFamily: 'sans-serif' }}>{selectedTicket.destino.nome}</Typography>
                  </Box>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button variant="outlined" color="inherit" onClick={() => setSelectedTicket(null)}>Fechar</Button>
              <Button variant="contained" startIcon={<Print />} onClick={() => window.print()}>Imprimir Ticket</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  )
}

function FormSection({ title, action, children }) {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', pb: 1, mb: 2.5 }}>
        <Typography variant="overline" sx={{ fontWeight: 700, color: '#1976d2' }}>
          {title}
        </Typography>
        {action}
      </Box>
      {children}
    </Box>
  )
}
