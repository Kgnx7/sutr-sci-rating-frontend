import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Header from '../../components/Header'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { VirtualTableState, SortingState, IntegratedSorting } from '@devexpress/dx-react-grid'
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui'
import { getAllPositions } from '../../features/positionsList/positonsSlice'
import { tableHeaderMessages, tableMessages } from '../../utils/localization'

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 100,
  },
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}))

const columns = [
  // { name: 'id', title: 'ID' },
  { name: 'title', title: 'Наименование' },
  { name: 'short', title: 'Сокращение' },
]

// const PAGE_SIZE = 100

export default function PositionList() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const positions = useSelector((state) => state.positions.positions)
  // const loading = useSelector((state) => state.positions.loading)

  useEffect(() => {
    dispatch(getAllPositions(history))
  }, [])

  return (
    <>
      <Header />
      <Container className={classes.container}>
        <Typography variant="h2" gutterBottom>
          Список должностей
        </Typography>
        <Paper>
          <Grid rows={positions} columns={columns}>
            <SortingState />
            <IntegratedSorting />
            <Table messages={tableMessages} />
            <TableHeaderRow showSortingControls messages={tableHeaderMessages} />
          </Grid>
        </Paper>
      </Container>
    </>
  )
}
