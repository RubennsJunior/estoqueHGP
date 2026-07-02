export function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function formatNumber(value) {
  return new Intl.NumberFormat('pt-BR').format(value)
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(date))
}

export function formatDateTime(date) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(date))
}

export function formatCnpj(value) {
  return value?.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')
}

export function formatCpf(value) {
  return value?.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')
}

export function formatPhone(value) {
  return value?.replace(/^(\d{2})(\d{4,5})(\d{4})$/, '($1) $2-$3')
}

// Formata CPF ou CNPJ progressivamente enquanto o usuário digita
export function formatCpfCnpj(value) {
  const digits = value.replace(/\D/g, '')
  if (digits.length <= 11) {
    return digits
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  }
  return digits
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})$/, '$1-$2')
    .substring(0, 18)
}
