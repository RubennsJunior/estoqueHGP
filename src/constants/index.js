export const SIDEBAR_MENU = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'BiGridAlt',
    path: '/dashboard',
  },
  {
    id: 'hemodinamica',
    label: 'Hemodinâmica',
    icon: 'BiHeart',
    path: '/hemodinamica',
  },
  {
    id: 'centrocirurgico',
    label: 'Centro Cirúrgico',
    icon: 'BiHealth',
    path: '/centro-cirurgico',
  },
  {
    id: 'opme',
    label: 'OPME',
    icon: 'BiPulse',
    path: '/opme',
  },
  {
    id: 'relatorios',
    label: 'Relatórios',
    icon: 'BiBarChartAlt2',
    path: '/relatorios',
  },
  {
    id: 'gestao',
    label: 'Gestão',
    icon: 'BiCog',
    path: '/gestao',
  },
  {
    id: 'sistema',
    label: 'Sistema',
    icon: 'BiShield',
    path: '/sistema',
  },
]

export const MOCK_COMPANIES = [
  { id: 1, nome: 'Hospital São Lucas', cnpj: '00.000.000/0001-01' },
  { id: 2, nome: 'Hospital Regional', cnpj: '00.000.000/0001-02' },
  { id: 3, nome: 'Clínica Santa Maria', cnpj: '00.000.000/0001-03' },
]

export const MOCK_USER = {
  id: 1,
  nome: 'Dr. João Silva',
  email: 'joao.silva@hospital.com',
  avatar: null,
  perfil: 'Administrador',
}

export const DASHBOARD_STATS = {
  totalAtendimentos: 1847,
  totalTriagens: 892,
  totalConsultas: 1245,
  estoqueAtual: 34567,
  produtosEmFalta: 23,
  entradasDia: 156,
  saidasDia: 98,
  pacientesAtendidos: 452,
}

export const TRIAGENS_POR_SETOR = [
  { setor: 'Hemodinâmica', quantidade: 320 },
  { setor: 'Centro Cirúrgico', quantidade: 280 },
  { setor: 'OPME', quantidade: 292 },
]

export const CONSULTAS_POR_SETOR = [
  { setor: 'Hemodinâmica', quantidade: 450 },
  { setor: 'Centro Cirúrgico', quantidade: 380 },
  { setor: 'OPME', quantidade: 415 },
]

export const ATENDIMENTOS_GERAIS = [
  { name: 'Consultas', value: 1245 },
  { name: 'Triagens', value: 892 },
  { name: 'Atendimentos', value: 1847 },
]

export const EVOLUCAO_MENSAL = [
  { mes: 'Jan', consultas: 180, triagens: 120, atendimentos: 250 },
  { mes: 'Fev', consultas: 200, triagens: 140, atendimentos: 280 },
  { mes: 'Mar', consultas: 210, triagens: 150, atendimentos: 300 },
  { mes: 'Abr', consultas: 190, triagens: 130, atendimentos: 270 },
  { mes: 'Mai', consultas: 220, triagens: 160, atendimentos: 310 },
  { mes: 'Jun', consultas: 245, triagens: 180, atendimentos: 350 },
  { mes: 'Jul', consultas: 230, triagens: 170, atendimentos: 330 },
  { mes: 'Ago', consultas: 250, triagens: 190, atendimentos: 360 },
  { mes: 'Set', consultas: 240, triagens: 175, atendimentos: 345 },
  { mes: 'Out', consultas: 260, triagens: 200, atendimentos: 380 },
  { mes: 'Nov', consultas: 275, triagens: 210, atendimentos: 400 },
  { mes: 'Dez', consultas: 300, triagens: 230, atendimentos: 430 },
]

export const ENTRADAS_SAIDAS = [
  { mes: 'Jan', entradas: 500, saidas: 400 },
  { mes: 'Fev', entradas: 550, saidas: 420 },
  { mes: 'Mar', entradas: 600, saidas: 450 },
  { mes: 'Abr', entradas: 480, saidas: 430 },
  { mes: 'Mai', entradas: 620, saidas: 500 },
  { mes: 'Jun', entradas: 700, saidas: 550 },
  { mes: 'Jul', entradas: 650, saidas: 520 },
  { mes: 'Ago', entradas: 720, saidas: 580 },
  { mes: 'Set', entradas: 680, saidas: 540 },
  { mes: 'Out', entradas: 750, saidas: 600 },
  { mes: 'Nov', entradas: 800, saidas: 650 },
  { mes: 'Dez', entradas: 900, saidas: 720 },
]

export const PRODUTOS_MAIS_USADOS = [
  { produto: 'Cateter Balão', quantidade: 450 },
  { produto: 'Stent Coronário', quantidade: 380 },
  { produto: 'Fio Guia', quantidade: 350 },
  { produto: 'Seringa 20ml', quantidade: 720 },
  { produto: 'Luva Cirúrgica', quantidade: 1200 },
  { produto: 'Gaze Estéril', quantidade: 2100 },
  { produto: 'Solução Fisiológica', quantidade: 890 },
  { produto: 'Fio de Sutura', quantidade: 560 },
]

export const CORES_CARDS = {
  totalAtendimentos: { bg: '#e3f2fd', icon: '#1976d2', border: '#1976d2' },
  totalTriagens: { bg: '#f3e5f5', icon: '#7c4dff', border: '#7c4dff' },
  totalConsultas: { bg: '#e8f5e9', icon: '#4caf50', border: '#4caf50' },
  estoqueAtual: { bg: '#fff3e0', icon: '#ff9800', border: '#ff9800' },
  produtosEmFalta: { bg: '#ffebee', icon: '#f44336', border: '#f44336' },
  entradasDia: { bg: '#e0f7fa', icon: '#00acc1', border: '#00acc1' },
  saidasDia: { bg: '#fce4ec', icon: '#e91e63', border: '#e91e63' },
  pacientesAtendidos: { bg: '#e8eaf6', icon: '#3f51b5', border: '#3f51b5' },
}
