import { useContext } from 'react'
import { Box, Collapse, IconButton } from '@mui/material'
import { KeyboardArrowDown } from '@mui/icons-material'
import { getMenuIcon } from '../../../utils/menuIcons'
import { SidebarMenuContext } from './SidebarMenuContext'

export default function SidebarItem({ item, depth = 0 }) {
  const { openMenuIds, toggleAccordion, activePath, onNavigate } = useContext(SidebarMenuContext)
  const Icon = getMenuIcon(item.icon)

  const hasChildren = item.children && item.children.length > 0
  const isOpen = openMenuIds.includes(item.id)
  const isActive = activePath === item.route

  const handleToggle = (e) => {
    e.stopPropagation()
    if (hasChildren) {
      toggleAccordion(item.id)
    } else if (item.route) {
      onNavigate(item.route)
    }
  }

  const handleNameClick = () => {
    if (hasChildren && item.route && !item.expandOnly) {
      onNavigate(item.route)
    } else {
      handleToggle({ stopPropagation: () => {} })
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          borderRadius: 2,
          pl: `${12 + depth * 12}px`,
          color: isActive ? '#fff' : '#cbd5e1',
          backgroundColor: isActive ? '#1976d2' : 'transparent',
          '&:hover': {
            backgroundColor: isActive ? '#1976d2' : '#1e293b',
          },
          transition: 'background-color 0.15s ease',
        }}
      >
        <Box
          component="button"
          onClick={handleNameClick}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.25,
            flex: 1,
            minWidth: 0,
            py: 1.1,
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            color: 'inherit',
            font: 'inherit',
            textAlign: 'left',
          }}
        >
          <Icon sx={{ fontSize: 18, flexShrink: 0, opacity: 0.85 }} />
          <Box
            component="span"
            sx={{
              fontSize: '0.85rem',
              fontWeight: isActive ? 600 : 400,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {item.name}
          </Box>
        </Box>

        {hasChildren && (
          <IconButton
            onClick={handleToggle}
            size="small"
            sx={{ color: 'inherit', mr: 0.5 }}
            aria-label={isOpen ? 'Recolher' : 'Expandir'}
          >
            <KeyboardArrowDown
              sx={{
                fontSize: 18,
                transition: 'transform 0.2s ease',
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </IconButton>
        )}
      </Box>

      {hasChildren && (
        <Collapse in={isOpen} timeout={200} unmountOnExit>
          <Box sx={{ mt: 0.3, mb: 0.3, display: 'flex', flexDirection: 'column', gap: 0.3 }}>
            {item.children.map((child) => (
              <SidebarItem key={child.id} item={child} depth={depth + 1} />
            ))}
          </Box>
        </Collapse>
      )}
    </Box>
  )
}
