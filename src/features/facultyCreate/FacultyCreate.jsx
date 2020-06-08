import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Form } from 'react-final-form'
import { TextField, makeValidate } from 'mui-rff'
import Header from '../../components/Header'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { createFaculty } from '../../features/facultyCreate/facultyCreateSlice'
import Button from '@material-ui/core/Button'
import createFacultySchema from '../../utils/validation/createFacultySchema'

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 100,
  },
  formContainer: {
    maxWidth: 250,
    marginBottom: 30,
  },
  createButton: {
    marginTop: 15,
  },
}))

export default function FacultyCreate() {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()

  const onSubmit = async (values) => {
    dispatch(createFaculty(values, history))
  }

  const validate = makeValidate(createFacultySchema)

  return (
    <>
      <Header />
      <Container className={classes.container}>
        <Typography variant="h2" gutterBottom>
          Создание факультета
        </Typography>
        <div className={classes.formContainer}>
          <Form
            onSubmit={onSubmit}
            initialValues={{}}
            validate={validate}
            render={({ handleSubmit, form, submitting, pristine }) => (
              <form onSubmit={handleSubmit} noValidate>
                <TextField label="Наименование" name="title" required />
                <TextField label="Сокращение" name="short" required />
                <TextField label="Декан" name="dean" required />
                <TextField label="Зам. декана по научной работе" name="assistantDean" required />
                <TextField label="Адресс" name="address" />
                <TextField label="Телефон" name="phone" />
                <TextField label="Электронная почта" name="email" />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={submitting || pristine}
                  className={classes.createButton}
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
