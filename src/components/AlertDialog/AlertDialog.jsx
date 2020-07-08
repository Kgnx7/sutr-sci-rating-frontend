import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

export default function AlertDialog({ open, onSubmit, handleClose, title, description }) {
  const handleSubmit = () => {
    handleClose()
    onSubmit()
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle id="alert-dialog-title">{title || 'Вы уверены?'}</DialogTitle>
      <DialogContent>
        {description && (
          <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Отмена
        </Button>
        <Button onClick={handleSubmit} color="secondary">
          Продолжить
        </Button>
      </DialogActions>
    </Dialog>
  )
}
