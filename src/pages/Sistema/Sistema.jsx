import { Box, Grid, Card, CardContent, Typography, Stack, Chip, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import {
  Group,
  Shield,
  Key,
  History,
  Settings,
  Business,
  Storage,
  Description,
  CheckCircle,
  Cancel,
  AccessTime,
} from '@mui/icons-material'
import PageTitle from '../../components/common/PageTitle/PageTitle'
import Breadcrumb from '../../components/common/Breadcrumb/Breadcrumb'

const modules = [
  { id: 'usuarios', label: 'Usuários', icon: Group, desc: 'Gerenciar usuários do sistema', color: '#1976d2' },
  { id: 'perfis', label: 'Perfis', icon: Shield, desc: 'Gerenciar perfis de acesso', color: '#7c4dff' },
  { id: 'permissoes', label: 'Permissões', icon: Key, desc: 'Controle de permissões', color: '#4caf50' },
  { id: 'logs', label: 'Logs', icon: History, desc: 'Registros de atividades', color: '#ff9800' },
  { id: 'configuracoes', label: 'Configurações', icon: Settings, desc: 'Configurações gerais', color: '#607d8b' },
  { id: 'empresas', label: 'Empresas', icon: Business, desc: 'Gerenciar empresas', color: '#00acc1' },
  { id: 'backup', label: 'Backup', icon: Storage, desc: 'Backup e restauração', color: '#e91e63' },
  { id: 'auditoria', label: 'Auditoria', icon: Description, desc: 'Relatórios de auditoria', color: '#3f51b5' },
]

const recentActivities = [
  { action: 'Usuário admin realizou login', time: '10 min atrás', type: 'success' },
  { action: 'Nova empresa cadastrada: Hospital Regional', time: '1 hora atrás', type: 'info' },
  { action: 'Permissões atualizadas para perfil Médico', time: '2 horas atrás', type: 'warning' },
  { action: 'Backup automático realizado com sucesso', time: '3 horas atrás', type: 'success' },
  { action: 'Tentativa de login inválida para usuário teste', time: '5 horas atrás', type: 'error' },
]

const systemInfo = [
  { label: 'Versão', value: '1.0.0' },
  { label: 'Ambiente', value: 'Desenvolvimento' },
  { label: 'Banco de Dados', value: 'PostgreSQL 15' },
  { label: 'Node.js', value: '18.17.0' },
  { label: 'Último Deploy', value: '23/06/2026' },
  { label: 'Uptime', value: '15 dias 4h 32min' },
]

export default function Sistema() {
  return (
    <Box>
      <Breadcrumb />
      <PageTitle title="Sistema" subtitle="Administração e configurações do sistema" />

      <Grid container spacing={2.5}>
        {modules.map((mod) => {
          const Icon = mod.icon
          return (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={mod.id}>
              <Card
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Stack spacing={1.5} alignItems="center" textAlign="center">
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 2.5,
                        backgroundColor: `${mod.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon sx={{ color: mod.color, fontSize: 28 }} />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                        {mod.label}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                        {mod.desc}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          )
        })}

        <Grid size={{ xs: 12, md: 7 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#1e293b' }}>
                Atividades Recentes
              </Typography>
              <List dense>
                {recentActivities.map((activity, index) => (
                  <ListItem key={index} sx={{ px: 0, borderBottom: '1px solid #f1f5f9' }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      {activity.type === 'success' ? <CheckCircle sx={{ fontSize: 18, color: '#4caf50' }} /> :
                       activity.type === 'error' ? <Cancel sx={{ fontSize: 18, color: '#f44336' }} /> :
                       activity.type === 'warning' ? <AccessTime sx={{ fontSize: 18, color: '#ff9800' }} /> :
                       <AccessTime sx={{ fontSize: 18, color: '#1976d2' }} />}
                    </ListItemIcon>
                    <ListItemText
                      primary={activity.action}
                      secondary={activity.time}
                      primaryTypographyProps={{ variant: 'body2', sx: { color: '#475569' } }}
                      secondaryTypographyProps={{ variant: 'caption', sx: { color: '#94a3b8' } }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#1e293b' }}>
                Informações do Sistema
              </Typography>
              <Stack spacing={1.5}>
                {systemInfo.map((info) => (
                  <Box key={info.label} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ color: '#64748b' }}>
                      {info.label}
                    </Typography>
                    <Chip
                      label={info.value}
                      size="small"
                      variant="outlined"
                      sx={{ fontWeight: 500, fontSize: '0.75rem' }}
                    />
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
