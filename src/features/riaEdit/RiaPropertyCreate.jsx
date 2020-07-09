import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form } from 'react-final-form'
import { TextField, makeValidate, Select } from 'mui-rff'

import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'

import createRiaPropertySchema from './createRiaPropertySchema'
import { createRiaProperty } from './riaEditSlice'
import { getRiaSpecifications } from '../riaSpecificationsList/riaSpecificationsListSlice'
import { getRiaType } from '../riaTypeDetails/riaTypeDetailsSlice'

import Header from '../../components/Header'
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

export default function RiaPropertyCreate() {
  const [specifications, setSpecifications] = useState([])
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()

  const riaDetails = useSelector((state) => state.riaDetails.ria)
  const riaTypeId = riaDetails.riaTypeId
  const riaType = useSelector((state) => state.riaTypesDetails.riaType)

  const onSubmit = async (values) => {
    dispatch(createRiaProperty(values, history))
  }

  useEffect(() => {
    dispatch(getRiaType(riaTypeId, history))
  }, [])

  useEffect(() => {
    if (riaType !== null) {
      setSpecifications(riaType.specifications)
    }
  }, [riaType])

  const validate = makeValidate(createRiaPropertySchema)

  return (
    <>
      <Header />
      <Container className={classes.container}>
        <Typography variant="h2" gutterBottom>
          Создание свойства РИД
        </Typography>
        <div className={classes.formContainer}>
          <Form
            onSubmit={onSubmit}
            initialValues={{ riaId: riaDetails.id }}
            validate={validate}
            render={({ handleSubmit, submitting, pristine }) => (
              <form onSubmit={handleSubmit} noValidate>
                <Select
                  name="riaId"
                  label="РИД"
                  formControlProps={{ margin: 'normal' }}
                  required={true}
                  disabled
                >
                  <MenuItem value={riaDetails.id}>{riaDetails.title}</MenuItem>
                </Select>

                <Select
                  name="propertyId"
                  label="Свойство"
                  formControlProps={{ margin: 'normal' }}
                  required={true}
                >
                  {specifications.map((spec) => (
                    <MenuItem value={spec.id}>{spec.title}</MenuItem>
                  ))}
                </Select>

                <TextField label="Значение" name="value" type="text" required={true} />

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
