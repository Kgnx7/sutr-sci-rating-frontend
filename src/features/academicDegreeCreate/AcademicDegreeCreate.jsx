import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form } from 'react-final-form'
import { Select, makeValidate } from 'mui-rff'
import Header from '../../components/Header'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import { createAcademicDegree } from './academicDegreeCreateSlice'
import Button from '@material-ui/core/Button'
import createAcademicDegreeSchema from '../../utils/validation/createAcademicDegreeSchema'
import { useParams } from 'react-router-dom'
import SelectModal from '../../components/SelectModal'

import { getAllDegreeTypes } from '../../features/degreeTypesList/degreeTypesListSlice'
import { getSpecialties } from '../../features/specialtiesList/specialtiesListSlice'

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

export default function AcademicDegreeCreate() {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const { id } = useParams()

  const degreeTypes = useSelector((state) => state.degreeTypesList.degreeTypes)
  const specialties = useSelector((state) => state.specialtiesList.specialties)

  const onSubmit = async (values) => {
    dispatch(createAcademicDegree({ ...values, userId: id }, history))
  }
  const handleSpecialtySearch = (search) => {
    dispatch(getSpecialties(search, 0, 3, history))
  }
  useEffect(() => {
    dispatch(getSpecialties('', 0, 3, history))
    dispatch(getAllDegreeTypes())
  }, [])

  const validate = makeValidate(createAcademicDegreeSchema)

  return (
    <>
      <Header />
      <Container className={classes.container}>
        <Typography variant="h2" gutterBottom>
          Добавление степени
        </Typography>
        <div className={classes.formContainer}>
          <Form
            onSubmit={onSubmit}
            initialValues={{}}
            validate={validate}
            render={({ handleSubmit, submitting, pristine }) => (
              <form onSubmit={handleSubmit} noValidate>
                <Select
                  name="degreeTypeId"
                  label="Степень"
                  formControlProps={{ margin: 'normal' }}
                  required={true}
                >
                  {degreeTypes.map((academicRank) => (
                    <MenuItem value={academicRank.id}>{academicRank.title}</MenuItem>
                  ))}
                </Select>

                <SelectModal
                  title="Выбрать направление"
                  name="specialtyId"
                  data={specialties}
                  onSearch={handleSpecialtySearch}
                  type="specialties"
                />

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
