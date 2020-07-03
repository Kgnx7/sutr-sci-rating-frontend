import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form } from 'react-final-form'
import { TextField, Select, makeValidate } from 'mui-rff'
import Header from '../../components/Header'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import { editUser } from './userEditSlice'
import Button from '@material-ui/core/Button'
import editUserSchema from '../../utils/validation/editUserSchema'
import { getAllAccessGroups } from '../../features/accessGroupsList/accessGroupsSlice'
import { getAllAcademicRanks } from '../../features/academicRanksList/academicRanksSlice'

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 100,
  },
  formContainer: {
    maxWidth: 250,
    marginBottom: 30,
  },
  button: {
    marginTop: theme.spacing(3),
  },
}))

export default function UserEdit() {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()

  const userData = useSelector((state) => state.userDetails.user)
  const academicRanks = useSelector((state) => state.academicRanks.academicRanks)
  const accessGroups = useSelector((state) => state.accessGroups.accessGroups)

  const onSubmit = async (values) => {
    dispatch(editUser(userData.id, values, history))
  }

  const validate = makeValidate(editUserSchema)

  useEffect(() => {
    dispatch(getAllAccessGroups(history))
    dispatch(getAllAcademicRanks(history))
  }, [])

  return (
    <>
      <Header />
      <Container className={classes.container}>
        <Typography variant="h2" gutterBottom>
          Редактирование пользователя
        </Typography>
        <div className={classes.formContainer}>
          <Form
            onSubmit={onSubmit}
            initialValues={userData}
            validate={validate}
            render={({ handleSubmit, form, submitting, pristine }) => (
              <form onSubmit={handleSubmit} noValidate>
                <TextField label="Логин" name="login" required={true} />

                <TextField label="Имя" name="name" required={true} />
                <TextField label="Фамилия" name="surname" required={true} />
                <TextField label="Отчество" name="patronymic" required={false} />
                <TextField label="Год рождения" name="yearOfBirth" type="number" required={false} />

                <Select
                  name="academicRankId"
                  label="Ученое звание"
                  formControlProps={{ margin: 'normal' }}
                >
                  {academicRanks.map((academicRank) => (
                    <MenuItem value={academicRank.id}>{academicRank.title}</MenuItem>
                  ))}
                </Select>

                <Select
                  name="accessGroupId"
                  label="Уровень доступа"
                  formControlProps={{ margin: 'normal' }}
                >
                  {accessGroups.map((group) => (
                    <MenuItem value={group.id}>{group.title}</MenuItem>
                  ))}
                </Select>

                <TextField label="Ставка" name="salaryRate" required={false} type="number" />
                <TextField label="Номер телефона" name="phone" required={false} />
                <TextField label="Электронная почта" name="email" required={false} />
                <TextField label="Последнии 4 чифры снилс" name="snils" required={false} />
                <TextField
                  label="Пароль"
                  name="password"
                  type="password"
                  required={true}
                  margin="normal"
                />
                <Button
                  variant="contained"
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                  className={classes.button}
                >
                  Сбросить
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={submitting || pristine}
                  className={classes.button}
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
