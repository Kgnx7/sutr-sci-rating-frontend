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

import createRiaTypeSchema from './createRiaTypeSchema'
import { getRiaGeneralTypes } from '../../features/riaGeneralTypeList/riaGeneralTypeListSlice'
import { createRiaType } from './riaTypeCreateSlice'

import Header from '../../components/Header'

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 100,
  },
  formContainer: {
    maxWidth: 250,
    marginBottom: 30,
  },
  gutterTop: {
    marginTop: 15,
  },
}))

export default function UserStatusCreate() {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()

  const riaGeneralTypes = useSelector((state) => state.riaGeneralTypesList.riaGeneralTypes)

  const onSubmit = async (values) => {
    dispatch(createRiaType(values, history))
  }

  useEffect(() => {
    dispatch(getRiaGeneralTypes())
  }, [])

  const validate = makeValidate(createRiaTypeSchema)

  return (
    <>
      <Header />
      <Container className={classes.container}>
        <Typography variant="h2" gutterBottom>
          Создание типа РИД
        </Typography>
        <div className={classes.formContainer}>
          <Form
            onSubmit={onSubmit}
            initialValues={{}}
            validate={validate}
            render={({ handleSubmit, form, submitting, pristine }) => (
              <form onSubmit={handleSubmit} noValidate>
                <Select
                  name="generalTypeId"
                  label="Тип"
                  formControlProps={{ margin: 'normal' }}
                  required={true}
                >
                  {riaGeneralTypes.map((generalType) => (
                    <MenuItem value={generalType.id}>{generalType.title}</MenuItem>
                  ))}
                </Select>

                <TextField label="Наименование" name="title" type="text" required={true} />
                <TextField label="Описание" name="description" type="text" required={false} />
                <TextField label="Единица измерения" name="unit" type="text" required={true} />
                <TextField label="Баллы за единицу" name="perUnit" type="number" required={true} />

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
        </div>
      </Container>
    </>
  )
}
