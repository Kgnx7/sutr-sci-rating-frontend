import React from 'react'
import { useSelector } from 'react-redux'
import Routes from '../Routes'
import Backdrop from '../Backdrop'
import { SnackbarProvider } from 'notistack'
import { makeStyles } from '@material-ui/core/styles'
import Notifier from '../Notifier'
import { AbilityContext } from '../Can'
import defineAbilitiesFor from '../../utils/defineAbility'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
}))

function App() {
  const classes = useStyles()
  const currentUser = useSelector((state) => state.auth.user)
  const ability = defineAbilitiesFor(currentUser);
  return (
    <AbilityContext.Provider value={ability}>
      <SnackbarProvider>
        <div className={classes.root}>
          <Routes />
          <Backdrop />
          <Notifier />
        </div>
      </SnackbarProvider>
    </AbilityContext.Provider>
  )
}

export default App
