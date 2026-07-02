import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  mode: 'light',
  sidebarOpen: false,
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
    },
    setTheme: (state, action) => {
      state.mode = action.payload
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload
    },
  },
})

export const { toggleTheme, setTheme, toggleSidebar, setSidebarOpen } = themeSlice.actions
export default themeSlice.reducer
