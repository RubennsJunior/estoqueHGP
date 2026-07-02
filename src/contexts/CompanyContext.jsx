import { createContext, useContext, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCompanies, selectCompany, setLoading } from '../store/slices/companySlice'
import { MOCK_COMPANIES } from '../constants'

const CompanyContext = createContext()

export function useCompany() {
  const context = useContext(CompanyContext)
  if (!context) throw new Error('useCompany must be used within CompanyProvider')
  return context
}

export function CompanyProvider({ children }) {
  const dispatch = useDispatch()
  const { selectedCompany, companies, loading } = useSelector((state) => state.company)

  useEffect(() => {
    dispatch(setLoading(true))
    setTimeout(() => {
      dispatch(setCompanies(MOCK_COMPANIES))
      dispatch(setLoading(false))
    }, 500)
  }, [dispatch])

  const changeCompany = useCallback((company) => {
    dispatch(selectCompany(company))
  }, [dispatch])

  return (
    <CompanyContext.Provider value={{ selectedCompany, companies, loading, changeCompany }}>
      {children}
    </CompanyContext.Provider>
  )
}
