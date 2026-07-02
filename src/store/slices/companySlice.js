import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedCompany: null,
  companies: [],
  loading: false,
  error: null,
}

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompanies: (state, action) => {
      state.companies = action.payload
      if (!state.selectedCompany && action.payload.length > 0) {
        state.selectedCompany = action.payload[0]
      }
    },
    selectCompany: (state, action) => {
      state.selectedCompany = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const { setCompanies, selectCompany, setLoading, setError } = companySlice.actions
export default companySlice.reducer
