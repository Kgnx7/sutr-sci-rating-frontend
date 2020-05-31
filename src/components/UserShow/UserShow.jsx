import React from 'react'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Header from '../Header'

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
  const users = useSelector((state) => state.users.users)
  const { id } = useParams()
  const user = users.find((user) => user.id === parseInt(id))

  const classes = useStyles()

  return (
    <>
      <Header />
      <Container className={classes.profileContainer}>
        {user ? (
          <>
            <Avatar src="/avatar.jpg" className={classes.avatar} />
            <Typography className={classes.text}>{`Логин: ${user.login}`}</Typography>
            <Typography>{`ФИО: ${user.displayName}`}</Typography>
            <Typography>{`Должность: ${user.position || ''}`}</Typography>
            <Typography>{`Кафедра: ${user.cathedra || ''}`}</Typography>
            <Typography>{`Ученая степень: ${user.academicDegree || ''}`}</Typography>
            <Typography>{`Ученое звание: ${user.academicDegree || ''}`}</Typography>
          </>
        ) : (
          <Typography className={classes.text}>Нет информации о пользователе</Typography>
        )}
      </Container>
    </>
  )
}
