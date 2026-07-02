import { Box, Grid, Card, CardContent, Typography, Stack } from '@mui/material'
import {
  Business,
  People,
  Category,
  Inventory,
  LocalShipping,
  ShoppingCart,
  Assessment,
  Settings,
} from '@mui/icons-material'
import PageTitle from '../../components/common/PageTitle/PageTitle'
import Breadcrumb from '../../components/common/Breadcrumb/Breadcrumb'

const modules = [
  { id: 'empresas', label: 'Empresas', icon: Business, desc: 'Gerenciar empresas e filiais', color: '#1976d2' },
  { id: 'usuarios', label: 'Usuários', icon: People, desc: 'Gerenciar usuários do sistema', color: '#7c4dff' },
  { id: 'categorias', label: 'Categorias', icon: Category, desc: 'Categorias de produtos', color: '#4caf50' },
  { id: 'produtos', label: 'Produtos', icon: Inventory, desc: 'Cadastro de produtos', color: '#ff9800' },
  { id: 'fornecedores', label: 'Fornecedores', icon: LocalShipping, desc: 'Gerenciar fornecedores', color: '#00acc1' },
  { id: 'compras', label: 'Compras', icon: ShoppingCart, desc: 'Gestão de compras', color: '#e91e63' },
  { id: 'relatorios', label: 'Relatórios Gerenciais', icon: Assessment, desc: 'Relatórios de gestão', color: '#3f51b5' },
  { id: 'configuracoes', label: 'Configurações', icon: Settings, desc: 'Configurações do sistema', color: '#607d8b' },
]

export default function Gestao() {
  return (
    <Box>
      <Breadcrumb />
      <PageTitle title="Gestão" subtitle="Módulos administrativos do sistema" />

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
      </Grid>
    </Box>
  )
}
