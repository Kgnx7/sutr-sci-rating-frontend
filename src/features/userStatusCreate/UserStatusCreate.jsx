import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form } from 'react-final-form'
import { TextField, Select, makeValidate } from 'mui-rff'
import Header from '../../components/Header'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import { createUserStatus } from './userStatusCreateSlice'
import Button from '@material-ui/core/Button'
import createUserStatusSchema from '../../utils/validation/createUserStatusSchema'
import { useParams } from 'react-router-dom'
import { getAllPositions } from '../../features/positionsList/positionsSlice'
import { getAllDepartments } from '../../features/departmentsList/departmentsSlice'
import { getAllEmploymentTypes } from '../../features/employmentTypesList/employmentTypesListSlice'
import SelectModal from '../../components/SelectModal'

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
  const { id } = useParams()

  const departments = useSelector((state) => state.departments.departments)
  const positions = useSelector((state) => state.positions.positions)
  const employmentTypes = useSelector((state) => state.employmentTypes.employmentTypes)

  const onSubmit = async (values) => {
    dispatch(createUserStatus({ ...values, userId: id }, history))
  }
  const handleDepartmentSearch = (search) => {
    dispatch(getAllDepartments(search, 0, 3, history))
  }
  useEffect(() => {
    dispatch(getAllDepartments('', 0, 3, history))
    dispatch(getAllPositions())
    dispatch(getAllEmploymentTypes())
  }, [])

  const validate = makeValidate(createUserStatusSchema)

  return (
    <>
      <Header />
      <Container className={classes.container}>
        <Typography variant="h2" gutterBottom>
          Добавление должности
        </Typography>
        <div className={classes.formContainer}>
          <Form
            onSubmit={onSubmit}
            initialValues={{}}
            validate={validate}
            render={({ handleSubmit, form, submitting, pristine }) => (
              <form onSubmit={handleSubmit} noValidate>
                <SelectModal
                  title="Выбрать кафедру"
                  name="departmentId"
                  data={departments}
                  onSearch={handleDepartmentSearch}
                  type="departments"
                />

                <Select
                  name="positionId"
                  label="Должность"
                  formControlProps={{ margin: 'normal' }}
                  required={true}
                >
                  {positions.map((academicRank) => (
                    <MenuItem value={academicRank.id}>{academicRank.title}</MenuItem>
                  ))}
                </Select>

                <Select
                  name="employmentTypeId"
                  label="Тип занятости"
                  formControlProps={{ margin: 'normal' }}
                  required={true}
                >
                  {employmentTypes.map((group) => (
                    <MenuItem value={group.id}>{group.title}</MenuItem>
                  ))}
                </Select>

                <TextField label="Ставка" name="salaryRate" type="number" required={true} />

                {/* <Button
                  variant="contained"
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                  className={classes.gutterTop}
                >
                  Сбросить
                </Button> */}

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
