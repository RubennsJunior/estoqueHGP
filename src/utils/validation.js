import * as yup from 'yup'

export const loginSchema = yup.object().shape({
  username: yup.string().required('Usuário é obrigatório'),
  password: yup.string().required('Senha é obrigatória'),
})

export const changePasswordSchema = yup.object().shape({
  currentPassword: yup.string().required('Senha atual é obrigatória'),
  newPassword: yup
    .string()
    .min(6, 'Mínimo de 6 caracteres')
    .required('Nova senha é obrigatória'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Senhas não conferem')
    .required('Confirmação é obrigatória'),
})

export const empresaSchema = yup.object().shape({
  nome: yup.string().required('Nome é obrigatório'),
  cnpj: yup.string().min(14, 'CNPJ inválido').required('CNPJ é obrigatório'),
})

export const productSchema = yup.object().shape({
  nome: yup.string().required('Nome é obrigatório'),
  categoria: yup.string().required('Categoria é obrigatória'),
  fabricante: yup.string().required('Fabricante é obrigatório'),
  fornecedor: yup.string().required('Fornecedor é obrigatório'),
  quantidade: yup.number().min(0, 'Quantidade inválida').required('Quantidade é obrigatória'),
  lote: yup.string(),
  validade: yup.date(),
})
