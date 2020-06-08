import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Form } from 'react-final-form'
import { TextField, makeValidate } from 'mui-rff'
import Header from '../../components/Header'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { createAcademicRank } from '../../features/academicRankCreate/academicRankCreateSlice'
import Button from '@material-ui/core/Button'
import createAcademicRankSchema from '../../utils/validation/createAcademicRankSchema'

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

export default function AcademicRankCreate() {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()

  const onSubmit = async (values) => {
    dispatch(createAcademicRank(values, history))
  }

  const validate = makeValidate(createAcademicRankSchema)

  return (
    <>
      <Header />
      <Container className={classes.container}>
        <Typography variant="h2" gutterBottom>
          Создание должности
        </Typography>
        <div className={classes.formContainer}>
          <Form
            onSubmit={onSubmit}
            initialValues={{}}
            validate={validate}
            render={({ handleSubmit, form, submitting, pristine }) => (
              <form onSubmit={handleSubmit} noValidate>
                <TextField label="Наименование" name="title" required={true} />
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
