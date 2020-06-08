import React from 'react'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Header from '../Header'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 100,
  },
}))

export default function Dashboard() {
  const classes = useStyles()

  return (
    <>
      <Header />
      <Container className={classes.container}>
        <Typography variant="h1" component="span">
          4😮4
        </Typography>
      </Container>
    </>
  )
}
