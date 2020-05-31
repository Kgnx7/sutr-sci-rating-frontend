import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form } from 'react-final-form'
import { TextField, Select, makeValidate } from 'mui-rff'
import Header from '../Header'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import { getAllDepartments } from '../../app/departmentsSlice'
import { getAllPositions } from '../../app/positionsSlice'
import { createUser } from '../../app/usersSlice'
import { getAllAcademicDegrees } from '../../app/academicDegreesSlice'
import { getAllAcademicRanks } from '../../app/academicRanksSlice'
import { getAllStaffs } from '../../app/staffsSlice'
import Button from '@material-ui/core/Button'
import userSchema from '../../utils/validation/userSchema'

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 100,
  },
  formContainer: {
    maxWidth: 250,
    marginBottom: 30,
  },
  createButton: {
    marginTop: 15
  }
}))

export default function UserCreate(props) {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()

  const positions = useSelector((state) => state.positions.positions)
  const departments = useSelector((state) => state.departments.departments)
  const academicDegrees = useSelector((state) => state.academicDegrees.academicDegrees)
  const academicRanks = useSelector((state) => state.academicRanks.academicRanks)
  const staffs = useSelector((state) => state.staffs.staffs)

  const onSubmit = async (values) => {
    dispatch(createUser(values, history))
  }

  const validate = makeValidate(userSchema)

  useEffect(() => {
    dispatch(getAllPositions(history))
    dispatch(getAllDepartments(history))
    dispatch(getAllAcademicDegrees(history))
    dispatch(getAllAcademicRanks(history))
    dispatch(getAllStaffs(history))
  }, [])

  return (
    <>
      <Header />
      <Container className={classes.container}>
        <Typography variant="h2" gutterBottom>
          Создание пользователя
        </Typography>
        <div className={classes.formContainer}>
          <Form
            onSubmit={onSubmit}
            initialValues={{}}
            validate={validate}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit} noValidate>
                <TextField label="Логин" name="login" required={true} />

                <TextField label="Имя" name="name" required={true} />
                <TextField label="Фамилия" name="surname" required={true} />
                <TextField label="Отчество" name="patronymic" required={false} />
                <TextField label="Год рождения" name="yearOfBirth" type="number" required={false} />

                <Select name="department" label="Кафедра" formControlProps={{ margin: 'normal' }}>
                  {departments.map((department) => (
                    <MenuItem value={department.id}>{department.title}</MenuItem>
                  ))}
                </Select>

                <Select name="position" label="Должность" formControlProps={{ margin: 'normal' }}>
                  {positions.map((position) => (
                    <MenuItem value={position.id}>{position.short}</MenuItem>
                  ))}
                </Select>

                <Select
                  name="academicDegree"
                  label="Ученая степень"
                  formControlProps={{ margin: 'normal' }}
                >
                  {academicDegrees.map((academicDegree) => (
                    <MenuItem value={academicDegree.id}>{academicDegree.title}</MenuItem>
                  ))}
                </Select>

                <Select
                  name="academicRank"
                  label="Ученое звание"
                  formControlProps={{ margin: 'normal' }}
                >
                  {academicRanks.map((academicRank) => (
                    <MenuItem value={academicRank.id}>{academicRank.title}</MenuItem>
                  ))}
                </Select>

                <Select name="staff" label="Тип занятости" formControlProps={{ margin: 'normal' }}>
                  {staffs.map((staff) => (
                    <MenuItem value={staff.id}>{staff.title}</MenuItem>
                  ))}
                </Select>

                <TextField label="Ставка" name="salaryRate" required={false} type="number" />
                <TextField label="Номер телефона" name="phone" required={false} />
                <TextField label="Электронная почта" name="email" required={false} />
                {/* <TextField label="Hello world" name="SNILS4" required={true} /> */}
                {/* <Button
                  variant="contained"
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                >
                  Reset
                </Button> */}
                <TextField label="Пароль" name="password" type="password" required={true} />
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
