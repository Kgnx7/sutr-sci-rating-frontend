import React, { useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import Header from '../../components/Header'
import { getUser } from './userDetailsSlice'

const useStyles = makeStyles((theme) => ({
  profileContainer: {
    paddingTop: 100,
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  text: {
    marginTop: theme.spacing(3),
  },
}))

export default function UserShow() {
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles()
  const { id } = useParams()
  const user = useSelector((state) => state.userDetails.user)

  useEffect(() => {
    dispatch(getUser(id, history))
  }, [])

  const handleBack = () => {
    history.goBack()
  }

  const handleEditUser = () => {
    history.push(`/user/${id}/edit`)
  }

  return (
    <>
      <Header />
      <Container className={classes.profileContainer}>
        <IconButton aria-label="назад" onClick={handleBack}>
          <ArrowBackIosIcon />
        </IconButton>
        {user ? (
          <>
            <Avatar src="/avatar.jpg" className={classes.avatar} />
            <Typography className={classes.text}>{`Логин: ${user.login}`}</Typography>
            <Typography>{`ФИО: ${user.displayName}`}</Typography>
            <Typography>{`Должность: ${user.position || ''}`}</Typography>
            <Typography>{`Кафедра: ${user.cathedra || ''}`}</Typography>
            <Typography>{`Ученая степень: ${user.academicDegree || ''}`}</Typography>
            <Typography>{`Ученое звание: ${user.academicDegree || ''}`}</Typography>
            {/* <Button
              variant="contained"
              color="primary"
              onClick={handleEditUser}
              className={classes.addUserBtn}
            >
              Добавить пользователя
            </Button> */}
          </>
        ) : (
          <Typography className={classes.text}>Нет информации о пользователе</Typography>
        )}
      </Container>
    </>
  )
}
