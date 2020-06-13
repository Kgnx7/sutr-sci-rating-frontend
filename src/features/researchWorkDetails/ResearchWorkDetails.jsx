import React, { useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Header from '../../components/Header'
import { getResearchWork } from './researchWorkDetailsSlice'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: 100,
  },
  text: {
    marginTop: theme.spacing(3),
  },
}))

export default function UserDetails() {
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles()
  const { id } = useParams()
  const researchWork = useSelector((state) => state.researchWork.researchWork)

  useEffect(() => {
    dispatch(getResearchWork(id, history))
  }, [])

  const handleBack = () => {
    history.goBack()
  }

  // const handleEditUser = () => {
  //   history.push(`/researchWork/${id}/edit`)
  // }

  return (
    <>
      <Header />
      <Container className={classes.container}>
        <IconButton aria-label="назад" onClick={handleBack}>
          <ArrowBackIosIcon />
        </IconButton>
        {researchWork ? (
          <>
            <Typography
              className={classes.text}
            >{`Наименование: ${researchWork.title}`}</Typography>
            <Typography>{`Авторы: ${researchWork.authors}`}</Typography>
            <Typography>{`Источник: ${researchWork.sourceName}`}</Typography>
            <Typography>{`Описание: ${researchWork.description}`}</Typography>
            <Typography>{`rem text: ${researchWork.remText}`}</Typography>
            {/* <Typography>{`ФИО: ${researchWork.displayName}`}</Typography>
            <Typography>{`Должность: ${researchWork.position || ''}`}</Typography>
            <Typography>{`Кафедра: ${researchWork.department || ''}`}</Typography>
            <Typography>{`Ученая степень: ${researchWork.academicDegree || ''}`}</Typography>
            <Typography>{`Ученое звание: ${researchWork.academicDegree || ''}`}</Typography> */}
          </>
        ) : (
          <Typography className={classes.text}>Нет информации</Typography>
        )}
      </Container>
    </>
  )
}
