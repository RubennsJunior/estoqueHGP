// Estrutura de menu restaurada do sistema HGP ERP original (acordeão, com Setores/Cadastro aninhados)
export const MENU_CONFIG = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: 'Dashboard',
    route: '/dashboard',
    children: [],
  },
  {
    id: 'entrada',
    name: 'Entrada',
    icon: 'DoorOpen',
    route: '/entrada',
    expandOnly: true,
    children: [
      { id: 'entrada/portaria', name: 'Portaria (Acessos)', icon: 'UserCheck', route: '/entrada/portaria', children: [] },
      { id: 'entrada/pronto-socorro', name: 'Pronto Socorro', icon: 'ClipboardPlus', route: '/entrada/pronto-socorro', children: [] },
    ],
  },
  {
    id: 'setores',
    name: 'Setores',
    icon: 'FolderOpen',
    route: '/setores',
    expandOnly: true,
    children: [
      {
        id: 'setores/hemodinamica',
        name: 'Hemodinâmica',
        icon: 'Activity',
        route: '/hemodinamica',
        children: [
          { id: 'setores/hemodinamica/triagem', name: 'Triagem', icon: 'ClipboardList', route: '/hemodinamica/triagem', children: [] },
          { id: 'setores/hemodinamica/agendamento', name: 'Agendamento', icon: 'CalendarDays', route: '/hemodinamica/agendamento', children: [] },
          { id: 'setores/hemodinamica/pre-procedimento', name: 'Pré-Procedimento', icon: 'FileCheck', route: '/hemodinamica/pre-procedimento', children: [] },
          { id: 'setores/hemodinamica/sala-procedimentos', name: 'Sala de Procedimentos', icon: 'HeartPulse', route: '/hemodinamica/sala-procedimentos', children: [] },
          { id: 'setores/hemodinamica/recuperacao', name: 'Recuperação', icon: 'BedDouble', route: '/hemodinamica/recuperacao', children: [] },
          { id: 'setores/hemodinamica/laudos', name: 'Laudos', icon: 'FileText', route: '/hemodinamica/laudos', children: [] },
          { id: 'setores/hemodinamica/faturamento', name: 'Faturamento', icon: 'Receipt', route: '/hemodinamica/faturamento', children: [] },
        ],
      },
      {
        id: 'setores/centro-cirurgico',
        name: 'Centro Cirúrgico',
        icon: 'Stethoscope',
        route: '/centro-cirurgico',
        children: [
          { id: 'setores/centro-cirurgico/triagem', name: 'Triagem', icon: 'ClipboardList', route: '/centro-cirurgico/triagem', children: [] },
          { id: 'setores/centro-cirurgico/agendamento', name: 'Agendamento', icon: 'CalendarDays', route: '/centro-cirurgico/agendamento', children: [] },
          { id: 'setores/centro-cirurgico/pre-operatorio', name: 'Pré-Operatório', icon: 'ShieldCheck', route: '/centro-cirurgico/pre-operatorio', children: [] },
          { id: 'setores/centro-cirurgico/sala-cirurgica', name: 'Sala Cirúrgica', icon: 'Scissors', route: '/centro-cirurgico/sala-cirurgica', children: [] },
          { id: 'setores/centro-cirurgico/rpa', name: 'RPA', icon: 'BedDouble', route: '/centro-cirurgico/rpa', children: [] },
          { id: 'setores/centro-cirurgico/cme', name: 'CME', icon: 'PackageCheck', route: '/centro-cirurgico/cme', children: [] },
          { id: 'setores/centro-cirurgico/alta', name: 'Alta', icon: 'DoorOpen', route: '/centro-cirurgico/alta', children: [] },
          { id: 'setores/centro-cirurgico/faturamento', name: 'Faturamento', icon: 'Receipt', route: '/centro-cirurgico/faturamento', children: [] },
        ],
      },
      {
        id: 'setores/opme',
        name: 'OPME',
        icon: 'Boxes',
        route: '/opme',
        children: [
          { id: 'setores/opme/solicitacao', name: 'Solicitação', icon: 'FilePlus', route: '/opme/solicitacao', children: [] },
          { id: 'setores/opme/cotacao', name: 'Cotação', icon: 'BadgeDollarSign', route: '/opme/cotacao', children: [] },
          { id: 'setores/opme/autorizacao', name: 'Autorização', icon: 'CheckCircle2', route: '/opme/autorizacao', children: [] },
          { id: 'setores/opme/compras', name: 'Compras', icon: 'ShoppingCart', route: '/opme/compras', children: [] },
          { id: 'setores/opme/recebimento', name: 'Recebimento', icon: 'Truck', route: '/opme/recebimento', children: [] },
          { id: 'setores/opme/estoque', name: 'Estoque', icon: 'Warehouse', route: '/opme/estoque', children: [] },
          { id: 'setores/opme/separacao', name: 'Separação', icon: 'Package', route: '/opme/separacao', children: [] },
          { id: 'setores/opme/expedicao', name: 'Expedição', icon: 'Send', route: '/opme/expedicao', children: [] },
          { id: 'setores/opme/devolucao', name: 'Devolução', icon: 'RotateCcw', route: '/opme/devolucao', children: [] },
          { id: 'setores/opme/rastreabilidade', name: 'Rastreabilidade', icon: 'ScanSearch', route: '/opme/rastreabilidade', children: [] },
          { id: 'setores/opme/prestacao-contas', name: 'Prestação de Contas', icon: 'BarChart3', route: '/opme/prestacao-contas', children: [] },
        ],
      },
    ],
  },
  {
    id: 'cadastro',
    name: 'Cadastro',
    icon: 'BookUser',
    route: '/cadastro',
    expandOnly: true,
    children: [
      {
        id: 'cadastro/principal',
        name: 'Principal',
        icon: 'UserCheck',
        route: '/cadastro/principal',
        expandOnly: true,
        children: [
          { id: 'cadastro/principal/paciente', name: 'Paciente', icon: 'User', route: '/cadastro/paciente', children: [] },
          { id: 'cadastro/principal/fornecedor', name: 'Fornecedor', icon: 'Truck', route: '/cadastro/fornecedor', children: [] },
          { id: 'cadastro/principal/transportadora', name: 'Transportadora', icon: 'Send', route: '/cadastro/transportadora', children: [] },
          { id: 'cadastro/principal/funcionario', name: 'Funcionário', icon: 'Users', route: '/cadastro/funcionario', children: [] },
        ],
      },
      {
        id: 'cadastro/estoque',
        name: 'Estoque',
        icon: 'Boxes',
        route: '/cadastro/estoque',
        expandOnly: true,
        children: [
          { id: 'cadastro/estoque/produto', name: 'Produto', icon: 'Package', route: '/cadastro/estoque/produto', children: [] },
          { id: 'cadastro/estoque/classe', name: 'Classe', icon: 'ClipboardList', route: '/cadastro/estoque/classe', children: [] },
          { id: 'cadastro/estoque/grupo', name: 'Grupo', icon: 'FolderOpen', route: '/cadastro/estoque/grupo', children: [] },
          { id: 'cadastro/estoque/subgrupo', name: 'SubGrupo', icon: 'FolderOpen', route: '/cadastro/estoque/subgrupo', children: [] },
          { id: 'cadastro/estoque/fabricante', name: 'Fabricante', icon: 'Settings', route: '/cadastro/estoque/fabricante', children: [] },
          { id: 'cadastro/estoque/unidade', name: 'Unidade', icon: 'Boxes', route: '/cadastro/estoque/unidade', children: [] },
          { id: 'cadastro/estoque/etiquetas', name: 'Etiquetas', icon: 'FileText', route: '/cadastro/estoque/etiquetas', children: [] },
          {
            id: 'cadastro/estoque/movimentacoes',
            name: 'Movimentações',
            icon: 'RotateCcw',
            route: '/cadastro/estoque/movimentacoes',
            expandOnly: true,
            children: [
              { id: 'cadastro/estoque/movimentacoes/acerto', name: 'Acerto de Estoque', icon: 'FileCheck', route: '/cadastro/estoque/movimentacoes/acerto', children: [] },
            ],
          },
        ],
      },
      {
        id: 'cadastro/financeiro',
        name: 'Financeiro',
        icon: 'DollarSign',
        route: '/cadastro/financeiro',
        expandOnly: true,
        children: [
          { id: 'cadastro/financeiro/centro-custo', name: 'Centro de Custo', icon: 'BarChart3', route: '/cadastro/financeiro/centro-custo', children: [] },
          { id: 'cadastro/financeiro/plano-contas', name: 'Plano de Contas', icon: 'Receipt', route: '/cadastro/financeiro/plano-contas', children: [] },
          { id: 'cadastro/financeiro/sub-plano', name: 'Sub-Plano de Contas', icon: 'Receipt', route: '/cadastro/financeiro/sub-plano', children: [] },
          { id: 'cadastro/financeiro/contas', name: 'Contas', icon: 'BadgeDollarSign', route: '/cadastro/financeiro/contas', children: [] },
        ],
      },
      {
        id: 'cadastro/fiscal',
        name: 'Fiscal',
        icon: 'FileText',
        route: '/cadastro/fiscal',
        expandOnly: true,
        children: [
          { id: 'cadastro/fiscal/operacoes', name: 'Operações', icon: 'Settings', route: '/cadastro/fiscal/operacoes', children: [] },
          { id: 'cadastro/fiscal/cfop', name: 'CFOP', icon: 'FileCheck', route: '/cadastro/fiscal/cfop', children: [] },
          { id: 'cadastro/fiscal/tributacao', name: 'Tributação', icon: 'BadgeDollarSign', route: '/cadastro/fiscal/tributacao', children: [] },
        ],
      },
      {
        id: 'cadastro/usuario',
        name: 'Usuário',
        icon: 'User',
        route: '/cadastro/usuario',
        expandOnly: true,
        children: [
          { id: 'cadastro/usuario/cadastro', name: 'Cadastro', icon: 'BookUser', route: '/cadastro/usuario/cadastro', children: [] },
        ],
      },
    ],
  },
  {
    id: 'relatorios',
    name: 'Relatórios',
    icon: 'BarChart2',
    route: '/relatorios',
    expandOnly: true,
    children: [
      { id: 'relatorios/consumo-paciente', name: 'Consumo por paciente', icon: 'User', route: '/relatorios/consumo-paciente', children: [] },
      { id: 'relatorios/consumo-setor', name: 'Consumo por setor', icon: 'Activity', route: '/relatorios/consumo-setor', children: [] },
      { id: 'relatorios/procedimentos', name: 'Procedimentos realizados', icon: 'HeartPulse', route: '/relatorios/procedimentos', children: [] },
      { id: 'relatorios/estoque-minimo', name: 'Estoque mínimo', icon: 'Alert', route: '/relatorios/estoque-minimo', children: [] },
      { id: 'relatorios/materiais-vencendo', name: 'Materiais vencendo', icon: 'CalendarDays', route: '/relatorios/materiais-vencendo', children: [] },
      { id: 'relatorios/kpis', name: 'Indicadores (KPIs)', icon: 'BarChart3', route: '/relatorios/kpis', children: [] },
    ],
  },
  {
    id: 'sistema',
    name: 'Sistema',
    icon: 'Settings',
    route: '/sistema',
    expandOnly: true,
    children: [
      {
        id: 'sistema/configuracao',
        name: 'Configuração',
        icon: 'Settings',
        route: '/sistema/configuracao',
        expandOnly: true,
        children: [
          { id: 'sistema/configuracao/empresa', name: 'Empresa', icon: 'Warehouse', route: '/sistema/configuracao/empresa', children: [] },
          { id: 'sistema/configuracao/fiscal', name: 'Fiscal', icon: 'FileText', route: '/sistema/configuracao/fiscal', children: [] },
          { id: 'sistema/configuracao/financeiro', name: 'Financeiro', icon: 'DollarSign', route: '/sistema/configuracao/financeiro', children: [] },
        ],
      },
    ],
  },
]

// Encontra um item do menu pela rota (busca recursiva)
export const findMenuItemByRoute = (route) => {
  const search = (items) => {
    for (const item of items) {
      if (item.route === route) return item
      if (item.children?.length) {
        const found = search(item.children)
        if (found) return found
      }
    }
    return null
  }
  return search(MENU_CONFIG)
}

// Lista plana de todas as rotas presentes no menu (para gerar as <Route> automaticamente)
export const flattenMenuRoutes = (items = MENU_CONFIG) => {
  const result = []
  const walk = (list) => {
    for (const item of list) {
      if (item.route) result.push({ id: item.id, route: item.route, name: item.name })
      if (item.children?.length) walk(item.children)
    }
  }
  walk(items)
  return result
}

// Resolve título/subtítulo (trilha de breadcrumb) de uma rota
export const resolvePageInfo = (route) => {
  const search = (items, parentPath = []) => {
    for (const item of items) {
      const currentPath = [...parentPath, item.name]
      if (item.route === route) {
        const subtitle = currentPath.length > 1 ? currentPath.join(' › ') : `Módulo ${item.name}`
        return { title: item.name, subtitle, path: currentPath }
      }
      if (item.children?.length) {
        const found = search(item.children, currentPath)
        if (found) return found
      }
    }
    return null
  }
  return search(MENU_CONFIG) || { title: route, subtitle: null, path: [] }
}
