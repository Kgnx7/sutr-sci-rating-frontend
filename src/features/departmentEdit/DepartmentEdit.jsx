import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form } from 'react-final-form'
import { TextField, Select, makeValidate } from 'mui-rff'

import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'

import Header from '../../components/Header'
import SelectModal from '../../components/SelectModal'

import { editDepartment } from './departmentEditSlice'
import createDepartmentSchema from '../../utils/validation/createDepartmentSchema'
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

export default function () {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const users = useSelector((state) => state.usersList.users)
  const departmentDetails = useSelector((state) => state.department.department)
  const faculties = useSelector((state) => state.faculties.faculties)

  const onSubmit = async (values) => {
    dispatch(editDepartment(values, history))
  }

  const handleUsersSearch = (search) => {
    dispatch(getAllUsers(search, 0, 3, history))
  }

  useEffect(() => {
    dispatch(getAllUsers('', 0, 3, history))
  }, [])

  const validate = makeValidate(createDepartmentSchema)

  return (
    <>
      <Header />
      <Container className={classes.container}>
        <Typography variant="h2" gutterBottom>
          Редактирование кафедры
        </Typography>
        <div className={classes.formContainer}>
          <Form
            onSubmit={onSubmit}
            initialValues={departmentDetails}
            validate={validate}
            render={({ handleSubmit, form, submitting, pristine }) => (
              <form onSubmit={handleSubmit} noValidate>
                <TextField label="Наименование" name="title" required />
                <TextField label="Сокращение" name="short" required />

                <Select
                  name="facultyId"
                  label="Факультет"
                  formControlProps={{ margin: 'normal' }}
                  required={true}
                >
                  {faculties.map((faculty) => (
                    <MenuItem value={faculty.id}>{faculty.title}</MenuItem>
                  ))}
                </Select>

                <SelectModal
                  title="Выбрать заведующего"
                  name="managerId"
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
