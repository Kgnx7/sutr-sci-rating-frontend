import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form } from 'react-final-form'
import { TextField, Select, makeValidate } from 'mui-rff'

import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'

import createRiaTypeSchema from '../riaTypeCreate/createRiaTypeSchema'
import { addProperty } from './riaTypeEditSlice'
import { getRiaTypes } from '../riaTypesList/riaTypesListSlice'
import { getRiaSpecifications } from '../riaSpecificationsList/riaSpecificationsListSlice'

import SelectModal from '../../components/SelectModal'
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

export default function RiaTypePropertyCreate() {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()

  const riaTypes = useSelector((state) => state.riaTypesList.riaTypes)
  const riaSpecifications = useSelector((state) => state.riaSpecificationsList.riaSpecifications)
  const riaType = useSelector((state) => state.riaTypesDetails.riaType)

  const onSubmit = async (values) => {
    dispatch(addProperty(values, history))
  }

  useEffect(() => {
    dispatch(getRiaTypes(riaType?.title || '', 0, 3, history))
    dispatch(getRiaSpecifications('', 0, 3, history))
  }, [])

  const handleRiaTypeSearch = (search) => {
    dispatch(getRiaTypes(search, 0, 3, history))
  }
  const handleRiaSpecificationSearch = (search) => {
    dispatch(getRiaSpecifications(search, 0, 3, history))
  }

  const validate = makeValidate(createRiaTypeSchema)

  return (
    <>
      <Header />
      <Container className={classes.container}>
        <Typography variant="h2" gutterBottom>
          Редактирование типа РИД
        </Typography>
        <div className={classes.formContainer}>
          <Form
            onSubmit={onSubmit}
            initialValues={{}}
            validate={validate}
            render={({ handleSubmit, submitting, pristine }) => (
              <form onSubmit={handleSubmit} noValidate>
                <SelectModal
                  title="Выбрать тип РИД"
                  name="typeId"
                  data={riaTypes}
                  onSearch={handleRiaTypeSearch}
                  type="riaTypes"
                />

                <SelectModal
                  title="Выбрать свойство"
                  name="propertyId"
                  data={riaSpecifications}
                  onSearch={handleRiaSpecificationSearch}
                  type="riaSpecifications"
                />

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={submitting || pristine}
                  className={classes.gutterTop}
                >
                  Добавить
                </Button>
              </form>
            )}
          />
        </div>
      </Container>
    </>
  )
}
