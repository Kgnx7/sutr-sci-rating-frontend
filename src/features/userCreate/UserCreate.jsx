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
import { createUser } from './userCreateSlice'
import Button from '@material-ui/core/Button'
import createUserSchema from '../../utils/validation/createUserSchema'
import { getAllAccessGroups } from '../../features/accessGroupsList/accessGroupsSlice'
import { getAllAcademicRanks } from '../../features/academicRanksList/academicRanksSlice'

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
  controls: {
    display: 'block',
  },
}))

export default function UserCreate(props) {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()

  const academicRanks = useSelector((state) => state.academicRanks.academicRanks)
  const accessGroups = useSelector((state) => state.accessGroups.accessGroups)

  const onSubmit = async (values) => {
    dispatch(createUser(values, history))
  }

  useEffect(() => {
    dispatch(getAllAccessGroups(history))
    dispatch(getAllAcademicRanks(history))
  }, [])

  const validate = makeValidate(createUserSchema)

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

                <Select
                  name="academicRankId"
                  label="Ученое звание"
                  formControlProps={{ margin: 'normal' }}
                  required={true}
                >
                  {academicRanks.map((academicRank) => (
                    <MenuItem value={academicRank.id}>{academicRank.title}</MenuItem>
                  ))}
                </Select>

                <Select
                  name="accessGroupId"
                  label="Уровень доступа"
                  formControlProps={{ margin: 'normal' }}
                  required={true}
                >
                  {accessGroups.map((group) => (
                    <MenuItem value={group.id}>{group.title}</MenuItem>
                  ))}
                </Select>

                <TextField label="Номер телефона" name="phone" required={false} />
                <TextField label="Электронная почта" name="email" required={false} />
                <TextField label="Последнии 4 чифры снилс" name="snils" required={false} />
                <TextField label="Пароль" name="password" type="password" required={true} />
                <Button
                  variant="contained"
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                  className={`${classes.gutterTop} ${classes.controls}`}
                >
                  Сбросить
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={submitting || pristine}
                  className={`${classes.gutterTop} ${classes.controls}`}
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
