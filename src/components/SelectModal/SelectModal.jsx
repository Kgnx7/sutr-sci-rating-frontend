import React, { useState, useRef } from 'react'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import debounce from '../../utils/debounce'
import { useField } from 'react-final-form'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

export default function SelectModal({ title, name, type, data, onSearch }) {
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectModal, setSelectModal] = useState(null)
  const [searchState, setSearchState] = useState('')
  const { input, meta } = useField(name)

  const handleDepartmentsSelectModelOpen = (event) => {
    event.preventDefault()
    setSelectModal(true)
  }
  const handleDepartmentsSelectModelClose = () => {
    setSelectModal(false)
  }

  const { onChange, value } = input
  const { error } = meta

  const handleSearchChangeDebounced = useRef(
    debounce((search) => {
      onSearch(search)
    }, 1000)
  ).current

  const handleSearchChange = (event) => {
    const value = event.target.value
    setSearchState(value)
    handleSearchChangeDebounced(value)
  }

  const handleSelectItem = (item) => {
    onChange(item.id)
    setSelectedItem(item)
    handleDepartmentsSelectModelClose()
  }

  return (
    <div>
      <Typography gutterBottom>
        {type === 'users'
          ? selectedItem && selectedItem.displayName
          : selectedItem && selectedItem.title}
      </Typography>

      <Typography variant="subtitle2" color="error">
        {error}
      </Typography>

      <Button onClick={handleDepartmentsSelectModelOpen} variant="contained" color="primary">
        {title}
      </Button>
      <Dialog
        open={selectModal}
        onClose={handleDepartmentsSelectModelClose}
        maxWidth="sm"
        fullWidth
      >
        {title && <DialogTitle>{title}</DialogTitle>}
        <DialogContent>
          <TextField
            value={searchState}
            autoFocus
            margin="dense"
            label="Поиск"
            fullWidth
            onChange={handleSearchChange}
          />

          <List component="nav">
            {Array.isArray(data) &&
              data.map((item) => (
                <ListItem button>
                  {type === 'users' && (
                    <ListItemText
                      primary={item.displayName}
                      secondary={item.academicRank}
                      onClick={() => handleSelectItem(item)}
                    />
                  )}
                  {/^(departments|faculties)$/.test(type) && (
                    <ListItemText
                      primary={item.short}
                      secondary={item.title}
                      onClick={() => handleSelectItem(item)}
                    />
                  )}
                  {type === 'specialties' && (
                    <ListItemText
                      primary={item.code}
                      secondary={item.title}
                      onClick={() => handleSelectItem(item)}
                    />
                  )}
                  {type === 'riaTypes' && (
                    <ListItemText
                      primary={item.title}
                      secondary={`${item.unit} - ${item.perUnit}`}
                      onClick={() => handleSelectItem(item)}
                    />
                  )}
                  {type === 'riaSpecifications' && (
                    <ListItemText
                      primary={item.title}
                      secondary={item.dataType}
                      onClick={() => handleSelectItem(item)}
                    />
                  )}
                </ListItem>
              ))}
          </List>
        </DialogContent>
      </Dialog>
    </div>
  )
}
