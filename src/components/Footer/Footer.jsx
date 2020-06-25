import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles((theme) => ({
  footerWrapper: {
    backgroundColor: '#181818',
  },
}))

export default function Footer() {
  const classes = useStyles()

  return (
    <div className={classes.footerWrapper}>
      <Container>
        footer
      </Container>
    </div>
  )
}
