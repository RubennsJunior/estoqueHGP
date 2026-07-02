import { Snackbar, Alert } from '@mui/material'

export default function Toast({ open, message, severity, onClose, autoHideDuration }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration || 4000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        onClose={onClose}
        severity={severity || 'success'}
        variant="filled"
        sx={{ width: '100%', borderRadius: 2, fontWeight: 500 }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}
