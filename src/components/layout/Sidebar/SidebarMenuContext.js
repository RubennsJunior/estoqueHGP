import { createContext } from 'react'

export const SidebarMenuContext = createContext({
  openMenuIds: [],
  toggleAccordion: () => {},
  activePath: '',
  onNavigate: () => {},
})
