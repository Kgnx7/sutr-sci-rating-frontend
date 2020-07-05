import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form } from 'react-final-form'
import { TextField, makeValidate } from 'mui-rff'
import Header from '../../components/Header'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { editFaculty } from './facultyEditSlice'
import Button from '@material-ui/core/Button'
import createFacultySchema from '../../utils/validation/createFacultySchema'
import SelectModal from '../../components/SelectModal'
import { getAllUsers } from '../usersList/usersSlice'

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
  const users = useSelector((state) => state.usersList.users)

  const facultyData = useSelector((state) => state.faculty.faculty)

  const onSubmit = async (values) => {
    dispatch(editFaculty(values, history))
  }

  const handleUsersSearch = (search) => {
    dispatch(getAllUsers(search, 0, 3, history))
  }

  useEffect(() => {
    dispatch(getAllUsers('', 0, 3, history))
  }, [])

  const validate = makeValidate(createFacultySchema)

  return (
    <>
      <Header />
      <Container className={classes.container}>
        <Typography variant="h2" gutterBottom>
          Редактирование факультета
        </Typography>
        <div className={classes.formContainer}>
          <Form
            onSubmit={onSubmit}
            initialValues={facultyData}
            validate={validate}
            render={({ handleSubmit, form, submitting, pristine }) => (
              <form onSubmit={handleSubmit} noValidate>
                <TextField label="Наименование" name="title" required />
                <TextField label="Сокращение" name="short" required />

                <SelectModal
                  title="Выбрать декана"
                  name="deanId"
                  data={users}
                  onSearch={handleUsersSearch}
                  type="users"
                />

                <SelectModal
                  title="Выбрать декана"
                  name="deanAssistantId"
                  data={users}
                  onSearch={handleUsersSearch}
                  type="users"
                />

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
                  Редактировать
                </Button>
              </form>
            )}
          />
        </div>
      </Container>
    </>
  )
}
