import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Form } from 'react-final-form'
import { TextField, makeValidate } from 'mui-rff'

import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import createRiaSpecificationSchema from './createRiaSpecificationSchema'
import { createRiaSpecification } from './riaSpecificationCreateSlice'

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

export default function RiaSpecificationCreate() {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()

  const onSubmit = async (values) => {
    dispatch(createRiaSpecification(values, history))
  }

  const validate = makeValidate(createRiaSpecificationSchema)

  return (
    <>
      <Header />
      <Container className={classes.container}>
        <Typography variant="h2" gutterBottom>
          Создание характиристики РИД
        </Typography>
        <div className={classes.formContainer}>
          <Form
            onSubmit={onSubmit}
            initialValues={{}}
            validate={validate}
            render={({ handleSubmit, submitting, pristine }) => (
              <form onSubmit={handleSubmit} noValidate>
                <TextField label="Наименование" name="title" type="text" required={true} />
                <TextField label="Тип данных" name="dataType" type="text" required={false} />

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
