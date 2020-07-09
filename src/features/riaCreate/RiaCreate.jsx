import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form } from 'react-final-form'
import { TextField, Select, makeValidate } from 'mui-rff'

import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import { riaMetaSchema, authorMetaSchema } from './createRiaSchema'
import { getRiaStatuses } from '../../features/riaStatusesList/riaStatusesListSlice'
import { getRsTypes } from '../../features/rsTypesList/rsTypesListSlice'
import { getRiaTypes } from '../../features/riaTypesList/riaTypesListSlice'
import { createRia } from './riaCreateSlice'

import Header from '../../components/Header'
import SelectModal from '../../components/SelectModal'

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 100,
  },
  formContainer: {
    maxWidth: 250,
    marginBottom: 30,
  },
  gutterTop: {
    marginTop: theme.spacing(3),
  },
  gutterBottom: {
    marginBottom: theme.spacing(3),
  },
}))

export default function RiaCreate() {
  const [authorForm, setAuthorForm] = useState(false)
  const [riaMeta, setRiaMeta] = useState({})
  // const [Meta, setRiaMeta] = useState({})
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()

  const currentUser = useSelector((state) => state.auth.user)
  const rsTypes = useSelector((state) => state.rsTypesList.rsTypes)
  const riaStatuses = useSelector((state) => state.riaStatusesList.riaStatuses)
  const riaTypes = useSelector((state) => state.riaTypesList.riaTypes)

  const onRiaMetaSubmit = async (values) => {
    // dispatch(createRia(values, history))
    setRiaMeta(values)
    toggleAuthorForm()
  }

  const onAuthorMetaSubmit = async (values) => {
    dispatch(createRia({ riaMeta, authorMeta: values }, history))
    toggleAuthorForm()
  }

  const toggleAuthorForm = () => {
    setAuthorForm(!authorForm)
  }

  useEffect(() => {
    dispatch(getRiaStatuses(history))
    dispatch(getRsTypes(history))
    dispatch(getRiaTypes('', 0, 3, history))
  }, [])

  const handleRiaTypeSearch = (search) => {
    dispatch(getRiaTypes(search, 0, 3, history))
  }

  const riaMetaValidate = makeValidate(riaMetaSchema)
  const authorMetaValidate = makeValidate(authorMetaSchema)

  return (
    <>
      <Header />
      <Container className={classes.container}>
        <Typography variant="h2" gutterBottom>
          Создание РИД
        </Typography>
        <div className={classes.formContainer}>
          <Form
            onSubmit={onRiaMetaSubmit}
            initialValues={{}}
            validate={riaMetaValidate}
            render={({ handleSubmit, form, submitting, pristine }) => (
              <form onSubmit={handleSubmit} noValidate>
                <TextField label="Наименование" name="title" type="text" required={true} />
                <TextField label="Авторы" name="authors" type="text" required={true} />
                <TextField label="Описание" name="description" type="text" required={false} />

                <SelectModal
                  title="Выбор типа РИД"
                  name="riaTypeId"
                  data={riaTypes}
                  onSearch={handleRiaTypeSearch}
                  type="riaTypes"
                />
                <Select
                  name="rsTypeId"
                  label="Тип НИР"
                  formControlProps={{ margin: 'normal' }}
                  required={true}
                >
                  {rsTypes.map((generalType) => (
                    <MenuItem value={generalType.id}>{generalType.title}</MenuItem>
                  ))}
                </Select>
                <Select
                  name="riaStatusId"
                  label="Статус РИД"
                  formControlProps={{ margin: 'normal' }}
                  required={true}
                >
                  {riaStatuses.map((generalType) => (
                    <MenuItem value={generalType.id}>{generalType.title}</MenuItem>
                  ))}
                </Select>

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={submitting || pristine}
                  className={classes.gutterTop}
                >
                  Создать
                </Button>
              </form>
            )}
          />
          <Dialog open={authorForm} onClose={toggleAuthorForm} maxWidth="sm" fullWidth>
            <DialogTitle>Ваше участие</DialogTitle>
            <DialogContent>
              <Form
                onSubmit={onAuthorMetaSubmit}
                initialValues={{}}
                validate={authorMetaValidate}
                render={({ handleSubmit, form, submitting, pristine }) => (
                  <form onSubmit={handleSubmit} noValidate>
                    <TextField label="Роль" name="role" type="text" required={true} />
                    <TextField
                      label="Доля"
                      name="part"
                      type="number"
                      required={true}
                      className={classes.gutterBottom}
                    />

                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={submitting || pristine}
                      className={classes.gutterTop}
                    >
                      Создать
                    </Button>
                  </form>
                )}
              />
            </DialogContent>
          </Dialog>
        </div>
      </Container>
    </>
  )
}
